const express = require('express');
const router = express.Router();

const pool = require('../database');
const moment = require('moment');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) =>{
    res.render('tasks/add');
    //res.send('Hello friend, tasks app is comming soon');
})

router.post('/add',isLoggedIn, async (req, res) =>{
    const { title, description } = req.body;
    const newTask = {
        title,
        description,
        user_id: req.user.id
    }
    console.log(newTask);
    //pool.query('INSERT INTO tasks set ?',[newTask]);
    await pool.query('INSERT INTO tasks SET ?', [newTask]);
    req.flash('success', '¡Nota agregada correctamente!');
    res.redirect('/tasks');
});

router.get('/', isLoggedIn, async (req, res) => {
   var data = await pool.query("SELECT * FROM  tasks WHERE user_id = ?", [req.user.id]);
   console.log(data);
   //console.log(req);
   res.render('tasks/list', { data }); 
    
});

router.get('/delete/:id', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE ID = ?', [id]);
    req.flash('success', '¡Tarea eliminada de forma exitosa!');
    res.redirect('/tasks');
})

router.get('/edit/:id',isLoggedIn, async (req, res)=>{
    const { id } = req.params;

    const tasks = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    
    res.render('tasks/edit', {tasks: tasks[0]})
});

router.post('/edit/:id',isLoggedIn, async (req, res)=>{
    var a = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    const { id } = req.params;
    const { title, description } = req.body;
    const ediTask = {
        title, 
        description,
        edited_last : a,
        edited: '1'
    };
    await pool.query( 'UPDATE tasks set ? WHERE id = ?', [ediTask, id]);
    req.flash('success', '¡Tarea actualizada!');
    res.redirect('/tasks');
});
module.exports = router;