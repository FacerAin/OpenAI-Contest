const axios = require('axios')
import filter from './filter';
import { SERVER_URL } from 'react-native-dotenv';

export const sendSearch = async(searchText) => {
    return new Promise((resolve,reject) => {
      if(searchText=== "" || searchText.length > 30 ){
        resolve({ "return_code" : -1, "error_code": "검색 단어를 확인해 주세요!" });
      } else{
        axios(
          {
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            url: SERVER_URL,
            data: {
              data:{
                text: searchText.replace(/\s{1,}/g,' ')
              }
            },
            method: "POST",
          }
        )
        .then((response)=>{
          resolve(filter(response.data))
          clearTimeout(timer);
        })
        .catch(error => {
          clearTimeout(timer);
          throw new Error(error);
        });
      }
      let timer = setTimeout( () => {
          throw new Error( "time out" );} ,10000)
    })
}