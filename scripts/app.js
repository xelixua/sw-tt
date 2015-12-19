/*global angular*/
(function () {
  "use strict";
  
  var internetShopping = angular.module('internetShopping', []);
  
  internetShopping.controller("userController", ['$scope', function (scope){
      var isAuthorized = false;
      
      scope.userController = this;
      this.isAuthorized = isAuthorized;
      this.userName = "";
  }]);
  
  internetShopping.directive("rating", function() {
       return function($scope, element, attrs) {
          $scope.$watch(attrs.rating,function(ratingVal){
            var one = (ratingVal/1) >= 1? "fs.png" : "es.png",
                two = (ratingVal/2) >= 1? "fs.png" : "es.png",
                three = (ratingVal/3) >= 1? "fs.png" : "es.png",
                four = (ratingVal/4) >= 1? "fs.png" : "es.png",
                five = (ratingVal)/5 >= 1? "fs.png" : "es.png",
                ratingHtml = "<div class='row'>";
              
            ratingHtml+= "<div class='container'>";
            ratingHtml+= "<div class='col-md-2'><img src='" + one + "'></img></div>";
            ratingHtml+= "<div class='col-md-2'><img src='" + two + "'></img></div>";
            ratingHtml+= "<div class='col-md-2'><img src='" + three + "'></img></div>";
            ratingHtml+= "<div class='col-md-2'><img src='" + four + "'></img></div>";
            ratingHtml+= "<div class='col-md-2'><img src='" + five + "'></img></div>";
            ratingHtml+= "</div>";
            ratingHtml+= "</div>";
            element.html(element.html() + ratingHtml);
          });
        }
      });
  
  internetShopping.controller("navigationController", ['$scope', '$rootScope', function (scope, rootScope) {
      scope.navigationController = this;
      rootScope.navigationController = this;
      var location = 'signin';
      this.location = location;
  }]);
  
  internetShopping.controller("signUpController", ['$scope', function (scope) {
      var email,
        password,
        retypedPassword,
        malformedEmail = false,
        passwordsDontMatch = false,
        hashCode = function (input) {
        var hash = 0,
            char,
            i;
            
            if (input.length == 0) return hash;
            for (i = 0; i < input.length; i++) {
                char = input.charCodeAt(i);
                hash = ((hash<<5)-hash)+char;
                hash = hash & hash;
            }
            return hash;
        };
        
        scope.signUpRequest = function () {
          var emailTemplate = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
          email = scope.signUpController.email,
          password = scope.signUpController.password,
          retypedPassword = scope.signUpController.retypedPassword;
          
          scope.signUpController.malformedEmail = !emailTemplate.test(email);
          scope.signUpController.passwordsDontMatch = password !== retypedPassword;
          if(!(scope.signUpController.malformedEmail || scope.signUpController.passwordsDontMatch)){
              var passwordHash = hashCode(password);
              window.localStorage.setItem("login", email);
              window.localStorage.setItem("password", passwordHash);
          }
        };
        
        scope.signUpController = this;
        this.email = email;
        this.password = password;
        this.retypedPassword = retypedPassword;
        this.malformedEmail = malformedEmail;
        this.passwordsDontMatch = passwordsDontMatch;
  }]);
  
  internetShopping.controller("signinController", ['$scope', function (scope) {
      var email,
        password,
        hashCode = function (input) {
        var hash = 0,
            char,
            i;
            
            if (input.length == 0) return hash;
            for (i = 0; i < input.length; i++) {
                char = input.charCodeAt(i);
                hash = ((hash<<5)-hash)+char;
                hash = hash & hash;
            }
            return hash;
        };
        
        scope.signinController = this;
        this.email = email;
        this.password = password;
        
        scope.signInRequest = function () {
            var storedEmail = window.localStorage.getItem("login"),
                storedPasswordHash = window.localStorage.getItem("password"),
                passwordHash = hashCode(scope.signinController.password),
                email = scope.signinController.email;
                
                 if((email == storedEmail) && (passwordHash == storedPasswordHash)){
                  scope.userController.isAuthorized = true;
                  scope.userController.username = email;
                 }
        };
  }]);
  
  internetShopping.controller("searchController", ['$rootScope', '$scope', function (rootScope, scope) {
      var ColorEnum = {
            RED : "Red",
            WHITE : "White",
            BLACK : "Black",
            BLUE: "Blue",
            YELLOW: "Yellow",
            GREEN: "Green"
        },
        colors = ["Red", "White", "Black", "Blue", "Yellow", "Green"],
        items = [
          {
            id: "00001",
            name: "Thing1",
            color: ColorEnum.RED,
            issue_date: "1450386000000",
            price: 4.25,
            rating: 4.00,
            in_stock: true,
            image: "house.jpeg",
            rating: 1
        },
        {
            id: "00002",
            name: "Thing2",
            color: ColorEnum.BLACK,
            issue_date: "1450472536674",
            price: 4.28,
            rating: 5.00,
            in_stock: true,
            image: "car.jpeg",
            rating: 2
        },
        {
            id: "00003",
            name: "Thing3",
            color: ColorEnum.WHITE,
            issue_date: "1450472536674",
            price: 3.28,
            rating: 2.00,
            in_stock: false,
            image: "ship.jpeg",
            rating: 3
        },
        {
            id: "00004",
            name: "Thing4",
            color: ColorEnum.RED,
            issue_date: "1450472536624",
            price: 31.28,
            rating: 2.00,
            in_stock: true,
            image: "ship.jpeg",
            rating: 4
        },
        {
            id: "00005",
            name: "Thing5",
            color: ColorEnum.RED,
            issue_date: "1450472533674",
            price: 33.28,
            rating: 2.00,
            in_stock: false,
            image: "ship.jpeg",
            rating: 5
        }
      ],
      //filter models
      datefrom = "5/5/2014",
      dateto = "12/20/2016",
      inStockOnly = false,
      priceFrom = 0.00,
      priceTo = 100.00,
      color = ColorEnum.RED;
      
      $("#datefrom").datepicker();
      $("#dateto").datepicker();
      scope.searchController = this;
      scope.colors = ColorEnum;
      this.datefrom = datefrom;
      this.dateto = dateto;
      this.inStockOnly = inStockOnly;
      this.priceFrom = priceFrom;
      this.priceTo = priceTo;
      this.color = color;
      this.items = items;
      
      scope.checkInStockOnly = function () {
        scope.searchController.inStockOnly = document.getElementById("inStockOnlyCheck").checked;
      };
      
      scope.filterColor = function (col) {
        scope.searchController.color = col;
      };
      
      scope.priceInRange = function (item) {
          return item.price >= scope.searchController.priceFrom && item.price <= scope.searchController.priceTo;
      };
      scope.dateInRange = function (item) {
        var fromarr = scope.searchController.datefrom.split("/"),
            datefrom = new Date(fromarr[2], fromarr[0], fromarr[1], 0, 0, 0, 0),
            toarr = scope.searchController.dateto.split("/"),
            dateto = new Date(toarr[2], toarr[0], toarr[1], 23, 59, 59, 0);
            
        return (item.issue_date >= datefrom.getTime()) && (item.issue_date <= dateto.getTime());
      };
      scope.toStringDate = function (date) {
        var d = new Date(parseInt(date));
        return d.getMonth() + "/" + d.getDay() + "/" + d.getFullYear();  
      };
      
      scope.inStockCheck = function (item) {
          if(!scope.searchController.inStockOnly) return true;
          return item.in_stock;
      };
      scope.colorAsThis = function (item) {
          return item.color === scope.searchController.color;
      };
  }]);
  
  internetShopping.controller("cartController", ['$scope', '$rootScope',function (scope, rootScope) {
      var items = [];
      rootScope.cartController = this;
      this.items = items;
      this.size = "Cart is empty";
      this.sL = false;
      scope.Order = function (item) {
        rootScope.cartController.items.push(item);
        rootScope.cartController.size = "Cart: " + rootScope.cartController.items.length + " items";
      };
      
      scope.showList = function () {
        rootScope.cartController.sL = true;
      };
  }]);
})();