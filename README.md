# Flashcard-App

To Get Running:
  - Install MongoDB
  - Run MongoDB Daemon
    - Ex. >'mongod' and press enter
    - Extra: to view data in the database, download MongoDBCompass

  - Open another terminal in the \flashcard-app\server root directory
    - Install the node packages
      - Ex. >'npm i' or 'npm install' and press enter (windows)
      - Ex. >'sudo npm i' or 'sudo npm install' and press enter (mac)
    - Set the JWT Private Key
      - Ex. >'set flashcard-app_jwtPrivateKey=<privateKeyHere>' and press enter (windows)
      - Ex. >'export flashcard-app_jwtPrivateKey=<privateKeyHere>' and press enter (mac)
    - Run tests
      - Ex. >'npm test' or 'npm run test' and press enter (windows)
      - Ex. >'sudo npm test' or 'sudo npm run test' and press enter (mac)
      - Enter >'Ctrl + c' twice to end the running of the tests
    - Run the server
      - Ex. >'npm start' or 'npm run start' and press enter (windows)
      - Ex. >'sudo npm start' or 'sudo npm run start' and press enter (mac)

  - Open another terminal in the \flashcard-app\client root directory
    - Install the node packages
      - Ex. >'npm i' or 'npm install' and press enter (windows)
      - Ex. >'sudo npm i' or 'sudo npm install' and press enter (mac)
    - Run the client
      - Ex. >'npm start' or 'npm run start' and press enter (windows)
      - Ex. >'sudo npm start' or 'sudo npm run start' and press enter (mac)

  - Once the database, the server, and the client is all running, visit port localhost:3000 in a browser and view the application.

MERN stack: MongoDB/Mongoose, Express.js, React.js, Node.js

Business Rules:
  - Allow the user to create decks - referencing user in deck
  - Allow the user to add cards to the decks - embedding of cards in the decks
  - Allow the user to create folders
  - Allow the user to add decks to folders - referencing folder in deck - referencing user in folder
  - Allow the user to add decks to a folder or not have decks in a folder

JWT:
  - Utilizing localStorage to store the authorization token (JWT) for now. I understand that it is not the most secure method, however I will fix it later in development.
