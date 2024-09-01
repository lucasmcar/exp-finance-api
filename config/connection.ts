import mysql, { Connection } from 'mysql2';
import config from './database';

// Criação da conexão com o MySQL
const con: Connection = mysql.createConnection(config);

export default con;