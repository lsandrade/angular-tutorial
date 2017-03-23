app
.directive('integer', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.integer = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (INTEGER_REGEXP.test(viewValue)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
})

.directive('username', function($q, $timeout) {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      var usernames = ['Jim', 'John', 'Jill', 'Jackie'];

      ctrl.$asyncValidators.username = function(modelValue, viewValue) {

        if (ctrl.$isEmpty(modelValue)) {
          // consider empty model valid
          return $q.resolve();
        }

        var def = $q.defer();

        $timeout(function() {
          // Mock a delayed response
          if (usernames.indexOf(modelValue) === -1) {
            // The username is available
            def.resolve();
          } else {
            def.reject();
          }

        }, 2000);

        return def.promise;
      };
    }
  };
})

.directive('overwriteEmail', function() {
  var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@example\.com$/i;

  return {
    require: '?ngModel',
    link: function(scope, elm, attrs, ctrl) {
      // only apply the validator if ngModel is present and AngularJS has added the email validator
      if (ctrl && ctrl.$validators.email) {

        // this will overwrite the default AngularJS email validator
        ctrl.$validators.email = function(modelValue) {
          return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
        };
      }
    }
  };
})

.directive('contenteditable', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      // view -> model
      elm.on('blur', function() {
        ctrl.$setViewValue(elm.html());
      });

      // model -> view
      ctrl.$render = function() {
        elm.html(ctrl.$viewValue);
      };

      // load init value from DOM
      ctrl.$setViewValue(elm.html());
    }
  };
})

/*
  My directives
 */

.directive('welcome',function(){
  return {
    restrict: "E",
    controller: function($scope) {
      $scope.words = [];

      this.sayHello = function() {
        $scope.words.push("hello");
      };

      this.sayHowdy = function() {
        $scope.words.push("howdy");
      };

      this.sayHi = function() {
        $scope.words.push("hi");
      };
    },

    link: function(scope, element){
      element.bind("mouseenter", function() {
        console.log(scope.words);
      });
    },

      scope: {},
      transclude: true,
      template: "<div>This is the welcome component</div><ng-transclude></ng-transclude>",

  }
})
    .directive('hello', function(){
      return {
        require: "welcome",
          link: function(scope, element, attrs, welcomeCtrl){
            welcomeCtrl.sayHello();
          }
      }
    })

.directive('entering',function(){
  return function(scope, element, attrs){
      element.bind('mouseenter', function(){
        scope.$apply(attrs.entering);
      })
  }
})

.directive('leaving', function(){
  return function(scope, element, attrs){
    element.bind('mouseleave', function(){
      scope.$apply(attrs.leaving);
    })
  }
})

.directive('tab', function() {
  return {
    restrict: 'E',
    transclude: true,
    template: '<div role="tabpanel" ng-show="active" ng-transclude></div>',
    require: '^tabset',
      scope: {
        heading: '@'
      },
    link: function(scope, elem, attr, tabsetCtrl) {
      scope.active = false
      tabsetCtrl.addTab(scope)
    }
  }
})


.directive('tabset', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: { },
    templateUrl: 'tabset.html',
    bindToController: true,
    controllerAs: 'tabset',
    controller: function() {
      this.tabs = []

          this.addTab = function addTab(tab) {
          this.tabs.push(tab)

              if(this.tabs.length === 1)
                tab.active = true
      }

      this.select = function(selectedTab){
        angular.forEach(this.tabs, function(tab){
          if(tab.active && tab !== selectedTab){
            tab.active = false;
          }
        })
          selectedTab.active = true
      }
    }
  }
})

.directive('clock', function(){
  return {
    restrict: 'E',
      scope: {
        timezone: "@"
      },
      template: "<div>12:00pm {{timezone}}</div>"
  };
})

.directive("panel", function(){
  return {
    restrict: "E",
      transclude: true,
      scope: {
        title: "@"
      },
      template: "<div style='border: 3px solid #000000'>"+
          "<div class='alert-box'>{{title}}</div>"+
          "<div ng-transclude></div></div>"
  };
})

.directive("country", function(){
  return {
    restrict: "E",
      controller: function(){
        this.makeAnnouncement = function(message){
          console.log("Country says: " + message);
        }
      }
  }
})

.directive("state", function(){
  return {
    restrict: "E",
      controller: function(){
      this.makeLaw = function(law){
        console.log("Law: "+law)
      };
      }
  };
})

.directive("city", function(){
  return {
    restrict: "E",
      require: ["^country", "^state"],
      link: function(scope, element, attrs, ctrls){
        ctrls[0].makeAnnouncement("This City rocks");
        ctrls[1].makeLaw("Jump higher");
      }
  };
})

.directive("kid", function(){
  return {
    restrict: "E",
      scope: {
        done: "&"
      },
      template: "<input type='text' ng-model='chore'>" +
      "{{chhore}}"+
          "<div class='button' ng-click='done({chore : chore})'>I'm done</div>"
  };
})
;