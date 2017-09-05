# companies

Project contains React client and Node (hapi) server.

- Both projects need to be initialized from package.json by running ```npm install``` in their folders 
  - project root for Node
  - client/ for React
- This creates node_modules folders according to projects' package.json dependencies.
  
Development environment was largely configured based on https://www.fullstackreact.com/articles/using-create-react-app-with-a-server/ so that development 
would be more convenient.
- This is the same as running 
  - ```node server.js``` in project root
  - ```npm start``` in client folder
- Run both Node server and React client in project root with ```npm start```
```
> company-listing@1.0.0 start C:\Users\juckiz\test_projects\companies
> concurrently "npm run server" "npm run client"

[0]
[0] > company-listing@1.0.0 server C:\Users\juckiz\test_projects\companies
[0] > node server.js
[0]
[1]
[1] > company-listing@1.0.0 client C:\Users\juckiz\test_projects\companies
[1] > node start-client.js
[1]
[0] Server running at: http://localhost:3001
[1]
[1] > client@0.1.0 start C:\Users\juckiz\test_projects\companies\client
[1] > react-scripts start
[1]
[1] Starting the development server...
[1]
[1] Compiled successfully!
[1]
[1] You can now view client in the browser.
[1]
[1]   http://localhost:3000/
[1]
[1] Note that the development build is not optimized.
[1] To create a production build, use npm run build.
```

