const textAnalytic=require('./textAnalystic');
const search=require('./search');
const machineRead = require('./machineRead');

/** 
 * @param req - request
 * @param req.body.data - client에서 보내는 데이터 req.body.data.text에 검색할 문장을 담아야 합니다
 * @description client와 데이터를 받아 통신하는 함수입니다
*/
const cliConnection = async ( req, res ) => { 
    let clientData = {},
        analyzeData = {},
        searchData = [];

    try {
        clientData = JSON.parse( req.body.data );
        if( !clientData.text.replace( /\s/g, '' ).length ) {
            throw new Error( "client text empty" );
        }
    }
    catch ( err ) {
        console.log( err );
        res.json( { "return_code" : -1, "error_code" : err.message } );
        res.status( 403 );
        return false;
    }

    try {
        analyzeData = await textAnalytic( clientData );
    }
    catch ( err ) {
        console.log( err );
        res.json( { "return_code" : -1, "error_code" : err.message } );
        res.status( 502 );
        return false;
    }
    
    try {
        searchData = await Promise.all( [ search.naver( analyzeData.keywordText ), search.google( analyzeData.keywordText ) ] );
    }
    catch ( err ) {
        console.log( err );
        res.json( { "return_code" : -1, "error_code" : err.message } );
        res.status( 503 );
        return false;
    }
    searchData = searchData[ 0 ].concat( searchData[ 1 ] );

    try {
        searchData = await machineRead( searchData, analyzeData.keywordText );
    }
    catch ( err ) {
        console.log( err );
        res.json( { "return_code" : -1, "error_code" : err.message } );
        res.status( 502 );
        return false;
    }
    analyzeData.searchResults = searchData;

    res.send( { "return_code" : 0, "return_data" : analyzeData } );
    res.status( 200 );
};  

module.exports = cliConnection;