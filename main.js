requirejs.config({
  shim: {
    'angular': { exports: 'angular' }
  },
  paths: {
    propertyParser: 'components/requirejs-plugins/src/propertyParser',
    domReady: 'components/requirejs-domready/domReady',
    angular: 'components/angular/angular.min'
  }
});

require(
  [
    'angular',
    'domReady!'
  ],
  function (angular, jsontemplate) {
    angular.module('ramlview', []);

    angular.module('ramlview').
      controller('RamlViewCtrl', function($scope, $http) {

      });

    angular.bootstrap(document, ['ramlview']);
  }
);
