require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cors = require("cors");
const route  = require("./routes/routes.js")


// middlewares
app.use(express.json());
app.use(cors());

// database connection
const url = "mongodb://nitinsayshe:Mantesh007@ac-3s9rokv-shard-00-00.ti1iqt8.mongodb.net:27017,ac-3s9rokv-shard-00-01.ti1iqt8.mongodb.net:27017,ac-3s9rokv-shard-00-02.ti1iqt8.mongodb.net:27017/?ssl=true&replicaSet=atlas-olcurh-shard-0&authSource=admin&retryWrites=true&w=majority"
mongoose.connect(url, { useNewUrlParser: true })
    .then(() => console.log("Mongodb is connected "))
    .catch((err) => console.log(err))

// routes
app.use("/",route)

const port = 5000
app.listen(port, console.log(`Listening on port ${port}...`));