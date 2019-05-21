const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'password',
    database: 'chaperootodo'
});
const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get("/", (req, res) =>{
    res.send("Test Connection Succesful");
})

app.listen(port, () => {
    console.log(`Server Listening on Port: ${port}`);
})

app.post("/task/insertone", (req, res) =>{
    let task = req.body;
    let query = `INSERT INTO todo (task, due_date, category, status) VALUES ('${task.task}', '${task.due_date}', '${task.category}', '${task.status}')`;
    con.query(query, function(err){
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.send("Could not create task");
        }
        else {
            res.statusCode = 200;
            res.send("1 record inserted");
        }
    });
})


function checkConnection(){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to Database 'chaperootodo'!");
    });
}

function insertRecord(){
    let sqlQuery = "INSERT INTO todo (task, status) VALUES ('Play Football','pending')"; 
    
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

