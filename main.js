'use strict';

requirejs.config({
  shim: {
    'angular': { exports: 'angular' },
    'angularBootstrap': { deps: ['angular'] },
    'angularEncodeUri': { deps: ['angular'] },
    'angularHighlightJS': { deps: ['angular', 'highlightJS'] },
    'jsyaml': { exports: 'jsyaml' },
    'underscore': { exports: '_' }
  },
  paths: {
    angular: 'components/angular/angular.min',
    angularBootstrap: 'components/angular-bootstrap/ui-bootstrap-tpls.min',
    angularEncodeUri: 'components/angular-encode-uri/dist/angular-encode-uri.min',
    angularHighlightJS: 'components/angular-highlightjs/angular-highlightjs.min',
    domReady: 'components/requirejs-domready/domReady',
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
    'angularBootstrap',
    'angularHighlightJS',
    'domReady!'
  ],
  function (ng, jsyml, _) {
    ng.module('app', ['hljs', 'ui.bootstrap']).
      controller('RamlViewCtrl', function($scope, $http, $anchorScroll, $location) {
        $http.get('bountysource.raml?cache=' + (new Date()).getTime()).then(function (response) {
          $scope.api = jsyml.load(response.data);
          $scope.traits = _.extend.apply({}, $scope.api.traits);
          $scope.httpMethods = ['get', 'post', 'put', 'delete', 'head', 'info'];
        });

        $scope.scrollTo = function(hash) {
          $location.hash(hash);
          $anchorScroll(hash);
        };
      })

      .directive('parameters', function () {
        return {
          restrict: 'EAC',
          scope: {
            params: '=',
            title: '='
          },
          templateUrl: 'templates/parameters.html'
        };
      });

    ng.bootstrap(document, ['app']);
  }
);
