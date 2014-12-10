'use strict';

/**
 * @ngdoc function
 * @name formsApp.controller:MyformCtrl
 * @description
 * # MyformCtrl
 * Controller of the formsApp
 */
angular.module('formsApp')
  .controller('MyformCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
        $scope.form1 = {
            fields:[{name:'number',label:'Number',type:'text',pattern:/^[0-9]{4,10}$/,placeHolder:'sample number',required:'true',order:0},
                    {name:'email',label:'Email',type:'email',pattern:'',placeHolder:'sample email',required:'true',order:1},
                    {name:'checkbox',label:'Check box',type:'checkbox',pattern:'',placeHolder:'',required:'true',order:2}
            ],
            name:'firstform',
            model:'user'
        };
        $scope.name = 'yaswanth';
    });

/*angular.module('formsApp')
    .directive('validPattern',function(){
       return {
           require:'ngModel',
           restrict:'A',
           scope:{

           },
           link:function(scope, elem, attr, ngModel){
               var pattern = attr.validPattern;
               ngModel.$parsers.unshift(function (value) {
                   console.log('reached validation'+pattern +'  value='+value+'    '+value.match(pattern));
                   ngModel.$setValidity('validPattern', value.match(pattern));
                   return value;
               });
           }
       };
    });*/
/*need to put some time in creating scope for this directive since it is used across many forms */


angular.module('formsApp')
    .directive('customForm',function(){
        return {
            restrict:'E',
            scope:{
               formData:'=data'
            },
            templateUrl: '../../views/custom-field.html',
            link:function(){
               console.log('directive called for field');

            }
        };
    });

angular.module('formsApp')
    .directive('customFormField',function($compile){
        return {
            restrict:'E',
            templateUrl: '../../views/custom-form-field.html',
            compile: function(){
              return {
                pre:  function (scope, iElement, iAttrs) {
                  scope.opts = scope.$eval(iAttrs.opts);
                  console.log(scope.opts.id);
                  console.log(iElement.find('#'+scope.opts.id));
                  if(scope.opts.model){
                    iElement.find('#'+scope.opts.id).attr('ng-model', scope.opts.model);
                  }
                },
                post: function (scope, iElement) {
                  $compile(iElement.contents())(scope);
                }
              };
          }


        };
    });
