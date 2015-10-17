$(document).ready(function(){
    
    // GLOBALS
    
    var currentCon;
    
    // current conditions
    $.ajax({
        url:"http://api.wunderground.com/api/0c7ce1dbe7de0c0b/conditions/q/MD/Temple_Hills.json",
        dataType:"jsonp",
        success: function(x){
            var data = x.current_observation;
            $('.present .wrap .temp').html( Math.floor(data.temp_f) + '<span>&deg;</span>' );
            $('.present .wrap h3').html( data.display_location.full );
            $('.present .wrap .graphic').css({'background-image': 'url('+ data.icon_url +')'});
            $('.present .wrap .perc span').html( Math.floor(data.precip_today_in) + '%' );
            $('.present .wrap .wind span').html( data.wind_mph + 'mph ' + data.wind_dir );
            $('.present .wrap .hum span').html( data.relative_humidity );
        }
    });
    
    $.ajax({
        url:"http://api.wunderground.com/api/0c7ce1dbe7de0c0b/hourly/q/MD/Temple_Hills.json",
        dataType:"jsonp",
        success: function(x){
            var data = x.hourly_forecast;
            for (q=0;q<10;q++){
                $('.allday').find('.allday-rail').append(' <div class="hour">   <div class="time">'+data[q].FCTTIME.civil+'</div>   <div class="graphic"></div>   <div class="temp">'+data[q].temp.english+'&deg;</div>   <div class="perc">'+Math.floor(data[q].qpf.english)+'%<span></span></div>   <div> ');
                $('.allday .allday-rail .hour:last-child .graphic').css({'background-image': 'url('+ data[q].icon_url +')'});
                $('.present').find('.date').text(data[0].FCTTIME.pretty);
                currentCon = data[0].condition;
            }
        }
    });
    
    $.ajax({
        url:"http://api.wunderground.com/api/0c7ce1dbe7de0c0b/forecast10day/q/MD/Temple_Hills.json",
        dataType:"jsonp",
        success: function(x){
            var data = x.forecast.simpleforecast.forecastday;
            for (i=0;i<10;i++){
                $('.weekly').find('.weekly-rail').append(
                    '<div class="day">   <div class="time">'+data[i].date.weekday+'</div>   <div class="graphic"></div>   <div class="temp">'+Math.floor((parseInt(data[i].high.fahrenheit) + parseInt(data[i].low.fahrenheit))/2)+'&deg;</div>   <div class="hi-lo">   <div class="hi">Hi '+data[i].high.fahrenheit+'&deg;</div> <div class="lo">Lo '+data[i].low.fahrenheit+'&deg;</div>   <div class="perc">'+Math.floor(data[i].qpf_allday.in)+'%<span></span></div> </div>   </div>'
                );
                $('.weekly .day:last-child .graphic').css({'background-image': 'url('+ data[i].icon_url +')'});
            }
            $('.present .wrap .hi-lo .hi').text('High '+data[0].high.fahrenheit+'o');
            $('.present .wrap .hi-lo .lo').text('Low '+data[0].low.fahrenheit+'o');
        }
    });
    
    var rightHold = 0,
        rightCount = 0;
    
    var moveRight = function(){
        if( rightHold != 5 ){
            rightHold++;
            $('.weekly-rail').css({'left': (0 - ( rightHold * 20 )) + '%'});
        }
    };
    
    var moveLeft = function(){
        if( rightHold != 0 ){
            rightHold--;
            $('.weekly-rail').css({'left': (0 - ( rightHold * 20 )) + '%'});
        }
    };
    
    var slideRight = function(){
        if( rightCount != 5 ){
            rightCount++;
            $('.allday-rail').css({'left': (0 - ( rightCount * 20 )) + '%'});
        }
    };
    
    var slideLeft = function(){
        if( rightCount != 0 ){
            rightCount--;
            $('.allday-rail').css({'left': (0 - ( rightCount * 20 )) + '%'});
        }
    };
    
    $('.weekly-arrows .right').on('click', function(){moveRight();});
    $('.weekly-arrows .left').on('click', function(){moveLeft();});
    $('.allday-arrows .right').on('click', function(){slideRight();});
    $('.allday-arrows .left').on('click', function(){slideLeft();});
    
    
    switch( currentCon ){
        case 'Partly Cloudy':
            $('main').css({'background-image': 'url(../assets/images/rainy.gif)'});
            break;
        case 'Cloudy':
            $('main').css({'background-image': 'url(../assets/images/cloudy.gif)'});
            break;
        case 'Clear':
            $('main').css({'background-image': 'url(../assets/images/sunny.gif)'});
            break;
    }
    

});
