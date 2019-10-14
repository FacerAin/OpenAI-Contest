filter = (JSONdata) => {
    JSONdata.return_data.searchResults.sort(function(a,b){
        return a.confidence > b.confidence ? -1 : a.confidence < b.confidence ? 1 : 0;  
    })
    slicedata = Object.keys(JSONdata.return_data.searchResults).slice(0,10).reduce((result,key) => {
        result[key] = JSONdata.return_data.searchResults[key]
        return result
    },{})
    return ({...JSONdata,
    return_data: {
        ...JSONdata.return_data,
        searchResults:Object.values(slicedata) 
    }})
    
}
module.exports = filter