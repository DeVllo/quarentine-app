const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/', (req, res) => {
    res.send('Hola... esta es la api');
});

router.get('/checkusername/:username', async (req, res) => {
    const { username } = req.params;
    var data = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
    if(data){
        res.json({
            'status': true
        });
        console.log("Existe...");
    }else{
        res.json({
            'status': false
        });
        console.log("No existe el username: "+username);
    }
    res.send('Hola...');
});