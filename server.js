// Require necessary NPM packages
const express = require("express");
const mongoose = require("mongoose");
// Require Routes Files
const indexRouter = require("./app/routers/index");
const articlesRouter = require("./app/routers/articles");
//  REQUIRE DB CONFIGURATION FIEL
const db = require('./config/db');
//EStablish DB Connection 
mongoose.connect(db, {useNewUrlParser: true});
mongoose.connection.once('open', () =>{
    console.log('Connected to Mongo');
})
// Instantiate Express Application Object
const app = express();
// Define PORT for the API to run on
const port = process.env.PORT || 5000;
/*** Routes ***/
// Mount imported Routes
app.use(indexRouter);
app.use(articlesRouter);
// Start the server to listen for requests on given port
app.listen(port, () => {
  console.log(`blogy is listening on port ${port}`);
});