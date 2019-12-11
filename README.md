# BrainEx-UI
The implementation of the BrainEx User Interface for MQP in Fall of 2019

This project aims to develop a user-interface for BrainEx using HCI practices to enable fNIRS researchers to explore and analyze large datasets. The target users were identified through interviews with lab staff and developing user personas. Through iterative design, prototypes of increasing complexity and detail were designed, evaluated, and refined to satisfy user needs while fulfilling system requirements. The final user-interface developed from these design specifications and initial implementation will reflect all user feedback while accomplishing the tool’s main goal.

# Tutorial

1. Clone or download the project 
2. Open the project in the Pycharm IDE
3. Open the terminal and run the command: npm install to install all the project modules and dependencies
   * To run the application in Pycharm, open two terminals. One for running the frontend and one for running the backend. Make sure you are in the “brainex” folder (the command is: cd brainex)
     * Starting frontend command: npm start
       * After running the frontend, the message in the terminal will say “Compiled successfully. Server is now running on localhost:3000”
     * Starting backend command: node server.js
       * After running the backend, the message in the terminal will say “App is running on port 8000”
4. Once the application automatically opens up on the website (“localhost:3000”), you will see the homepage of BrainEx
5. To upload an already preprocessed dataset, click on “Choose File” and select multiple CSV files. You can also choose a single CSV file. Note that if you try to choose any other file type, it will not work and you will encounter an error. 
   * You will see that the “No file chosen” will change to the name of the file you chose
6. After choosing the file, click on “Add”
7. Once you do this, go to the project directory and under the folder named “PreprocessedDataFiles”, you will see that the files that you chose from your local directory will be added to the server of the website
8. To start preprocessing a new dataset, click on the button named “Preprocess a new dataset”
9. You can then click on the navigation buttons in the rest of the screens labeled as “back”, “next”, etc to get from one screen to another


# Project Directory
* BrainEx-V1 
  * The “test_db” folder is the database for BrainEx
  * “ItalyPower.csv” contains an example of the fNIRS time series sequences 
  * “Test.py” is the file to run through BrainEx as the command line tool. Use this script to copy and paste sections of the code into the python console and go through the database functionalities

  * brainex - folder where all the frontend code is stored and the directory to be in in order to run the BrainEx application
    * “Node_modules” are the node modules and project dependencies that are used by the project. This is added by typing the command: npm install in the terminal
    * “PreprocessedDataFiles” is the folder that contains all the user file uploads from the homepage
    * The “public” folder contains index.html. Index.html links to index.js (and it’s stylesheet called index.css) which is linked to App.js
    * “Server.js” contains the express server code and the logic to do the file uploading functionality
    * “Src” is the main folder with all the ReactJs code
      * App.js is the main file of the application that executes the homepage as well as all the routers and navigation pages in the site. App.css is this file’s stylesheet
      * The BrainEx image logo is located here
      * The “components” folder has the rendering of all the other pages in the application. If a new page needs to be created, create and name the page in this folder, go to App.js, and create a Router link to the page you are creating. 
