import express from 'express';
import pool from '../database.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {jwtTokens} from '../utilis/jwtHelpers.js'



const router = express.Router()
router.post('/login', async (req, res) => {
    try {
        const { user_email, user_password } = req.body;

        
        const isUser = await pool.query(`SELECT * FROM users WHERE user_email = $1`, [user_email]);
        if (isUser.rows.length === 0) {
            return res.status(401).json({ error: 'User doesn\'t exist' });
        }

        
        const isPassword = await bcrypt.compare(user_password, isUser.rows[0].user_password);
        if (!isPassword) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        let tokens = jwtTokens(isUser.rows[0]);
        res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true})
        res.json(tokens)
    } catch (e) {
        console.error(e);
        res.status(401).json({ e: e.message });
    }
});


router.get('/refresh', (req,res) => {
    try {
        const refreshToken = req.cookies.refresh_token
        if (refreshToken === null) return res.status(401).json({e: 'Null refresh token'});

        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET, (error,user) => {
            if (error) return res.status(403).json({error: error.message});

                let tokens = jwtTokens(user);
                res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true})
                res.json(tokens)
        })
        
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
})

router.delete('/refresh', (req, res) => {
    try {
      res.clearCookie('refresh_token');
      return res.status(200).json({message:'Refresh token deleted.'});
    } catch (error) {
      res.status(401).json({error: error.message});
    }
  });
  

export default router