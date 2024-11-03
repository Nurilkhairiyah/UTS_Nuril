// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Setting EJS
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const crudRoutes = require('./routes/crud');

app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', crudRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
