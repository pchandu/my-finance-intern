const express = require( "express" );

const port = process.env.PORT || 3000;

const logRequest = (req, res, next) => {
  console.log(req);
  next();
}

const app = express();
app.use(logRequest);

app.get("/", (req, res) => {
    res.send( "Hello From Express" );
    app.use(express.static('./index.html'));
});

app.listen(port, () => {
    console.log(`server started on port ${port}`);
});