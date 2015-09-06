angular.module('starter.controllers', [])
    .controller('StartCtrl', function($scope, $state, $http, $timeout, $interval,
        $ionicPopup, $ionicActionSheet, $ionicPlatform, $ionicLoading, $ionicHistory, $rootScope) {
        console.log("typeof MideApp is" + typeof MideApp);
        MideApp.intoMyController($scope, $state);


        // var guideByUser = function(user) {
        //     if (user.profile && user.profile.step == 1) {
        //         $state.go('topics');

        //     } else {
        //         $state.go('topics');
        //     }
        // };

        // if (mideApp_user) {
        //     return guideByUser(mideApp_user);
        // }

        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
            alert(cordova.file);
            // var MySQLite = getSQLiteClass(window.sqlitePlugin.openDatabase("database.sqlite3"));
            // Yibeiban.setMySQLite(MySQLite);
            // MySQLite.findRecords('user_profile', '', function(res) {
            //     var profile = res.rows.length && res.rows.item(0);
            //     if (!profile || !profile.id_ybb) {
            //         return $ionicPopup.alert({
            //             title: '授权错误'
            //         });
            //     }

            //     ybb_user = Yibeiban.LocCache.load('User');
            //     if (ybb_user) {
            //         return guideByUser(ybb_user);
            //     }

            //     var fields = ['id_ybb', 'secret', 'gender', 'work_year', 'edu_level', 'current_salary', 'expected_salary', 'step', 'id_member', 'first_name', 'company', 'current_position', 'school', 'avatar', 'fake_name', 'city', 'job_requirement', 'industry_1', 'industry_2', 'device_type', 'device_code', 'contacts'];
            //     var params = {
            //         'id_ybb': profile.id_ybb,
            //         'secret': profile.secret,
            //         'params': fields
            //     };
            //     Yibeiban.myRemote('/user/profile/view', params, function(data) {
            //         ybb_user = {};
            //         ybb_user.profile = MySQLite.createRow('user_profile', data.result);
            //         ybb_user.contacts = [];
            //         data.result.contacts.sort(function(a, b) {
            //             return a.contact_type > b.contact_type ? 1 : -1;
            //         });
            //         for (i in data.result.contacts) {
            //             ybb_user.contacts.push(MySQLite.createRow('user_contact', data.result.contacts[i]));
            //         }
            //         var params = {
            //             'id_ybb': profile.id_ybb,
            //             'secret': profile.secret
            //         };
            //         Yibeiban.myRemote('/user/privacy/view', params, function(data) {
            //             ybb_user.privacy = MySQLite.createRow('user_privacy', data.result);
            //             Yibeiban.LocCache.save('User', ybb_user);
            //             if (ybb_user) {
            //                 return guideByUser(ybb_user);
            //             }
            //         });
            //     });
            // });
        }
        downloadFile('https://www.baidu.com/img/baidu_jgylogo3.gif', 'baidu');
        $state.go('topics');
    })
    .controller('TabCtrl', function($scope, $state) {
        console.log('TabCtrl');
        $scope.topics = function() {
            // mideApp.MemCache.save('job-main', false);
            $state.go('topics');
        };
        $scope.chats = function() {
            // mideApp.MemCache.save('say-list', false);
            $state.go('chats');
        };
        $scope.gift = function() {
            // mideApp.MemCache.save('msg-list', false);
            $state.go('gitf');
        };
        $scope.account = function() {
            $state.go('account');
        };
    })
    .controller('TopicsCtrl', function($http, $scope, $state, $rootScope, $cordovaFileTransfer, $cordovaFile, $ionicLoading, Tools) {
        MideApp.setBackManner('exit');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-show";

        // MideApp.downloadfile($cordovaFileTransfer, 'http://oukeye.github.io/testdata/topics.json', 'data/topics.json', function(result) {
        //     alert("成功"+result);
        // }, function(result) {
        //     alert("失败"+result);
        // }, function(result) {
        //     alert("处理中"+result);
        // });
        // var json = '[{"name":"zhangSan", "password":"123"},{"name":"liSi", "password":"321"}]';
        // $scope.topics = angular.fromJson(json);;
        // document.addEventListener('deviceready', function() {

        //     var url = 'http://oukeye.github.io/testdata/topics.json';
        //     var targetPath = cordova.file.externalDataDirectory + 'data/topics.json';
        //     var trustHosts = true
        //     var options = {};
        //     alert(targetPath);
        //     $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
        //         .then(function(result) {
        //             alert("成功" + result);
        //             $cordovaFile.readAsText(cordova.file.externalDataDirectory, 'data/topics.json')
        //                 .then(function(success) {
        //                     alert('success' + angular.fromJson);
        //                     $scope.topics = angular.fromJson(success);;
        //                     alert('success' + $scope.topics);
        //                 }, function(error) {
        //                     alert('error' + error);
        //                 });
        //         }, function(err) {
        //             alert("失败" + result);
        //         }, function(progress) {
        //             alert("处理中" + result);
        //         });

        // }, false);
        $scope.topics = [];

        $scope.config = MideApp.MemCache.load('topics-list') || {
            errormsg: false,
            infinite: true,
            number: 10,
            page: 1,
            topics: []
        };

        var load_page = function(callback) {
            if (!MideApp.isOnline()) {
                return MideApp.myNotice('暂无网络连接...');
            }

            MideApp.httpGet('/user/oukeye', function(data) {

                var _obj = {
                    "data": [{
                        "id": "1",
                        "author": {
                            "author_id": "1",
                            "author_name": "求助者姓名",
                            "avatar_url": "https://avatars.githubusercontent.com/u/5700428?v=3&s=120"
                        },
                        "helper": {
                            "helper_id": "1",
                            "helper_name": "帮助者姓名",
                            "avatar_url": "https://avatars.githubusercontent.com/u/5700428?v=3&s=120"
                        },
                        "content": "<div class=\"markdown-text\"><h2>介绍</h2>\n<blockquote>\n<p>这些天趁换工作的时间在家把客户端搞出来了，第一个版本，略糙，不要留什么情面，求拍砖求吐槽~</p>\n</blockquote>\n<blockquote>\n<p>N多地方参(zhao)考(chao)了大神<a href=\"http://ionichina.com/user/lanceli\">@lanceli</a>的<a href=\"https://cnodejs.org/topic/545aee5a3e1f39344c5b3b3e\">CNode社区</a>，大神不要打我啊~~</p>\n</blockquote>\n<h2>源码</h2>\n<p><a href=\"https://github.com/IonicChina/ioniclub\">https://github.com/IonicChina/ioniclub</a></p>\n<h2>下载地址</h2>\n<p><img src=\"http://r.ionichina.com/public/images/appdownload.png\" alt=\"下载二维码\"></p>\n<p><a href=\"https://itunes.apple.com/cn/app/id996999423\" target=\"_blank\">iOS</a>/<a href=\"https://fir.im/fqvr\" target=\"_blank\">Android</a></p>\n<p><strong>iOS尚未审核通过，无法下载</strong></p>\n<h2>主要功能</h2>\n<ol>\n<li>\n<p><strong>话题</strong></p>\n<ul>\n<li>浏览</li>\n<li>新建</li>\n<li>回复</li>\n</ul>\n</li>\n<li>\n<p><strong>探索</strong></p>\n<ul>\n<li>还没想好弄啥，打算弄点儿好玩儿的东西</li>\n</ul>\n</li>\n<li>\n<p><strong>我</strong></p>\n<ul>\n<li>个人信息</li>\n<li>收藏(跳票。。。)</li>\n<li>消息</li>\n<li>设置</li>\n</ul>\n</li>\n</ol>\n<h2>好了，拍吧。。。</h2>\n</div>",
                        "title": "照顾小孩求助",
                        "addtime": "2015-08-21T02:33:00.896Z",
                        "finishtime": "2015-08-21T02:33:00.896Z",
                        "status": 1

                    }, {
                        "id": "2",
                        "author": {
                            "author_id": "1",
                            "author_name": "求助者姓名",
                            "avatar_url": "https://avatars.githubusercontent.com/u/11486388?v=3&s=120"
                        },
                        "helper": {
                            "helper_id": "1",
                            "helper_name": "帮助者姓名",
                            "avatar_url": "https://avatars.githubusercontent.com/u/5700428?v=3&s=120"
                        },
                        "content": "<div class=\"markdown-text\"><h2>介绍</h2>\n<blockquote>\n<p>这些天趁换工作的时间在家把客户端搞出来了，第一个版本，略糙，不要留什么情面，求拍砖求吐槽~</p>\n</blockquote>\n<blockquote>\n<p>N多地方参(zhao)考(chao)了大神<a href=\"http://ionichina.com/user/lanceli\">@lanceli</a>的<a href=\"https://cnodejs.org/topic/545aee5a3e1f39344c5b3b3e\">CNode社区</a>，大神不要打我啊~~</p>\n</blockquote>\n<h2>源码</h2>\n<p><a href=\"https://github.com/IonicChina/ioniclub\">https://github.com/IonicChina/ioniclub</a></p>\n<h2>下载地址</h2>\n<p><img src=\"http://r.ionichina.com/public/images/appdownload.png\" alt=\"下载二维码\"></p>\n<p><a href=\"https://itunes.apple.com/cn/app/id996999423\" target=\"_blank\">iOS</a>/<a href=\"https://fir.im/fqvr\" target=\"_blank\">Android</a></p>\n<p><strong>iOS尚未审核通过，无法下载</strong></p>\n<h2>主要功能</h2>\n<ol>\n<li>\n<p><strong>话题</strong></p>\n<ul>\n<li>浏览</li>\n<li>新建</li>\n<li>回复</li>\n</ul>\n</li>\n<li>\n<p><strong>探索</strong></p>\n<ul>\n<li>还没想好弄啥，打算弄点儿好玩儿的东西</li>\n</ul>\n</li>\n<li>\n<p><strong>我</strong></p>\n<ul>\n<li>个人信息</li>\n<li>收藏(跳票。。。)</li>\n<li>消息</li>\n<li>设置</li>\n</ul>\n</li>\n</ol>\n<h2>好了，拍吧。。。</h2>\n</div>",
                        "title": "照顾小孩求助",
                        "addtime": "2015-08-21T02:33:00.896Z",
                        "finishtime": "2015-08-21T02:33:00.896Z",
                         "status": 2


                    }, {
                        "id": "3",
                        "author": {
                            "author_id": "1",
                            "author_name": "求助者姓名",
                            "avatar_url": "https://avatars.githubusercontent.com/u/9349200?v=3&s=120"
                        },
                        "helper": {
                            "helper_id": "1",
                            "helper_name": "帮助者姓名",
                            "avatar_url": "https://avatars.githubusercontent.com/u/5700428?v=3&s=120"
                        },
                        "content": "<div class=\"markdown-text\"><h2>介绍</h2>\n<blockquote>\n<p>这些天趁换工作的时间在家把客户端搞出来了，第一个版本，略糙，不要留什么情面，求拍砖求吐槽~</p>\n</blockquote>\n<blockquote>\n<p>N多地方参(zhao)考(chao)了大神<a href=\"http://ionichina.com/user/lanceli\">@lanceli</a>的<a href=\"https://cnodejs.org/topic/545aee5a3e1f39344c5b3b3e\">CNode社区</a>，大神不要打我啊~~</p>\n</blockquote>\n<h2>源码</h2>\n<p><a href=\"https://github.com/IonicChina/ioniclub\">https://github.com/IonicChina/ioniclub</a></p>\n<h2>下载地址</h2>\n<p><img src=\"http://r.ionichina.com/public/images/appdownload.png\" alt=\"下载二维码\"></p>\n<p><a href=\"https://itunes.apple.com/cn/app/id996999423\" target=\"_blank\">iOS</a>/<a href=\"https://fir.im/fqvr\" target=\"_blank\">Android</a></p>\n<p><strong>iOS尚未审核通过，无法下载</strong></p>\n<h2>主要功能</h2>\n<ol>\n<li>\n<p><strong>话题</strong></p>\n<ul>\n<li>浏览</li>\n<li>新建</li>\n<li>回复</li>\n</ul>\n</li>\n<li>\n<p><strong>探索</strong></p>\n<ul>\n<li>还没想好弄啥，打算弄点儿好玩儿的东西</li>\n</ul>\n</li>\n<li>\n<p><strong>我</strong></p>\n<ul>\n<li>个人信息</li>\n<li>收藏(跳票。。。)</li>\n<li>消息</li>\n<li>设置</li>\n</ul>\n</li>\n</ol>\n<h2>好了，拍吧。。。</h2>\n</div>",
                        "title": "照顾小孩求助",
                        "addtime": "2015-08-21T02:33:00.896Z",
                        "finishtime": "2015-08-21T02:33:00.896Z",
                         "status": 2


                    }, {
                        "id": "4",
                        "author": {
                            "author_id": "1",
                            "author_name": "求助者姓名",
                            "avatar_url": "https://avatars.githubusercontent.com/u/7659710?v=3&s=120"
                        },
                        "helper": {
                            "helper_id": "1",
                            "helper_name": "帮助者姓名",
                            "avatar_url": "https://avatars.githubusercontent.com/u/5700428?v=3&s=120"
                        },
                        "content": "<div class=\"markdown-text\"><h2>介绍</h2>\n<blockquote>\n<p>这些天趁换工作的时间在家把客户端搞出来了，第一个版本，略糙，不要留什么情面，求拍砖求吐槽~</p>\n</blockquote>\n<blockquote>\n<p>N多地方参(zhao)考(chao)了大神<a href=\"http://ionichina.com/user/lanceli\">@lanceli</a>的<a href=\"https://cnodejs.org/topic/545aee5a3e1f39344c5b3b3e\">CNode社区</a>，大神不要打我啊~~</p>\n</blockquote>\n<h2>源码</h2>\n<p><a href=\"https://github.com/IonicChina/ioniclub\">https://github.com/IonicChina/ioniclub</a></p>\n<h2>下载地址</h2>\n<p><img src=\"http://r.ionichina.com/public/images/appdownload.png\" alt=\"下载二维码\"></p>\n<p><a href=\"https://itunes.apple.com/cn/app/id996999423\" target=\"_blank\">iOS</a>/<a href=\"https://fir.im/fqvr\" target=\"_blank\">Android</a></p>\n<p><strong>iOS尚未审核通过，无法下载</strong></p>\n<h2>主要功能</h2>\n<ol>\n<li>\n<p><strong>话题</strong></p>\n<ul>\n<li>浏览</li>\n<li>新建</li>\n<li>回复</li>\n</ul>\n</li>\n<li>\n<p><strong>探索</strong></p>\n<ul>\n<li>还没想好弄啥，打算弄点儿好玩儿的东西</li>\n</ul>\n</li>\n<li>\n<p><strong>我</strong></p>\n<ul>\n<li>个人信息</li>\n<li>收藏(跳票。。。)</li>\n<li>消息</li>\n<li>设置</li>\n</ul>\n</li>\n</ol>\n<h2>好了，拍吧。。。</h2>\n</div>",
                        "title": "照顾小孩求助",
                        "addtime": "2015-08-21T02:33:00.896Z",
                        "finishtime": "2015-08-21T02:33:00.896Z",
                         "status": 3


                    }, {
                        "id": "5",
                        "author": {
                            "author_id": "1",
                            "author_name": "求助者姓名",
                            "avatar_url": "https://avatars.githubusercontent.com/u/2705854?v=3&s=120"
                        },
                        "helper": {
                            "helper_id": "1",
                            "helper_name": "帮助者姓名",
                            "avatar_url": "https://avatars.githubusercontent.com/u/5700428?v=3&s=120"
                        },
                        "content": "<div class=\"markdown-text\"><h2>介绍</h2>\n<blockquote>\n<p>这些天趁换工作的时间在家把客户端搞出来了，第一个版本，略糙，不要留什么情面，求拍砖求吐槽~</p>\n</blockquote>\n<blockquote>\n<p>N多地方参(zhao)考(chao)了大神<a href=\"http://ionichina.com/user/lanceli\">@lanceli</a>的<a href=\"https://cnodejs.org/topic/545aee5a3e1f39344c5b3b3e\">CNode社区</a>，大神不要打我啊~~</p>\n</blockquote>\n<h2>源码</h2>\n<p><a href=\"https://github.com/IonicChina/ioniclub\">https://github.com/IonicChina/ioniclub</a></p>\n<h2>下载地址</h2>\n<p><img src=\"http://r.ionichina.com/public/images/appdownload.png\" alt=\"下载二维码\"></p>\n<p><a href=\"https://itunes.apple.com/cn/app/id996999423\" target=\"_blank\">iOS</a>/<a href=\"https://fir.im/fqvr\" target=\"_blank\">Android</a></p>\n<p><strong>iOS尚未审核通过，无法下载</strong></p>\n<h2>主要功能</h2>\n<ol>\n<li>\n<p><strong>话题</strong></p>\n<ul>\n<li>浏览</li>\n<li>新建</li>\n<li>回复</li>\n</ul>\n</li>\n<li>\n<p><strong>探索</strong></p>\n<ul>\n<li>还没想好弄啥，打算弄点儿好玩儿的东西</li>\n</ul>\n</li>\n<li>\n<p><strong>我</strong></p>\n<ul>\n<li>个人信息</li>\n<li>收藏(跳票。。。)</li>\n<li>消息</li>\n<li>设置</li>\n</ul>\n</li>\n</ol>\n<h2>好了，拍吧。。。</h2>\n</div>",
                        "title": "照顾小孩求助",
                        "addtime": "2015-08-21T02:33:00.896Z",
                        "finishtime": "2015-08-21T02:33:00.896Z",
                         "status": 4


                    }]
                }

                $scope.config.page = $scope.config.page + 1;
                $scope.config.topics = $scope.config.topics.concat(_obj.data);
                $scope.config.errormsg = !$scope.config.topics.length;
                $scope.config.infinite = _obj.data.length;
                $ionicLoading.hide();
                callback && callback();
                MideApp.MemCache.save('topics-list', $scope.config);
                MideApp.LocCache.save('topics-list', $scope.config);

                if ($scope.config.page > 5) {
                    $scope.config.infinite = 0;
                }

            }, function() {
                // $scope.$broadcast('scroll.infiniteScrollComplete');
            });
            // Yibeiban.ajaxPost('/gossip/search', params, function(data) {
            //     $scope.config.page = $scope.config.page + 1;
            //     $scope.config.gossips = $scope.config.gossips.concat(data.result);
            //     $scope.config.errormsg = !$scope.config.gossips.length;
            //     $scope.config.infinite = data.result.length;
            //     $ionicLoading.hide();
            //     callback && callback();
            //     saveCache();
            // });
        };
        $scope.moreDataCanBeLoaded = function() {
            return true;
        }

        $scope.infinite = function() {
            load_page(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }


        // Tools.checkFile('banner', 'banner1.png', function(success, filepath) {
        //     alert('success:' + success);
        //     $scope.bannerImg = filepath;
        // }, function(err, filepath) {
        //     alert("err:" + err);
        //     $scope.bannerImg = "./img/wg_banner2.jpg";
        //     $scope.downloadImg();
        //     // $scope.bannerImg = targetPath;
        // });
        // var imgUrl = banner_dir + 'banner1.png';

        // $scope.bannerImg = imgUrl || "./img/wg_banner1.jpg";

        // $scope.downloadImg = function() {
        //     // MideApp.downloadImg($cordovaFileTransfer,'http://oukeye.github.io/images/wg_banner1.jpg','banner/banner1.png');
        //     document.addEventListener('deviceready', function() {

        //         var url = 'http://oukeye.github.io/images/wg_banner1.jpg';

        //         var targetPath = cordova.file.externalDataDirectory + 'banner/banner1.png';;
        //         var trustHosts = true
        //         var options = {};
        //         alert();

        //         $cordovaFileTransfer.download(url, targetPath, options, trustHosts)
        //             .then(function(result) {
        //                 alert('result:' + result);
        //                 $scope.bannerImg = targetPath;
        //             }, function(err) {
        //                 alert('err:' + err);
        //             }, function(progress) {
        //                 $timeout(function() {
        //                     alert(progress.loaded);
        //                     $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        //                 })
        //             });

        //     }, false);
        // }

    })
    .controller('TopicCtrl', function($scope, $state, $ionicActionSheet, $ionicLoading) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";
        $scope.finished = true;
        $scope.topic = {
            "id": "1",
            "author": {
                "author_id": "1",
                "author_name": "求助者姓名",
                "avatar_url": "https://avatars.githubusercontent.com/u/5700428?v=3&s=120"
            },
            "helper": {
                "helper_id": "1",
                "helper_name": "帮助者姓名",
                "avatar_url": "https://avatars.githubusercontent.com/u/5700428?v=3&s=120"
            },
            "content": "<div class=\"markdown-text\"><p>周末时间照顾孤儿院的孩子，可以帮忙辅导教学，心理辅导孩子，还可以卷正物资，和孩子做活动，教育孩子，让孩子健康成长</p><img class=\"full-image\" src=\"./img/topicsImg/1.jpg\"><img class=\"full-image\" src=\"./img/topicsImg/2.jpg\"><img class=\"full-image\" src=\"./img/topicsImg/3.jpg\"></div>",
            "title": "照顾孤儿院的孩子",
            "addtime": "2015-08-21T02:33:00.896Z",
            "finishtime": "2015-08-21T02:33:00.896Z",
            "status": 2
        }

        $scope.help = function() {
            $ionicActionSheet.show({
                titleText: '确认承接？',
                buttons: [{
                    text: '承接'
                }, {
                    text: '再看看'
                }, ],
                destructiveText: '',
                cancelText: "取消",
                cancel: function() {
                    console.log('CANCELLED');
                },
                buttonClicked: function(index) {

                    if (index == 0) {
                        $ionicLoading.show();
                        MideApp.httpGet('/user/oukeye', function(data) {

                            mideApp_user = {};
                            $ionicLoading.hide();
                            MideApp.myNotice('承接成功')
                        });
                    } else {
                        return true;
                    }

                    return true;


                },
                destructiveButtonClicked: function() {
                    console.log('DESTRUCT');
                    return true;
                },
                cssClass: "wg-sheet"
            });
        };

    })
    .controller('NewTopicCtrl', function($scope, $state) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

    })
    .controller('NewHelpCtrl', function($scope, $state) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

    })
    .controller('ChatsCtrl', function($scope, $state) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-show";

        $scope.doRefresh = function() {
            // Topics.fetchTopStories();
            alert("doRefresh")
        };

        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
        }];
        $scope.chats = chats;
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
    })

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $state) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-show";
        $scope.chat = Chats.get($stateParams.chatId);
    })
    .controller('GitfCtrl', function($scope, $state) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-show";

        var _allGift = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift1.jpg'
        }, {
            id: 1,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift2.jpg'
        }, {
            id: 2,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift3.jpg'
        }, {
            id: 3,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift4.jpg'
        }, {
            id: 4,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift5.jpg'
        }, {
            id: 5,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift6.jpg'
        }, {
            id: 6,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift7.jpg'
        }, {
            id: 7,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift8.jpg'
        }, {
            id: 8,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift9.jpg'
        }];

        $scope.gitfs = [];
        var _g = [];
        for (var i in _allGift) {
            _g.push(_allGift[i]);
            if ((i + 1) % 3 == 0) {
                $scope.gitfs.push(_g);
                _g = [];
            }

        }
    })
    .controller('GiftDetailCtrl', function($scope, $state, $stateParams) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.gift = {
            id: 1,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift2.jpg'
        };
    })
    .controller('AccountCtrl', function($scope, $rootScope, $state, $log, $ionicActionSheet, $ionicLoading, $filter) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-show";

        // 监听登录
        $rootScope.$on('app.login', function() {
            $log.debug('login broadcast handle');
            // get current user
            // var currentUser = User.getCurrentUser();
            $scope.mideApp_user = MideApp.LocCache.load("User") || {};

        });



        var mideApp_user = MideApp.LocCache.load('User') || {};

        if (!mideApp_user.username) { //&& user.username.step == 1

            $state.go('login');
            return true;
        }

        $scope.mideApp_user = mideApp_user;

        $scope.logout = function() {
                // Show the action sheet
                var hideSheet = $ionicActionSheet.show({

                    destructiveText: '退出登录',
                    titleText: '确定退出当前登录账号么？',
                    cancelText: '取消',
                    cancel: function() {
                        // add cancel code..
                    },
                    destructiveButtonClicked: function() {
                        logout();
                        return true;
                    },
                    cssClass: "wg-sheet"
                });

            }
            // logout action
        var logout = function() {
            $log.debug('logout button action');
            // User.logout();
            $rootScope.$broadcast('app.logout');
            $scope.mideApp_user = mideApp_user = {};
            MideApp.LocCache.clear();
            // track event
            /* if (window.analytics) {
                 window.analytics.trackEvent('User', 'logout');
             }*/
            // 刷新页面
            // $ionicHistory.clearHistory();
            // $ionicHistory.clearCache();
            $state.go('login');

            // $state.go("setting", {}, {
            //   reload: true
            // });


        };
        $scope.showActionsheet = function() {
            $ionicActionSheet.show({
                titleText: '请选择性别',
                buttons: [{
                    text: '<i class="icon ion-male balanced"></i> 男'
                }, {
                    text: '<i class="icon ion-female balanced"></i> 女'
                }, ],
                destructiveText: '',
                cancelText: "取消",
                cancel: function() {
                    console.log('CANCELLED');
                },
                buttonClicked: function(index) {

                    var gender_arr = ["男", "女"];
                    if (gender_arr[index] != $scope.mideApp_user.gender) {
                        $ionicLoading.show();
                        MideApp.httpGet('/user/' + $scope.mideApp_user.username, function(data) {
                            if (index == 0) {
                                $scope.mideApp_user.gender = "男";
                            } else {
                                $scope.mideApp_user.gender = "女";
                            }
                            mideApp_user = {};
                            $ionicLoading.hide();
                            MideApp.myNotice('修改成功')
                        });
                    }

                    return true;
                },
                destructiveButtonClicked: function() {
                    console.log('DESTRUCT');
                    return true;
                },
                cssClass: "wg-sheet"
            });
        };

        // "设置时间"Event
        $scope.deadline = function() {


            var mydate = new Date();
            if ($scope.mideApp_user.birthday != "") {
                mydate = new Date($scope.mideApp_user.birthday);
            }

            var options = {
                date: mydate,
                mode: 'date'
            };


            datePicker.show(options, function(date) {

                var _date = $filter("date")(date);
                var _birthday = $filter("date")($scope.mideApp_user.birthday);

                if (_date != _birthday) {
                    MideApp.httpGet('/user/' + $scope.mideApp_user.username, function(data) {
                        $scope.mideApp_user.birthday = date;

                        $ionicLoading.hide();
                        MideApp.myNotice('修改成功')
                    });
                }


            }, function() {
                // MideApp.myNotice('修改失败')
            });
        }
    })
    .controller('LoginCtrl', function($scope, $rootScope, $ionicActionSheet, $ionicLoading, $state, $ionicPopup) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-show";

        // mideApp_user = MideApp.LocCache.load('User');

        // $scope.mideApp_user = mideApp_user || {};
        // if (typeof $scope.mideApp_user.username !== 'undefined') {
        //     $state.go("account");
        // }
        $scope.mideApp_user = {};
        $scope.doLogin = function() {
            if (!MideApp.isOnline()) {
                return MideApp.myNotice('暂无网络连接...');
            }
            if ('' == $scope.mideApp_user.username) {
                return MideApp.myNotice('尚有内容未填写...');
            }
            if ('' == $scope.mideApp_user.password) {
                return MideApp.myNotice('尚有内容未填写...');
            }
            // if (!ybb_user.profile.current_salary.toString().match(/^[0-9]+$/) || ybb_user.profile.current_salary < 2000 || ybb_user.profile.current_salary > 500000) {
            //     return MideApp.myNotice('有效薪资范围：2000-500000');
            // }

            $ionicLoading.show();
            // ybb_user.profile.job_requirement = JSON.stringify($scope.job_requirement);


            MideApp.httpGet('/user/' + $scope.mideApp_user.username, function(data) {
                mideApp_user = {};
                data = {
                    avatar_url: "https://avatars.githubusercontent.com/u/8086489?v=3&s=120",
                    create_at: "2015-08-11T07:42:33.409Z",
                    useranme: "oukeye",
                    score: 0,
                    gender: "男",
                    birthday: "1987-09-09",
                    phoneNumber: 88888888888,
                    email: "mide@qq.com",
                    QQnumber: 491238861,
                    region: "广州",
                    identity: 1358053058622,
                    address: "广州市东圃镇",
                    weixinNumber: "微信号码",
                    education: "本科",
                    profession: "软件技术",
                    speciality: "计算机WEBApp",
                    intention: "很高",
                    intentionTime: "10:00-17:00"

                }
                mideApp_user.username = data.useranme;
                mideApp_user.avatar_url = data.avatar_url;
                mideApp_user.create_at = data.create_at;
                mideApp_user.score = data.score;

                mideApp_user.gender = data.gender;
                mideApp_user.birthday = data.birthday;
                mideApp_user.phoneNumber = data.phoneNumber;
                mideApp_user.email = data.email;
                mideApp_user.QQnumber = data.QQnumber;
                mideApp_user.region = data.region;
                mideApp_user.identity = data.identity;
                mideApp_user.address = data.address;
                mideApp_user.weixinNumber = data.weixinNumber;
                mideApp_user.education = data.education;
                mideApp_user.profession = data.profession;
                mideApp_user.speciality = data.speciality;
                mideApp_user.intention = data.intention;
                mideApp_user.intentionTime = data.intentionTime



                MideApp.LocCache.save('User', mideApp_user);
                MideApp.MemCache.save('User', mideApp_user);

                $ionicLoading.hide();
                $rootScope.$broadcast('app.login');
                $state.go("account");
            });
        };

        // 一个提示对话框
        var showAlert = function(title, template) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: template
            });
            alertPopup.then(function(res) {
                console.log('Thank you for not eating my delicious ice cream cone');
            });
        };

    })
    .controller('RegCtrl', function($scope, $ionicActionSheet, $state, $ionicLoading, $timeout) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-show";
        $scope.mideApp_user = {};


        $scope.showGendersheet = function() {
            $ionicActionSheet.show({
                titleText: '性别',
                buttons: [{
                    text: '<i class="icon ion-male balanced"></i> 男'
                }, {
                    text: '<i class="icon ion-female balanced"></i> 女'
                }, ],
                destructiveText: '',
                cancelText: "取消",
                cancel: function() {
                    console.log('CANCELLED');
                },
                buttonClicked: function(index) {
                    console.log('BUTTON CLICKED', index);
                    if (index == 0) {
                        $scope.mideApp_user.gender = "男";
                    } else {
                        $scope.mideApp_user.gender = "女";
                    }
                    return true;
                },
                destructiveButtonClicked: function() {
                    console.log('DESTRUCT');
                    return true;
                },
                cssClass: "wg-sheet"
            });
        };


        $scope.doReg = function() {
            if (!MideApp.isOnline()) {
                return MideApp.myNotice('暂无网络连接...');
            }
            if ('' == $scope.mideApp_user.unsename) {
                return MideApp.myNotice('尚有内容未填写...');
            }
            if ('' == $scope.mideApp_user.password) {
                return MideApp.myNotice('尚有内容未填写...');
            }
            if ('' == $scope.mideApp_user.confirmPassword) {
                return MideApp.myNotice('尚有内容未填写...');
            }
            if ('' == $scope.mideApp_user.gender) {
                return MideApp.myNotice('尚有内容未填写...');
            }
            if ('' == $scope.mideApp_user.birthday) {
                return MideApp.myNotice('尚有内容未填写...');
            }
            if ('' == $scope.mideApp_user.phoneNumber) {
                return MideApp.myNotice('尚有内容未填写...');
            }
            if ('' == $scope.mideApp_user.email) {
                return MideApp.myNotice('尚有内容未填写...');
            }
            if ('' == $scope.mideApp_user.QQnumber) {
                return MideApp.myNotice('尚有内容未填写...');
            }
            // if (!ybb_user.profile.current_salary.toString().match(/^[0-9]+$/) || ybb_user.profile.current_salary < 2000 || ybb_user.profile.current_salary > 500000) {
            //     return MideApp.myNotice('有效薪资范围：2000-500000');
            // }

            $ionicLoading.show();
            // ybb_user.profile.job_requirement = JSON.stringify($scope.job_requirement);

            //模拟网络请求  实际用post 保存用户信息
            MideApp.httpGet('/user/oukeye', function(data) {
                mideApp_user = {};
                mideApp_user.username = data.username;
                mideApp_user.avatar_url = data.avatar_url;
                // mideApp_user.create_at = data.create_at;
                // mideApp_user.score = data.score;
                $scope.mideApp_user.avatar_url = data.avatar_url;
                MideApp.LocCache.save('User', $scope.mideApp_user);
                MideApp.MemCache.save('User', $scope.mideApp_user);

                $ionicLoading.hide();

                MideApp.myNotice('注册成功')
                $timeout(function() {
                    $state.go("login");
                }, 1000);
                // $rootScope.$broadcast('app.login');

            });
        };

        $scope.regMore = function() {
            MideApp.LocCache.save('User', mideApp_user);
            MideApp.MemCache.save('User', mideApp_user);
            $state.go("regMore", $scope.mideApp_user);
        }

    })

.controller('RegMoreCtrl', function($scope, $ionicActionSheet, $state, $ionicLoading, $timeout) {
    MideApp.setBackManner('back');
    MideApp.intoMyController($scope, $state);
    $scope.$root.tabsHidden = "tabs-show";

    mideApp_user = MideApp.LocCache.load('User');
    $scope.mideApp_user = mideApp_user || {};

    $scope.doRegMore = function() {
        if (!MideApp.isOnline()) {
            return MideApp.myNotice('暂无网络连接...');
        }
        if ('' == $scope.mideApp_user.unsename) {
            return MideApp.myNotice('尚有内容未填写...');
        }
        if ('' == $scope.mideApp_user.password) {
            return MideApp.myNotice('尚有内容未填写...');
        }
        if ('' == $scope.mideApp_user.confirmPassword) {
            return MideApp.myNotice('尚有内容未填写...');
        }
        if ('' == $scope.mideApp_user.gender) {
            return MideApp.myNotice('尚有内容未填写...');
        }
        if ('' == $scope.mideApp_user.birthday) {
            return MideApp.myNotice('尚有内容未填写...');
        }
        if ('' == $scope.mideApp_user.phoneNumber) {
            return MideApp.myNotice('尚有内容未填写...');
        }
        if ('' == $scope.mideApp_user.email) {
            return MideApp.myNotice('尚有内容未填写...');
        }
        if ('' == $scope.mideApp_user.QQnumber) {
            return MideApp.myNotice('尚有内容未填写...');
        }
        // if (!ybb_user.profile.current_salary.toString().match(/^[0-9]+$/) || ybb_user.profile.current_salary < 2000 || ybb_user.profile.current_salary > 500000) {
        //     return MideApp.myNotice('有效薪资范围：2000-500000');
        // }

        $ionicLoading.show();
        // ybb_user.profile.job_requirement = JSON.stringify($scope.job_requirement);

        //模拟网络请求  实际用post 保存用户信息
        MideApp.httpGet('/user/oukeye', function(data) {
            mideApp_user = {};
            mideApp_user.username = data.username;
            mideApp_user.avatar_url = data.avatar_url;
            // mideApp_user.create_at = data.create_at;
            // mideApp_user.score = data.score;

            MideApp.LocCache.save('User', mideApp_user);
            MideApp.MemCache.save('User', mideApp_user);

            $ionicLoading.hide();

            MideApp.myNotice('注册成功')
            $timeout(function() {
                $state.go("login");
            }, 1000);
            // $rootScope.$broadcast('app.login');

        });
    };

    $scope.regMore = function() {
        MideApp.LocCache.save('User', $scope.mideApp_user);
        MideApp.MemCache.save('User', $scope.mideApp_user);
        $state.go("regMore");
    }

})

.controller('BasicInfoCtrl', function($scope, $ionicActionSheet) {
        mideApp_user = MideApp.LocCache.load('User');
        $scope.mideApp_user = mideApp_user || {};

        $scope.showActionsheet = function() {
            $ionicActionSheet.show({
                titleText: '性别',
                buttons: [{
                    text: '<i class="icon ion-male balanced"></i> 男'
                }, {
                    text: '<i class="icon ion-female balanced"></i> 女'
                }, ],
                destructiveText: '',
                cancelText: "取消",
                cancel: function() {
                    console.log('CANCELLED');
                },
                buttonClicked: function(index) {
                    console.log('BUTTON CLICKED', index);
                    if (index == 0) {
                        $scope.genter = "男";
                    } else {
                        $scope.genter = "女";
                    }
                    return true;
                },
                destructiveButtonClicked: function() {
                    console.log('DESTRUCT');
                    return true;
                },
                cssClass: "wg-sheet"
            });
        };
    })
    .controller('PhoneCtrl', function($scope, $state, $ionicLoading) {

        $scope.mideApp_user = MideApp.LocCache.load('User') || {};

        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.save = function() {
            MideApp.httpGet('/user/' + $scope.mideApp_user.username, function(data) {

                MideApp.LocCache.save("User", $scope.mideApp_user);
                $ionicLoading.hide();
                MideApp.myNotice('修改成功')
                $state.go("account");
            });
        }

    })
    .controller('EmailCtrl', function($scope, $state, $ionicLoading) {

        $scope.mideApp_user = MideApp.LocCache.load('User') || {};

        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.save = function() {
            MideApp.httpGet('/user/' + $scope.mideApp_user.username, function(data) {

                MideApp.LocCache.save("User", $scope.mideApp_user);
                $ionicLoading.hide();
                MideApp.myNotice('修改成功')
                $state.go("account");
            });
        }

    })
    .controller('QQCtrl', function($scope, $state, $ionicLoading) {

        $scope.mideApp_user = MideApp.LocCache.load('User') || {};

        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.save = function() {
            MideApp.httpGet('/user/' + $scope.mideApp_user.username, function(data) {

                MideApp.LocCache.save("User", $scope.mideApp_user);
                $ionicLoading.hide();
                MideApp.myNotice('修改成功')
                $state.go("account");
            });
        }

    })
    .controller('RegionCtrl', function($scope, $state, $ionicLoading) {

        $scope.mideApp_user = MideApp.LocCache.load('User') || {};

        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.save = function() {
            MideApp.httpGet('/user/' + $scope.mideApp_user.username, function(data) {

                MideApp.LocCache.save("User", $scope.mideApp_user);
                $ionicLoading.hide();
                MideApp.myNotice('修改成功')
                $state.go("account");
            });
        }

    })
    .controller('IdentityCtrl', function($scope, $state, $ionicLoading) {

        $scope.mideApp_user = MideApp.LocCache.load('User') || {};

        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.save = function() {
            MideApp.httpGet('/user/' + $scope.mideApp_user.username, function(data) {

                MideApp.LocCache.save("User", $scope.mideApp_user);
                $ionicLoading.hide();
                MideApp.myNotice('修改成功')
                $state.go("account");
            });
        }

    })
    .controller('AddressCtrl', function($scope, $state, $ionicLoading) {

        $scope.mideApp_user = MideApp.LocCache.load('User') || {};

        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.save = function() {
            MideApp.httpGet('/user/' + $scope.mideApp_user.username, function(data) {

                MideApp.LocCache.save("User", $scope.mideApp_user);
                $ionicLoading.hide();
                MideApp.myNotice('修改成功')
                $state.go("account");
            });
        }

    })
    .controller('WeixinNumberCtrl', function($scope, $state, $ionicLoading) {

        $scope.mideApp_user = MideApp.LocCache.load('User') || {};

        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.save = function() {
            MideApp.httpGet('/user/' + $scope.mideApp_user.username, function(data) {

                MideApp.LocCache.save("User", $scope.mideApp_user);
                $ionicLoading.hide();
                MideApp.myNotice('修改成功')
                $state.go("account");
            });
        }

    })
    .controller('EducationCtrl', function($scope, $state, $ionicLoading) {

        $scope.mideApp_user = MideApp.LocCache.load('User') || {};

        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.save = function() {
            MideApp.httpGet('/user/' + $scope.mideApp_user.username, function(data) {

                MideApp.LocCache.save("User", $scope.mideApp_user);
                $ionicLoading.hide();
                MideApp.myNotice('修改成功')
                $state.go("account");
            });
        }

    })
    .controller('ProfessionCtrl', function($scope, $state, $ionicLoading) {

        $scope.mideApp_user = MideApp.LocCache.load('User') || {};

        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.save = function() {
            MideApp.httpGet('/user/' + $scope.mideApp_user.username, function(data) {

                MideApp.LocCache.save("User", $scope.mideApp_user);
                $ionicLoading.hide();
                MideApp.myNotice('修改成功')
                $state.go("account");
            });
        }

    })
    .controller('SpecialityCtrl', function($scope, $state, $ionicLoading) {

        $scope.mideApp_user = MideApp.LocCache.load('User') || {};

        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.save = function() {
            MideApp.httpGet('/user/' + $scope.mideApp_user.username, function(data) {

                MideApp.LocCache.save("User", $scope.mideApp_user);
                $ionicLoading.hide();
                MideApp.myNotice('修改成功')
                $state.go("account");
            });
        }

    })
    .controller('IntentionCtrl', function($scope, $state, $ionicLoading) {

        $scope.mideApp_user = MideApp.LocCache.load('User') || {};

        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.save = function() {
            MideApp.httpGet('/user/' + $scope.mideApp_user.username, function(data) {

                MideApp.LocCache.save("User", $scope.mideApp_user);
                $ionicLoading.hide();
                MideApp.myNotice('修改成功')
                $state.go("account");
            });
        }

    })
    .controller('IntentionTimeCtrl', function($scope, $state, $ionicLoading) {

        $scope.mideApp_user = MideApp.LocCache.load('User') || {};

        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.save = function() {
            MideApp.httpGet('/user/' + $scope.mideApp_user.username, function(data) {

                MideApp.LocCache.save("User", $scope.mideApp_user);
                $ionicLoading.hide();
                MideApp.myNotice('修改成功')
                $state.go("account");
            });
        }

    })

;
