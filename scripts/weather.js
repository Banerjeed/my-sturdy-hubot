const http = require('http');
module.exports = function(bot) {

function weatherReport(data) {
    bot.send(data);
}

bot.hear(/weather in (.*)/, function(data) {
    console.log('query: ' + data.message);
    var city = encodeURIComponent(data.match[1]);
    var options = {
        protocol : 'http:',
        host : 'api.openweathermap.org',
        path : '/data/2.5/weather?q='+city+'&appid=05edc4cddb0ece1e50b64ad8bfa42218',
        method : 'GET'
    }
    http.get(options, (resp) => {
        const statusCode = resp.statusCode;
        
        let error;
        // error handling

        let rawData = '';
        resp.on('data', (chunk) => rawData += chunk);
        resp.on('end', () => {
            try {
                let parsedData = JSON.parse(rawData);
                console.log(parsedData);
                weatherReport(parsedData);
            } catch (e) {
                console.log(e.message);
            }
        });

    }).on('error', (e) => {
        console.log('Problem with request: ' + e.message);
        bot.reply(message, "sorry, couldn't find weather info for this city " + city);
    });
});

};
    //If error, display error to user
    //Otherwise, display the weather
/*
        response.on('data', function(data) {
                body += data;
                weather = JSON.parse(body);
                console.log("weather :" + weather.weather[0].main);
                bot.reply(message, "Its " + weather.weather[0].main + " in " + city);
                var reaction = "";
                switch(weather.weather[0].main){
                        case "Clear":
                                reaction = "mostly_sunny";
                                bot.reply(message,":"+reaction+":");
                                bot.reply(message,"Its good idea to wear sunglasses before going out");
                                break;
                        case "Clouds":
                        case "Cloud":
                                reaction = "cloud";
                                bot.reply(message,":"+reaction+":");
                                break;
                        case "Rain":
                                reaction = "rain_cloud";
                                bot.reply(message,":"+reaction+":");
                                bot.reply(message,"Please carry umbrella if you are in " + city);
                                break;
                        case "Thunderstorm":
                                reaction = "thunder_cloud_and_rain";
                                bot.reply(message,":"+reaction+":");
                                bot.reply(message,"Please don't go out if you are in " + city);
                                break;
                }
                bot.api.reactions.add({
                    timestamp: message.ts,
                    channel: message.channel,
                    name: reaction,
                }, function(err, res) {
                    if (err) {
                        bot.botkit.log('Failed to add emoji reaction :(', err);
                    }
                });
            });
            response.on('end', function() {
              
            });
        }); 
          request.on('error', function(e) {
            console.log('Problem with request: ' + e.message);
            bot.reply(message, "sorry, couldn't find weather info for this city " + city);
          });
          request.end();
    }
    });
    */