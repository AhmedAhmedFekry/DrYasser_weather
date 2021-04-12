/************ Global Variables for baseurl and apikey ****************************/
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = '26b12448b27853e5b35fb9516c3ff48c';

/** Create a new date instance dynamically with JS*****************/
let newDate = () => {
    let d = new Date();
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let days = ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    let day = days[d.getDay()]
    let date = d.getDate();
    let year = d.getFullYear();
    let month = months[d.getMonth()];
    
    return `${day}, ${month} ${date}, ${year}`
}



// Event listener to add function to existing HTML DOM element in  Generate button to implement GET request
document.getElementById('generate').addEventListener('click', (evt) => {
    let zip = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;

    getWeather(baseURL, zip, apiKey)


    .then(function(data) { 
        console.log(data)
        postData('/add', {
            location: `${data.name}, ${data.sys.country}`,
            dt: newDate(),
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].description,
            feelsLike: data.main.feels_like,
            max: data.main.temp_max,
            min: data.main.temp_min,
            feelings: feelings
        })

        updateUI();
    })
});

/* Function to GET Web API Data*/
// GET request to the OpenWeatherMap API
const getWeather = async (baseURL, zip, apiKey) => {
    const res = await fetch(`${baseURL}zip=${zip}&appid=${apiKey}`)
    try {
        const data = await res.json();
        console.log(data)
        return data;
    } catch(error) {
        console.log("error", error); ///////////// show  rhe error
     
    }
}

////////////////////// POST request
const postData = async (url = '', data = {}) => {
    console.log(data)
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    try {
        const newData = await res.json()
        console.log(newData)
        return newData
    } catch(error) {
        console.log("error", error)
    }
}

///////////////// Update user interface
const updateUI = async (url = '') => {
    const req = await fetch('/all');
    try {
        const allData = await req.json();

        document.getElementById('location').innerHTML = allData.location;
        document.getElementById('date').innerHTML = allData.dt;
        document.getElementById('temp').innerHTML = tempConversion(allData.temp);
        document.getElementById('icon').innerHTML = `<img src=\"https://openweathermap.org/img/wn/${allData.icon}@2x.png\">`
        document.getElementById('description').innerHTML = allData.description;
        document.getElementById('feels-like').innerHTML = `feels like ${tempConversion(allData.feelsLike)}`;
        document.getElementById('maxMin').innerHTML = `max ${tempConversion(allData.max)} | min ${tempConversion(allData.min)}`;
        document.getElementById('content').innerHTML = `Your feeling: ${allData.feelings}`;
        console.log(allData)
    } catch(error) {
        console.log("error", error);
    }
  }

//////////////// this functions to  Convert temperature unit from kelvin to celsius
function tempConversion(kelvin) {
    let celsius = Math.floor(kelvin - 273)
    return `${celsius}°C` 
}

///////////////Add an event listener to a reset button
function resetInput() {
    window.location.reload();
}