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
    let query = `INSERT INTO todo (task, due_date, category, status) VALUES ('${task.task}', '${task.due_date}', '${task.category}', 'pending')`;
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

//user needs to be able to delete tasks