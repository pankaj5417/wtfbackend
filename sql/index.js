const express = require("express");
const database = require('./configs/db');
  
const app = express();

app.get("/createDatabase", (req, res) => {
  
    let databaseName = "wtfdb";
  
    let createQuery = `CREATE DATABASE ${databaseName}`;
  
    // use the query to create a Database.
    database.query(createQuery, (err) => {
        if(err) throw err;
  
        console.log("Database Created Successfully !");
  
        let useQuery = `USE ${databaseName}`;
        database.query(useQuery, (error) => {
            if(error) throw error;
  
            console.log("Using Database");
              
            return res.send(
`Created and Using ${databaseName} Database`);
        })
    });
});
  
app.get("/", (req, res) => {
    
  let tableName = 'users';
  
  // Query to create table
  let query = `CREATE TABLE ${tableName} (
    id INT  PRIMARY KEY,uid ALPHANUMERIC(13), first_name VARCHAR(255),last_name VARCHAR(255),email VARCHAR(255),mobile ,password,role,status )`;
  
  database.query(query, (err, rows) => {
      if(err) return res.status(500)
          .send("Table Creation Failed");
  
      return res.send(
`Successfully Created Table - ${tableName}`);
  })
});
  
app.listen(5000, () => {
  console.log(`Server is up and running on 5000 ...`);
});