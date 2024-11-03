// routes/crud.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// CRUD untuk Students
router.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) throw err;
        res.render('students', { students: results });
    });
});

// Tambah siswa
router.post('/students', (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO students (name, email) VALUES (?, ?)', [name, email], (err) => {
        if (err) throw err;
        res.redirect('/students');
    });
});

// Edit siswa
router.get('/students/edit/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM students WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.render('student', { student: results[0] });
    });
});

router.post('/students/edit/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    db.query('UPDATE students SET name = ?, email = ? WHERE id = ?', [name, email, id], (err) => {
        if (err) throw err;
        res.redirect('/students');
    });
});

// Hapus siswa
router.get('/students/delete/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM students WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.redirect('/students');
    });
});

// CRUD untuk Instructors dan Courses dapat ditambahkan di sini dengan cara yang sama

module.exports = router;