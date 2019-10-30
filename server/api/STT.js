const apiRequest = require('./apiRequest');
const isBase64 = require('is-base64');
//const Lame = require("node-lame").Lame;
const fs = require("fs");
//const Mp32Wav = require('mp3-to-wav')


/**
 * @param {Object} clientData 클라이언트에서 보낸 데이터
 * @param {String} clientData.audio base64로 인코딩된 음성 데이터 16hz로 샘플링 되야함
 * @returns {text:String} 음성을 인식한 결과
 * @description 음성 인식을 요청해 결과를 내놓는 함수이다.
 */


const apiReq = async ( clientData ) => {
    fs.writeFileSync('./audio/audio_input.mp3', Buffer.from(clientData.audio.replace('data:audio/mp3; codecs=opus;base64,', ''), 'base64'));
    const mp32Wav = new Mp32Wav('./audio/audio_input.mp3')
    mp32Wav.saveForWav(Buffer.from(clientData.audio.replace('data:audio/mp3; codecs=opus;base64,', ''), 'base64'),'./audio/audio_input.wav',_,16000,1)
    //let audiodata = fs.readFileSync('./audio/audio_input.mp3').toString('base64')
    console.log(Buffer(clientData.audio,'base64'))
    
    /*
    const decoder = new Lame({
        "output": "buffer"
    }).setBuffer(clientData.audio);
*/
/*
    const encoder = new Lame({
        output: "./audio/audio_output.mp3",
        bitrate: 128,
        mp3Input: true,
    }).setFile("./audio/audio_input.mp3");
*/
/*
    encoder.encode()
    .then(() => {
    })
    .catch((error) => {
        console.log('error')
        throw new Error ( error.message );
    });
    */
/*
    decoder.decode()
    .then(()=> {
        const buffer = decoder.getBuffer();
        console.log(buffer.toString('base64'))
    })
    .catch((error) => {
        console.log('error')
        throw new Error ( error.message );
    });
    */


    let getSTT = {};
    try {
        getSTT = await apiRequest.ETRI( "WiseASR/Recognition", { "language_code" : "korean", "audio" : audiodata } );
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
        clientData = req.body.data
        if( !clientData.audio.length ) {
            throw new Error( "client audio empty" );
        }
        else if( !isBase64( clientData.audio ) ) {
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