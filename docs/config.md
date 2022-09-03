# Config values references

class Config will help you to handle config values, then program will apply those value into application, here's all the defined values you can use.

| Title | Key | Value | Description |
| ------|-----|-------|-------------|
| Storage Strategy | storage-solution | string(local, md-server) | Describe server storage strategy, choosing local will store all data into localStorage, choose md-server will connect to md-server by backup-server-[options] |
| Font size | font-size | int(0~inf) | Describe the font size of editor |
| Font family | font-family | string(sans,mono,serif) | Describe which font collection want to apply |
| Backend server address (optional) | backend-server-address | string | address that connect to md-server |
| Backend server port (optional) | backend-server-port | number | port that connect to md-server |
| Backend server email / account (optional) | backend-server-account | string | the account name to login to backend server |
| Backend server password (optional) | backend-server-password | string |the password or session key to login to backend server |