const apiConnect = require('./apiConnect');
const search = require('./search');

const apiRequest= apiConnect.apiRequest;

const wikiQA = "WikiQA";
const textMean = "WiseNLU";
const argumentWiki = {
    "question":"" ,
    "type":"hybridqa"// 걍 통합한걸로 했는데 수정
}
const argumnetMean = {
    "analysis_code": "",
    "text": ""
}

const mean=async(getData)=>{
    return new Promise(async(resolve,reject)=>{

        let tempMeanMorp = argumnetMean;
        tempMeanMorp.analysis_code = "morp";
        tempMeanMorp.text = getData.text;
    
        let tempMeanSrl = argumnetMean;
        tempMeanSrl.analysis_code = "srl";
        tempMeanSrl.text =getData.text;
        
        // 병렬처리 위해
        let [morpResult,srlResult]=await Promise.all([apiRequest(textMean,tempMeanMorp),apiRequest(textMean,tempMeanSrl)]);
        
        resolve({"morp":morpResult,"srl":srlResult}); 
    });
    
};

const textAnalystic=(getData)=>{
    return new Promise(async(resolve,reject)=>{
        let tempWiki = argumentWiki;
        tempWiki.question = getData.text;
        
        let [wikiResult,etcResult]=await Promise.all([apiRequest(wikiQA,tempWiki),mean(getData)]); //원래 mean 다음에 then(search);

        resolve({"wiki":wikiResult,"etc":etcResult});
    });
    
}

module.exports = textAnalystic;