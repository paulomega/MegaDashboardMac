(function(window, undefined) {'use strict';

   debug('mgchartCtrl2' );

    // Load javascript file with controllers/directives/servicess
    appmgchart.controller('mgchartCtrl2', function($scope, $rootScope) {
            
        console.log("mgchartCtrl2 scope.id= " + $scope.$id +  "scope.parent.id= " + $scope.$parent.$id);
           
        $scope.pieChartDataSource = [
            { category: 'Oceania', value: 35 },
            { category: 'Africa', value: 1016 },
            { category: 'Americas', value: 936 },
            { category: 'Asia', value: 4149 },
            { category: 'Europe', value: 728 }
        ];

        $scope.pieChartSettings = {
            dataSource: $scope.pieChartDataSource,
            series: {
                argumentField: 'category',
                valueField: 'value',
                label: {
                    visible: true,
                    connector: {
                        visible: true
                    }
                }
            },
            tooltip: {
                enabled: true,
                percentPrecision: 2,
                customizeText: function (value) {
                    return value.percentText;
                }
            },
            title: {
                text: 'Continental Population by 2010 (in millions)'
            },
            legend: {
                horizontalAlignment: 'center',
                verticalAlignment: 'bottom'
            }
        }; 
     
    });

}
)(window);