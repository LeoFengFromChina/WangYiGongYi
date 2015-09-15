// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'angularMoment','ngSanitize'])
    .constant("$ionicLoadingConfig", {
        template: '<div class="ion-load-c loading-icon"></div>加载中...'
    })

.run(function($ionicHistory,$rootScope, $ionicPlatform, $http, $ionicLoading, $timeout,amMoment) {
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
         // set moment locale
    amMoment.changeLocale('zh-cn');

    });



    MideApp.setMyIonicLoading($ionicLoading);
    MideApp.setMyHttp($http);
    MideApp.setMyTimeout($timeout);
    MideApp.setMyionicHistory($ionicHistory);
    MideApp.setMyRootScope($rootScope);
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

    // $ionicConfigProvider.platform.ios.scrolling.jsScrolling(false);
    // $ionicConfigProvider.platform.android.scrolling.jsScrolling(false);

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
            // abstract: true,

            views: {
                'main-view': {
                    templateUrl: 'templates/tabs.html',
                    controller: 'TabCtrl'
                }
            }
        })
        .state('topics', {
                url: '/topics',
                views: {
                    'main-view': {
                        templateUrl: 'templates/tab-topics.html',
                        controller: 'TopicsCtrl'
                    }
                }
        })
        .state('chats', {
            url: '/chats',
            views: {
                'main-view': {
                    templateUrl: 'templates/tab-chats.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
        .state('chat-detail', {
            url: '/chats/:chatId',
            views: {
                'main-view': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })
        .state('gift', {
            url: '/gift',
            views: {
                'main-view': {
                    templateUrl: 'templates/tab-gift.html',
                    controller: 'GitfCtrl'
                }
            }
        })
        .state('account', {
            url: '/account',
            views: {
                'main-view': {
                    templateUrl: 'templates/tab-account.html',
                    controller: 'AccountCtrl'
                }
            }
        })
        .state('basicInfo', {
            url: '/basicInfo',
            views: {
                'main-view': {
                    templateUrl: 'templates/tab-basicInfo.html',
                    controller: 'BasicInfoCtrl'
                }
            }
        })
        .state('login', {
            url: '/login',
            views: {
                'main-view': {
                    templateUrl: 'templates/login.html',
                    controller: 'LoginCtrl'
                }
            }
        })
        .state('reg', {
            url: '/reg',
            views: {
                'main-view': {
                    templateUrl: 'templates/reg.html',
                    controller: 'RegCtrl'
                }
            }
        })
        .state('userName', {
            url: '/userName',
            views: {
                'main-view': {
                    templateUrl: 'templates/userName.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('address', {
            url: '/address',
            views: {
                'main-view': {
                    templateUrl: 'templates/address.html',
                    controller: 'AddressCtrl'
                }
            }
        })
        .state('phone', {
            url: '/phone',
            views: {
                'main-view': {
                    templateUrl: 'templates/phone.html',
                    controller: 'PhoneCtrl'
                }
            }
        })
        .state('email', {
            url: '/email',
            views: {
                'main-view': {
                    templateUrl: 'templates/email.html',
                    controller: 'EmailCtrl'
                }
            }
        })
        .state('forgetPassword', {
            url: '/forgetPassword',
            views: {
                'main-view': {
                    templateUrl: 'templates/forgetPassword.html',
                    controller: 'ForgetPasswordCtrl'
                }
            }
        })
        .state('forgetCode', {
            url: '/forgetCode',
            views: {
                'main-view': {
                    templateUrl: 'templates/forgetCode.html',
                    controller: 'ForgetCodeCtrl'
                }
            }
        })
        .state('resetPassword', {
            url: '/resetPassword',
            views: {
                'main-view': {
                    templateUrl: 'templates/resetPassword.html',
                    controller: 'ResetPasswordCtrl'
                }
            }
        })
        .state('qq', {
            url: '/qq',
            views: {
                'main-view': {
                    templateUrl: 'templates/qq.html',
                    controller: 'QQCtrl'
                }
            }
        })
        .state('weixinNumber', {
            url: '/weixinNumber',
            views: {
                'main-view': {
                    templateUrl: 'templates/weixinNumber.html',
                    controller: 'WeixinNumberCtrl'
                }
            }
        })
        .state('education', {
            url: '/education',
            views: {
                'main-view': {
                    templateUrl: 'templates/education.html',
                    controller: 'EducationCtrl'
                }
            }
        })
        .state('profession', {
            url: '/profession',
            views: {
                'main-view': {
                    templateUrl: 'templates/profession.html',
                    controller: 'ProfessionCtrl'
                }
            }
        })
        .state('speciality', {
            url: '/speciality',
            views: {
                'main-view': {
                    templateUrl: 'templates/speciality.html',
                    controller: 'SpecialityCtrl'
                }
            }
        })
        .state('intention', {
            url: '/intention',
            views: {
                'main-view': {
                    templateUrl: 'templates/intention.html',
                    controller: 'IntentionCtrl'
                }
            }
        })
        .state('feedback', {
            url: '/feedback',
            views: {
                'main-view': {
                    templateUrl: 'templates/feedbackList.html',
                    controller: 'FeedbackCtrl'
                }
            }
        })
        .state('gender', {
            url: '/gender',
            views: {
                'main-view': {
                    templateUrl: 'templates/gender.html',
                    // controller: 'AccountCtrl'
                }
            }
        })
        .state('region', {
            url: '/region',
            views: {
                'main-view': {
                    templateUrl: 'templates/region.html',
                    controller: 'RegionCtrl'
                }
            }
        })
        .state('identity', {
            url: '/identity',
            views: {
                'main-view': {
                    templateUrl: 'templates/identity.html',
                    controller: 'IdentityCtrl'
                }
            }
        })
        .state('intentionTime', {
            url: '/intentionTime',
            views: {
                'main-view': {
                    templateUrl: 'templates/intentionTime.html',
                    controller: 'IntentionTimeCtrl'
                }
            }
        })
        .state('myGift', {
            url: '/myGift',
            views: {
                'main-view': {
                    templateUrl: 'templates/tab-myGift.html',
                    controller: 'MyGiftCtrl'
                }
            }
        })
        
        .state('myTeam', {
                url: '/myTeam',
                views: {
                    'main-view': {
                        templateUrl: 'templates/myTeam.html',
                        controller: 'MyTeamCtrl'
                    }
                }
            })
        .state('rank', {
            url: '/rank',
            abstract: true,
            views: {
                'main-view': {
                    templateUrl: 'templates/rank.html',
                    controller: 'rankCtrl'
                }
            }
        })
        .state('rank.region', {
            url: '/region',
            views: {
                'rank-view': {
                    templateUrl: 'templates/rankRegion.html',
                    controller: 'rankCtrl'
                }
            }
        })
        .state('rank.all', {
            url: '/all',
            views: {
                'rank-view': {
                    templateUrl: 'templates/rankAll.html',
                    controller: 'rankCtrl'
                }
            }
        })

        .state('help', {
            url: '/help',
            abstract: true,
            views: {
                'main-view': {
                    templateUrl: 'templates/help.html',
                    controller: 'helpCtrl'
                }
            }
        })
        // 我的帮助
        .state('help.myHelp', {
            url: '/myHelp',
            views: {
                'help-view': {
                    templateUrl: 'templates/myHelp.html',
                    controller: 'MyHelpCtrl'
                }
            }
        })
        //我的求助
        .state('help.myAsk', {
            url: '/myAsk',
            views: {
                'help-view': {
                    templateUrl: 'templates/myAsk.html',
                    controller: 'MyAskCtrl'
                }
            }
        })
        ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/start');

});
