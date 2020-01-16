const mysql = require("mysql");

const conn = mysql.createConnection({
    host: "localhost",
    user: "sample",
    password: "password"
});

conn.connect(function(error) {
    if (error) throw err;
    console.log("connection successfull");
    conn.query("CREATE DATABASE mydb", function (err, result) {
        if (err) throw err;
        console.log("Database created");
    });
    conn.query(sql, function (err,result) {
        if (err) throw err;
        console.log("Result" + result);
    });
});
