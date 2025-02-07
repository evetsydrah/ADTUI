const express = require("express");
const got = require('got');

function routerAccountManagement(){
    this.router = express.Router();
    this.useRoute("fetchUserAccount")
}

routerAccountManagement.prototype.useRoute=function(routeStr,isPost){
    this.router[(isPost)?"post":"get"]("/"+routeStr,(req,res)=>{
        this[routeStr](req,res)
    })
}

routerAccountManagement.prototype.fetchUserAccount =async function(req,res) {
    //var url = "http://localhost:5001/"
    var url = process.env.dboperationAPIURL
    var reqBody={
		account:req.authInfo.account,
        name:req.authInfo.name,
        country:req.authInfo.country,
        idp:req.authInfo.idp
	}
    try{
        var {body} = await got.post(url+"userAccount/basic", {json:reqBody,responseType: 'json'});
        res.send(body)
    }catch(e){
        res.status(e.response.statusCode).send(e.response.body);
    }  
}



module.exports = new routerAccountManagement().router