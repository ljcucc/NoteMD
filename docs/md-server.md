# MD Server spec

NoteMD will request for these:

* setValue: POST: `/api/set`:
* getValue: POST: `/api/get`
* isExists: POST: `/api/is_exists`
* removeValue: POST: `/api/remove`

body struct:
  * `key`: string
  * `value`: string (optional)
