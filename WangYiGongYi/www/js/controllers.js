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
        // downloadFile('https://www.baidu.com/img/baidu_jgylogo3.gif', 'baidu');
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
    .controller('TopicsCtrl', function($http, $ionicActionSheet, $scope, $state, $rootScope, $cordovaFileTransfer, $ionicScrollDelegate, $cordovaFile, $ionicLoading, $ionicModal, $filter, Tools) {
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
        // 
        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/topicModal.html', {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function(modal) {
            $scope.topicModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeTopicModal = function() {
            $scope.topicModal.hide();
        };

        // Open the login modal
        $scope.showTopicModal = function(topicId) {
            $scope.topicShowId = {
                "id": topicId
            };
            $ionicScrollDelegate.scrollTop();
            $scope.topicModal.show();
        };
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
                            $scope.closeTopicModal();
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

        //我要求助
        $ionicModal.fromTemplateUrl('templates/newTopic.html', {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function(modal) {
            $scope.newTopicModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeNewTopicModal = function() {
            $scope.newTopicModal.hide();
        };

        // Open the login modal
        $scope.showNewTopicModal = function() {

            $ionicScrollDelegate.scrollTop();
            $scope.newTopicModal.show();
        };
        $scope.showNewTopicsheet = function(info) {
            if (typeof info == 'undefined') {
                info = "";
            };
            $ionicActionSheet.show({
                titleText: '确定' + info + '？',
                buttons: [{
                    text: '是'
                }, {
                    text: '否'
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

                            MideApp.myNotice(info + '成功')
                            $scope.closeNewTopicModal();
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
        //我要助人
        $ionicModal.fromTemplateUrl('templates/newHelp.html', {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function(modal) {
            $scope.newHelpModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeNewHelpModal = function() {
            $scope.newHelpModal.hide();
        };

        // Open the login modal
        $scope.showNewHelpModal = function() {

            $ionicScrollDelegate.scrollTop();
            $scope.newHelpModal.show();
        };
        $scope.showNewHelpsheet = function(info) {
            if (typeof info == 'undefined') {
                info = "";
            };
            $ionicActionSheet.show({
                titleText: '确定' + info + '？',
                buttons: [{
                    text: '是'
                }, {
                    text: '否'
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

                            MideApp.myNotice(info + '成功')
                            $scope.closeNewHelpModal();
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
                            "author_name": "ABC君",
                            "avatar_url": "https://avatars.githubusercontent.com/u/5700428?v=3&s=120"
                        },
                        "helper": {
                            "helper_id": "1",
                            "helper_name": "帮助者姓名",
                            "avatar_url": "https://avatars.githubusercontent.com/u/5700428?v=3&s=120"
                        },
                        "content": "<div><p>我们相信这个世界有爱，希望全社会都来帮帮这个孩子，帮帮这个妈妈！我们想到了网络，通过网络能让更多的好心人看到，大家的力量是伟大的，钰林的病肯定就能有救了，希望看到这个帖子的再生“父母”们，能献出自己的爱心，转载给更多的好心人，帮帮小钰林，病情不能再耽误了，钰林的命靠大家了，现在妈妈在省人民医院做第八次化疗，我们全家人在这里深深鞠躬，先谢谢大家了。好人有好报，好人一生平安。孩子父亲，娄建国手机号：13783430073</p><img src='http://www.zgaxgyw.com/manageadmin/kindeditor-4.1.7/attached/image/20141104/20141104084096409640.jpeg' alt=''><img src='http://www.zgaxgyw.com/manageadmin/kindeditor-4.1.7/attached/image/20141104/20141104084512681268.jpeg' alt=''><img src='http://www.zgaxgyw.com/manageadmin/kindeditor-4.1.7/attached/image/20141104/20141104084634763476.jpeg' alt=''></div>",
                        "title": "救救这个孩子，救救这个家",
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
                        "content": "<div><p>他就是淮北相山区一个年仅2岁的孩子赵天佑，天佑是一名“极低体重早产儿”，只有1400克，所以刚出生时体质就特别差，再加上小天佑接二连三被查出患有新生儿先天性脑萎缩症，新生儿败血症，新生儿缺氧缺血性脑病等各种新生儿综合症，他的父母只好带着小天佑在医院治疗，可又一个坏消息传来让小天佑的父母孙忠元与赵贝贝差点崩溃，小天佑因抢救的极端需要，他所佩戴的呼吸机使他丧失了视力，为了挽救小天佑的生命，挽救他们的孩子，小天佑的父母咬着牙给小天佑治病，花光积蓄，甚至现在已负债累累，但眼下却仍因缺少治疗费用而无法进行下一步的治疗在家修养，情况非常不乐观，而就在这几天小天佑开始抽搐，他需要去治疗，他是那样一个鲜活可爱的小生命，不能因为没钱而放弃对小天佑的治疗，要知道，一个天使般生命的夭折，是对一个家庭深到骨髓里的打击。</p><p> 救助一个孩子，温暖整个家庭， 同志们，一样的生命一样的梦，一样的真情一样的感动，一分一元甚至百元万元，都凝聚着大家的爱心，都昭示着人间真爱请大家伸出你们的援助之手，奉献您的无限爱意，送去您强有力的支持，让我们行动起来，为小天佑送去希望，让他能健康快乐的成长，同志们，请伸出你们的双手，托起这明天的太阳，为小天佑的明天架起爱的桥梁。</p><img src='http://www.zgaxgyw.com/manageadmin/kindeditor-4.1.7/attached/image/20140506/20140506112615921592.jpg' alt=''><img src='http://www.zgaxgyw.com/manageadmin/kindeditor-4.1.7/attached/image/20140506/2014050611260939939.jpg' alt=''></div>",
                        "title": "别让小天佑失去生命",
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
                        "content": "<div><p>六岁的男童等待骨髄移植，高昂的医疗费成了拦路虎一个不幸的家庭又出现在我们面前，父亲是个退伍军人尊纪守法，热于助人。却因小孩范乐祥于去年12月的一天上幼儿园不小心跌倒，一直流鼻血不止，到医院检查，在12月18日添加到日历小乐乐被确诊为急性淋巴细胞白血病。医生告诉我们结果时候，对于我们一个普通的农村家庭来说犹如晴天霹雳，如今儿子已经患有白血病，我们也无力挽回。不得不接受事实，现在经过五个月的化疗，是骨髓移植的最佳时期。却因骨髄移植需要一比高昂的手朮费，如今手术费已成为我们的＂拦路虎＂了。因之前化疗已发费家里的所有积蓄和借款共计二十余万元，现要骨髓移植还需50万元医疗费。多方求助、东凑西凑也是杯水车薪，只好在此恳求社会爱心人士救救我那不幸的孩子。您的慈悲之心换来孩子的新生，你们的一次次转发将给我们父母带来希望。作为孩子的父亲在此跪谢了。谢谢你们。祝各位好心人，一身平安，身体健康。</p><img src='http://www.zgaxgyw.com/manageadmin/kindeditor-4.1.7/attached/image/20140616/20140616094928932893.jpg' alt=''></div>",
                        "title": "六岁的男童等待骨髄移植，高昂的医疗费成了拦路虎",
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
                        "content": "<div><p>花季少女为筹集手术费跪求好心人帮助.陈敏，女，12岁，家住陕西铜川市耀州区小丘镇移村四组。家里有78岁的爷爷、爸爸妈妈和仅4岁的弟弟。在她出生的第三天就被查出患有先天性脊柱侧弯的顽症，为了治病，家里为了给她治病，花去了20多万元，家中负债累累，恳请大家给予帮助。</p><img src='http://www.shilehui.com/UserImage/0/20131017060914412088.JPG' alt=''></div>",
                        "title": "花季少女为筹集手术费跪求好心人帮助",
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
                        "content": "<div><p>彭思睿，男，1岁，家住江苏徐州市邳州市江苏徐州市邳州市徐州市邳州宿羊山镇苏口村。儿子彭思睿五个月查出，宝宝得了家族噬血病，这病必须干细胞移植才能治好宝宝病，手术费用需要几十万，对于农村的我们一辈子都挣不到。但我决不放弃我的宝宝！希望大家救救我的宝贝，我第一个宝宝也是这种病走了，没想到我第二个宝宝也得了噬血病。现在正在医院接受化疗，如果宝宝受到感染了，随时都会复发，时间就是生命，我相信人间有真情，跪求好心人的帮助，医生说不治的话更没希望，希望大家可怜我的宝贝，能伸出援手帮帮我的小宝贝！上天会保佑所有的好心人的！</p><img src='http://www.shilehui.com/UserImage/0/20131013032200560088.PNG' alt=''></div>",
                        "title": "跪求拯救我6个月患噬血病宝宝",
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
    .controller('ChatsCtrl', function($scope, $state, $ionicModal, $ionicScrollDelegate) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-show";

        $scope.doRefresh = function() {
            // Topics.fetchTopStories();
            alert("doRefresh")
        };

        var chats = [{
            id: 0,
            name: '陈先生(公益活动组织者)',
            lastText: '你帮助陈阿姨看护孩子的事情已经完成，谢谢你的参与！',
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        }, {
            id: 1,
            name: '黄先生',
            lastText: '多谢您，承接了我的帮助',
            face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
        }, {
            id: 2,
            name: '李先生',
            lastText: '多谢您，承接了我的帮助',
            face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
        }, {
            id: 3,
            name: '张三',
            lastText: '多谢您，承接了我的帮助',
            face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
        }, {
            id: 4,
            name: '小明',
            lastText: '多谢您，承接了我的帮助',
            face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
        }];
        $scope.chats = chats;
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };

        $ionicModal.fromTemplateUrl('templates/chat-detail.html', {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function(modal) {
            $scope.chatModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeChatModal = function() {
            $scope.chatModal.hide();
        };

        // Open the login modal
        $scope.showChatModal = function(chatId) {
            $scope.chatShowId = {
                "id": chatId
            };
            $ionicScrollDelegate.scrollTop();
            $scope.chatModal.show();
        };
    })

.controller('ChatDetailCtrl', function($scope, $stateParams, $state) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-show";
        $scope.chat = {};
    })
    .controller('GitfCtrl', function($scope, $ionicLoading,$state,$ionicActionSheet, $ionicModal,$ionicScrollDelegate) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-show";

        var _allGift = [{
            id: 0,
            name: '充电宝与耳塞',
            lastText: 'You on your way?',
            img: './img/gift1.jpg'
        }, {
            id: 1,
            name: '纪念公仔',
            lastText: 'You on your way?',
            img: './img/gift2.jpg'
        }, {
            id: 2,
            name: '迷你音箱',
            lastText: 'You on your way?',
            img: './img/gift3.jpg'
        }, {
            id: 3,
            name: '白色安卓手机数据线',
            lastText: 'You on your way?',
            img: './img/gift4.jpg'
        }, {
            id: 4,
            name: '充电宝与迷你风扇',
            lastText: 'You on your way?',
            img: './img/gift5.jpg'
        }, {
            id: 5,
            name: "手机耳塞",
            lastText: 'You on your way?',
            img: './img/gift6.jpg'
        }, {
            id: 6,
            name: '手机耳塞',
            lastText: 'You on your way?',
            img: './img/gift7.jpg'
        }, {
            id: 7,
            name: '电脑包',
            lastText: 'You on your way?',
            img: './img/gift8.jpg'
        }, {
            id: 8,
            name: '充电宝',
            lastText: 'You on your way?',
            img: './img/gift9.jpg'
        }];

        $scope.gifts = _allGift;
        //我要助人
        $ionicModal.fromTemplateUrl('templates/gift-detail.html', {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function(modal) {
            $scope.giftModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeGiftModal = function() {
            $scope.giftModal.hide();
        };

        // Open the login modal
        $scope.showGiftModal = function(giftId) {
            $scope.giftShowId = {
                "id": giftId
            };
            $ionicScrollDelegate.scrollTop();
            $scope.giftModal.show();
        };
        $scope.showGiftsheet = function(info) {
            if (typeof info == 'undefined') {
                info = "";
            };
            $ionicActionSheet.show({
                titleText: '确定' + info + '？',
                buttons: [{
                    text: '是'
                }, {
                    text: '否'
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

                            MideApp.myNotice(info + '成功')
                            $scope.closeGiftModal();
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
    .controller('GiftDetailCtrl', function($scope, $state, $stateParams, $ionicActionSheet, $ionicLoading) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.gift = {
            id: 1,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift2.jpg'
        };
        $scope.showActionsheet = function() {
            $ionicActionSheet.show({
                titleText: '确定兑换？',
                buttons: [{
                    text: '是'
                }, {
                    text: '否'
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
                            MideApp.myNotice('兑换成功')
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

        // if (!mideApp_user.username) { //&& user.username.step == 1

        //     $state.go('login');
        //     return true;
        // }

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
                    username: "oukeye",
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
                    intentionTime: "10:00-17:00",
                    flag: 1

                }
                mideApp_user = data;
                // mideApp_user.avatar_url = data.avatar_url;
                // mideApp_user.create_at = data.create_at;
                // mideApp_user.score = data.score;

                // mideApp_user.gender = data.gender;
                // mideApp_user.birthday = data.birthday;
                // mideApp_user.phoneNumber = data.phoneNumber;
                // mideApp_user.email = data.email;
                // mideApp_user.QQnumber = data.QQnumber;
                // mideApp_user.region = data.region;
                // mideApp_user.identity = data.identity;
                // mideApp_user.address = data.address;
                // mideApp_user.weixinNumber = data.weixinNumber;
                // mideApp_user.education = data.education;
                // mideApp_user.profession = data.profession;
                // mideApp_user.speciality = data.speciality;
                // mideApp_user.intention = data.intention;
                // mideApp_user.intentionTime = data.intentionTime
                // mideApp_user.intentionTime = data.intentionTime


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
    .controller('RegCtrl', function($scope, $ionicActionSheet, $state, $ionicLoading, $timeout, $cordovaCamera, $ionicModal, $ionicScrollDelegate) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-show";
        $scope.mideApp_user = {};

        var getPicture = function() {
            document.addEventListener("deviceready", function() {

                var options = {
                    quality: 50,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 100,
                    targetHeight: 100,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                $cordovaCamera.getPicture(options).then(function(imageData) {
                    $timeout(function() {
                        $scope.mideApp_user.avatar_url = "data:image/jpeg;base64," + imageData;
                    }, 10);

                }, function(err) {
                    // error
                });

            }, false);
        };
        var getPictures = function() {
            options = {
                // max images to be selected, defaults to 15. If this is set to 1, upon
                // selection of a single image, the plugin will return it.
                maximumImagesCount: 1,

                // max width and height to allow the images to be.  Will keep aspect
                // ratio no matter what.  So if both are 800, the returned image
                // will be at most 800 pixels wide and 800 pixels tall.  If the width is
                // 800 and height 0 the image will be 800 pixels wide if the source
                // is at least that wide.
                width: 100,
                height: 100,

                // quality of resized image, defaults to 100
                quality: 80
            };

            window.imagePicker.getPictures(
                function(imageData) {
                    $timeout(function() {
                        // $scope.mideApp_user.avatar_url = "data:image/jpeg;base64," + imageData;
                        $scope.mideApp_user.avatar_url = imageData[0];
                    }, 10);

                },
                function(error) {
                    alert('Error: ' + error);
                }, options);
        };
        $scope.showGetImagesheet = function() {
            $ionicActionSheet.show({
                // titleText: '性别',
                buttons: [{
                    text: '相机'
                }, {
                    text: '图库'
                }, ],
                destructiveText: '',
                cancelText: "取消",
                cancel: function() {
                    console.log('CANCELLED');
                },
                buttonClicked: function(index) {
                    if (index == 0) {
                        getPicture();
                    } else {
                        getPictures();
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
        // "设置时间"Event
        $scope.getDate = function() {


            var mydate = new Date();
            if (typeof($scope.mideApp_user.birthday) != "undefined") {
                mydate = new Date($scope.mideApp_user.birthday);
            }

            var options = {
                date: mydate,
                mode: 'date'
            };

            datePicker.show(options, function(date) {
                $timeout(function() {
                    $scope.mideApp_user.birthday = date;
                }, 10);



            }, function(err) {
                alert(err)
                    // MideApp.myNotice('修改失败')
            });
        }

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

                $scope.closeReForHelpModal();
                $scope.closeRegVolunteerModal();
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

        $ionicModal.fromTemplateUrl('templates/regForHelp.html', {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function(modal) {
            $scope.reForHelpModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeReForHelpModal = function() {
            $scope.reForHelpModal.hide();
        };
        $scope.showReForHelpModal = function() {

            $ionicScrollDelegate.scrollTop();
            $scope.reForHelpModal.show();
        };

        $ionicModal.fromTemplateUrl('templates/regVolunteer.html', {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function(modal) {
            $scope.regVolunteerModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeRegVolunteerModal = function() {
            $scope.regVolunteerModal.hide();
        };
        $scope.showRegVolunteerModal = function() {

            $ionicScrollDelegate.scrollTop();
            $scope.regVolunteerModal.show();
        };

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
    .controller('ForgetPasswordCtrl', function($scope, $state, $ionicLoading) {

        $scope.forget = {};

        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.post = function() {
            MideApp.httpGet('/user/oukeye', function(data) {

                MideApp.LocCache.save("myEmail", $scope.forget.myEmail);
                $ionicLoading.hide();
                MideApp.myNotice('发送成功')
                $state.go("forgetCode");
            });
        }

    })
    .controller('ForgetCodeCtrl', function($scope, $state, $ionicLoading) {

        $scope.myEmail = MideApp.LocCache.load("myEmail") || '';
        $scope.code = '';
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.post = function() {
            MideApp.httpGet('/user/oukeye', function(data) {

                $ionicLoading.hide();
                MideApp.myNotice('验证成功')
                $state.go("resetPassword");
            });
        }

    })
    .controller('ResetPasswordCtrl', function($scope, $state, $ionicLoading) {

        $scope.pwd = {};
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";

        $scope.post = function() {
            if ($scope.pwd.newPassWord1 != $scope.pwd.newPassWord2) {
                MideApp.myNotice('两密码不一致');
            } else {
                MideApp.httpGet('/user/oukeye', function(data) {

                    $ionicLoading.hide();
                    MideApp.myNotice('成功')
                    $state.go("login");
                    return true;
                });
            }

        }

    })
    .controller('MyGiftCtrl', function($scope, $state, $ionicLoading) {

        $scope.pwd = {};
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";



    })
    .controller('FeedbackCtrl', function($scope, $state, $ionicLoading) {

        $scope.pwd = {};
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state);
        $scope.$root.tabsHidden = "tabs-hide";



    });
