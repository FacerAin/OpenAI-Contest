require('dotenv').config();
const rp = require("request-promise");

const URL = "http://aiopen.etri.re.kr:8000/";
const requestJson = {
	"request_id": "reserved field",
	"access_key": process.env.API_KEY,
	"argument": {
	}
};
            
let apiConnect = {};

apiConnect.apiRequest=async(query,argument)=>{

    return new Promise((resolve,reject)=>{
        let reqJson = requestJson;
        reqJson.argument = argument;

        let option = {
            uri: URL+query,
            body: JSON.stringify(reqJson),
            headers: {'Content-Type':'application/json; charset=UTF-8'}
        }
        rp.post(option)
            .then((body)=>{
                resolve(JSON.parse(body));
            })
            .catch((err)=>{
                console.log("Http Request Error");
                console.log(err.response.body);
            });
    });
}

module.exports = apiConnect;