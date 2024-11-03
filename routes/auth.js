// routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const session = require('express-session');

// Middleware untuk mengecek session
function checkAuth(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.redirect('/login');
    }
}

// Halaman login
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            req.session.user = results[0];
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });
});

// Tambah user baru
router.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, password, role], (err) => {
        if (err) throw err;
        res.redirect('/login');
    });
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) throw err;
        res.redirect('/login');
    });
});

module.exports = router;