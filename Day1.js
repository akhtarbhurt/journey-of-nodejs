const http = require("http")
const fs = require('fs')
const url = require('url')
const express = require('express')

// understanding the http request via express js 
const app =  express()

app.get("/", (req, res)=>{
    return res.send("hello from home page")
})

app.get("/about", (req, res)=>{
    return res.send(`hello from about page ${req.query.name} `)
})

app.listen(3000, ()=> console.log("server started") )

// understanding the http request in core node js 
const myServer = http.createServer((req, res)=>{
    const log = `${Date.now()} ${req.method} ${req.url} new req recieved \n `
    const myUrl = url.parse(req.url, true);
    fs.appendFile("log text", log, (err, data)=>{
        switch (myUrl.pathname){
            case "/":
                if(req.method === "GET") res.end("homepage")
            break;
            case "/about" :
                const username = myUrl.query.myname
            res.end(`hi ${username}`)
            break
            case "/search":
                const search = myUrl.query.search_query;
            res.end("here are the result for " + search)
            break
            case "/signup":
                if(req.method  === "GET") res.end("this is a sign up form ")
                else if (req.method === "POST"){
                    res.end("success")
                }
            default : res.end('404 not found ')
        }
        res.end("hello from server again")
    })
    console.log("new req rec")
})

myServer.listen(3000, ()=> console.log('server started') )
