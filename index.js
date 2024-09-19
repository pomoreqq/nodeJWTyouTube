import express, {json} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import {dirname,join} from 'path'
import { fileURLToPath } from 'url'
import usersRouter from './routes/usersRoutes.js'
import authRouter from './routes/authRouter.js'

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url))

console.log(__dirname)
const app = express();
const PORT = process.env.PORT || 4000

const corsOptions =  {
    credentials: true,
    origin: process.env.URL || '*'
}

app.use(cors(corsOptions))

app.use(json())
app.use(cookieParser())

app.use('/',express.static(join(__dirname,'public')))

app.use('/users',usersRouter)

app.use('/auth',authRouter)


app.listen(PORT,() => {
    console.log('App is running at: ' + PORT)
})