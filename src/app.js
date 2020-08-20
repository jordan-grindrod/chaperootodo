const mysql = require('mysql');
const mySqlOpts = {
    host: "chaperoo-db",
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'chaperootodo'
    }   
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`Server Listening on Port: ${port}`);
})

function getConnection(){
    const con = mysql.createConnection(mySqlOpts)
    checkConnection(con)
    return con
}

function checkConnection(con){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to Database 'chaperootodo'!");
    });
}

app.get("/", (req, res) =>{
    const con = getConnection()
    res.send("Chaperoo To Do API");
    con.end()
})

app.post("/task/insertone", (req, res) =>{
    const con = getConnection()
    let task = req.body;
    let query = `INSERT INTO todo (task, status) VALUES ('${task.task}', 'pending')`;
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
    con.end()
})

app.get("/task/gettasks", (req, res) =>{
    const con = getConnection()
    let query = "SELECT * FROM todo";
    con.query(query, function(err, result) {
        if (err){
            console.error(err);
            res.statusCode = 500;
            res.send("Could not obtain data");
        }
        else{
            res.statusCode = 200;
            res.send(result);
        }
    });
    con.end()
})

app.delete("/task/deleteone", (req, res) =>{
    const con = getConnection()
    let task = req.body;
    let query = `DELETE FROM todo WHERE task_id="${task.task_id}"`;
    con.query(query, function (err){
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.send("Could not delete task");
        }
        else {
            res.statusCode = 200;
            res.send("1 record deleted");
        }
    });
    con.end()
})

app.put("/task/status", (req,res) =>{
    const con = getConnection()
    let task = req.body;
    let query = `UPDATE todo SET status="${task.status}" WHERE task_id="${task.task_id}"`;
    con.query(query, function (err){
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.send("Could not update task status");
        }
        else {
            res.statusCode = 200;
            res.send("1 record updated");
        }
    });
    con.end()
})

app.put("/task/edittask", (req,res) =>{
    const con = getConnection()
    let task = req.body;
    let query = `UPDATE todo SET task="${task.task}" WHERE task_id="${task.task_id}"`;
    con.query(query, function (err){
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.send("Could not edit task");
        }
        else {
            res.statusCode = 200;
            res.send("1 record updated");
        }
    });
    con.end()
})
