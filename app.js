const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoute');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');



// database connection
const url = 'mongodb+srv://haisamismail71:haisam_71@learn-mongo-db.uumxoe2.mongodb.net/Therd_App';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }).then(()=> {
    console.log("mongodb servar started")
});
// database connection
// const dbURI = 'mongodb+srv://haisamismail71:haisam_71@learn-mongo-db.uumxoe2.mongodb.net/Therd_App'
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  // .then((result) => app.listen(3003))
  // .catch((err) => console.log(err));



//init connct
const app = express();


// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


// view engine
app.set('view engine', 'ejs');


// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth,(req, res) => res.render('smoothies'));
app.use(authRoutes);


app.listen( process.env.PORT ||3003, ()=> {
  console.log("listing on port 3003")
});