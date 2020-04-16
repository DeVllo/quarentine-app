const express = require('express');
const morgan = require('morgan');
const app = express();
const exphbs =  require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');

const { database } = require('./keys');
//initalizations

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

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(flash());



//Global variables

app.use((req,res,next) => {
    app.locals.successAdded = req.flash('success');
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
})