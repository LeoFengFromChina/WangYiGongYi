// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'angularMoment', 'ngSanitize'])
    .constant("$ionicLoadingConfig", {
        template: '<div class="ion-load-c loading-icon"></div>加载中...'
    })

.run(function($ionicHistory, $rootScope, $ionicPlatform, $http, $ionicLoading, $timeout, amMoment) {
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

        // db = $cordovaSQLite.openDB({ name: "wygy.db" });
        // $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS banner (id integer primary key, username text, password text)");

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
        .state('tab.topics', {
            url: '/topics',
            views: {
                'tab-topics': {
                    templateUrl: 'templates/tab-topics.html',
                    controller: 'TopicsCtrl'
                }
            }
        })
        .state('tab.activity', {
            url: '/activity',
            views: {
                'tab-activity': {
                    templateUrl: 'templates/tab-activity.html',
                    controller: 'ActivityCtrl'
                }
            }
        })
        .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-account': {
                    templateUrl: 'templates/tab-chats.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
        .state('tab.gift', {
            url: '/gift',
            views: {
                'tab-gift': {
                    templateUrl: 'templates/tab-gift.html',
                    controller: 'GitfCtrl'
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
                    controller: 'AddressCtrl'
                }
            }
        })
        .state('tab.phone', {
            url: '/phone',
            views: {
                'tab-account': {
                    templateUrl: 'templates/phone.html',
                    controller: 'PhoneCtrl'
                }
            }
        })
        .state('tab.email', {
            url: '/email',
            views: {
                'tab-account': {
                    templateUrl: 'templates/email.html',
                    controller: 'EmailCtrl'
                }
            }
        })
        .state('tab.forgetPassword', {
            url: '/forgetPassword',
            views: {
                'tab-account': {
                    templateUrl: 'templates/forgetPassword.html',
                    controller: 'ForgetPasswordCtrl'
                }
            }
        })
        .state('tab.forgetCode', {
            url: '/forgetCode',
            views: {
                'tab-account': {
                    templateUrl: 'templates/forgetCode.html',
                    controller: 'ForgetCodeCtrl'
                }
            }
        })
        .state('tab.resetPassword', {
            url: '/resetPassword',
            views: {
                'tab-account': {
                    templateUrl: 'templates/resetPassword.html',
                    controller: 'ResetPasswordCtrl'
                }
            }
        })
        .state('tab.qq', {
            url: '/qq',
            views: {
                'tab-account': {
                    templateUrl: 'templates/qq.html',
                    controller: 'QQCtrl'
                }
            }
        })
        .state('tab.weixinNumber', {
            url: '/weixinNumber',
            views: {
                'tab-account': {
                    templateUrl: 'templates/weixinNumber.html',
                    controller: 'WeixinNumberCtrl'
                }
            }
        })
        .state('tab.education', {
            url: '/education',
            views: {
                'tab-account': {
                    templateUrl: 'templates/education.html',
                    controller: 'EducationCtrl'
                }
            }
        })
        .state('tab.profession', {
            url: '/profession',
            views: {
                'tab-account': {
                    templateUrl: 'templates/profession.html',
                    controller: 'ProfessionCtrl'
                }
            }
        })
        .state('tab.speciality', {
            url: '/speciality',
            views: {
                'tab-account': {
                    templateUrl: 'templates/speciality.html',
                    controller: 'SpecialityCtrl'
                }
            }
        })
        .state('tab.intention', {
            url: '/intention',
            views: {
                'tab-account': {
                    templateUrl: 'templates/intention.html',
                    controller: 'IntentionCtrl'
                }
            }
        })
        .state('tab.feedback', {
            url: '/feedback',
            views: {
                'tab-account': {
                    templateUrl: 'templates/feedbackList.html',
                    controller: 'FeedbackCtrl'
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
        .state('tab.region', {
            url: '/region',
            views: {
                'tab-account': {
                    templateUrl: 'templates/region.html',
                    controller: 'RegionCtrl'
                }
            }
        })
        .state('tab.identity', {
            url: '/identity',
            views: {
                'tab-account': {
                    templateUrl: 'templates/identity.html',
                    controller: 'IdentityCtrl'
                }
            }
        })
        .state('tab.intentionTime', {
            url: '/intentionTime',
            views: {
                'tab-account': {
                    templateUrl: 'templates/intentionTime.html',
                    controller: 'IntentionTimeCtrl'
                }
            }
        })
        .state('tab.myGift', {
            url: '/myGift',
            views: {
                'tab-account': {
                    templateUrl: 'templates/tab-myGift.html',
                    controller: 'MyGiftCtrl'
                }
            }
        })

    .state('tab.myTeam', {
            url: '/myTeam',
            views: {
                'tab-account': {
                    templateUrl: 'templates/tab-team.html',
                    controller: 'MyTeamCtrl'
                }
            }
        })
        .state('tab.rank', {
            url: '/rank',
            // abstract: true,
            views: {
                'tab-account': {
                    templateUrl: 'templates/rank.html',
                    controller: 'rankCtrl'
                }
            }
        })
        // .state('tab.rank.region', {
        //     url: '/region',
        //     views: {
        //         'rank-view': {
        //             templateUrl: 'templates/rankRegion.html',
        //             controller: 'rankCtrl'
        //         }
        //     }
        // })
        // .state('tab.rank.all', {
        //     url: '/all',
        //     views: {
        //         'rank-view': {
        //             templateUrl: 'templates/rankAll.html',
        //             controller: 'rankCtrl'
        //         }
        //     }
        // })

    .state('tab.help', {
            url: '/help',
            abstract: true,
            views: {
                'tab-account': {
                    templateUrl: 'templates/help.html',
                    controller: 'helpCtrl'
                }
            }
        })
        // 我的帮助
        .state('tab.help.myHelp', {
            url: '/myHelp',
            views: {
                'help-view': {
                    templateUrl: 'templates/myHelp.html',
                    controller: 'MyHelpCtrl'
                }
            }
        })
        //我的求助
        .state('tab.help.myAsk', {
            url: '/myAsk',
            views: {
                'help-view': {
                    templateUrl: 'templates/myAsk.html',
                    controller: 'MyAskCtrl'
                }
            }
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/start');

});
