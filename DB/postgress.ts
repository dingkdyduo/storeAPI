import {Sequelize } from 'sequelize'
import dotenv from 'dotenv';
import { config } from '../config/db'
dotenv.config(); 

const env:any =  process.env.NODE_ENV || 'local';
const dbConfig = config[env]

const sequelize = new Sequelize(`postgres://${dbConfig.user}:${dbConfig.password}@dpg-cobfe70l5elc73f6sds0-a.oregon-postgres.render.com/mydb_k8xg?ssl=true`)

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 export default sequelize 
