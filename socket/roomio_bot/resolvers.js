const axios = require('axios');

const weatherAppID = '70da43007f50c4366fbb4685ffe5ef67';


module.exports = {
    'hello|hi': (message) => `
        hi ${message.user.username || ''}! type 'help' for a list of commands.
    `,
    'help': () => `
        heh just kidding, you gotta find em yourself :)
    `,
    'beep boop': () => `
        i am a robot
    `,
    'things jamie has said|thingsjamiehassaid': async () => {
        const { data } = await axios.get('http://api.reddit.com/r/thingsjamiehassaid');
        const { children } = data.data;
        const index = Math.floor((Math.random() * children.length));
        return children[index].data.title;
    },
    'gif': async (message) => {
        const parsedMessage = message.content.split('rb gif').map(word => word.trim()).filter(word => word);
        const tag = parsedMessage.pop().split(' ').shift();
        const { data: { data: { image_url: gif } } } = await axios.get(`http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=${tag}`);
        if (!gif) return 'no gif found :(';
        return `![gif](${gif})`;
    },
    'kegparty|give me a beer|random beer|beer': async () => {
        const { data } = await axios.get('http://kegparty.herokuapp.com/api/random');
        const {
            link,
            name,
            style: {
                name: styleName,
                description,
            },
        } = data;
        return `Courtesy of Key Party&#013;&#010;&#013;&#010;Name: ${name}&#013; &#010;&#013; &#010;Style: ${styleName}&#013; &#010;&#013;&#013; &#010;Description: ${description}&#013; &#010;&#013; &#010;More info: ${link}`;
    },
    'weather': async () => {
        return 'weather';
        const ip = socket.request.connection.remoteAddress;
        if (!ip) return `we couldn't find you :(`;
        const { data: { city } } = await axios.get(`http://ip-api.com/json/${ip}`);
        const { data: weatherData } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAppID}`);
        return weatherData.weather.pop().description;
    },
    'weather in': async (message, socket) => {
        const parsedMessage = message.content.split('rb weather in').map(word => word.trim()).filter(word => word);
        const city = parsedMessage.pop().split(' ').shift();
        const { data: weatherData } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAppID}`);
        if (!weatherData) return 'no weather found :(';
        return weatherData.weather.pop().description;
    },
    'fun fact|funfact': async () => {
        const { data } = await axios.get('http://numbersapi.com/random');
        return data;
    },
    'tj|thomas': () => [
        'dj*',
        'terry*',
        'tom*',
    ],
};