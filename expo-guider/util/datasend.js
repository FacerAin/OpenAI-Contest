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
          url: 'http://172.16.31.15:3000/api/cliConnection',
          data: {
            data:{
              text: searchdata
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