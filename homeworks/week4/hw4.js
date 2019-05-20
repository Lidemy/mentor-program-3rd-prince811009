const request = require('request');

const clientID = 'hsdjfkhuweirfdhjknfksjd';

request({
  url: 'https://api.twitch.tv/helix/games/top',
  method: 'GET',
  headers: {
    'Client-ID': clientID,
  },
}, (error, response, body) => {
  const obj = JSON.parse(body);
  for (let i = 0; i < obj.length; i += 1) {
    console.log(obj.data[i].id, obj.data[i].name);
  }
});
