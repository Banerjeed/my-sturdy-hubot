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
    };
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
                console.log("Its " + (parsedData.weather[0].main) + " in " + decodeURIComponent(city));
                var message = bot.send("Its " + (parsedData.weather[0].main) + " in " + decodeURIComponent(city));
                var emoji = require('node-emoji');
                switch(parsedData.weather[0].main){
                        case "Clear":
                                bot.send(message, + " " +emoji.get('sunny') + " " +emoji.get('sunglasses'));
                                bot.send(message,"Its good idea to wear sunglasses before going out");
                                break;
                        case "Clouds":
                        case "Cloud":
                                bot.send(message, + " " +emoji.get('cloud') + " " +emoji.get('expressionless'));
                                break;
                        case "Rain":
                                bot.send(message, + " " +emoji.get('rain_cloud') + " " +emoji.get('umbrella'));
                                bot.send(message,"Grab an umbrella if you are in " + decodeURIComponent(city));
                                break;
                        case "Thunderstorm":
                                bot.send(message, + " " +emoji.get('lightning') + " " +emoji.get('fearful'));
                                bot.send(message,"Be careful if you are in " + decodeURIComponent(city));
                                break;
                        case "Fog":
                        case "Foggy":
                        case "Haze":
                                bot.send(message, + " " +emoji.get('fog') + " " +emoji.get('sun_behind_cloud'));
                                break;
        
                    }
            }
            catch (e) {
                console.log(e.message);
            }
        });

    }).on('error', (e) => {
        console.log('Problem with request: ' + e.message);
        bot.reply(message, "sorry, couldn't find weather info for this city " + city);
    });
});

};
    
