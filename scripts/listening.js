

 module.exports = function(bot) {
  bot.hear(/Hello!/, function(res) {
   return res.send("Hi there!");
  });

/*
  bot.respond(/What's your favorite food?/, function(res) {
   return res.send("I'm a robot--I don't eat food!");
  });
*/

  bot.respond(/Hi Hubot! My name is (.*)/i, function(msg) {
   var name;
   name = msg.match[1];
   if (name == "Hubot"){
     return msg.send("You're not Hubot--I'm Hubot!");
   } else {
     return msg.reply("Nice to meet you, " + name + "!");
   }
  });

};