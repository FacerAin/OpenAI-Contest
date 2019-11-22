import * as SQLite from 'expo-sqlite';
import { openDatabase,transaction,executeSql } from 'expo-sqlite';


let sqlite = {};
let db = openDatabase("score.db");
db.transaction( ( tx ) => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS district (id int AUTO_INCREMENT,score int, PRIMARY KEY (id));`);
});

sqlite.insert = ( score ) => {
    db.transaction( ( tx ) => {
        tx.executeSql( `INSERT INTO district (score) VALUES (${score});` );
    });
}


sqlite.select = ( ) => {
    return new Promise( (resolve ,rejects)=>{
        db.transaction( ( tx ) => {
            tx.executeSql( `SELECT score FROM district WHERE 1 ORDER BY id DESC LIMIT 5;`, [], ( tx, result ) => {
                resolve(result.rows._array);
            }, ( err )=>{
                console.log("err -> ",err);
            });
        });
    })
    
}

module.exports = sqlite;