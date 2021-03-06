$(document).ready(function(){
    var city = "london";
    $.getWeather(city)
        $('.buttons').on('click', function(event){
            event.preventDefault();
            if($('#search-bar').val()!="")
                city = $('#search-bar').val();
            $.getWeather(city);
        });
    });

    $.getWeather = function(city){
        $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=229c52b9fb20712b1f26fac20e7b1d2e", function(data){
            // console.log(data);
            let name = data.name;
            let temp = data.main.temp-273;
            temp = temp.toFixed(2) + " °C";
            let temp_max = data.main.temp_max-273;
            temp_max = temp_max.toFixed(2) + " °C";
            let temp_min = data.main.temp_min-273;
            temp_min = temp_min.toFixed(2) + " °C";
            let icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            let weather = data.weather[0].main;
            let descrip = data.weather[0].description;
            let feelLike = data.main.feels_like-273;
            feelLike = feelLike.toFixed(2) + " °C";
            let humidity = data.main.humidity + " %";
            let wind_speed = data.wind.speed + " km/h";

            $('#descrip').text(descrip);
            $('#temp').text(temp);
            $('#name').text(name);
            $('#icon').attr('src', icon);
            $('#humidity').text(humidity);
            $('#wind-speed').text(wind_speed);
            $('#max-temp').text(temp_max);
            $('#min-temp').text(temp_min);
            $('#weather').text(weather);
            $('#feel-like').text(feelLike);

            $.date = function(){
                let datee = Date().substring(8, 10);
                let day = Date().substring(0, 3);
                let month = Date().substring(4, 8);
                var year = Date().substring(10, 15);
                let fin = month + datee + year + ", " + day;
                return fin;
            };
            setInterval($.time = function(){
                    let hour = Date().substring(16, 18);
                    let min = Date().substring(19, 21);
                    let sec = Date().substring(22, 24);
                    let fin;
                    if(hour>12){
                        hour = hour - 12;
                        // fin = hour + " " + min+ " " + sec + " PM";
                    }
                    if(hour==0){
                        hour = 12;
                    }
                    // fin = hour+ ":" + min+ ":" + sec + " AM";
                    fin = hour+ ":" + min+ " AM";
                    $('#time').html(fin);
                },1000);
                $('#date').text($.date());
        });
    };
