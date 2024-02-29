  import mysql from 'mysql2';

  const conn = {
    dbConnect: false,
  };

  const db = mysql.createConnection({
    host: 'claims.ai.onlinesolutionsusa.net',
    user: 'root',
    password: 'ubuntu2023X',
    database: 'userlogin',
  });

  export async function dbConnect() {
    if (conn.dbConnect) return;

    db.connect((err) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err);
      } else {
        conn.dbConnect = true;
        console.log('Conexión a MySQL establecida');
      }
    });
  }

  db.on('end', () => {
    console.log('MySQL connection is closed');
  });

  db.on('error', (err) => {
    console.log(err);
  });

  export default db;

