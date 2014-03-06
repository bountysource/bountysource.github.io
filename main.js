requirejs.config({
  shim: {
    'angular': { exports: 'angular' },
    'jsyaml': { exports: 'jsyaml' },
    'underscore': { exports: '_' }
  },
  paths: {
    propertyParser: 'components/requirejs-plugins/src/propertyParser',
    domReady: 'components/requirejs-domready/domReady',
    angular: 'components/angular/angular.min',
    jsyml: 'components/js-yaml/js-yaml',
    underscore: 'components/underscore/underscore'
  }
});

require(
  [
    'angular',
    'jsyml',
    'underscore',
    'domReady!'
  ],
  function (angular, jsyml, _) {
    angular.module('ramlview', []);

    angular.module('ramlview').
      controller('RamlViewCtrl', function($scope, $http) {
        $http.get('bountysource.raml').then(function (response) {
          $scope.api = jsyml.load(response.data);
          $scope.routes = _.reduce(
            _.filter(_.keys($scope.api), function (k) { return k[0] === '/'; }),
            function (snowball, flake) {
              snowball[flake] = $scope.api[flake];
              return snowball;
            }, {})
        });
      });

    angular.bootstrap(document, ['ramlview']);
  }
);
