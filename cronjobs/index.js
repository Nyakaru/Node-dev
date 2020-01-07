const express = require('express');
const cron = require('node-cron');
let shell = require('shelljs');
let nodemailer = require('nodemailer');

app = express();

// mail transporter
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "kinaramatincs@gmail.com",
        pass: "password"
    }
});

// sending emails periodically
cron.schedule("* * * * Thursday" , function(){
    console.log("------------->>>>>>>");
    console.log("running cron job");

    let mailOptions = {
        from: "kinaramatincs@gmail.com",
        to: "sample@gmail.com",
        subject: "updates",
        text: "receive updates"
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            throw error;
        } else{
            console.log("mail sent successfully")
        }
    });
});

// schedule tasks on server
cron.schedule("* * 3 * *", function() {
    console.log("------------->>>>>>>");
    console.log("running cron job");

    if (shell.exec("sqlite3 database.sqlite  .dump > data_dump.sql").code !== 0) {
        shell.exit(1);
      }
      else{
        shell.echo("Database backup complete");
      }
    });
    app.listen(4136);

//   * * * * * *
//   | | | | | |
//   | | | | | day of week
//   | | | | month
//   | | | day of month
//   | | hour
//   | minute
//   second ( optional )
