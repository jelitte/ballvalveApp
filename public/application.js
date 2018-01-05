var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName,['ngResource','ngRoute','users','example','monitor']);


mainApplicationModule.config(['$locationProvider',function($locationProvider){
    
    $locationProvider.hashPrefix('!');
    console.log("locationProvier")
}]);

if(window.location.hash ==='#_=_') window.location.hash = '#!';

angular.element(document).ready(function(){
   angular.bootstrap(document,[mainApplicationModuleName]);
});