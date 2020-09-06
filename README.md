# EHealth

How to run locally using the code base
1.The system is based on node.js thus the machine must have node.js installed
2. Open the code in a suitable IDE, we used and recommended web storm.
3.Run npm install to install all the dependencies for our project.
4. Then simply run the command node app.js in the terminal, this will start the server
5.You can access the front end by opening your browser and http://localhost:3000/

How to use Ehealth system
System start up with login page
User allow to sign up or enter correct username or password login system
Wrong password will deny by system by refresh page
System show sign up page if user want to create new account
User sign up with incorrect detail such as duplicate username will reject by system by refresh page
System will show login page again once user successful sign up new account
System start to load page depend on user account’s role after user login
System load user’s personal detail on the side bar from database
System calculate and show user’s latest health data on top of the page
User click on ‘Update Profile’ to bring up a dialog which allow user to enter the new profile
System update user’s profile in the database after user click to save their new profile
System bring up all user’s health data into a table if user login as patient
User click on ‘Enter Data’ to bring up a dialog which allow user to enter new health data
System add new health data of patient into database after user click to save
User click on ‘Connect Fitbit’ to get and save Fitbit data into system
System refresh the page after Fitbit data has successful add to the database.
System show list of patients that belong to this GP account in a table when user login as GP
User click on the row to see a patient’s detail
System load a page that contain this patient’s detail and health data
User click on ‘Home’ button to go back to the GP page
User click on ‘Sign out’ to log out system
System will show login page again when user log out.
Ehealth System structure 
Our Ehealth system is a website base application which includes two parts, front end and back end (server side). 

Front End
The front end of our system is built using the ejs engine as this allows us to run javascript code with the html components. We have different ejs pages for different functionality.  GP and Patient have a different page , which renders on login by the user by getting the role stored in the account table. We have also added Jquery scripts in the ejs files to handle different logic such as clicking , selecting and dragging different components. This allows us to capture the data before sending the correct data to the server.
Server
For our server side code we use the package express with node to create and run our server. We have defined routes depending on the user's action. Each route handles different  functions and logic.  Express can identify the route that has been accessed and then allows us to carry out different logic.  Express provides us with two parameters. The req params contains all the information from the frontend that the user has entered or has access to. The res parameters allow us to send back a message to the front end. This can be a message to render a new page or success message.
Routes
We have 3 different types of routes that can be accessed by the user.
Get routes are used to retrieve data from the database and display the results in the front end for the user. 
Some examples of the get routes:
/signup     :This will render the sign up page
/login       :This will render the login page
/singlePateint/:id/:gpId    :This will open up a page that will display the patient information by using their account id thus the gp can access different patients.
Post routes are used to send information from the frontend to the backend.  
/register  :This send the sign up form information to the server thus we can add it to the database
/addMeasurement :This send the new measurement information to the server
Put route to update information that has already been added
/update/:id :this will update a specific table belonging to a specific user


Database
The database we used is mariadb, which is based on mysql. The database is hosted on AWS RD server.  We access the database using predefined procedures in the database-driver class. Our system has managed to set connection and make function to call database procedure in ‘database-driver’ class file. And also, the system has an extra class file called ‘routes’ to handle front end requests so any request of get or modify database will be sent to this class. Then ‘routes’ will handle the request and call function on the ‘database-drive’ to communicate with the database. This design will avoid direct communication between front end and database in order to reduce some operation error of database and keep database more secure. 

Links: 
https://expressjs.com/
https://ejs.co/
https://nodejs.org/en/
https://getbootstrap.com/
https://jquery.com/
https://dev.fitbit.com/
