const apiRequest = require('./apiRequest');

const allowMorpChecklist = [ "NNG","NNP","NNB","VA","MM","MAG","SL","SH","SN","XPN","XSN","XSA","ETM","NOG" ];
const vvMorpChecklist = ["ETM","ETN"]; // 명사형 전성어미(ex) '-(으)ㅁ', '-기'), 관형사형 전성어미(ex) '-ㄴ', '-', '-던', '-ㄹ')

/**
 * @param {{lemma:string, position:number, type:string}[]} word - 한 단어의 형태소 ex) [{걸리},{었},{을}]
 * @param {{lemma:string, position:number, type:string}[][]} needMorp - 공백 단위로 묶어둠 ex) [[{감기}],[{걸리},{었},{을}],[{때}]
 * @param {{lemma:string, position:number, type:string}[][]} noNeedMorp - 공백 단위로 묶어둠 ex) [[{감기}],[{걸리},{었},{을}],[{때}]
 * @description word의 각 형태소의 type이 allowMorpChecklist에 있는지 확인하고 있으면 needMorp, 없으면 noNeedMorp에 추가합니다.
 */
const checkMorp = ( word, needMorp, noNeedMorp ) => {
    let needMorpTemp = [],
    noNeedMorpTemp = [];
    word.forEach( ( morp ) => {
        if( allowMorpChecklist.indexOf( morp.type ) != -1 ) { 
            needMorpTemp.push( morp );
        } else {
            noNeedMorpTemp.push( morp );
        }
    });
    if( noNeedMorpTemp.length > 0) {
        noNeedMorp.push( noNeedMorpTemp );
    }
    if( needMorpTemp.length > 0) {
        needMorp.push( needMorpTemp );
    }
}

/**
 * @param {{lemma:string, position:number, type:string}[][]} tempMorps - 공백 단위로 묶어둠 ex) [[{감기}],[{걸리},{었},{을}],[{때}]]
 * @returns {{needMorp : {}[][], noNeedMorp : {}[][]}} morp를 needMorp와 noNeedMorp로 나눴습니다.
 * @description 공백 단위로 나뉜 morp를 받아 type과 의미에 따라 2가지로 분류합니다.
 */
const divideMorpbyMean = ( tempMorps ) => {
    let needMorp = [],
        noNeedMorp = [];
        
    tempMorps.forEach( ( word, j ) => {
                
        if( word[ 0 ].type == "VV" ||  word[ 0 ].type == "VA" ||  word[ 0 ].type == "MAG") { // 동사, 형용사, 부사
            let checkV = true,
            checkM = true;
            word.find( ( Morp ) => {
                if( Morp.type == "EF" ) { // 종결어미
                    checkV = false; 
                } else if( Morp.type == "EC" ) { // 연결어미
                    if( tempMorps.length > j + 1 ) {
                        tempMorps[ j + 1 ].forEach( ( morp ) => {
                            if( allowMorpChecklist.indexOf( morp.type ) == -1 ) {
                                checkV = false;
                            }
                        });
                    }
                } else if( word[ 0 ].type == "MAG") { 
                    if( Morp.type == "XSV" ) { // 동사파생 접미사
                        check = false; 
                    } 
                }
            });
            if( checkV && checkM) { 
                needMorp.push( word );
            } else { 
                noNeedMorp.push( word ); 
            }
        }
        else {
            checkMorp( word, needMorp, noNeedMorp );
        }
    });
    return [ needMorp, noNeedMorp ];
}

/**
 * @param {String} result - 결과 담던거
 * @param {{text : string, begin : number, end : number }[]} words 단어 분석 결과를 담는 어레이
 * @param {{lemma:string, position:number, type:string, id : number}[][]} needMorp - 공백 단위로 묶어둠 ex) [[{감기}],[{걸리},{었},{을}],[{때}]]
 * @returns {String} 필요한 단어만 남겨둔 문장입니다.
 * @description 필요한 morp와 원문 텍스트를 이용해 문장에서의 키워드를 분석해 문장으로 만들어 줍니다.
 */
const makeKeyword = ( result, words, needMorp ) => {
    let keywordText = "";

    needMorp.forEach( ( morps ) => {
        words.forEach( ( word ) => {
            if( word.begin == morps[ 0 ].id ){
                let tempByte = morps[ morps.length - 1 ].position - morps[0].position + Buffer.byteLength( morps[ morps.length - 1 ].lemma );
                for( let ch of word.text ) {
                    if( tempByte > 0 ) {
                        keywordText += ch;
                        tempByte -= Buffer.byteLength(ch)
                    }
                }
            }
        });
        keywordText += " ";
    });
    result.keywordText = keywordText.trim();
}

/**
 * @param {String} result - 결과 담던거
 * @param {{NE : {}[], Morp : {}[]}} analysisResult 분석 결과가 담겼습니다.
 * @description morp를 처리하는 함수 입니다 ^^
 */
const divideMorp = async ( result, analysisResult ) => {
    let tempResult = {},
        tempMorps = [];
    
    analysisResult.NE.forEach( ( word ) => {
        analysisResult.morp.forEach( ( morp, index ) => {
            if( word.begin <= index && word.end >= index ) {
                morp.type = "NOG";
            }
        });
    });

    analysisResult.word.forEach( ( word ) => {
        tempMorps.push( analysisResult.morp.slice( word.begin, word.end + 1 ) );
    });

    tempResult.originalMorp = analysisResult.morp;
    [ tempResult.needMorp, tempResult.noNeedMorp ] = await divideMorpbyMean( tempMorps );
    await makeKeyword( result, analysisResult.word, tempResult.needMorp );
    result.morps = tempResult;
}

/**
 * @param {Object} clientData - 클라이언트에서 받아온 데이터 
 * @param {String} clientData.text - 분석할 텍스트
 * @returns {Object} 분석 결과 데이터
 * @description 클라이언트 데이터를 받아 의미를 분석하고 맞춤법을 교정해 돌려줍니다.
 */
const textAnalystic = async ( clientData ) => {
    let result = { "originalText" : clientData.text },
        fixedClientData,
        textAnalystic;

    fixedClientData = await apiRequest.Korean( result.originalText );
    try {
        if( !fixedClientData.origin_html.replace( /<\w+[^>]*>(.*?)<\/\w+>/g, '' ).replace( /\s/g, '' ).length ) {
            throw new Error( "wrong keyword" );
        }
    }
    catch( err ) {
        throw new Error( err.message );
    }

    result.korean = fixedClientData;
    result.fixedText = result.korean.notag_html;

    try {
        textAnalystic = await apiRequest.ETRI( "WiseNLU", { "analysis_code" : "ner", "text" : result.fixedText } );
    }
    catch( err ) {
        throw new Error( err.message );
    }

    await divideMorp( result, textAnalystic.return_object.sentence[ 0 ] );
    
    return result;
}

module.exports = textAnalystic;