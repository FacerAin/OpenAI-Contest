const axios = require('axios')
const filter = require('./filter')
SendToApi = async(searchdata) => {
  console.log(searchdata)
    return new Promise((resolve,reject) => {
      if(searchdata === "/\s\g" || searchdata.length > 30 ){
        console.log('ererererer')
        resolve(JSON.stringify({ "return_code" : -1 }));
      }
      setTimeout(()=> {
        try {    
          throw new Error( "ERROR" ); 
        } catch (err) {
            resolve(JSON.stringify({ "return_code" : -1, "error_code" : err.message }));
            return false;
        }},1000)
      axios(
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          url: 'http://172.16.204.163:3002/api/cliConnection',
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
        url: 'http://172.16.204.163:3002/api/STT',
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
      console.log(response)
      resolve(JSON.stringify(response.data))
    })
    .catch(error => {
      console.error(error);
    });
  })
}
module.exports = SendToVoiceApi;
module.exports = SendToApi;