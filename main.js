requirejs.config({
  shim: {
    'angular': { exports: 'angular' },
    'angularEncodeUri': { deps: ['angular'] },
    'angularHighlightJS': { deps: ['angular', 'highlightJS'] },
    'jsyaml': { exports: 'jsyaml' },
    'underscore': { exports: '_' }
  },
  paths: {
    propertyParser: 'components/requirejs-plugins/src/propertyParser',
    domReady: 'components/requirejs-domready/domReady',
    angular: 'components/angular/angular.min',
    angularEncodeUri: 'components/angular-encode-uri/dist/angular-encode-uri.min',
    angularHighlightJS: 'components/angular-highlightjs/angular-highlightjs.min',
    highlightJS: 'components/highlightjs/highlight.pack',
    jsyml: 'components/js-yaml/js-yaml',
    underscore: 'components/underscore/underscore'
  }
});

require(
  [
    'angular',
    'jsyml',
    'underscore',
    'angularEncodeUri',
    'angularHighlightJS',
    'domReady!'
  ],
  function (ng, jsyml, _) {
    ng.module('ramlview', ['rt.encodeuri', 'hljs']);

    function recursiveRoutes(node, prefix) {
      var result = {};
      prefix = prefix || "";
      _.each(_.keys(node), function (k) {
        if(typeof(k) === 'string' && k[0] === '/') {
          result[prefix + k] = node[k];
        }
        if(typeof(node[k]) === 'object') {
          result = _.extend(result, recursiveRoutes(node[k], prefix+k));
        }
      });
      return result;
    }

    ng.module('ramlview').
      controller('RamlViewCtrl', function($scope, $http) {
        $http.get('bountysource.raml').then(function (response) {
          $scope.api = jsyml.load(response.data);
          $scope.routes = recursiveRoutes($scope.api);
          $scope.traits = _.extend.apply({}, $scope.api.traits);
        });
      }).
      directive('queryParams', function () {
        return {
          restrict: 'E',
          scope: {
            params: '='
          },
          templateUrl: 'query_params.html'
        };
      });

    ng.bootstrap(document, ['ramlview']);
  }
);
