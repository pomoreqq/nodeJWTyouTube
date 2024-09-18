import pg from 'pg';

const {Pool} = pg;

let localPoolConfig = {
    user:'pomoreq',
    password: 'Hania135!',
    host:'localhost',
    port: '5432',
    database: 'nodejwt'

}

const poolConfig = process.env.DATABASE_URL ? {
    connectiongString: process.env.DATABASE_URL,
    ssl:{rejectUnauthorized:false}} : localPoolConfig;


    const pool = new Pool(poolConfig)


    export default pool