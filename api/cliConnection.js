const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const textAnalytic=require('./testAnalystic');

let cliConnection = {};

cliConnection.cliReq=(req,res)=>{ // 미완성 함수
    let getData = JSON.parse(req.body.data);
    if(getData.type == ("text")){
        textAnalytic(getData)
        .then()
    }
};

//테스트용 지우지마
const run=async()=>{
    let x = await textAnalytic({"text":"테스트용 문장입니다."});
    console.log(x);
}

run();
module.exports=cliConnection; 