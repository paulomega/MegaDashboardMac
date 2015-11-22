(function(window, undefined) {'use strict';

debug('myNewChart' );

var controllerProvider = null;

angular.module('HelloWorld', []).factory('$message', function() {
	return "Hello World";
});

// Load javascript file with controllers/directives/services
angular.module('TestModule', ['HelloWorld', 'oc.lazyLoad'], function($controllerProvider) {
    controllerProvider = $controllerProvider;
})
.controller('myNewChartCtrl', function($scope, $rootScope, $controller) {
        
    console.log("scope.id= " + $scope.$id +  "scope.parent.id= " + $scope.$parent.$id + "  It works! rootScope is " + $rootScope.$id +
        ", should be " + angular.element('[ng-app=MegaDashboardJS]').scope().$id);
    
    var myNewScope = $scope.$new();
     
    $controller('mgchartCtrl', { $scope : myNewScope }); 
        
    myNewScope.mydata = {
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


angular.bootstrap($('[ng-app="myChartApp"]'), ['TestModule']);

// Register Ctrl controller manually
// If you can reference the controller function directly, just run:
// $controllerProvider.register(controllerName, controllerFunction);
// Note: I haven't found a way to get $controllerProvider at this stage
//    so I keep a reference from when I ran my module config
function registerController(moduleName, controllerName) {
    // Here I cannot get the controller function directly so I
    // need to loop through the module's _invokeQueue to get it
    var queue = angular.module(moduleName)._invokeQueue;
    for(var i=0;i<queue.length;i++) {
        var call = queue[i];
        if(call[0] == "$controllerProvider" &&
           call[1] == "register" &&
           call[2][0] == controllerName) {
            controllerProvider.register(controllerName, call[2][1]);
        }
    }
}
registerController("TestModule", "myNewChartCtrl");


}
)(window);