const axios = require('axios')

keywordSend = (keywordData) => {
    console.log('keywordSend')
    let datajson = {
        'data': {
            'text': keywordData
        }
    }
    axios.post('http://localhost:3000/api/cliConnection',{
        method: 'POST',
        body: JSON.stringify(datajson),
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
    

}

module.exports = keywordSend;  