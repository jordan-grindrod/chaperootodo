const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'password',
    database: 'chaperootodo'
});
const express = require('express');
const app = express();
const port = 3000;


//let taskValue = user input task value
//let dueDateValue = user input due date value (if there is one)
//let categoryValue = user input category value (if there is one)
//let statusValue = needs to default to pending, and change to complete once the task is completed


app.get("/", (req, res) =>{
    res.send("Test Connection Succesful");
})

app.listen(port, () => {
    console.log(`Server Listening on Port: ${port}`);
})

function checkConnection(){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to Database 'chaperootodo'!");
    });
}

function insertRecord(){
    let sqlQuery = "INSERT INTO todo (task, status) VALUES ('Play Football','pending')" //need to change this to accept variables!
    
    con.query(sqlQuery, function(err) {
        if (err) throw err;
        console.log("1 record inserted");
    });
}

function selectAll(){
    con.query("SELECT * FROM todo", function(err, result) {
        if (err) throw err;
        console.log(result);
    });
}

//logic here for what user wants to do - add record, update record, delete record, retrieve record
//once choice is made, functions need building to accomodate user request

/*  checkConnection();
insertRecord();
selectAll();   */
