const rp = require("request-promise");

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
    rp.post(options)
        .then((body) => {
            console.log(body);
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = keywordSend;