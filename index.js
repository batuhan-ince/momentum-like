import {Buffer} from "buffer"
import request from "request"

fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=street")
    .then(res => res.json())
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
)`
    })


function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(getCurrentTime, 1000)

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available")
            }
            return res.json()
        })
        .then(data => {
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.ceil(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err))
});

fetch(`https://api.quotable.io/random?maxLength=100&tags=["Motivational"]`)
    .then(res => res.json())
    .then(data => {
        document.getElementById("quote").innerHTML = `
            <p>${data.content}</p>
            <p>${data.author}</p>
        `
    })
    
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1669d0b712mshd38342b95479133p159030jsn2b9ccebb7648',
		'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
	}
};

fetch('https://currency-exchange.p.rapidapi.com/exchange?from=USD&to=TRY&q=1.0', options)
    .then(res => res.json())
    .then(data => {
        document.getElementById("crypto").innerHTML += `<p>💵: ₺${data.toFixed(2)}</p>`
    })

fetch('https://currency-exchange.p.rapidapi.com/exchange?from=EUR&to=TRY&q=1.0', options)
    .then(res => res.json())
    .then(data => {
        document.getElementById("crypto").innerHTML += `<p>💶: ₺${data.toFixed(2)}</p>`
    })


fetch('https://currency-exchange.p.rapidapi.com/exchange?from=GBP&to=TRY&q=1.0', options)
    .then(res => res.json())
    .then(data => {
        document.getElementById("crypto").innerHTML += `<p>💷: ₺${data.toFixed(2)}</p>`
    })
    


var client_id = '9f2409acf0c64226a5620807b49a5884';
var client_secret = '9bd934087a80455e93bcb2a1c991fd74';

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    const token = body.access_token;
    console.log(token)
    fetch(`https://api.spotify.com/v1/recommendations?limit=1&seed_genres=${'jazz,rock'}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  })
  .then(res => res.json())
  .then(data => {
      console.log(data.tracks[0].id)
      document.getElementById("song").innerHTML = `
        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${data.tracks[0].id}?utm_source=generator&theme=0" width="20%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      `
  })
  }
})