require('dotenv').config()
const session = require('express-session')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const MongoDBStore = require('connect-mongodb-session')(session) // add this package to store the user session id automatically on mongodb
// check on your db, you will have another collection (next to people) which is 'mySessions'
const loginRouter = require('./routes/loginRoutes')
const donationsRouter = require('./routes/donationsRoutes')
const bodyParser = require('body-parser');

const app = express()
const MAX_AGE = 1000 * 60 * 60 * 3 // 3hrs
const port = process.env.PORT || 5001

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, // Allow cookies
}
// This is where your API is making its initial connection to the database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://127.0.0.1:27017/', {
  useNewUrlParser: true,
})

// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
  uri: 'mongodb://127.0.0.1:27017/',
  collection: 'mySessions',
})
const jsonParser = bodyParser.json({limit:1024*1024*10, type:'application/json'}); 
const urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*10,type:'application/x-www-form-urlencoded' });

app.use(jsonParser);
app.use(urlencodedParser);

app.use(
  session({
    secret: 'a1s2d3f4g5h6',
    name: 'session-id',
    store: mongoDBstore,
    cookie: {
      maxAge: MAX_AGE,
      httpOnly: true,
      sameSite: 'none',
      secure: false,
    },
    resave: false,
    saveUninitialized: false, // Temporarily set to true for debugging
  })
);

app.use(cors(corsOptions))
app.use(express.json())

// ROUTERS
app.use('/api', loginRouter)
app.use('/api', donationsRouter)

// START SERVER
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

module.exports = app
