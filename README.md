### backend api to register user, login user, get the user detail and get all users.

## Technologies Used :
* Node
* Express
* Mongodb
### Deployed link of heroku

 https://wtfdashboard.herokuapp.com/
 
 To test api use Postman
   ``` 
   user register :  https://wtfdashboard.herokuapp.com/api/userds/register ,body:{user details}
  
   user login:  https://wtfdashboard.herokuapp.com/api/userds/login ,body:{login details}

   userDetail:  https://wtfdashboard.herokuapp.com/api/userds/userDetail ,body:{authorization token}
   
   all Users:  https://wtfdashboard.herokuapp.com/api/userds/allUsers


   ``` 

## Getting Started :

### Prerequisites 
* VS Code

### Installation 
* Clone the repository
    ``` 
  git clone https://github.com/pankaj5417/wtfbackend.git
    ```
To run on local server

### open  terminal for server
 * npm i
 * npm start
 
 To test api on Postman with localhost
 api: http://localhost:8000:api/userds
   ``` 
   user register :  http://localhost:8000:api/userds/api/userds/register
  
   user login:  http://localhost:8000:api/userds/api/userds/login

   userDetail:  http://localhost:8000:api/userds/api/userds/userDetail
   
   all Users:  http://localhost:8000:api/userds/api/userds/allUsers


   ``` 
