# PopularGithubRepos

## Console App
- Shows basic logic on making a query with the GitHub API
  - Run with `python3 APIrequest.py`


____________________________________________________________________________________
## WebApp
### Search tool to list out an organizations repositories by language & popularity
- `backend.js`: This file contains the server-side code using Express.js to handle requests and serve the API endpoints.
- `frontend/`
  - `index.html`: This file contains the HTML structure of the frontend user interface.
  - `script.js`: This file contains the JavaScript code that handles the dynamic behavior of the frontend.
  - `style.css`: This file contains the CSS styles for the frontend.

### Build web app with node.js (https://nodejs.org/en)
Assuming that you have node.js installed, in /webapp:
- npm init
   - Sample package.json:
```  
{
     "name": "webapp",
     "version": "1.0.0",
     "description": "",
     "main": "backend.js",
     "scripts":{
       "start": "node ./backend.js",
       "test": "echo \"Error: no test specified\" && exit 1"
       },
       "author": "",
       "license": "ISC",
       "dependencies":{
         "axios": "^1.4.0",
         "express": "^4.18.2"
         }
   }
  ```  
     

![Screenshot from 2023-05-28 16-08-55](https://github.com/danielostrow/PopularGithubRepos/assets/101360318/10c8718d-907e-4ec6-9bec-401aff893bbe)
![Screenshot from 2023-05-28 16-10-34](https://github.com/danielostrow/PopularGithubRepos/assets/101360318/35d85991-aba4-4115-bdf8-9b1363e64324)
