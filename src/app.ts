import express from 'express'

const app = express();
const port = 8000;

app.get('/', (req,res) => {
    res.send('Begining of the end');
});

app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    return console.log('We are in business on port 8000');
});
