exports.run = (client, message, args) => {
    message.channel.send("🏓Latency is ${Date.now() - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms").catch(console.error);
}
