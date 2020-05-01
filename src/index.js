const express = require('express');
const morgan = require('morgan');
const app = express();
const axios = require('axios');
const exphbs =  require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const { database } = require('./keys');
//const validationForm = require('./lib/validationAuth');
//initalizations

require('./lib/passport');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout : 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');


//Middlewares

app.use(session({
    secret: 'testdevlloapp',
    resave: false,
    saveUninitialized: false,
    store: MySQLStore(database)
}))

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//app.use(validationForm({extended:false}));



//Global variables

app.use((req,res,next) => {
    app.locals.successAdded = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})

//Routes

app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/tasks', require('./routes/tasks'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//Starting the server
app.listen(app.get('port'), ()=>{
    console.log("Server on port"+app.get('port'));
});