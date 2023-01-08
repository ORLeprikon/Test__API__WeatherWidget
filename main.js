
alert('Скрипт работает');


const cityName = document.getElementById('cityName');
const search = document.getElementById('search');
const searchValue = document.getElementById('searchValue');
const apiKey = 'b9501aa0daa58ec6fb8ff6cb798067c5&lang=uk';
const weatherTemp = document.querySelector('.weather__temp-value');
const celVal = "°C";
const feelsLike = document.querySelector('.weather__feels-like-value');
const weatherIcon = document.getElementById('icon');
const statusWeather = document.getElementById('status');
const windValue = document.getElementById('wind');
const wValue = "м/c"
const pressureValue = document.getElementById('pressure');
const presValue = 'гПа';
const humidityValue = document.getElementById('humidity');
const humValue = '%';
const visibilityValue = document.getElementById('visibility');
const visiValue = 'км'

search.addEventListener('click', () => {

	const value = searchValue.value;

	fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&appid=${apiKey}`)
		.then(res => res.json())
		.then(data => {

			const { lat, lon } = data[0];

			fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
				.then(res => res.json())
				.then(data => {
					console.log(data);
					const {main, weather, visibility, wind} = data;
					const {temp, feels_like, pressure, humidity} = main;
					const {icon, description} = weather[0];
					const {speed} = wind;
					
					
					
					cityName.innerHTML = value;
					weatherTemp.innerHTML = Math.trunc(parseFloat(temp) - 273.15) + " " + celVal;
					feelsLike.innerHTML = Math.trunc(parseFloat(feels_like) - 273.15) + " " + celVal;
					weatherIcon.src = `https://openweathermap.org/img/w/${icon}.png`;
					statusWeather.innerHTML = description;
					pressureValue.innerHTML = pressure + " " + presValue;
					humidityValue.innerHTML = humidity + " " + humValue;
					visibilityValue.innerHTML = visibility / 1000 + " " + visiValue;
					windValue.innerHTML = speed.toFixed(1) + " " + wValue;
				});
		});

		
})

