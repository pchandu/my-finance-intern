const express = require( "express" );
const router = express.Router();
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname));

app.get('/apiKeys', (req, res) => {
    if (process.env.NODE_ENV === 'production') {
        res.send ({
            IEX: process.env.IEX,
            SENTI: process.env.SENTI
        })
    } else {
        res.send("at least this works")
    }
})


app.get("/", (req, res) => {
    // res.send( "Hello From Express" );
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});