const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) =>{
    res.render('tasks/add');
    //res.send('Hello friend, tasks app is comming soon');
})

router.post('/add', async (req, res) =>{
    const { title, description } = req.body;
    const newTask = {
        title,
        description
    }
    console.log(newTask);
    //pool.query('INSERT INTO tasks set ?',[newTask]);
    await pool.query('INSERT INTO tasks SET ?', [newTask]);
    req.flash('success', '¡Nota agregada correctamente!');
    res.redirect('/tasks');
});

router.get('/', async (req, res) => {
   var data = await pool.query("SELECT * FROM  tasks");
   console.log(data);
   //console.log(req);
   res.render('tasks/list', { data }); 
    
});

router.get('/delete/:id', async (req, res)=>{
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE ID = ?', [id]);
    req.flash('success', '¡Tarea eliminada de forma exitosa!');
    res.redirect('/tasks');
})

router.get('/edit/:id', async (req, res)=>{
    const { id } = req.params;

    const tasks = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    
    res.render('tasks/edit', {tasks: tasks[0]})
})

router.post('/edit/:id', async (req, res)=>{
    const { id } = req.params;
    const { title, description } = req.body;
    const ediTask = {
        title, 
        description
    };
    await pool.query( 'UPDATE tasks set ? WHERE id = ?', [ediTask, id]);
    req.flash('success', '¡Tarea actualizada!');
    res.redirect('/tasks');
})
module.exports = router;