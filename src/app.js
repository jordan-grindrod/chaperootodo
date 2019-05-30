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
const bodyParser = require('body-parser');
app.use(bodyParser.json());


function checkConnection(){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected to Database 'chaperootodo'!");
    });
}
checkConnection();


app.listen(port, () => {
    console.log(`Server Listening on Port: ${port}`);
})

app.get("/", (req, res) =>{
    res.send("Chaperoo To Do API");
})

app.post("/task/insertone", (req, res) =>{
    let task = req.body;
    // let query = `INSERT INTO todo (task, due_date, category, status) VALUES ('${task.task}', '${task.due_date}', '${task.category}', 'pending')`;
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
})

app.get("/task/gettasks", (req, res) =>{
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
})

app.delete("/task/deleteone", (req, res) =>{
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
})

app.put("/task/status", (req,res) =>{
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
})

app.put("/task/edittask", (req,res) =>{
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
})