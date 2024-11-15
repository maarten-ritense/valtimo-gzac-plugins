package com.ritense.valtimoplugins.objectmanagement.plugin

import com.fasterxml.jackson.core.JsonPointer
import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.module.kotlin.convertValue
import com.ritense.document.domain.patch.JsonPatchService
import com.ritense.plugin.annotation.Plugin
import com.ritense.plugin.annotation.PluginAction
import com.ritense.plugin.annotation.PluginActionProperty
import com.ritense.plugin.service.PluginService
import com.ritense.processlink.domain.ActivityTypeWithEventName
import com.ritense.valtimo.contract.json.patch.JsonPatchBuilder
import com.ritense.valtimoplugins.objectmanagement.service.ObjectManagementCrudService
import com.ritense.valueresolver.ValueResolverService
import org.camunda.bpm.engine.delegate.DelegateExecution
import java.util.UUID

@Plugin(
    key = "object-management",
    title = "Object Management",
    description = "Plugin for CRUD actions on the Objects registration"
)
open class ObjectManagementPlugin(
    pluginService: PluginService,
    val objectManagementCrudService: ObjectManagementCrudService,
    val valueResolverService: ValueResolverService
) {
    private val objectMapper = pluginService.getObjectMapper()

    @PluginAction(
        key = "create-object",
        title = "Create Object",
        description = "Create a new Object",
        activityTypes = [ActivityTypeWithEventName.SERVICE_TASK_START]
    )
    open fun createObject(
        execution: DelegateExecution,
        @PluginActionProperty objectManagementConfigurationId: UUID,
        @PluginActionProperty objectData: List<DataBindingConfig>,
        @PluginActionProperty objectUrlProcessVariableName: String
    ) {
        val objectUrl = objectManagementCrudService.createObject(
            objectManagementConfigurationId,
            getObjectData(objectData, execution.businessKey),
        )

        execution.setVariable(objectUrlProcessVariableName, objectUrl)
    }

    @PluginAction(
        key = "update-object",
        title = "Update Object",
        description = "Update an existing Object",
        activityTypes = [ActivityTypeWithEventName.SERVICE_TASK_START]
    )
    open fun updateObject() {

    }

    @PluginAction(
        key = "delete-object",
        title = "Delete Object",
        description = "Delete an existing Object",
        activityTypes = [ActivityTypeWithEventName.SERVICE_TASK_START]
    )
    open fun deleteObject() {

    }

    private fun getObjectData(keyValueMap: List<DataBindingConfig>, documentId: String): JsonNode {
        val resolvedValuesMap = valueResolverService.resolveValues(
            documentId, keyValueMap.map { it.value }
        )

        if (keyValueMap.size != resolvedValuesMap.size) {
            val failedValues = keyValueMap
                .filter { !resolvedValuesMap.containsKey(it.value) }
                .joinToString(", ") { "'${it.key}' = '${it.value}'" }
            throw IllegalArgumentException(
                "Error in case: '${documentId}'. Failed to resolve values: $failedValues".trimMargin()
            )
        }

        val objectDataMap = keyValueMap.associate { it.key to resolvedValuesMap[it.value] }

        val objectData = objectMapper.createObjectNode()
        val jsonPatchBuilder = JsonPatchBuilder()

        objectDataMap.forEach {
            val path = JsonPointer.valueOf(it.key)
            val valueNode = objectMapper.valueToTree<JsonNode>(it.value)
            jsonPatchBuilder.addJsonNodeValue(objectData, path, valueNode)
        }

        JsonPatchService.apply(jsonPatchBuilder.build(), objectData)

        return objectMapper.convertValue(objectData)
    }
}