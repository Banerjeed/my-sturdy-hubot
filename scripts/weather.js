module.exports = function(bot) {

function doSomething(data) {
    weather = JSON.parse(data);
    console.log("weather :" + weather);
    bot.reply(message, "It's " + weather + " in " + city);
}

bot.hear(/weather (.*)/i,function(message) {
    var APIKEY = '05edc4cddb0ece1e50b64ad8bfa42218';

    // instantiate http request
    var request = new XMLHttpRequest();

    // open request and define paramaters for request
    request.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+APIKEY, true);
    
    // define event handler for async return
    request.onload = function(event) {

        // do something on successful http response
        if (request.status === 200) {
            doSomething(request.statusText);
        }

        // if the server responds with redirect (300), error (400), server problem (500)
        else {
            bot.send("Error: Something is WRONG: " + event);
        }
    }

    // define this event handler if you want to handle client-side request errors (ex: no internet connection)
    request.onerror = function(event) {}

    // define this event if you want to handle request timeouts
    request.ontimeout = function(event) {}
    request.send();
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