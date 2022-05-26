const axios = require("axios");
const express = require("express");
const auth = require('basic-auth');
const res = require("express/lib/response");
const { param } = require("express/lib/request");

const app=express()

// Method to authenticate user request
function authentication(req,res){
    let user = auth(req)
    if (user === undefined || user['name'] !== 'test@example.com' 
        || user['pass'] !== 'abc123456') {
        res.statusCode = 401
        res.setHeader('WWW-Authenticate', 'Basic realm="Node"')
        res.send("Wrong username or password");
      }
      else{
            res.statusCode = 200;
        }
        return res;
    }
    
// Base url to hit for fake API
const baseAddress="https://jsonplaceholder.typicode.com/";

// Endpoints to hit
app.get('/allPosts', async (req,res)=>{
    const authResponse=authentication(req,res);
    if(authResponse.statusCode===200){
        const response=await allPostsMethod();
        res.send(response.data);
    }
})
app.get('/getPost/:id', async (req,res)=>{
    const authResponse=authentication(req,res);
    if(authResponse.statusCode===200){
        const response=await postByIdMethod(req.params.id)
        console.log(typeof response.data);
        res.send(response.data);
    }
})
// app.get('/allPosts', async (req,res)=>{
//     const response=authentication(req,res);
//     if(response.statusCode===200){
//         await allPostsMethod()
//         res.send("Authorized");
//     }
// })


// Methods used by endPoints
async function allPostsMethod(){
    const response= await axios.get(`${baseAddress}posts`);    
    // console.log(response)
    return response;
}
async function postByIdMethod(id){
    const response= await axios.get(`${baseAddress}posts/${id}`);
    console.log(response)
    return response;
}
// async function PostsMethod(){
//     const response= await axios.get(`${baseAddress}posts`);
//     console.log(response)
// }


app.listen(8080,()=>{
    console.log("server started")
})