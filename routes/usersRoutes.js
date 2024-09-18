import express from 'express';
import pool from '../database.js';
import bcrypt from 'bcrypt';


const router = express.Router()

router.get('/', async (req,res) => {
    try {
        const getUsers = await pool.query(`SELECT * from users`)
        res.json({getUsers: getUsers.rows})
    } catch (e) {
       
        res.status(500).json({
            error: e.message
        })
    }
})



router.post('/', async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.user_password,10);
        const newUser = await pool.query(`INSERT INTO users (user_name,user_email,user_password) 
            VALUES ($1,$2,$3) RETURNING *`,[req.body.user_name, req.body.user_email, hashedPassword])
        res.json({users: newUser.rows})
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

export default router