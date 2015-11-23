(function(window, undefined) {'use strict';

angular.module('adf.widget.mgchart', [ 'adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('mgchart', {
        title: 'Mega Chart',
        description: 'Mega Chart',
        controller: 'mgchartCtrl',
        mynewdata: [ { 'temperatura' : 55 } ],
        templateUrl: '{widgetsPath}/components/adf-widget-mgchart/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/components/adf-widget-mgchart/src/edit.html'
        }
      });
  })
  .controller('mgchartCtrl', function ($scope, $http, $ocLazyLoad, $rootScope) {
            console.log('mgchartCtrl scope id = ', $scope.$id);
            console.log('mgchartCtrl parent scope id = ', $scope.$parent.$id);
      
    $scope.loadChart = function() {
      $scope.myChartHTML = 'charts/mgChart' + $scope.config.id + '.html';
    }; 

    $scope.mydata = { temperatura : 35 }; 
    $scope.mgchartConfig = '';
    // Se näo existe o id, estamos criando um novo widget
    if ($scope.config.id === undefined) {
      $scope.config.id = '_' + new Date().getTime();
    } else
    {   
     // $ocLazyLoad.load('charts/mgChart' + $scope.config.id + '.js');
     // $scope.lazyLoadParams = [
     //                           'charts/mgChart' + $scope.config.id + '.js'
     //                         ];
      
    $rootScope.safeApply = function( fn ) {
        var phase = this.$root.$$phase;
        if(phase == '$apply' || phase == '$digest') {
            if(fn) {
                fn();
            }
        } else {
          this.$apply(fn);
        }
    };


      $http.get('charts/mgChart' + $scope.config.id + '.js').success(function(data) {    
        var f = new Function(data);
          f(); 
          
          $rootScope.safeApply(function(){
              $scope.loadChart();
          })
      });


      //$scope.myChartHTML = 'charts/mgChart' + $scope.config.id + '.html';

      /*
      $http.get('charts/mgChart' + $scope.config.id + '.json').success(function(data) {
        console.log(data);
        $scope.mydata = data;
      });
      $http.get('charts/mgChart' + $scope.config.id + '.html').success(function(data) {   
        console.log("mgChart scope = " + $scope.$id);    
        $scope.mgchartConfig = data;
      });
      */
/*      $http.get('charts/mgChart' + $scope.config.id + '.html').then(angular.bind(this, 
            function(response) { 
                this.response = response; //use this (which is the bound context) 
                $scope.mgchartConfig = response;
            }));
            */
    };
  });

//angular.module("adf.widget.mgchart").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/mgchart/src/edit.html","<form role=form><div class=form-group><label for=sample>Sample</label> <input type=text class=form-control id=sample ng-model=config.sample placeholder=\"Enter sample\"></div></form>");
//$templateCache.put("{widgetsPath}/mgchart/src/view.html","<div><h1>Widget view</h1><p>Content of {{config.sample}}</p></div>");}]);

}
)(window);


