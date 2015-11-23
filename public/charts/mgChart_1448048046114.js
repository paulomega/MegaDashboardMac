(function(window, undefined) {'use strict';

debug('myNewChart' );


// Once the DOM-Ready event has fired, we know that AngularJS
// will have bootstrapped the application. As such, we want to 
// try adding our "lazy bindings" after the DOM-ready event.
$( lazyBindings );

function lazyBindings() {

// Load javascript file with controllers/directives/servicess
app.controller('myNewChartCtrl', function($scope, $rootScope, $controller) {
        
    console.log("scope.id= " + $scope.$id +  "scope.parent.id= " + $scope.$parent.$id + "  It works! rootScope is " + $rootScope.$id +
        ", should be " + angular.element('[ng-app=MegaDashboardJS]').scope().$id);
            
    $scope.mydata = {
      "temperatura": 0,
      "humidade": 0,
      "pressao": 0,
      "city" : 44418, 
      "cities": [{
                "name": "London",
                "id": 44418
                }, {
                "name": "Berlin",
                "id": 638242
                }, {
                "name": "New York",
                "id": 2459115
                }]
        };
   
   $scope.setDados = function setDados(temp, hum, pres) {
            $scope.mydata.temperatura = temp;
            $scope.mydata.humidade = hum;
            $scope.mydata.pressao = pres;      
   };  
      
   $scope.citySelection = function citySelection (e) {
    debug("citySelection");
    
    $scope = angular.element('#myNewChart').scope();
    
    var query = escape('select * from weather.forecast where woeid="' + e.selectedItem.id + '" and u="c"'),
        url = "http://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json";
    $.ajax({ url: url, dataType: "jsonp" }).done(function (arg) {
        var condition = arg.query.results.channel.item.condition,
            atmosphere = arg.query.results.channel.atmosphere;

        if (condition !== undefined && atmosphere !== undefined) {
            $scope.setDados(condition.temp, atmosphere.humidity, atmosphere.pressure);
        }
    })
    };
           
});

              //  var scope = angular.element($('body')).scope();
              //  scope.$apply(function(){
              //      scope.loadChart();
              //  })

}

}
)(window);