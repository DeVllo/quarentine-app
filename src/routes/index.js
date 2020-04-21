const express = require('express');
const router = express.Router();
const pool = require('../database');
const { apiKey } = require('../keys');
router.get('/', (req, res) => {
    res.render('index');
})

router.get('/api/checkusername/:pass/:username', async (req, res) => {
    const { pass, username } = req.params;
    if(pass == apiKey.secretToken && username != null){
        var data = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
        if(data[0]){
            var result = {existe: true, username:username}
        }else{
            var result = {existe: false, username:username}
        }
        res.send(result);
    }
    else{
        res.status(500);
        console.log("Quisieron entrar a la api sin pass bro q hacemos?");
    }
});

module.exports = router;