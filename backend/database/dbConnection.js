  import mysql from 'mysql2';

  const conn = {
    dbConnect: false,
  };

  const db = mysql.createConnection({
    // host: 'localhost',
    host: 'dashboard.xclaims.ai',
    user: 'root',
    password: 'ubuntu2023X',
    database: 'userlogin',
  });


  export async function dbConnect() {
    if (conn.dbConnect) return;
    else
    db.connect((err) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err);
        // conn.dbConnect = false;
      } else {
        // conn.dbConnect = true;
        console.log('Conexión a MySQL establecida');
      }
    });
  }

  db.on('end', () => {
    console.log('MySQL connection is closed');
    db.destroy();
  });

  db.on('error', err => {
    console.log(`Error on connection: ${err.message}`);
    // stop doing stuff with conn
    db.destroy();
  });

  export default db;

