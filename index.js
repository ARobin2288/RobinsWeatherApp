 function formatDate(date) {
            let hours = date.getHours();
            if (hours < 10) {
                hours = `0${hours}`;
            }
            let minutes = date.getMinutes();
            if (minutes < 10) {
                minutes = `0${minutes}`;
            }
            let dayIndex = date.getDay();
            let days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ];
            let day = days[dayIndex];
            return `${day} ${hours}:${minutes}`;
        }

        function displayWeatherCondition(response) {
            document.querySelector("#city").innerHTML = response.data.name;
            document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
            document.querySelector("#humidity").innerHTML = response.data.main.humidity;
            document.querySelector("#weather-conditions").innerHTML = response.data.weather[0].main;
            document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
        }

        function searchCity(city) {
            let apiKey = "0f1996bbebf340db45987ce9fc344036";
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
            axios.get(apiUrl).then(displayWeatherCondition);
        }

        function showNewCity(event) {
            event.preventDefault();
            let city = document.querySelector("#searchbar").value;
            searchCity(city);
        }

        function searchLocation(position) {
            let apiKey = "0f1996bbebf340db45987ce9fc344036";
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;

            axios.get(apiUrl).then(displayWeatherCondition);
        }

        function getCurrentLocation(event) {
            event.preventDefault();
            navigator.geolocation.getCurrentPosition(searchLocation);
        }

        function convertToFahrenheit(event) {
            event.preventDefault();
            let temperatureElement = document.querySelector("#temperature");
            temperatureElement.innerHTML = 66;
        }

        function convertToCelcius(event) {
            event.preventDefault();
            let temperatureElement = document.querySelector("#temperature");
            temperatureElement.innerHTML = 19;
        }

        let dateElement = document.querySelector("#date");
        let currentTime = new Date();
        dateElement.innerHTML = formatDate(currentTime);

        let searchForm = document.querySelector("#searching");
        searchForm.addEventListener("submit", showNewCity);

        let currentLocationButton = document.querySelector("#home");
        currentLocationButton.addEventListener("click", getCurrentLocation);

        searchCity("Chicago");