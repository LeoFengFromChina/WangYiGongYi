// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'oc.lazyLoad', 'templates', 'starter.config', 'starter.controllers', 'starter.services', 'ngResource'])
    .constant("$ionicLoadingConfig", {
        template: '<div class="ion-load-c loading-icon"></div>加载中...'
    })
    .run(function($ionicPlatform, $rootScope, $state, $ionicLoading, $log, My, User, Push) {

        $rootScope.requestErrorHandler = function(options, callback) {
            return function(response) {
                var error;
                if (response.data && response.data.error_msg) {
                    error = errorMsg[response.data.error_msg];
                } else {
                    error = errorMsg[response.status] || 'Error: ' + response.status + ' ' + response.statusText;
                }
                var o = options || {};
                angular.extend(o, {
                    template: error,
                    duration: 1000
                });
                $ionicLoading.show(o);
                return callback && callback();
            };
        };

        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.views.maxCache(30);
        $ionicConfigProvider.scrolling.jsScrolling(false);
        $ionicConfigProvider.platform.ios.tabs.style('standard');
        $ionicConfigProvider.platform.ios.tabs.position('bottom');
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('standard');

        $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');

        /*        $ionicConfigProvider.platform.ios.backButton.previousTitleText('返回').icon('ion-ios-arrow-back');
                $ionicConfigProvider.platform.android.backButton.previousTitleText('返回').icon('ion-ios-arrow-back');*/

        $ionicConfigProvider.backButton.text('返回').icon('ion-ios-arrow-back');

        /*   $ionicConfigProvider.platform.ios.views.transition('ios');
           $ionicConfigProvider.platform.android.views.transition('android');*/

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // setup an abstract state for the tabs directive
        /*    .state('tab', {
            url: '/tab',
            abstract: true,
            views: {
                "": {
                    //  controller: 'AppCtrl', // This view will use AppCtrl loaded below in the resolve
                    templateUrl: 'tabs.html'
                }
            }


        })*/

        // Each tab has its own nav history stack:

        .state('topics', {
                url: '/topics',
                views: {
                    'myview': {
                        templateUrl: 'tab-topics.html',
                        controller: 'TopicsCtrl'
                    }
                },
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    DashCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('js/controllers.js');
                    }]
                }
            })
            .state('topic', {
                url: '/topics/:topicsId',
                views: {
                    'myview': {
                        templateUrl: 'topic.html',
                        controller: 'TopicCtrl'
                    }
                }
            })
            .state('newtopic', {
                url: '/newTopic',
                views: {
                    'myview': {
                        templateUrl: 'newTopic.html',
                        controller: 'NewTopicCtrl'
                    }
                }
            })
            .state('chats', {
                url: '/chats',
                views: {
                    'myview': {
                        templateUrl: 'tab-chats.html',
                        controller: 'ChatsCtrl'
                    }
                }
            })
            .state('chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'myview': {
                        templateUrl: 'chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })
            .state('gift', {
                url: '/gift',
                views: {
                    'myview': {
                        templateUrl: 'tab-gift.html',
                        controller: 'GiftCtrl'
                    }
                }
            })
            .state('giftDetail', {
                url: '/gift/:giftId',
                views: {
                    'myview': {
                        templateUrl: 'gift-detail.html',
                        controller: 'GiftDetailCtrl'
                    }
                }
            })
            .state('account', {
                url: '/account',
                views: {
                    'myview': {
                        templateUrl: 'tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('basicInfo', {
                url: '/basicInfo',
                views: {
                    'myview': {
                        templateUrl: 'tab-basicInfo.html',
                        controller: 'BasicInfoCtrl'
                    }
                }
            })
            .state('login', {
                url: '/login',
                views: {
                    'myview': {
                        templateUrl: 'login.html',
                        controller: 'LoginCtrl'
                    }
                }
            })
            .state('reg', {
                url: '/reg',
                views: {
                    'myview': {
                        templateUrl: 'reg.html',
                        controller: 'RegCtrl'
                    }
                }
            })
            .state('userName', {
                url: '/userName',
                views: {
                    'myview': {
                        templateUrl: 'userName.html',
                        // controller: 'AccountCtrl'
                    }
                }
            })
            .state('address', {
                url: '/address',
                views: {
                    'myview': {
                        templateUrl: 'address.html',
                        // controller: 'AccountCtrl'
                    }
                }
            })
            .state('phone', {
                url: '/phone',
                views: {
                    'myview': {
                        templateUrl: 'phone.html',
                        // controller: 'AccountCtrl'
                    }
                }
            })
            .state('email', {
                url: '/email',
                views: {
                    'myview': {
                        templateUrl: 'email.html',
                        // controller: 'AccountCtrl'
                    }
                }
            })
            .state('expertise', {
                url: '/expertise',
                views: {
                    'myview': {
                        templateUrl: 'expertise.html',
                        // controller: 'AccountCtrl'
                    }
                }
            })
            .state('serviceSillingness', {
                url: '/serviceSillingness',
                views: {
                    'myview': {
                        templateUrl: 'serviceSillingness.html',
                        // controller: 'AccountCtrl'
                    }
                }
            })
            .state('feedback', {
                url: '/feedback',
                views: {
                    'myview': {
                        templateUrl: 'feedback.html',
                        // controller: 'AccountCtrl'
                    }
                }
            })
            .state('gender', {
                url: '/gender',
                views: {
                    'myview': {
                        templateUrl: 'gender.html',
                        // controller: 'AccountCtrl'
                    }
                }
            })
            .state('area', {
                url: '/area',
                views: {
                    'myview': {
                        templateUrl: 'area.html',
                        // controller: 'AccountCtrl'
                    }
                }
            })

        .state('myGift', {
            url: '/myGift',
            views: {
                'myview': {
                    templateUrl: 'tab-myGift.html',
                    // controller: 'AccountCtrl'
                }
            }
        })

        .state('help', {
            url: '/help',
            views: {
                'myview': {
                    templateUrl: 'tab-help.html',
                    // controller: 'AccountCtrl'
                }
            }
        })

       /* .state('account', {
            url: '/account',
            views: {
                'myview': {
                    templateUrl: 'tab-account.html',
                    // controller: 'AccountCtrl'
                }
            }
        })*/;

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/topics');

    })
    .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $stateProvider.state('honorRanking', {
                url: '/honorRanking',
                abstract: true,
                views: {
                    'myview': {
                        templateUrl: 'tab-honorRanking.html',
                        //controller: 'AccountCtrl'
                    }
                }
            })
            .state('honorRanking.local', {
                url: '/honorRanking/local',
                views: {
                    'myview': {
                        templateUrl: 'tab-honorRanking.html',
                        //controller: 'AccountCtrl'
                    }
                }
            })
            .state('honorRanking.all', {
                url: '/honorRanking/all',
                views: {
                    'myview': {
                        templateUrl: 'tab-honorRanking.html',
                        //controller: 'AccountCtrl'
                    }
                }
            })
    });
