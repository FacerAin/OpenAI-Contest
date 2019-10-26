const uuidv1 = require('uuid/v1');
const url = 'http://api.0pe.kr/gilljabe/'
const axios = require('axios');
let db = {};
db.Add = async(getScore) => {
  return new Promise((resolve,reject) => {
    let id = uuidv1();
    axios(
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        url: url+"?api=add&device_id="+id+"&score="+getScore,
        method: "GET",
      }
    )
    .then((response)=>{
      console.log('Success Response')
      resolve(JSON.stringify(response.data))
    })
    .catch(error => {
      console.error(error);
    });
  })
}

db.List = async() => {
  return new Promise((resolve,reject) => {
    let id = uuidv1();
    console.log(id);
    axios(
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        url: url+"?api=list&device_id="+id,
        method: "GET",
      }
    )
    .then((response)=>{
      console.log('Success Response')
      resolve(JSON.stringify(response.data))
    })
    .catch(error => {
      console.error(error);
    });
  })
}

module.exports = db;