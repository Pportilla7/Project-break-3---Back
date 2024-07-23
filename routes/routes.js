const express=require('express');
const router=express.Router();
const db = require ('../conexion_bd.js')




router.get('/readEvents', async (req,res)=>{
    try{
        console.log('Estamos dentro de la rute get readEvents');
        const [eventos] = await db.query('SELECT * FROM eventos');
        console.log('Despues de hacer la peticion a la base de datos')
        res.send(eventos);
    }
    catch(error){
        console.log('Error al solicitar eventos a la base de datos', error);
        res.status(500).send('Error al obtener eventos');
    }
})


module.exports={router};