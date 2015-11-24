var appmgchart;

(function(window, undefined) {'use strict';

appmgchart = angular.module('adf.widget.mgchart', [ 'adf.provider'])
  .config([ "dashboardProvider", function(dashboardProvider){
    dashboardProvider
      .widget('mgchart', {
        title: 'Mega Chart',
        description: 'Mega Chart',
        controller: 'mgchartCtrl',
        templateUrl: '{widgetsPath}/components/adf-widget-mgchart/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/components/adf-widget-mgchart/src/edit.html'
        }
      });
  }]);

  appmgchart.controller('mgchartCtrl', function ($scope, $http, $ocLazyLoad, $rootScope) {

    debug('mgchartCtrl scope id = ', $scope.$id);
    console.log('mgchartCtrl parent scope id = ', $scope.$parent.$id);

    console.log('mgchartCtrl config id = ', $scope.config.id);
      
    $scope.mydata = { }; 
    $scope.myChartHTML = '';

    // Se näo existe o id, estamos criando um novo widget
    if ($scope.config.id === undefined) {
      $scope.config.id = '_' + new Date().getTime();
    } else
    {   
     // $ocLazyLoad.load('charts/mgChart' + $scope.config.id + '.js');
     // $scope.lazyLoadParams = [
     //                           'charts/mgChart' + $scope.config.id + '.js',
     //                           'charts/mgChart' + $scope.config.id + '.html'
     //                         ];
      
      $http.get('charts/mgChart' + $scope.config.id + '.js').success(function(data) {    
        var f = new Function(data);
          f();        
        $scope.loadChart();  
      });

      $scope.loadChart = function() {
        $scope.myChartHTML = 'charts/mgChart' + $scope.config.id + '.html';
      }; 
    };
    $scope.sample = $scope.config.id;
  });

    appmgchart.config(
      function( $controllerProvider, $provide, $compileProvider ) {

        // Since the "shorthand" methods for component 
        // definitions are no longer valid, we can just 
        // override them to use the providers for post-
        // bootstrap loading.
        console.log( "Config method executed." );

        // Let's keep the older references.
        appmgchart._controller = appmgchart.controller;
        appmgchart._service = appmgchart.service;
        appmgchart._factory = appmgchart.factory;
        appmgchart._value = appmgchart.value;
        appmgchart._directive = appmgchart.directive;

        // Provider-based controller.
        appmgchart.controller = function( name, constructor ) {

          $controllerProvider.register( name, constructor );
          return( this );

        };
        
        // Provider-based service.
        appmgchart.service = function( name, constructor ) {

          $provide.service( name, constructor );
          return( this );

        };

        // Provider-based factory.
        appmgchart.factory = function( name, factory ) {

          $provide.factory( name, factory );
          return( this );

        };

        // Provider-based value.
        appmgchart.value = function( name, value ) {

          $provide.value( name, value );
          return( this );

        };

        // Provider-based directive.
        appmgchart.directive = function( name, factory ) {

          $compileProvider.directive( name, factory );
          return( this );

        };

        // NOTE: You can do the same thing with the "filter"
        // and the "$filterProvider"; but, I don't really use
        // custom filters.

      }
    );

//angular.module("adf.widget.mgchart").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/components/adf-widget-mgchart/src/edit.html","<form role=form><div class=form-group><label for=sample>Sample</label> <input type=text class=form-control id=sample ng-model=config.sample placeholder=\"Enter sample\"></div></form>");
//$templateCache.put("{widgetsPath}/components/adf-widget-mgchart/src/view.html","<div><p>{{config.sample}}</p><div ng-include=\"myChartHTML\"></div>");}]);

}
)(window);


