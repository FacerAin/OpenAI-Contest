const apiRequest = require('./apiRequest');
const isBase64 = require('is-base64');

/**
 * @param {Object} clientData 클라이언트에서 보낸 데이터
 * @param {String} clientData.audio base64로 인코딩된 음성 데이터 16hz로 샘플링 되야함
 * @returns {text:String} 음성을 인식한 결과
 * @description 음성 인식을 요청해 결과를 내놓는 함수이다.
 */
const apiReq = async ( clientData ) => {
    let getSTT = {};
    try {
        getSTT = await apiRequest.ETRI( "WiseASR/Recognition", { "language_code" : "korean", "audio" : clientData.audio } );
    }
    catch ( err ) {
        throw new Error ( err.message );
    }

    return { "text" : getSTT.return_object.recognized };
}

/**
 * @param req request
 * @param req.bdoy.data req.body.data.audio에 요청하는 데이터가 들어있어야한다
 * @description 오디로를 텍스트로 바꿔준다. 
 */
const STT = async ( req, res ) => { 
    let clientData,
        voiceTemp;

    try {
        clientData = JSON.parse( req.body.data )
        if( !clientData.audio.length ) {
            throw new Error( "client audio empty" );
        }
        else if( isBase64( clientData.audio ) ) {
            throw new Error( "Type error : audio type should be base64" );
        }
    }
    catch( err ) {
        console.log( err );
        res.json( { "return_code" : -1, "error_code" : err.message } );
        res.status( 403 );
        return false;
    }
    
    try {
        voiceTemp = await apiReq( clientData );
    }
    catch( err ) {
        console.log( err );
        res.json( { "return_code" : -1, "error_code" : err.message } );
        res.status( 502 );
        return false;
    }
    
    res.send( { "return_code" : 0, "return_data" : voiceTemp } );
    res.status( 200 );
};

module.exports=STT;