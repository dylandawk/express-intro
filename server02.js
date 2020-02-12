
//import express
const express = require("express");
const chance = require("chance");
const myChance = chance();
const fs = require("fs");

//initialize variables
let inventory = [0, "", ""];
let index = "";
const invText = "Check Inventory";
const heat = "Habenero Powder";
const josh = "Josh";
const basil = "Basil";

//create the app
const app = express();
app.use(express.static("public"))

//configure by adding routes
app.get("/", (req, res) =>{
    const template = fs.readFileSync("templates/OT_homepage.html", "utf8");
    res.send(template);
});

app.get("/start", (req, res) =>{
    const prompt = `You can equip a couple items for the trip.  What do you bring? (Choose two)`;
    let template = fs.readFileSync("templates/choice.html", "utf8");
    template = template.replace("%%PROMPT%%", prompt);

    const text00 = invText;
    const text01 = "Pack some heat (Habenero powder) \n";
    const text02 = "Grab a bag of some basil (not as potent and much cheaper)\n";
    const text03 = "Bring your buddy Josh (he is funny)\n";

    //replace href links
    template = template.replace("/text00", "/check_inventory");
    if(inventory[2] == "")
    {
        template = template.replace("/text01", "/heat");
        template = template.replace("/text02", "/basil");
        template = template.replace("/text03", "/josh");
    } else
    {
        //inventory full
        template = template.replace("/text01", "/inventory_full");
        template = template.replace("/text02", "/inventory_full");
        template = template.replace("/text03", "/inventory_full");
        //enable continue button
        template = template.replace("javascript: void(0)", "/buyer_01");
    }


    
    //replace text
    template = template.replace("%%TEXT00%%", text00);
    template = template.replace("%%TEXT01%%", text01);
    template = template.replace("%%TEXT02%%", text02);
    let result = template.replace("%%TEXT03%%", text03);
    res.send(result); 
});

app.get("/check_inventory", (req, res) =>{
    const text = `Cash: $${inventory[0]}, Item 01: ${inventory[1]}, Item 02: ${inventory[2]};`
    let template = fs.readFileSync("templates/check_inventory.html", "utf8");
    
    template = template.replace("/text", "/start");
    const result = template.replace("%%TEXT%%", text);
    res.send(result);
})

app.get("/inventory_full", (req, res) =>{
    const text = `Did not add because inventory full!`;
    let template = fs.readFileSync("templates/simple.html", "utf8");
    const result = template.replace("%%TEXT%%", text)
    res.send(result); 
});

app.get("/heat", (req, res) =>{
    //add Josh to inventory
    let text;
    if(inventory[1] == ""){
        inventory[1] = heat;
        text = `You're packing heat! This might come in handy if you find yourself in a pinch.`;
    } else if(inventory[1] == heat)
    {
        text = `You already equiped this. Idiot.`;
    } else 
    {
        inventory[2] = heat;
        text = `You're packing heat! This might come in handy if you find yourself in a pinch.`;
    }

    const template = fs.readFileSync("templates/simple.html", "utf8");
    const result = template.replace("%%TEXT%%", text);
    res.send(result); 
});

app.get("/basil", (req, res) =>{
    //add basil to inventory
    let text;
    if(inventory[1] == ""){
        inventory[1] = basil;
        text = `You brought along basil. It is weaker than Oregano, it will sell for much less.`;
    } else if(inventory[1] == basil)
    {
        text = `You already equiped this. Idiot.`;
    } else 
    {
        inventory[2] = basil;
        text = `You brought along basil. It is weaker than Oregano, it will sell for much less.`;
    }

    const template = fs.readFileSync("templates/simple.html", "utf8");
    const result = template.replace("%%TEXT%%", text);
    res.send(result); 
});

app.get("/josh", (req, res) =>{
    //add Josh to inventory
    let text;
    if(inventory[1] == ""){
        inventory[1] = josh;
        text = `You brought along Josh. He cracks a joke about dysentery.`;
    } else if(inventory[1] == josh)
    {
        text = `You already equiped this. Idiot.`;
    } else 
    {
        inventory[2] = josh;
        text = `You brought along Josh. He cracks a joke about dysentery.`;
    }

    const template = fs.readFileSync("templates/simple.html", "utf8");
    const result = template.replace("%%TEXT%%", text);
    res.send(result); 
});


//// PHASE 02 /////

app.get("/buyer_01", (req, res) =>{
    const prompt = `Your first customer meets you by the back door of a local Italian restaurant. He seems nervous, but you really have to make that dough... and not the pizza kind.`;
    let template = fs.readFileSync("templates/choice.html", "utf8");
    template = template.replace("%%PROMPT%%", prompt);


    
    //set links based on inventory
    switch(inventory[1]){
        case heat:
            template = template.replace("/text01", "/heat_01");
            break;
        case basil:
            template = template.replace("/text01", "/basil_01");
            break;
        case josh:
            template = template.replace("/text01", "/josh_01");
            break;
    }
    //set links based on inventory
    switch(inventory[2]){
        case heat:
            template = template.replace("/text02", "/heat_01");
            break;
        case basil:
            template = template.replace("/text02", "/basil_01");
            break;
        case josh:
            template = template.replace("/text02", "/josh_01");
            break
    }

        template = template.replace("/text00", "/oregano_01")

        //set text
        const text00 = `Sell Oregano`;
        const text01 = `Use ${inventory[1]}.`;
        const text02 = `Use ${inventory[2   ]}.`;
        const text03 = "";
    
        //replace text
        template = template.replace("Continue", ""); //Hide the 'Continue'
        template = template.replace("%%TEXT00%%", text00);
        template = template.replace("%%TEXT01%%", text01);
        template = template.replace("%%TEXT02%%", text02);
        let result = template.replace("%%TEXT03%%", text03);

    res.send(result);
});

app.get("/oregano_01", (req, res) => {
    const text = "AHHHH SH****T, DUDE'S A NARC!! You get busted on possesion of illegal herbs.";
    let template = fs.readFileSync("templates/simple.html", "utf8");
    template = template.replace("/start", "/");
    template = template.replace("Go Back", "The End");
    const result = template.replace("%%TEXT%%", text);
    inventory = [0, "", ""];
    res.send(result); 
    
})

app.get("/heat_01", (req, res) => {
    const text = "AHHHH SH****T, DUDE'S A NARC!! You throw the Habenero pepper in his face and try to make a break for it. Other spice cops try to surround you, but you throw that spicy heat powder in their faces too.  You disappear into the back alleys and make your getaway.";
    let template = fs.readFileSync("templates/simple.html", "utf8");
    template = template.replace("/start", "/");
    template = template.replace("Go Back", "The End");
    const result = template.replace("%%TEXT%%", text);
    inventory = [0, "", ""];
    res.send(result); 
    
})

app.get("/basil_01", (req, res) => {
    const text = "AHHHH SH****T, DUDE'S A NARC!! You get busted on possesion of illegal herbs. However, because it is Basil, the sentence will probably be shorter.";
    let template = fs.readFileSync("templates/simple.html", "utf8");
    template = template.replace("/start", "/");
    template = template.replace("Go Back", "The End");
    const result = template.replace("%%TEXT%%", text);
    inventory = [0, "", ""];
    res.send(result); 
    
})
app.get("/josh_01", (req, res) => {
    const text = "AHHHH SH****T, DUDE'S A NARC!! Josh, however, is your 'Ride-or-Die' and he distracts the Narc as you make your getaway. He is your best friend and tears begin to stream down your face as you escape into the back alleys.";
    let template = fs.readFileSync("templates/simple.html", "utf8");
    template = template.replace("/start", "/");
    template = template.replace("Go Back", "The End");
    const result = template.replace("%%TEXT%%", text);
    inventory = [0, "", ""];
    res.send(result);   
})


//start server - takes a port and a function to call when the app starts
app.listen(3000, () => {
    console.log("The server is ready");
});