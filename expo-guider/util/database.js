import { SQLite } from 'expo';

const db = SQLite.openDatabase('score.db');
//id score
//01234

export default class Database extends React.Component {

componentDidMount = () => {
    db.transaction( tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS users (SCORE INTEGER);'
        );
    });
} 
}
