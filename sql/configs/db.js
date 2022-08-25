const mysql = require("mysql");
  
let db_con  = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: '',
   database: 'wtfdb'
});
  
db_con.connect((err) => {
    if (err) {
      console.log("Database Connection Failed !!!", err);
    } else {
      console.log("connected to Database");
    }
});
  
module.exports = db_con;