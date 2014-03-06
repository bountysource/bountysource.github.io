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
  function (ng, jsyml, _) {
    ng.module('ramlview', []);

    ng.module('ramlview').
      controller('RamlViewCtrl', function($scope, $http) {
        $http.get('bountysource.raml').then(function (response) {
          $scope.api = jsyml.load(response.data);
          $scope.routes = _.pick(
            $scope.api,
            _.filter(
              _.keys($scope.api),
              function (k) { return k[0] === '/'; }
            ));
          $scope.traits = _.extend.apply({}, $scope.api.traits);
        });
      });

    ng.bootstrap(document, ['ramlview']);
  }
);
