const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()

const db = mysql.createPool({
    host: 'onlinemeded.cq2jbwjcrfid.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'derek123',
    database: 'Todo'
})

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("hello world");
    // res.send("Hello World");
});

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM todo_app"
    // console.log("SQL Statement = " + sqlSelect);
    db.query(sqlSelect, (err, result) => {
        // console.log("error = " + err);
        // console.log("result = " + result);
        res.send(result);
    });
});

app.get("/api/get/count", (req, res) => {
    const sqlSelect = "SELECT count(*) FROM todo_app"
    // console.log("SQL Statement = " + sqlSelect);
    db.query(sqlSelect, (err, result) => {
        // console.log("error = " + err);
        // console.log("result = " + result);
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {
    const todoName = req.body.todoName;
    const todoDesc = req.body.todoDesc;
    const targDate = req.body.targDate.split('T');
    const targDateFinal = targDate[0];

    const sqlInsert = "INSERT INTO todo_app (name, description, target_date, completion_date) VALUES (?, ?, ?, '')"
    // console.log("SQL Statement = " + sqlInsert);
    db.query(sqlInsert, [todoName,todoDesc,targDateFinal], (err, result) => {
        console.log("error = " + err);
        // console.log("result = " + result);
    });
});

app.put("/api/update", (req, res) => {
    const todoId = req.body.todoId;
    const complete = req.body.complete;
    const compDate = req.body.compDate.split('T');
    const compDateFinal = compDate[0];

    const sqlInsert = "UPDATE todo_app SET completion_date = ?, complete = ? WHERE (id = ?)"
    // console.log("SQL Statement = " + sqlInsert);
    db.query(sqlInsert, [compDateFinal,complete,todoId], (err, result) => {
        console.log("error = " + err);
        // console.log("result = " + result);
    });
});

app.delete("/api/delete", (req, res) => {
    
    const todoId = req.body.todoId;
    console.log("todoId = " + todoId);


    const sqlDelete = "DELETE FROM todo_app WHERE id = ?"
    console.log("SQL Statement = " + sqlDelete);
    db.query(sqlDelete, [todoId], (err, result) => {
        console.log("error = " + err);
        // console.log("result = " + result);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});