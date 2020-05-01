const express = require('express');
const router = express.Router();
const pool = require('../database');
const { apiKey } = require('../keys');
const axios = require('axios');

//Obtenemos los países del covid19api.com
var str = 'https://api.covid19api.com/countries';

router.get('/', (req, res) => {
    ////////////////////////
    axios.get(str)
    .then(response => {
        console.log(response);
        var data = response.data;
        let result = data.map(a => a.Country);
        var countries = [];
        for(var i; i < result.length; i++){
            countries.push(result[i]);
        }
        res.render('index', {data})
        //console.log(data)
    })
    .catch(error => {
      console.log(error);
    });
    ///////////////////////
    //res.render('index');
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