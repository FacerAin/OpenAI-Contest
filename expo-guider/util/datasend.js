const axios = require('axios')

keywordSend = (keywordData) => {
    console.log('keywordSend')
    let datajson = {
        'data': {
            'text': keywordData
        }
    }
    fetch('http://localhost:3000/api/cliConnection',{
        method: 'POST',
        body: JSON.stringify(datajson),
        headers:{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Content-Type': 'application/json',

          }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
    

}

module.exports = keywordSend;