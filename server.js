/* 1 Import express
2.create the app
3.configure by adding routes
4.start the server */

//import express
const express = require("express");
const chance = require("chance");
const myChance = chance();
const fs = require("fs");

//initialize visit count
let identityCount = 1;

//create the app
const app = express();
app.use(express.static("public"))

//configure by adding routes
app.get("/", (req, res) =>{
    const template = fs.readFileSync("templates/homepage.html", "utf8");
    res.send(template);
});

app.get("/identity", (req, res) =>{
    const text = `Hi ${myChance.name()}. You visited this page ${identityCount} times`
    const template = fs.readFileSync("templates/simple.html", "utf8");
    const result = template.replace("%%TEXT%%", text)
    res.send(result); 
    identityCount++;
});

//start server - takes a port and a function to call when the app starts
app.listen(3000, () => {
    console.log("The server is ready");
});