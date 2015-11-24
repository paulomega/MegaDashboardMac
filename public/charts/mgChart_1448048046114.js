(function(window, undefined) {'use strict';

   debug('myNewChart' );


    // Load javascript file with controllers/directives/servicess
    appmgchart.controller('mgNewChartCtrl', function($scope, $rootScope) {
            
        console.log("scope.id= " + $scope.$id +  "scope.parent.id= " + $scope.$parent.$id + 
            "  It works! rootScope is " + $rootScope.$id +
            ", should be " + angular.element('[ng-app=MegaDashboardJS]').scope().$id);
                
        $scope.mydata = {
                            "temperatura": 0,
                            "humidade": 0,
                            "pressao": 0,
                            "city" : 638242, 
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
    
    $scope.citySelection = function citySelection (e) {
        
            debug("citySelection");
            
            $scope = angular.element(e.element).scope();
            
            var query = escape('select * from weather.forecast where woeid="' + $scope.mydata.city + '" and u="c"'),
                url = "http://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json";
            $.ajax({ url: url, dataType: "jsonp" }).done(function (arg) {
                var condition = arg.query.results.channel.item.condition,
                    atmosphere = arg.query.results.channel.atmosphere;
            
                if (condition !== undefined && atmosphere !== undefined) {
                    console.log('city=' + $scope.mydata.city);
                    console.log(condition.temp);
                    console.log(atmosphere.humidity);
                    console.log(atmosphere.pressure);
                    $scope.$apply($scope.mydata.temperatura = condition.temp);
                    $scope.$apply($scope.mydata.humidade = atmosphere.humidity);
                    $scope.$apply($scope.mydata.pressao = atmosphere.pressure);
                }
            })
        };       
    });
}
)(window);