const assistance = [ 
    ["완벽해요!","키워드가 완벽해요!","맞춤법을 신경써주세요.","세종대왕님이 울고 계십니다."],
    ["맞춤법이 완벽해요!","훌륭하지만 맞춤법과 키워드 둘 다 완벽하지는 않네요.","맞춤법이 부족하지만 키워드를 잘 찾으시네요.","세종대왕님이 울고 계십니다."],
    ["키워드를 신경써주세요.","키워드가 부족하지만 맞춤법을 잘 맞추시네요.","키워드와 맞춤법 둘 다 부족하시네요.","둘 다 부족하지만 키워드가 조금 더 낫네요."],
    ["키워드 점수가 많이 부족하십니다.","키워드 점수가 많이 부족하십니다.","둘 다 부족하지만 맞춤법이 조금 더 낫네요.","개선이 많이 필요해 보입니다."]
]

const getComment = ( fixScore, keywordScore ) => {
    let fixPos, morpPos;
    if( fixScore == 30 ) {
        fixPos = 0;
    } else if( fixScore >= 25 && fixScore < 30 ) {
        fixPos = 1;
    } else if( fixScore >= 15 && fixScore < 25 ) {
        fixPos = 2;
    } else {
        fixPos = 3;
    }

    if( keywordScore == 70 ) {
        morpPos = 0;
    } else if( keywordScore >= 55 && keywordScore < 69 ) {
        morpPos = 1;
    } else if( keywordScore >= 30 && keywordScore < 54 ){
        morpPos = 2;
    } else {
        morpPos = 3;
    }
    return assistance[morpPos][fixPos];
}

export default scoring = ( return_data ) => {
    if(return_data.originalText){
        let Text = return_data.originalText,
        lenNeed = return_data.morps.needMorp.length,
        lenNoNeed = return_data.morps.noNeedMorp.length,
        fixedText;
    try {
        fixedText = /span class=\'result_underline\'>(.*?)<\/span>/g.exec(return_data.korean.origin_html)[1]; 
    }
    catch ( err ) {
        fixedText = "";
    }

    let fixScore = Math.round( ( ( Text.length - fixedText.length ) / Text.length ) * 30 ), 
        keywordScore = Math.round( lenNeed / ( lenNoNeed + lenNeed ) * 70 ),
        fullScore = fixScore + keywordScore;

    let comment = getComment(fixScore,keywordScore);

    return { "fix" : fixScore, "key" : keywordScore, "full" : fullScore, "msg" : comment};
    }
    else {
        return { "fix" : 0, "key" : 0, "full" : 0, "msg" : ''} ;
    }
}
    