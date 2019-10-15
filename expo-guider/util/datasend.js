const axios = require('axios')
const filter = require('./filter')

SendToApi = async(searchdata) => {
    return new Promise((resolve,reject) => {
      axios(
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          url: 'http://192.168.0.2:3002/api/cliConnection',
          data: {
            data:{
              text: searchdata.replace(/\s{1,}/g,' ')
            }
          },
          method: "POST",
        }
      )
      .then((response)=>{
        console.log('Success Response')
        resolve(JSON.stringify(filter(response.data)))
      })
      .catch(error => {
        console.error(error);
      });
    })
}
module.exports = SendToApi;