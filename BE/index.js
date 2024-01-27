let express = require("express")
let db = require("./models")
let cors = require("cors")
let appRoutes = require('./routes/AppRoutes')

var corsOptions = {
  origin: "http://localhost:8080",
};

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(appRoutes)
require('dotenv').config()

// console.log('process.env.NODE_ENV', process.env.NODE_ENV)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(__dirname + '/dist/'))
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'))
}

// let port = process.env.PORT || 3001;
let port = 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
