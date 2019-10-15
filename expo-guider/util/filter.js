const specificURL = [ 'naver.com', 'google.com', 'namu.wiki', 'facebook.com', 'ko.wikipedia.org','youtube.com' ];

filter = (JSONdata) => {
    JSONdata.return_data.searchResults.sort( ( a, b ) => {
        return a.confidence > b.confidence ? -1 : a.confidence < b.confidence ? 1 : 0;  
    })
    slicedata = Object.keys( JSONdata.return_data.searchResults ).slice( 0, 10 ).reduce( (result, key ) => {
        result[ key ] = JSONdata.return_data.searchResults[ key ]
        return result
    }, {} );

    let tempResult = Object.values( slicedata );
    tempResult.forEach( ( data ) => {
        if( data.title.length > 14 ) {
            data.title = data.title.slice( 0, 15 ) + "..";
        }
        if( data.passage.length > 125 ) {
            data.passage = data.passage.slice( 0, 125 ) + "..";
        }
        specificURL.forEach( ( url ) => {
            if( data.url.indexOf( url ) !== -1 ) {
                data.site = url;
            }
        });
        if( !data.site ) {
            data.site = "etc";
        }
    });
    return ( {...JSONdata, return_data: { ...JSONdata.return_data, searchResults: tempResult } } );
}
module.exports = filter 