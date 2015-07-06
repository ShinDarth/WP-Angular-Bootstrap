/*jslint browser: true, white: true, plusplus: true, eqeq: true, es5: true, forin: true */
/*global angular, console, alert*/

(function () {
  'use strict';

  var app = angular.module('portale');

  // indirizzo di wordpress con app.wp-json plugin
  app.wp = "../wordpress/wp-json/";

  // routing
  app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state('home', {
      url: '/home',
      data: {
        css: 'css/home.css'
      },
      views: {
        '': {
          controller: 'HomeController',
          templateUrl: "partials/home.html"
        },
        'footer@home': {
          controller: 'FooterController',
          templateUrl: 'partials/footer.html'
        }
      }
    })
      .state('section', {
      url: '/section/:menu/',
      data: {
        css: 'css/section.css'
      },
      views: {
        '': {
          controller: 'SectionController',
          templateUrl: "partials/section.html"
        },
        'footer@section': {
          controller: 'FooterController',
          templateUrl: 'partials/footer.html'
        }
      }
    })
      .state('section.post', {
      url: 'post/:id',
      controller: 'PostController',
      templateUrl: "partials/section.post.html"
    })
      .state('section.category', {
      url: 'category/:id',
      controller: 'CategoryController',
      templateUrl: "partials/section.category.html",
    })
      .state('section.page', {
      url: 'page/:id',
      controller: 'PageController',
      templateUrl: "partials/section.page.html"
    })
      .state('panel', {
      url: '/panel/',
      data: {
        css:  'css/panel.css'
      },
      views: {
        '': {
          controller: 'PanelController',
          templateUrl: "partials/panel.html"
        }
      }
    })
      .state('panel.contratti-acquedotto', {
      url: 'contratti-acquedotto/',
      views: {
        '': {
          controller: 'AcquedottoCtrl',
          templateUrl: "partials/panel.contratti-acquedotto.html"
        }
      }
    })
      .state('panel.inserisci-contratto-acquedotto', {
      url: 'inserisci-contratto-acquedotto/',
      views: {
        '': {
          controller: 'AcquedottoCtrl',
          templateUrl: "partials/panel.inserisci-contratto-acquedotto.html"
        }
      }
    })
      .state('panel.contratto-acquedotto', {
      url: 'contratti-acquedotto/:id',
      views: {
        '': {
          controller: 'AcquedottoCtrl',
          templateUrl: "partials/panel.contratto-acquedotto.html"
        }
      }
    });
  });

}());
