debug("Script loaded");

function citySelection ($scope) {
    debug("citySelection");
    var query = escape('select * from weather.forecast where woeid="' + $scope.city() + '" and u="c"'),
        url = "http://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json";
    $.ajax({ url: url, dataType: "jsonp" }).done(function (arg) {
        var condition = arg.query.results.channel.item.condition,
            atmosphere = arg.query.results.channel.atmosphere;

        if (condition !== undefined && atmosphere !== undefined) {
            $scope.temperature = condition.temp;
            $scope.humidity = atmosphere.humidity;
            $scope.pressure = atmosphere.pressure;
        }
    });
};

