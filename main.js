requirejs.config({
  shim: {
    'angular': { exports: 'angular' },
    'jsyaml': { exports: 'jsyaml' }
  },
  paths: {
    propertyParser: 'components/requirejs-plugins/src/propertyParser',
    domReady: 'components/requirejs-domready/domReady',
    angular: 'components/angular/angular.min',
    jsyml: 'components/js-yaml/js-yaml'
  }
});

require(
  [
    'angular',
    'jsyml',
    'domReady!'
  ],
  function (angular, jsyml) {
    angular.module('ramlview', []);

    angular.module('ramlview').
      controller('RamlViewCtrl', function($scope, $http) {
        $http.get('bountysource.raml').then(function (response) {
          $scope.api = jsyml.load(response.data);
        });
      });

    angular.bootstrap(document, ['ramlview']);
  }
);
