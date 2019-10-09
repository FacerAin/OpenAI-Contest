const rp = require("request-promise");
const cheerio = require("cheerio");
const Entities = require('html-entities').XmlEntities;
const machineRead = require('./machineRead'); // 테스트용

const entities = new Entities();

const searchURL = {
    "naver" : "https://search.naver.com/search.naver?",
    "google" : "https://www.google.com/search?"
}

/**
 * @param {string} keywordText 검색할 키워드
 * @param {cheerio} $ cheerio임.
 * @param {string} elem 내용을 찾을 html의 selector인거같음
 * @return {boolean} 찾았다면 true
 * @description 주어진 html의 selector에서 keyword의 내용을 찾아 여부를 반환
 */
const keywordChecking = ( keywordText, $, elem ) => {
    let tempCheck = false;
    keywordText.split( ' ' ).forEach( ( Word ) => {
        if( $( elem ).text().indexOf( Word ) != -1 ) {
            tempCheck = true;
        } 
    });

    if( tempCheck ) {
        return true;
    }
    return false;
}

/**
 * @param {Object} searchResult 검색된 내용이 담긴 빈 오브젝트
 * @param {cheerio} $ cheerio임.
 * @param {string} elem 내용을 찾을 html의 selector인거같음
 * @param {string} defaultURL url이 없을 경우 달아주는 비상용 원래 링크
 * @description 구글용 title passage 찾기함수
 */
const google = ( searchResult, $, elem , defaultURL ) => {
    searchResult.passage = entities.decode( $( elem ).parent().parent().parent().text()).trim(),
    searchResult.url = decodeURIComponent( $( elem ).attr( "href" ) );
    searchResult.title = entities.decode( $( elem ).children("div").text() ); // title 캐오기 수정 가능

    if( searchResult.url.indexOf( "/url?q=" ) == 0 ) {
        searchResult.url = searchResult.url.replace( "/url?q=", "" );
    } else if( searchResult.url.indexOf( "/search?" ) == 0 ) {
        searchResult.url = "https://google.com" + searchResult.url;
    } else { 
        searchResult.url = defaultURL;
    }
}

/**
 * @param {object} searchResult 검색된 내용이 담긴 빈 오브젝트
 * @param {cheerio} $ cheerio임.
 * @param {string} elem 내용을 찾을 html의 selector인거같음
 * @param {string} defaultURL url이 없을 경우 달아주는 비상용 원래 링크
 * @description 네이버용 title passage 찾기함수
 */
const naver = ( searchResult, $, elem , defaultURL ) => {
    searchResult.title = $( elem ).parent().attr( "title" );
    searchResult.passage = entities.decode( $( elem ).parent().parent().parent().text()).trim(),
    searchResult.url = $( elem ).parent().attr( "href" ); 
    
    if( searchResult.url == undefined ) {
        searchResult.url = defaultURL;
    }
}

/**
 * @param {{title:string,passage:string,ulr:string}} searchResult 검색 결과가 담긴 object
 * @param {[]} result 최종 결과가 담기는 어레이
 * @param {boolean} keywordCheck 키워드가 확인됐는지 여부
 * @description 타이틀이 없을 경우 달아주거나 중복된 것들 제거하는 등의 역활을 해 최종적으로 결과에 담아주는 함수
 */
const searchToResult = (searchResult, result, keywordCheck) => {
    if( searchResult.title == undefined || !searchResult.title.length ) {
        searchResult.title = searchResult.passage.split(' ').slice( 0, 3 ).toString().replace(/,/g,' ') + "...";
    }

    if( !result.length ) {
         if( keywordCheck ) {
            result.push( searchResult );
        }     
    } else if( keywordCheck ) {
        // 공백 제거하고 비교
        if( result[ result.length - 1 ].passage.replace( /\s/g, '' ) != searchResult.passage.replace( /\s/g, '' ) ) {
            result.push( searchResult );
        }
    }
}

/**
 * @param {string} main 검색할 사이트의 메인 내용이 들어있는 셀렉터를 줘야합니다.
 * @param {string} keywordText 분석할 키워드의 내용
 * @param {string} html html 파싱한 내용
 * @param {string} defaultURL url이 없을 경우 달아주는 비상용 원래 링크
 * @param {()=>{}} findSearchResult search result를 찾아주는 함수 
 * @returns {{url:string,title:string,passage:string}[]} object 여러 개를 가진 list를 준다. 각 json의 url, title, passage로 접근가능
 * @description html을 크롤링한 데이터에서 url title passage를 캐오는 함수이다.
 */
const getHtmlMain = ( main, keywordText, html, defaultURL, findSearchResult ) => {
    const $ = cheerio.load( html );
    let result = [];
    $( main ).each( (i, elem ) => {
        let keywordCheck = keywordChecking( keywordText, $, elem );
        if( keywordCheck ) {
            let searchResult = {};
            findSearchResult( searchResult, $, elem , defaultURL );
            searchToResult( searchResult, result, keywordCheck );     
        }
    });
    return result;
}

const search = {};

/**
 * @param {string} keywordText 검색할 내용
 * @returns {{url:string,title:string,passage:string}[]} object 여러 개를 가진 list를 준다. 각 json의 url, title, passage로 접근가능
 * @description 네이버에서 키워드의 내용을 크롤링해온다.
 */
search.naver = ( keywordText ) => {
    return new Promise( async ( resolve, reject ) => {
        let naverMain = "#main_pack strong",
            result = [],
            naverURL = searchURL.naver + "query=" + encodeURI( keywordText );
        rp( { 
            "uri" : naverURL, 
        } )
        .then( ( html ) => { 
            result = getHtmlMain( naverMain, keywordText, html, naverURL, naver );
            resolve( result );
        })
        .catch( ( err ) => {
            throw new Error( err );
        });       
    })
}

/**
 * @param {string} keywordText 검색할 내용
 * @returns {{url:string,title:string,passage:string}[]} object 여러 개를 가진 list를 준다. 각 json의 url, title, passage로 접근가능
 * @description 구글에서 키워드의 내용을 크롤링해온다.
 */
search.google = ( keywordText ) => {
    return new Promise( ( resolve, reject ) => {
        let googleMain = "#main a", 
            result = [],
            googleURL = searchURL.google + "q=" + encodeURI( keywordText )

        rp( {
            "uri" : googleURL,
        })
        .then( ( html ) => {
            result = getHtmlMain( googleMain, keywordText, html, googleURL, google );
            resolve( result );
        })
        .catch( ( err ) => {
            throw new Error( err );
        });       
    })
}

module.exports = search;