/*
 * Copyright 2015-2022 Ritense BV, the Netherlands.
 *
 * Licensed under EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const SMTP_MAIL_PLUGIN_LOGO_BASE64 =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyBpZD0ic3ZnMiIgdmlld0JveD0iMCAwIDQwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMi4wMjgxNjQsIDAsIDAsIDIuMDI4MTY0LCA2Ny44MTA5NTEsIDI4LjAzMzc3NykiIHN0eWxlPSIiPgogICAgPHBhdGggZD0iTSA2Ni4wOTcgMTEuNTI4IEwgOS4xOTcgMTEuNTI4IEMgNC4xMjYgMTEuNTI4IDAgMTUuNjU0IDAgMjAuNzI1IEwgMCA1My40NDcgQyAwIDU4LjUxOCA0LjEyNiA2Mi42NDQgOS4xOTcgNjIuNjQ0IEwgNjYuMDk3IDYyLjY0NCBDIDcxLjE2OCA2Mi42NDQgNzUuMjk0IDU4LjUxOCA3NS4yOTQgNTMuNDQ3IEwgNzUuMjk0IDIwLjcyNiBDIDc1LjI5NSAxNS42NTQgNzEuMTY5IDExLjUyOCA2Ni4wOTcgMTEuNTI4IFogTSA2MS42MDMgMTcuNTI4IEwgMzcuNjQ3IDMyLjk2MiBMIDEzLjY5MSAxNy41MjggTCA2MS42MDMgMTcuNTI4IFogTSA2Ni4wOTcgNTYuNjQ1IEwgOS4xOTcgNTYuNjQ1IEMgNy40MzQgNTYuNjQ1IDYgNTUuMjEgNiA1My40NDggTCA2IDIwLjg5NiBMIDM1Ljc5NiA0MC4wNTYgQyAzNS44MzYgNDAuMDgxIDM1Ljg3OSA0MC4wOTggMzUuOTIgNDAuMTIxIEMgMzUuOTYzIDQwLjE0NSAzNi4wMDcgNDAuMTY4IDM2LjA1MSA0MC4xOSBDIDM2LjI4MiA0MC4zMDkgMzYuNTIgNDAuNDA1IDM2Ljc2MyA0MC40NjggQyAzNi43ODggNDAuNDc1IDM2LjgxMyA0MC40NzggMzYuODM4IDQwLjQ4NCBDIDM3LjEwNSA0MC41NDcgMzcuMzc1IDQwLjU4NiAzNy42NDUgNDAuNTg2IEMgMzcuNjQ2IDQwLjU4NiAzNy42NDcgNDAuNTg2IDM3LjY0NyA0MC41ODYgQyAzNy42NDkgNDAuNTg2IDM3LjY1IDQwLjU4NiAzNy42NTEgNDAuNTg2IEMgMzcuOTIxIDQwLjU4NiAzOC4xOTEgNDAuNTQ4IDM4LjQ1OCA0MC40ODQgQyAzOC40ODMgNDAuNDc4IDM4LjUwOCA0MC40NzUgMzguNTMzIDQwLjQ2OCBDIDM4Ljc3NiA0MC40MDUgMzkuMDEzIDQwLjMwOSAzOS4yNDUgNDAuMTkgQyAzOS4yODkgNDAuMTY4IDM5LjMzMyA0MC4xNDUgMzkuMzc2IDQwLjEyMSBDIDM5LjQxNyA0MC4wOTggMzkuNDYgNDAuMDgxIDM5LjUgNDAuMDU2IEwgNjkuMjk2IDIwLjg5NiBMIDY5LjI5NiA1My40NDcgQyA2OS4yOTUgNTUuMjEgNjcuODYgNTYuNjQ1IDY2LjA5NyA1Ni42NDUgWiIvPgogIDwvZz4KICA8ZyBzdHlsZT0ic3Ryb2tlOiBub25lOyBzdHJva2Utd2lkdGg6IDA7IHN0cm9rZS1kYXNoYXJyYXk6IG5vbmU7IHN0cm9rZS1saW5lY2FwOiBidXR0OyBzdHJva2UtbGluZWpvaW46IG1pdGVyOyBzdHJva2UtbWl0ZXJsaW1pdDogMTA7IGZpbGw6IG5vbmU7IGZpbGwtcnVsZTogbm9uemVybzsgb3BhY2l0eTogMTsiIHRyYW5zZm9ybT0ibWF0cml4KDEuMjE3ODY1LCAwLCAwLCAxLjIxNzg2NSwgMjI0LjIzOTg5OSwgNDcuMDk1OTIxKSI+CiAgICA8cGF0aCBkPSJNIDg5Ljk4MSA2LjIgQyA5MCA2LjA1NyA5MC4wMDEgNS45MTUgODkuOTc5IDUuNzc1IGMgLTAuMDAzIC0wLjAyMSAtMC4wMDEgLTAuMDQxIC0wLjAwNSAtMC4wNjIgYyAtMC4wMzMgLTAuMTYzIC0wLjA5OCAtMC4zMTcgLTAuMTgzIC0wLjQ2MiBjIC0wLjAwOSAtMC4wMTYgLTAuMDEgLTAuMDMzIC0wLjAxOSAtMC4wNDkgYyAtMC4wMTUgLTAuMDI0IC0wLjAzOSAtMC4wMzYgLTAuMDU1IC0wLjA1OSBjIC0wLjAzNCAtMC4wNDggLTAuMDYgLTAuMTAyIC0wLjEwMSAtMC4xNDYgYyAtMC4wNTEgLTAuMDU2IC0wLjExMyAtMC4wOTcgLTAuMTcgLTAuMTQ0IGMgLTAuMDMxIC0wLjAyNSAtMC4wNTggLTAuMDU0IC0wLjA5IC0wLjA3NiBjIC0wLjEzNCAtMC4wOTMgLTAuMjggLTAuMTY0IC0wLjQzNiAtMC4yMDkgYyAtMC4wMjggLTAuMDA4IC0wLjA1NiAtMC4wMDkgLTAuMDg0IC0wLjAxNSBjIC0wLjEzMiAtMC4wMyAtMC4yNjcgLTAuMDQxIC0wLjQwNCAtMC4wMzQgYyAtMC4wNDYgMC4wMDIgLTAuMDg5IDAuMDA2IC0wLjEzNSAwLjAxMiBjIC0wLjAzOSAwLjAwNiAtMC4wNzkgMC4wMDIgLTAuMTE4IDAuMDEgbCAtODcgMTkuNDU2IGMgLTAuNjExIDAuMTM3IC0xLjA3MyAwLjYzOSAtMS4xNTkgMS4yNTkgYyAtMC4wODUgMC42MiAwLjIyNCAxLjIyOSAwLjc3NSAxLjUyNSBsIDIzLjUyMyAxMi42NjEgbCA3LjMyNyAyMy4zNiBjIDAuMDA4IDAuMDI1IDAuMDI1IDAuMDQzIDAuMDM0IDAuMDY3IGMgMC4wMjEgMC4wNTYgMC4wNTIgMC4xMDYgMC4wOCAwLjE2IGMgMC4wNTkgMC4xMTQgMC4xMjcgMC4yMTggMC4yMTEgMC4zMTIgYyAwLjAyMiAwLjAyNSAwLjAzIDAuMDU3IDAuMDU0IDAuMDggYyAwLjAyMiAwLjAyMSAwLjA1IDAuMDI4IDAuMDczIDAuMDQ4IGMgMC4wOTkgMC4wODYgMC4yMDcgMC4xNTUgMC4zMjUgMC4yMTMgYyAwLjA0NyAwLjAyMyAwLjA4OCAwLjA1MyAwLjEzNiAwLjA3IGMgMC4xNjQgMC4wNjEgMC4zMzYgMC4xIDAuNTE3IDAuMSBjIDAuMDExIDAgMC4wMjIgMCAwLjAzMyAwIGMgMC4xNzkgLTAuMDA0IDAuMzQ5IC0wLjA0NCAwLjUwOSAtMC4xMDcgYyAwLjA0MSAtMC4wMTYgMC4wNzUgLTAuMDQ0IDAuMTE0IC0wLjA2MyBjIDAuMTI3IC0wLjA2MyAwLjI0NCAtMC4xMzkgMC4zNDkgLTAuMjM1IGMgMC4wMiAtMC4wMTggMC4wNDYgLTAuMDI0IDAuMDY1IC0wLjA0NCBsIDEyLjAwOSAtMTIuMjA5IGwgMjMuMTggMTIuNDc3IGMgMC4yMjEgMC4xMTkgMC40NjYgMC4xOCAwLjcxMSAwLjE4IGMgMC4xODggMCAwLjM3OCAtMC4wMzUgMC41NTcgLTAuMTA3IGMgMC40MTIgLTAuMTY0IDAuNzMgLTAuNTA0IDAuODY5IC0wLjkyNiBMIDg5LjkzIDYuNDczIGMgMC4wMTQgLTAuMDQ0IDAuMDE1IC0wLjA5IDAuMDI1IC0wLjEzNSBDIDg5Ljk2NiA2LjI5MiA4OS45NzUgNi4yNDcgODkuOTgxIDYuMiB6IE0gNzcuNDM1IDEwLjAxOCBMIDI1LjU4IDM2LjcxNyBMIDUuNzU4IDI2LjA0NyBMIDc3LjQzNSAxMC4wMTggeiBNIDc0LjMyIDE0Ljk5NyBMIDM2LjgxMyA0My43NjggYyAtMC4wMDMgMC4wMDIgLTAuMDA1IDAuMDA2IC0wLjAwNyAwLjAwOCBjIC0wLjExMiAwLjA4NyAtMC4yMDkgMC4xOTQgLTAuMjk0IDAuMzE0IGMgLTAuMDE4IDAuMDI1IC0wLjAzNSAwLjA1IC0wLjA1MSAwLjA3NiBjIC0wLjAxNyAwLjAyOCAtMC4wMzkgMC4wNTIgLTAuMDU1IDAuMDgxIGMgLTAuMDU0IDAuMSAtMC4wOTMgMC4yMDQgLTAuMTIyIDAuMzA5IGMgLTAuMDAxIDAuMDA1IC0wLjAwNSAwLjAwOSAtMC4wMDYgMC4wMTQgTCAzMi45NiA1Ni45NzcgbCAtNS41ODYgLTE3LjgwOSBMIDc0LjMyIDE0Ljk5NyB6IE0gMzUuOTkyIDU3LjI0OSBsIDIuNjkzIC0xMC4wNzIgbCA0LjcxNyAyLjUzOSBMIDM1Ljk5MiA1Ny4yNDkgeiBNIDY5LjE3NyA2MC4xODQgTCA0MC40NzkgNDQuNzM3IGwgNDUuMDkgLTM0LjU4OCBMIDY5LjE3NyA2MC4xODQgeiIgc3R5bGU9InN0cm9rZTogbm9uZTsgc3Ryb2tlLXdpZHRoOiAxOyBzdHJva2UtZGFzaGFycmF5OiBub25lOyBzdHJva2UtbGluZWNhcDogYnV0dDsgc3Ryb2tlLWxpbmVqb2luOiBtaXRlcjsgc3Ryb2tlLW1pdGVybGltaXQ6IDEwOyBmaWxsLXJ1bGU6IG5vbnplcm87IG9wYWNpdHk6IDE7IHBhaW50LW9yZGVyOiBmaWxsOyBmaWxsOiByZ2IoMCwgMTUwLCAyNTUpOyIgdHJhbnNmb3JtPSIgbWF0cml4KDEgMCAwIDEgMCAwKSAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogICAgPHBhdGggZD0iTSAxMi45IDg1LjQ4MiBjIC0wLjM4IDAgLTAuNzYgLTAuMTQ0IC0xLjA1MiAtMC40MzEgYyAtMC41OTEgLTAuNTgxIC0wLjU5OSAtMS41MyAtMC4wMTggLTIuMTIxIGwgMTQuMjkyIC0xNC41MjggYyAwLjU4MSAtMC41OTIgMS41MzEgLTAuNTk4IDIuMTIxIC0wLjAxOCBjIDAuNTkxIDAuNTgxIDAuNTk5IDEuNTMgMC4wMTggMi4xMjEgTCAxMy45NyA4NS4wMzQgQyAxMy42NzYgODUuMzMzIDEzLjI4OCA4NS40ODIgMTIuOSA4NS40ODIgeiIgc3R5bGU9InN0cm9rZTogbm9uZTsgc3Ryb2tlLXdpZHRoOiAxOyBzdHJva2UtZGFzaGFycmF5OiBub25lOyBzdHJva2UtbGluZWNhcDogYnV0dDsgc3Ryb2tlLWxpbmVqb2luOiBtaXRlcjsgc3Ryb2tlLW1pdGVybGltaXQ6IDEwOyBmaWxsLXJ1bGU6IG5vbnplcm87IG9wYWNpdHk6IDE7IHBhaW50LW9yZGVyOiBmaWxsOyBmaWxsOiByZ2IoMCwgMTUwLCAyNTUpOyIgdHJhbnNmb3JtPSIgbWF0cml4KDEgMCAwIDEgMCAwKSAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogICAgPHBhdGggZD0iTSAzNi40MzEgNzkuNTkzIGMgLTAuMzggMCAtMC43NiAtMC4xNDQgLTEuMDUyIC0wLjQzMSBjIC0wLjU5MSAtMC41ODEgLTAuNTk5IC0xLjUzIC0wLjAxOCAtMi4xMjEgbCAxNC4yOTEgLTE0LjUyNyBjIDAuNTgyIC0wLjU5MSAxLjUzMSAtMC41OTggMi4xMjEgLTAuMDE4IGMgMC41OTEgMC41ODEgMC41OTkgMS41MyAwLjAxOCAyLjEyMSBMIDM3LjUwMSA3OS4xNDUgQyAzNy4yMDcgNzkuNDQzIDM2LjgxOSA3OS41OTMgMzYuNDMxIDc5LjU5MyB6IiBzdHlsZT0ic3Ryb2tlOiBub25lOyBzdHJva2Utd2lkdGg6IDE7IHN0cm9rZS1kYXNoYXJyYXk6IG5vbmU7IHN0cm9rZS1saW5lY2FwOiBidXR0OyBzdHJva2UtbGluZWpvaW46IG1pdGVyOyBzdHJva2UtbWl0ZXJsaW1pdDogMTA7IGZpbGwtcnVsZTogbm9uemVybzsgb3BhY2l0eTogMTsgcGFpbnQtb3JkZXI6IGZpbGw7IGZpbGw6IHJnYigwLCAxNTAsIDI1NSk7IiB0cmFuc2Zvcm09IiBtYXRyaXgoMSAwIDAgMSAwIDApICIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICA8cGF0aCBkPSJNIDguNDM1IDY3LjIyOSBjIC0wLjM4IDAgLTAuNzYgLTAuMTQ0IC0xLjA1MiAtMC40MzEgYyAtMC41OTEgLTAuNTgxIC0wLjU5OSAtMS41MyAtMC4wMTggLTIuMTIxIGwgMTAuNDQ1IC0xMC42MTggYyAwLjU4MSAtMC41OTEgMS41MzEgLTAuNTk4IDIuMTIxIC0wLjAxOCBjIDAuNTkxIDAuNTgxIDAuNTk5IDEuNTMgMC4wMTggMi4xMjEgTCA5LjUwNSA2Ni43OCBDIDkuMjExIDY3LjA3OSA4LjgyMyA2Ny4yMjkgOC40MzUgNjcuMjI5IHoiIHN0eWxlPSJzdHJva2U6IG5vbmU7IHN0cm9rZS13aWR0aDogMTsgc3Ryb2tlLWRhc2hhcnJheTogbm9uZTsgc3Ryb2tlLWxpbmVjYXA6IGJ1dHQ7IHN0cm9rZS1saW5lam9pbjogbWl0ZXI7IHN0cm9rZS1taXRlcmxpbWl0OiAxMDsgZmlsbC1ydWxlOiBub256ZXJvOyBvcGFjaXR5OiAxOyBwYWludC1vcmRlcjogZmlsbDsgZmlsbDogcmdiKDAsIDE1MCwgMjU1KTsiIHRyYW5zZm9ybT0iIG1hdHJpeCgxIDAgMCAxIDAgMCkgIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8L2c+Cjwvc3ZnPg==';

export {SMTP_MAIL_PLUGIN_LOGO_BASE64};
