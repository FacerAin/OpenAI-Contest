import { SQLite} from "expo-sqlite";
const dbMake = require('./dbMake');


let Database = {}

let openDB = async () => {
  let db; 
  // DB를 열고, 전역변수 db에 열린 db 저장
  await SQLite.openDatabase(
    {
      name: 'cliScore.db',
      createFromLocation: 1,
    },
    (DB) => {
      console.log('success opening fineDustLocalDB')
      db = DB;
    },
    (error) => {
      console.error(error);
    }
  );
  return db;
}

Database.writeDB = async (newScore) => {
  dbMake.updateScoreList(newScore);
}

Database.readDB = async () => {
  let data;
  let db = await openDB();
    
  // 검색창에 입력된 글자가 변경되면 SQLite의 SELECT문을 이용해서 LIKE 검색을 통해 유사 주소 리스트 중 10개 노출
  setDistrict = () => {
      // 위에서 open한 db 전역변수에 접근하여 트랜잭션 생성
      db.transaction((tx) => {
        // SQLite에서 실행할 SELECT문 정의
        let selectQuery = `SELECT score FROM district WHERE 1 ORDER BY id DESC LIMIT 5`;

        // SQLite에서 쿼리 실행
        tx.executeSql(selectQuery, [], (tx, results) => {
          const rows = results.rows;
          let scoreList = [];

          for (let i = 0; i < rows.length; i++) {
              scoreList.push({
              ...rows.item(i),
            });
          }
        });
      });
      return scoreList;
  }
}


module.exports = Database;