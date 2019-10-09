const apiRequest = require('./apiRequest');

/**
 * @param {{url:string,title:string,passage:string}[]} searchResults 검색 결과 정리한것.
 * @param {string} keywordText 기계독해 시킬 질문의 텍스트
 * @returns {{url:string,title:string,passage:string,confidence:number}[]} searchResults의 각 object에 confidence 속성을 추가해 돌려준다.
 * @description 기계독해를 사용하는 함수
 */
const machineRead = async ( searchResults, keywordText ) => {
    let keyNum =  5,
        ResultArray = [],
        divideSearchResults = [];

    for( let i = 0; i <= searchResults.length; i += keyNum ) {
        divideSearchResults.push( searchResults.slice( i, i + keyNum ) );
    }

    for( let divideSearchResult of divideSearchResults ) {
        await apiRequest.multiETRI( divideSearchResult, keywordText );
        ResultArray = ResultArray.concat( divideSearchResult );
    }
    
    searchResults = ResultArray;
    return searchResults;
}

module.exports = machineRead;
