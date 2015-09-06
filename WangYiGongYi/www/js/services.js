angular.module('starter.services', ['ngCordova'])
    .factory('Tools', function($cordovaFile) {
        var checkFile = function(fileDir, fileName, successCallback, errorCallback) {

            document.addEventListener('deviceready', function() {
                 var externalDataDirectory = cordova.file.externalDataDirectory;
                 var banner_dir = externalDataDirectory + fileDir;
                $cordovaFile.checkFile(banner_dir, fileName)
                    .then(function(success) {
                        successCallback(success,banner_dir+fileName);
                    }, function(error) {
                        errorCallback(error,banner_dir+fileName)
                    });
            });

        }

        return {
            checkFile: function(fileDir, fileName, successCallback, errorCallback) {
                checkFile(fileDir, fileName, successCallback, errorCallback);
            }
        };
    })
    .filter('avatarFilter', function() {
    return function(src) {
      // add https protocol
      if (src) {
        src = src.replace("https://avatars.githubusercontent.com", "http://7xj5bc.com1.z0.glb.clouddn.com");
        src = src + "&imageView2/2/w/120";
      }
      return src;
    };
  })
    .directive(
  // Collection-repeat image recycling while loading
  // https://github.com/driftyco/ionic/issues/1742
  'resetImg',
  function($document) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attributes) {
        var applyNewSrc = function(src) {
          var newImg = $element.clone(true);

          newImg.attr('src', src);
          $element.replaceWith(newImg);
          $element = newImg;
        };

        $attributes.$observe('src', applyNewSrc);
        $attributes.$observe('ngSrc', applyNewSrc);
      }
    };
  }
);
