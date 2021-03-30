const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.send(`Website is online! Use https://uptimerobot.com/ to make it 24/7!`)
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.repl.co/`); // so, if you are using glitch or another hosting prover change the repl.co to whatever host you're using.
}, 280000);




const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.json"); // config.json is where you will put your token and prefix.
client.config = config;

client.on('ready', () => {
    client.user.setStatus("available");
  let statuses = [
    "The worlds simplist Discord Bot (I hope)", // you can remove the credits, idm.
    "github.com/oofquest btw",
    "Simple.",
    "github.com/oofquest/discord-bot"
  ];
  let x = 0;
  setInterval(() => {
    if (x === 3) {
      x = 0;
    } else {
      x = x + 1;
    }
    let status = statuses[x];
    client.user.setActivity(status);
  }, 10000);
  
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`I've loaded the ${commandName}!`);
    client.commands.set(commandName, props);
  });
});

client.login(config.token);
