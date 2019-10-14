const axios = require('axios')


SendToApi = async(searchdata) => {
    return new Promise((resolve,reject) => {
      axios(
        {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          url: 'http://192.168.0.2:3000/api/cliConnection',
          data: {
            data:{
              text: searchdata
            }
          },
          method: "POST",
        }
      )
      .then((response)=>{
        resolve(JSON.stringify(response.data))
      })
    })
}
module.exports = SendToApi;