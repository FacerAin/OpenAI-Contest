
keywordSend = (keywordData) => {
    let datajson = {
        'data': {
            'text': keywordData
        }
    }
    let options = {
        method: "POST",
        uri: "http://localhost:3000/api/cliConnection",
        body: datajson,
        json: true
    }
    fetch('http://localhost:3000/api/cliConnection',{
        method: 'POST',
        body: JSON.stringify(datajson),
        headers:{
            'Content-Type': 'application/json'
          }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
    

}

module.exports = keywordSend;