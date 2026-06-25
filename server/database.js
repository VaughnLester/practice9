import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: "sql5.freesqldatabase.com",
    user: "sql5820138",
    database: "sql5820138",
    password: "y6ly8SwB53",
    port: "3306",
    connectionLimit: 10,
    queueLimit: 0
})

export {db};