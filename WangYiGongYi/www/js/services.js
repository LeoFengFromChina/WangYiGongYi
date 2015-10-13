angular.module('starter.services', ['ngCordova'])
    .factory('Tools', function($cordovaFile) {
        var checkFile = function(fileDir, fileName, successCallback, errorCallback) {

            document.addEventListener('deviceready', function() {
                var externalDataDirectory = cordova.file.externalDataDirectory;
                var banner_dir = externalDataDirectory + fileDir;
                $cordovaFile.checkFile(banner_dir, fileName)
                    .then(function(success) {
                        successCallback(success, banner_dir + fileName);
                    }, function(error) {
                        errorCallback(error, banner_dir + fileName)
                    });
            });

        }

        return {
            checkFile: function(fileDir, fileName, successCallback, errorCallback) {
                checkFile(fileDir, fileName, successCallback, errorCallback);
            }
        };
    })
    .factory('RankTabs', function() {
        return [{
            value: 'all',
            label: '全国'
        }, {
            value: 'gz',
            label: '广州'
        }, {
            value: 'fs',
            label: '佛山'
        }];
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
    )
    .directive('focusMe', function($timeout) {
        return {
            link: function(scope, element, attrs) {
                $timeout(function() {
                    element[0].focus();
                }, 1000);
            }
        };
    })
    .directive('textarea', function() {
        return {
            restrict: 'E',
            link: function(scope, element, attr) {
                var update = function() {

                    var _sh = element[0].scrollHeight
                    var _h = element[0].offsetHeight;
                    if (_sh != _h && _h < _sh && _sh < 200) {
                        element.css("height", (_sh + 4) + "px");
                    }

                };
                scope.$watch(attr.ngModel, function() {
                    update();
                });
            }
        };
    })
    .factory('User', function(ENV, $resource, $log, $q, Storage, Push) {
        var storageKey = 'user';
        var resource = $resource(ENV.api + '/accesstoken');
        var userResource = $resource(ENV.api + '/user/:loginname', {
            loginname: ''
        });
        var user = Storage.get(storageKey) || {};
        return {
            login: function(accesstoken) {
                var $this = this;
                return resource.save({
                    accesstoken: accesstoken
                }, null, function(response) {
                    $log.debug('post accesstoken:', response);
                    user.accesstoken = accesstoken;
                    $this.getByLoginName(response.loginname).$promise.then(function(r) {
                        user = r.data;
                        user.id = response.id;
                        user.accesstoken = accesstoken;

                        // set alias for jpush
                        Push.setAlias(user.id);

                        Storage.set(storageKey, user);
                    });
                    user.loginname = response.loginname;
                });
            },
            logout: function() {
                user = {};
                Storage.remove(storageKey);

                // unset alias for jpush
                Push.setAlias('');
            },
            getCurrentUser: function() {
                $log.debug('current user:', user);
                return user;
            },
            getByLoginName: function(loginName) {
                if (user && loginName === user.loginname) {
                    var userDefer = $q.defer();
                    $log.debug('get user info from storage:', user);
                    userDefer.resolve({
                        data: user
                    });
                    return {
                        $promise: userDefer.promise
                    };
                }
                return this.get(loginName);
            },
            get: function(loginName) {
                return userResource.get({
                    loginname: loginName
                }, function(response) {
                    $log.debug('get user info:', response);
                    if (user && user.loginname === loginName) {
                        angular.extend(user, response.data);

                        Storage.set(storageKey, user);
                    }
                });
            }
        };
    });
