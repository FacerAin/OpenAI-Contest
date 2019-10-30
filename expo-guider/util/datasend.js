const axios = require('axios')
const filter = require('./filter')
SendToApi = async(searchdata) => {
  console.log(searchdata)
    return new Promise((resolve,reject) => {
      let isBlank_reg = "/\s\g"
      if(searchdata=== "" || searchdata.length > 30 ){
        resolve(JSON.stringify({ "return_code" : -1, "error_code": "검색 단어를 확인해 주세요!" }));
      } else{
        axios(
          {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            url: 'http://1.201.142.118:80/api/cliConnection',
            data: {
              data:{
                text: searchdata.replace(/\s{1,}/g,' ')
              }
            },
            method: "POST",
          }
        )
        .then((response)=>{
          resolve(JSON.stringify(filter(response.data)))
        })
        .catch(error => {
          console.error(error);
        });
      }
      setTimeout(()=> {
        try {    
          throw new Error( "ERROR" ); 
        } catch (err) {
            resolve(JSON.stringify({ "return_code" : -1, "error_code" : err.message }));
            return false;
        }},10000)

    })
}

SendToVoiceApi = async(searchdata) => {
  return new Promise((resolve,reject) => {


    axios(
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        url: 'http://1.201.142.118:80/api/STT',
        data: {
          data:{
            audio: searchdata
          }
        },
        method: "POST",
      }
    )
    .then((response)=>{
      console.log('Success Response')
      resolve(JSON.stringify(response.data))
    })
    .catch(error => {
      console.error(error);
    });

    setTimeout(()=> {
      try {    
        throw new Error( "ERROR" ); 
      } catch (err) {
          resolve(JSON.stringify({ "return_code" : -1, "error_code" : err.message }));
          return false;
      }},5000)

  })


}
module.exports = SendToVoiceApi;
module.exports = SendToApi;