/*jslint nomen: true, browser: true, white: true, plusplus: true, eqeq: true, es5: true, forin: true */
/*global angular, console, alert, scrolltomenu*/

(function () {
  'use strict';
  var app = angular.module('portale');

  app.controller("PanelController", function($scope, $http, $sce, $rootScope, $stateParams) {
    $scope.id = $stateParams.id;
    $rootScope.firstname = $rootScope.$storage.token_.first_name;
    $rootScope.lastname = $rootScope.$storage.token_.last_name;
    $rootScope.img = $rootScope.$storage.token_.avatar;

    $http.get( app.wp )
      .success(function(data, status, header, config) {
      $scope.name = data.name;
    })
      .error(function(data, status, header, config) {
      console.log("Error in $http.get() of PanelController (name)");
    });

    $http.get( app.wp + "menus/28" )
      .success(function(data, status, header, config) {
      $scope.panel_menu = data;
      $scope.panel_menu.items[0].img = 'tap.png';
      $scope.panel_menu.items[1].img = 'empty.png';
    })
      .error(function(data, status, header, config) {
      console.log("Error in $http.get() of PanelController (panel_menu)");
    });

    // qui occorre passare l'ID dell'utente loggato
    $http.get( "oauth/client.php?action=p&path=api/public/contratto/" + $rootScope.$storage.token_.ID )
      .success(function(data, status, header, config) {
      $scope.radio = "";
      if (data.contracts == "")
      {
        data.contracts = [];
        data.contracts[0] = {
          indirizzo : "Nessun Contratto Trovato",
          categoria : "",
          matricola : "",
          data : ""
        };
        $scope.radio = "{ 'display' : 'none' }";
      }
      $scope.contracts_ = data;
    })
      .error(function(data, status, header, config) {
      console.log("Error in $http.get() of PanelController (contracts)");
    });

    $scope.getid = function(id) {
      $scope.id_ = id;
    };

    $scope.shows = [];
    $scope.admin = [];
    $scope.show_sub = function(id) {
      var i;

      for (i in $scope.shows)
      {
        $scope.shows[i] = false;
        $scope.admin[i] = "";
      }

      if (!$scope.shows[id])
      {
        $scope.shows[id] = true;
        $scope.admin[id] = "admin-lateral";
      }
    };
  });

  app.controller("PanelContractCtrl", function($scope, $http, $sce, $rootScope, $stateParams) {
    $http.get( "oauth/client.php?action=p&path=api/public/contratto/" + $rootScope.$storage.token_.ID )
      .success(function(data, status, header, config) {
      $scope.contracts_ = data;
      $scope.details = $scope.contracts_.contracts[0];
    })
      .error(function(data, status, header, config) {
      console.log("Error in $http.get() of PanelController (contracts)");
    });

    $http.get( "oauth/client.php?action=p&path=api/public/contratto/dettaglio/" + $stateParams.id)
      .success(function(data, status, header, config) {
      $scope.contratto = data;
    })
      .error(function(data, status, header, config) {
      console.log("Error in $http.get() of PanelContractCtrl (contracts)");
    });

    $scope.permission = false;
    var data = $rootScope.$storage.token_;
    if (data.roles == "administrator")
    {
      $scope.permission = true;

      // carica lista utenti
      $http.get( "oauth/client.php?action=p&path=users" )
        .success(function(data, status, header, config) {
        $scope.users = data;
      })
        .error(function(data, status, header, config) {
        console.log("Error in $http.get() of PanelContractCtrl (users)");
      });
    }

  });

}());
