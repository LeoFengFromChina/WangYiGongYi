// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])
    .constant("$ionicLoadingConfig", {
        template: '<div class="ion-load-c loading-icon"></div>加载中...'
    })
    .run(function($ionicHistory, $ionicPlatform, $http, $ionicLoading, $timeout) {
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



        MideApp.setMyIonicLoading($ionicLoading);
        MideApp.setMyHttp($http);
        MideApp.setMyTimeout($timeout);
        MideApp.setMyionicHistory($ionicHistory);
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $ionicPlatform.registerBackButtonAction(function() {
            MideApp.backward('tabs-show');
        }, 5000);
    })

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');
    $ionicConfigProvider.backButton.text(' ').icon('ion-ios-arrow-back');

     $ionicConfigProvider.scrolling.jsScrolling(false);


    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('start', {
            url: '/start',
            views: {
                'main-view': {
                    templateUrl: 'templates/start.html',
                    controller: 'StartCtrl'
                }
            }

        })

    .state('tab', {
        url: '/tab',
        abstract: true,

        views: {
            'main-view': {
                templateUrl: 'templates/tabs.html',
                controller: 'TabCtrl'
            }
        }
    })

    // Each tab has its own nav history stack:

    .state('tab.topics', {
            url: '/topics',
            views: {
                'tab-topics': {
                    templateUrl: 'templates/tab-topics.html',
                    controller: 'TopicsCtrl'
                }
            }
        })
        .state('tab.topic', {
            url: '/topics/:topicId',
            views: {
                'tab-topics': {
                    templateUrl: 'templates/topic.html',
                    controller: 'TopicCtrl'
                }
            }
        })
        .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/tab-chats.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })
        .state('tab.gitf', {
            url: '/gitf',
            views: {
                'tab-gitf': {
                    templateUrl: 'templates/tab-gitf.html',
                    controller: 'GitfCtrl'
                }
            }
        })
        .state('tab.giftDetail', {
            url: '/gift/:giftId',
            views: {
                'tab-gift': {
                    templateUrl: 'templates/gift-detail.html',
                    controller: 'GiftDetailCtrl'
                }
            }
        })
        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    templateUrl: 'templates/tab-account.html',
                    controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.basicInfo', {
            url: '/basicInfo',
            views: {
                'tab-account': {
                    templateUrl: 'templates/tab-basicInfo.html',
                    controller: 'BasicInfoCtrl'
                }
            }
        })
        .state('tab.login', {
            url: '/login',
            views: {
                'tab-account': {
                    templateUrl: 'templates/login.html',
                    controller: 'LoginCtrl'
                }
            }
        })
        .state('tab.reg', {
            url: '/reg',
            views: {
                'tab-account': {
                    templateUrl: 'templates/reg.html',
                    controller: 'RegCtrl'
                }
            }
        })
        .state('tab.userName', {
            url: '/userName',
            views: {
                'tab-account': {
                    templateUrl: 'templates/userName.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.address', {
            url: '/address',
            views: {
                'tab-account': {
                    templateUrl: 'templates/address.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.phone', {
            url: '/phone',
            views: {
                'tab-account': {
                    templateUrl: 'templates/phone.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.email', {
            url: '/email',
            views: {
                'tab-account': {
                    templateUrl: 'templates/email.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.expertise', {
            url: '/expertise',
            views: {
                'tab-account': {
                    templateUrl: 'templates/expertise.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.serviceSillingness', {
            url: '/serviceSillingness',
            views: {
                'tab-account': {
                    templateUrl: 'templates/serviceSillingness.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.feedback', {
            url: '/feedback',
            views: {
                'tab-account': {
                    templateUrl: 'templates/feedback.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.gender', {
            url: '/gender',
            views: {
                'tab-account': {
                    templateUrl: 'templates/gender.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.area', {
            url: '/area',
            views: {
                'tab-account': {
                    templateUrl: 'templates/area.html',
                    // controller: 'AccountCtrl'
                }
            }
        })

    .state('tab.myGift', {
        url: '/myGift',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-myGift.html',
                // controller: 'AccountCtrl'
            }
        }
    })

    .state('tab.help', {
        url: '/help',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-help.html',
                // controller: 'AccountCtrl'
            }
        }
    })

    .state('tab.myTeam', {
            url: '/myTeam',
            views: {
                'tab-account': {
                    templateUrl: 'templates/tab-myTeam.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('tab.regMore', {
            url: '/regMore',
            views: {
                'tab-account': {
                    templateUrl: 'templates/regMore.html',
                    controller: 'RegMoreCtrl'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/start');

});
