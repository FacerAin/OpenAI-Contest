import { SQLite} from "expo-sqlite";
import { Modal } from 'react-native';


let dbMake = {};

let districts;

// district 테이블을 새로 생성한다.
dbMake._createTable = (tx) => {
  tx.executeSql(`CREATE TABLE IF NOT EXISTS district (
    id int auto_increment,
    score int,
    primary key(id),    
  )`)
  .then(() => {
    console.log('sqlite CREATE TABLE done');
  })
  .catch((error) => {
    console.log('sqlite CREATE TABLE error: ', error);
  });
}

dbMake._insertScore = (tx) => {
  districts.forEach((score, index, array) => {
    tx.executeSql(`INSERT INTO district (score) VALUES ("${score}")`)
    .catch((error) => {
      console.log('sqlite INSERT INTO error: ', error);
    });
  });
}

dbMake.updateScoreList = async (tx) => {

  // SQLite db를 연다.
  await SQLite.openDatabase(
    {
      name: 'cliScore.db',
      createFromLocation: 1,
    },
    (DB) => {
      console.log('success opening fineDustLocalDB')

      // 새로운 district 테이블 생성
      DB.transaction(this._createTable)
      .then(() => {
        console.log('create table transaction done');
      })
      .catch((error) => {
        console.log('create table transaction fail: ', error);
      });

      // 새로 들어온 score 데이터 입력
      DB.transaction(this._insertScore)
      .then(() => {
        console.log('insert row transaction done');
      })
      .catch((error) => {
        console.log('insert row transaction fail: ', error);
      });
    },
    error => {
      console.error(error);
    }
  );
}

module.exports = dbMake;