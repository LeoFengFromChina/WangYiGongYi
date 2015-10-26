angular.module('starter.controllers', [])
    .controller('StartCtrl', function($scope, $rootScope, $state, $http, $timeout, $interval,
        $ionicPopup, $ionicActionSheet, $ionicPlatform, $ionicLoading, $ionicHistory, $rootScope) {
        console.log("typeof MideApp is" + typeof MideApp);
        MideApp.intoMyController($scope, $rootScope, $state);

        $ionicLoading.show();
        document.addEventListener('deviceready', function() {
            // $state.go("tab.topics");
            $ionicLoading.hide();
            $state.go("tab.topics");
        });
        // $state.go("tab.topics");

    })
    .controller('TabCtrl', function($scope, $rootScope, $state) {

    })
    .controller('TopicsCtrl', function($http, $ionicActionSheet, $scope, $state,
        $rootScope, $cordovaFileTransfer, $ionicScrollDelegate, $cordovaFile,
        $ionicLoading, $ionicModal, $filter, $timeout, $cordovaImagePicker,
        $ionicSlideBoxDelegate, $cordovaNetwork, $cordovaKeyboard, Tools, Data) {
        MideApp.setBackManner('exit');
        $rootScope.tabsHidden = "tabs-show";
        MideApp.intoMyController($scope, $rootScope, $state);


        $scope.helpType = {};
        // 更换国家的时候清空省
        $scope.$watch('helpType', function(type1) {
            type2 = null;
        });

        var load_banner = function(callback) {

            if (MideApp.isOnline()) {
                var GetBanner_params = {
                    'GroupID': 1
                };
                MideApp.ajaxPost('GetBannerPictures.ashx', GetBanner_params, function(data) {
                    // alert("GetBannerPictures success is " + data);
                    $scope.banners = data.data;
                    $scope.isShowBanner = false;
                    var _handle = $ionicSlideBoxDelegate.$getByHandle("topicsBanner");
                    if (_handle._instances.length != 0) {
                        _handle.update();
                    }
                    MideApp.LocCache.save('banners.json', data.data);
                    MideApp.writeFile($cordovaFile, 'banners.json', data.data, true);
                    callback && callback();

                }, function(data, status) {
                    MideApp.myNotice("网络错误" + status)
                    callback && callback();
                });
            } else {
                MideApp.myNotice("暂无网络连接...");
                callback && callback();
            }
        }
        $scope.load_Catch_banner = function(callback) {
            // alert("load_Catch_banner");
            try {
                var _banners = MideApp.LocCache.load('banners.json', 1800);

                if (_banners) {
                    // alert("有缓存数据banners"+_banners);
                    if (!$scope.banners) {
                        $scope.banners = _banners;
                        var _handle = $ionicSlideBoxDelegate.$getByHandle("topicsBanner");
                        if (_handle._instances.length != 0) {
                            _handle.update();
                        }
                    }

                    callback && callback();
                } else {
                    // alert("没有缓存数据banners");
                    load_banner(callback);
                }

            } catch (e) {
                load_banner(callback);
                // console.log(e);
            }
        }
        $timeout(function() {
            $scope.load_Catch_banner(function() {
                // alert("banner 获取返回");
            });
        }, 500);



        $scope.newTopic = {};
        $scope.newTopic.images_list = [];
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
            var helpTypeData = $scope.helpTypeData = {};
            helpTypeData.type1 = Data.getHelpTypeData();
            helpTypeData.type2 = helpTypeData.type1[0];

            var mideApp_user = MideApp.LocCache.load('User') || null;
            if (!mideApp_user) {
                $state.go("tab.account");
                return false;
            } else {
                if (mideApp_user._flag < 1 || mideApp_user._status != 0) {
                    MideApp.myNotice('请先成为求助者或志愿者');
                    return false;
                }
                $ionicScrollDelegate.scrollTop();
                $scope.newTopicModal.show();
            }

        };
        $scope.callphone = function(number) {
            try {
                navigator.callphone.call(function(success) {
                    alert(success);
                }, function(error) {
                    alert(errors);
                }, number);
            } catch (e) {

            }

        }

        // "设置时间"Event

        $scope.getDate = function() {
            var mydate = new Date();
            if (typeof($scope.mydateTime) != "undefined") {
                mydate = new Date($scope.mydateTime);
            }

            var options = {
                minDate: new Date() - 10000,
                date: mydate,
                mode: 'datetime'
            };

            datePicker.show(options, function(date) {
                $timeout(function() {

                    $scope.mydateTime = date;

                }, 10);

            }, function(err) {
                // alert(err)
                // MideApp.myNotice('修改失败')
            });
        }
        $scope.showNewTopicsheet = function(info) {
            if (typeof(cordova) != 'undefined') {
                $cordovaKeyboard.close();
            }
            if (angular.isUndefined($scope.newTopic.title)) {
                return MideApp.myNotice('标题未填写...');
            }
            if (angular.isUndefined($scope.newTopic.linkman)) {
                return MideApp.myNotice('联系人未填写...');
            }
            if (angular.isUndefined($scope.newTopic.linkphone)) {
                return MideApp.myNotice('联系电话未填写...');
            }
            if (angular.isUndefined($scope.mydateTime)) {
                return MideApp.myNotice('开始时间未填写...');
            }
            if (angular.isUndefined($scope.newTopic.region)) {
                return MideApp.myNotice('区域未填写...');
            }
            if (angular.isUndefined($scope.helpType.type1.label)) {
                return MideApp.myNotice('总类未填写...');
            }
            if (angular.isUndefined($scope.helpType.value.label)) {
                return MideApp.myNotice('分类未填写...');
            }
            if (angular.isUndefined($scope.newTopic.duration)) {
                return MideApp.myNotice('时长未填写...');
            }
            if (angular.isUndefined($scope.newTopic.title)) {
                return MideApp.myNotice('详情未填写...');
            }
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

                        var mideApp_user = MideApp.LocCache.load('User') || null;
                        if (!mideApp_user) {
                            $state.go("tab.account");
                            return false;
                        }
                        var AddNewHelpRequest_params = {
                            'title': $scope.newTopic.title,
                            'type': '1',
                            'promoterID': mideApp_user._id,
                            'linkman': $scope.newTopic.linkman,
                            'linkphone': $scope.newTopic.linkphone,
                            'beginTime': $filter('date')($scope.mydateTime, 'yyyy-MM-dd hh:mm'),
                            'region': $scope.newTopic.region,
                            'serviceIntention': $scope.helpType.type1.label + $scope.helpType.value.label,
                            'duration': $scope.newTopic.duration,
                            'detail': $scope.newTopic.detail,

                        };
                        MideApp.ajaxPost('AddHelp.ashx', AddNewHelpRequest_params, function(data) {
                            if (data.code == 0) {
                                $scope.closeNewTopicModal();
                                $scope.newTopic = {};
                                $scope.helpType = {};
                                $ionicLoading.hide();

                                MideApp.myNotice(data.message);
                            } else {
                                MideApp.myNotice(data.message);
                            }


                        }, function(data, status) {
                            MideApp.myNotice("网络错误" + status);
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
        $scope.$on('$destroy', function() {
            $scope.newTopicModal.remove();
        });
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
            var helpTypeData = $scope.helpTypeData = {};
            helpTypeData.type1 = Data.getHelpTypeData();
            helpTypeData.type2 = helpTypeData.type1[0];

            var mideApp_user = MideApp.LocCache.load('User') || null;
            if (!mideApp_user) {
                $state.go("tab.account");
                return false;
            } else {
                if (mideApp_user._flag < 2 || mideApp_user._status != 0) {
                    MideApp.myNotice('请先成为志愿者');
                    return false;
                }
                $ionicScrollDelegate.scrollTop();
                $scope.newHelpModal.show();
            }

        };
        $scope.$on('$destroy', function() {
            $scope.newHelpModal.remove();
        });

        $scope.newHelp = {};
        $scope.newHelp.images_list = [];

        $scope.showNewHelpsheet = function(info) {
            if (typeof(cordova) != 'undefined') {
                $cordovaKeyboard.close();
            }
            if (angular.isUndefined($scope.newHelp.title)) {
                return MideApp.myNotice('标题未填写...');
            }
            if (angular.isUndefined($scope.newHelp.contacts)) {
                return MideApp.myNotice('联系人未填写...');
            }
            if (angular.isUndefined($scope.newHelp.phone)) {
                return MideApp.myNotice('联系电话未填写...');
            }
            if (angular.isUndefined($scope.mydateTime)) {
                return MideApp.myNotice('开始时间未填写...');
            }
            if (angular.isUndefined($scope.newHelp.region)) {
                return MideApp.myNotice('区域未填写...');
            }
            if (angular.isUndefined($scope.helpType.type1.label)) {
                return MideApp.myNotice('总类未填写...');
            }
            if (angular.isUndefined($scope.helpType.value.label)) {
                return MideApp.myNotice('分类未填写...');
            }
            if (angular.isUndefined($scope.newHelp.duration)) {
                return MideApp.myNotice('时长未填写...');
            }
            if (angular.isUndefined($scope.newHelp.content)) {
                return MideApp.myNotice('详情未填写...');
            }
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

                        var mideApp_user = MideApp.LocCache.load('User') || null;
                        if (!mideApp_user) {
                            $state.go("tab.account");
                            return false;
                        }
                        var AddNewHelpRequest_params2 = {
                            'title': $scope.newHelp.title,
                            'type': '2',
                            'promoterID': mideApp_user._id,
                            'linkman': $scope.newHelp.contacts,
                            'linkphone': $scope.newHelp.phone,
                            'beginTime': $filter('date')($scope.mydateTime, 'yyyy-MM-dd HH:mm'),
                            'region': $scope.newHelp.region,
                            'serviceIntention': $scope.helpType.type1.label + $scope.helpType.value.label,
                            'duration': $scope.newHelp.duration,
                            'detail': $scope.newHelp.content,

                        };
                        MideApp.ajaxPost('AddHelp.ashx', AddNewHelpRequest_params2, function(data) {
                            if (data.code == 0) {
                                $scope.closeNewHelpModal();
                                $scope.newHelp = {};
                                $scope.helpType = {};
                                $ionicLoading.hide();
                                MideApp.myNotice(info + '成功');
                            } else {
                                $ionicLoading.hide();
                                MideApp.myNotice(data.message);
                            }


                        }, function(data) {
                            MideApp.myNotice("网络错误" + data.status)
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

        var getPicture = function() {
            document.addEventListener("deviceready", function() {

                var options = {
                    quality: 90,
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
                        $scope.mideApp_user_reg.avatar_url = "data:image/jpeg;base64," + imageData;
                    }, 10);

                }, function(err) {
                    // error
                });

            }, false);
        };

        var getPictures = function(mytopic) {
            options = {
                // max images to be selected, defaults to 15. If this is set to 1, upon
                // selection of a single image, the plugin will return it.
                maximumImagesCount: 3,

                // max width and height to allow the images to be.  Will keep aspect
                // ratio no matter what.  So if both are 800, the returned image
                // will be at most 800 pixels wide and 800 pixels tall.  If the width is
                // 800 and height 0 the image will be 800 pixels wide if the source
                // is at least that wide.
                width: 0,
                height: 0,

                // quality of resized image, defaults to 100
                quality: 90
            };

            window.imagePicker.getPictures(
                function(imageData) {
                    $timeout(function() {
                        mytopic.images_list = imageData;
                    }, 200);


                },
                function(error) {
                    alert('Error: ' + error);
                }, options);
        };

        $scope.showGetImagesheet = function(mytopic) {
            $ionicActionSheet.show({
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
                        getPictures(mytopic);
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

        $scope.config = {
            errormsg: false,
            infinite: true,
            page: 1,
            topics: []
        };
        // 监听登录
        $rootScope.$on('topics.update', function() {

            $scope.config = MideApp.LocCache.load("topics") || {};

        });

        var load_page = function(callback) {
            if (MideApp.isOnline()) {
                var GetHelpRequestList_params = {
                    'PageIndex': $scope.config.page
                };
                MideApp.ajaxPost('GetHelpRequestList.ashx', GetHelpRequestList_params, function(data) {
                    // alert("获取网络数据 GetHelpRequestList 成功");
                    if (data.code == 0) {
                        if (!(data.data == null || data.data == '')) {
                            if ($scope.config.page == 1) {
                                $scope.config.topics = [];
                                $scope.config.topics = data.data;
                            } else {
                                $scope.config.topics = $scope.config.topics.concat(data.data);
                            }
                            $scope.config.page = $scope.config.page + 1;
                            $scope.config.errormsg = !$scope.config.topics.length;
                            $scope.config.infinite = data.data.length > 0;
                            GetHelpRequestList_params = {
                                'PageIndex': $scope.config.page
                            };
                            MideApp.LocCache.save('topics', $scope.config);
                            MideApp.MemCache.save('topics', $scope.config);
                            $rootScope.$broadcast('topics.update');
                            MideApp.writeFile($cordovaFile, "topics.json", $scope.config, true);

                        } else {
                            $scope.config.infinite = false;
                        }

                    } else {
                        $scope.config.infinite = false;
                    }

                    callback && callback();


                }, function(data, status) {
                    MideApp.myNotice("网络错误" + status)
                    callback && callback();
                });
            } else {
                MideApp.myNotice("暂无网络连接...");
                $scope.config.infinite = false;
                callback && callback();
            }
        };

        // $scope.isPageInit = true;

        $scope.load_catch_page = function(callback) {
                try {
                    document.addEventListener('deviceready', function() {
                        $cordovaFile.readAsText(cordova.file.externalDataDirectory, "topics.json")
                            .then(function(success) {
                                // alert("success is "+success);
                                var _successData = angular.fromJson(success)
                                $scope.config = _successData.data;
                                $scope.config.infinite = true;
                                callback && callback();
                            }, function(error) {
                                load_page(callback);
                            });

                    });
                } catch (e) {
                    alert("e is" + e);
                    // console.log(e);
                }
            }
            // if ($scope.isPageInit) {
            //     $scope.load_catch_page(function() {
            //         $scope.isPageInit = false;
            //     });

        // }

        $scope.moreDataCanBeLoaded = function() {
            return true;
        }

        $scope.infinite = function() {
            load_page(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

        $scope.doRefresh = function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
                // document.addEventListener("deviceready", function() {
                if (!MideApp.isOnline()) {
                    MideApp.myNotice("暂无网络连接...");
                } else {
                    $scope.load_Catch_banner(function() {
                        $scope.config.page = 1;
                        load_page(function() {
                            $scope.$broadcast('scroll.refreshComplete');
                        });
                    });
                }
                // }, false);
            }
            // $timeout(function() {
            //     $scope.doRefresh(); //初始化
            // }, 100);

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

        $scope.showTopicModal = function(topicId) {
            var mideApp_user = MideApp.LocCache.load('User') || null;
            $scope.current_id = "" + topicId;
            $scope.current_topic = $filter("topicFilter")($scope.config.topics, topicId);


            if ($scope.current_topic.HelpRequest._status == 0) {
                if ($scope.current_topic.HelpRequest._type == 1) {
                    $scope.buttonName = '助他';
                } else if ($scope.current_topic.HelpRequest._type == 2) {
                    $scope.buttonName = '求他';
                }
                if (mideApp_user && $scope.current_topic.Author._id == mideApp_user._id) {
                    $scope.show_help_button = false;
                } else {
                    $scope.show_help_button = true;
                }
            } else if ($scope.current_topic.HelpRequest._status == 1) {

                if (mideApp_user && $scope.current_topic.Author._id == mideApp_user._id) {
                    $scope.buttonName = '完成';
                    $scope.show_help_button = true;
                } else {
                    $scope.show_help_button = false;
                }
            } else {
                $scope.show_help_button = false;
            }
            // if(mideApp_user&&mideApp_user._id==$scope.current_topic.Author._id){
            //     $scope.show_help_button= false;
            // }
            $ionicScrollDelegate.$getByHandle('topicMainScroll').scrollTop();
            $scope.topicModal.show();
        };
        $scope.$on('$destroy', function() {
            $scope.topicModal.remove();
        });
        $scope.help = function() {
            var mideApp_user = MideApp.LocCache.load('User') || null;
            if (!mideApp_user) {
                MideApp.myNotice("请先登录");
                return false;
            }
            var _topic = $scope.current_topic;
            if (_topic.HelpRequest._type == 1 && mideApp_user._flag < 2) {
                MideApp.myNotice("需要志愿者身份");
                return false;
            } else if (_topic.HelpRequest._type == 2 && mideApp_user._flag < 1) {
                MideApp.myNotice("需要求助者或志愿者身份");
                return false;
            }

            $ionicActionSheet.show({
                titleText: '确认' + $scope.buttonName + '？',
                buttons: [{
                    text: $scope.buttonName
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
                        var mideApp_user = MideApp.LocCache.load('User') || null;
                        if (!mideApp_user) {
                            $scope.closeTopicModal();
                            $state.go("tab.account");
                            return false;
                        } else {
                            $ionicLoading.show();
                            var _status = 1;
                            if ($scope.buttonName == '完成') {
                                _status = 2;
                            }
                            var UpdateHelp_params = {
                                'helpRequestID': $scope.current_topic.ID, //请求单号
                                'underTakerID': mideApp_user._id, //接单者ID
                                'status': _status, //动作状态
                            };
                            MideApp.ajaxPost('UpdateHelpRequest.ashx', UpdateHelp_params, function(data) {
                                if (data.code == 0) {
                                    $scope.current_topic.HelpRequest._status = _status;
                                    $ionicLoading.hide();
                                    $scope.closeTopicModal();
                                    MideApp.myNotice('成功')
                                } else {
                                    MideApp.myNotice(data.message);
                                }

                            }, function(data) {
                                MideApp.myNotice("网络错误" + data.status)
                            });
                        }

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
    .controller('ActivityCtrl', function($scope, $rootScope, $state, $ionicModal,
        $ionicScrollDelegate, $ionicActionSheet, $timeout, $cordovaFile, $ionicLoading, Tools) {
        MideApp.setBackManner('exit');
        $rootScope.tabsHidden = "tabs-show";
        MideApp.intoMyController($scope, $rootScope, $state);

        $scope.mideApp_user = MideApp.LocCache.load('User') || null;
        // 监听登录
        $rootScope.$on('app.login', function() {
            $scope.mideApp_user = MideApp.LocCache.load('User') || null;
            if ($scope.mideApp_user) {
                $scope.activityConfig.infinite = true;
                // $scope.doRefresh();
            }
        });
        // ["ActivityPublishActivity", "TeamCreateTeam"]  privilege
        $scope.PublishActivity = false;
        if ($scope.mideApp_user) {
            if (angular.isArray($scope.mideApp_user.privilege)) {
                if (Tools.inArray("ActivityPublishActivity", $scope.mideApp_user.privilege) != -1) {
                    $scope.PublishActivity = true;
                }
            }
        }



        $scope.activityConfig = {
            errormsg: false,
            infinite: true,
            page: 1,
            activitys: []
        };
        $scope.allConfig = {
            errormsg: false,
            infinite: true,
            page: 1,
            activitys: []
        };
        $scope.joinConfig = {
            errormsg: false,
            infinite: true,
            page: 1,
            activitys: []
        };
        $scope.createConfig = {
            errormsg: false,
            infinite: true,
            page: 1,
            activitys: []
        };
        $scope.Tab_isActive = 'all';
        $scope.buttonName = '参加';
        var load_activitys = function(Tab_isActive, callback) {
            try {
                if (!MideApp.isOnline()) {
                    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "activitys" + Tab_isActive + ".json")
                        .then(function(success) {
                            $scope.activityConfig = angular.fromJson(success);
                            $scope.activityConfig.infinite = false;
                        }, function(error) {});
                    callback && callback();
                    return MideApp.myNotice('暂无网络连接...');
                }
            } catch (e) {
                // console.log(e);
            }
            var mideApp_user = MideApp.LocCache.load('User') || null;
            if (!mideApp_user) {
                MideApp.myNotice("请先登录");
                $scope.activityConfig.infinite = false;
                callback && callback();
                return false;
            }
            var GetHelpRequestList_params = {};
            if (Tab_isActive == 'join') {
                GetHelpRequestList_params = {
                    'PageIndex': $scope.activityConfig.page,
                    'menberID': mideApp_user._id
                };
            } else if (Tab_isActive == 'create') {
                GetHelpRequestList_params = {
                    'PageIndex': $scope.activityConfig.page,
                    'promoterID': mideApp_user._id
                };
            } else {
                GetHelpRequestList_params = {
                    'PageIndex': $scope.activityConfig.page
                };
            }

            MideApp.ajaxPost('GetActivityList.ashx', GetHelpRequestList_params, function(data) {
                if (data.code == 0) {
                    if (!(data.data == null || data.data == '')) {
                        if ($scope.activityConfig.page == 1) {
                            $scope.activityConfig.activitys = [];
                            $scope.activityConfig.activitys = data.data;
                        } else {
                            $scope.activityConfig.activitys = $scope.activityConfig.activitys.concat(data.data);
                        }
                        $scope.activityConfig.page = $scope.activityConfig.page + 1;
                        $scope.activityConfig.errormsg = !$scope.activityConfig.activitys.length;
                        $scope.activityConfig.infinite = data.data.length > 0;
                        GetHelpRequestList_params = {
                            'PageIndex': $scope.activityConfig.page
                        };
                        MideApp.LocCache.save('activitys', $scope.activityConfig);
                        MideApp.MemCache.save('activitys', $scope.activityConfig);
                        $rootScope.$broadcast('activitys.update');
                        MideApp.writeFile($cordovaFile, "activitys" + Tab_isActive + ".json", $scope.activityConfig, true);

                    } else {
                        $scope.activityConfig.infinite = false;
                    }

                } else {
                    $scope.activityConfig.infinite = false;
                }

                callback && callback();


            }, function(data, status) {
                MideApp.myNotice("网络错误" + status)
                $cordovaFile.readAsText(cordova.file.externalDataDirectory, "activitys" + Tab_isActive + ".json")
                    .then(function(success) {
                        $scope.config = angular.fromJson(success);
                        $scope.config.infinite = 0;
                    }, function(error) {});
                callback && callback();
            });
        };

        $scope.infinite = function() {
            if (!MideApp.isOnline()) {
                $scope.activityConfig.infinite = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return MideApp.myNotice("暂无网络连接...");
            }
            load_activitys($scope.Tab_isActive, function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

        $scope.doRefresh = function() {
            if (!MideApp.isOnline()) {
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return MideApp.myNotice("暂无网络连接...");
            }
            $scope.activityConfig.page = 1;
            load_activitys($scope.Tab_isActive, function() {
                $scope.$broadcast('scroll.refreshComplete');
            });

        }

        $scope.changeTab = function(evt) {
            var elem = evt.currentTarget;
            $scope.Tab_isActive = elem.getAttributeNode('data-active').value;

            if ($scope.Tab_isActive == "join") {
                $scope.activityConfig = $scope.joinConfig;
                if ($scope.joinConfig.activitys.length == 0) {
                    $scope.doRefresh();
                }
            } else if ($scope.Tab_isActive == "create") {
                $scope.activityConfig = $scope.createConfig;
                if ($scope.createConfig.activitys.length == 0) {
                    $scope.doRefresh();
                }
            } else {
                $scope.activityConfig = $scope.allConfig;
                if ($scope.allConfig.activitys.length == 0) {
                    $scope.doRefresh();
                }
            }
        };
        $ionicModal.fromTemplateUrl('templates/activityModal.html', {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function(modal) {
            $scope.activityModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeActivityModal = function() {
            $scope.activityModal.hide();
        };

        $scope.showActivityModal = function(Id) {

            if (!$scope.mideApp_user) {
                return MideApp.myNotice('请先登录');
            }
            $scope.current_activitys = Tools.findById($scope.activityConfig.activitys, Id);

            switch ($scope.current_activitys._status) {
                case 0:
                    $scope.current_activitys._statusName = "报名中"
                    break;
                case 1:
                    $scope.current_activitys._statusName = "正在开始"
                    break;
                case 2:
                    $scope.current_activitys._statusName = "已结束"
                    break;
                default:
                    $scope.current_activitys._statusName = "其他"
            }


            var UpdateActivity_params = {
                'menberID': $scope.mideApp_user._id,
                'activityID': Id,
                'opc': 5
            };
            MideApp.ajaxPost('UpdateActivity.ashx', UpdateActivity_params, function(data) {
                if (data.code == 0) {
                    $scope.current_activitys.menberlist = data.data;
                    if ($scope.mideApp_user._flag < 1) {
                        return MideApp.myNotice("请先成为求助者或志愿者");
                    }
                    if ($scope.current_activitys._promoterid == $scope.mideApp_user._id) {

                        switch ($scope.current_activitys._status) {
                            case 0:
                                $scope.buttonName = '撤销';
                                break;
                            case 1:
                                $scope.buttonName = '完成';
                                break;
                            case 2:
                                $scope.buttonName = '';
                                break;
                            default:
                                $scope.buttonName = '';
                                break;
                        }
                    } else {
                        if ($scope.current_activitys._status == 0) {
                            if ($scope.current_activitys.menberlist.length != 0) {
                                var _me = Tools.findById($scope.current_activitys.menberlist, $scope.mideApp_user._id);
                                if (_me) {
                                    $scope.buttonName = '退出活动';
                                } else {
                                    $scope.buttonName = '参加';

                                }
                            } else {
                                $scope.buttonName = '参加';
                            }


                        } else {
                            $scope.buttonName = '';
                        }
                    }

                } else {
                    $scope.activityConfig.infinite = false;
                    return false;
                }

                $ionicScrollDelegate.$getByHandle('activityMainScroll').scrollTop();
                $scope.activityModal.show();

            }, function(data, status) {
                return MideApp.myNotice("网络错误" + status)

            });

        };
        $scope.$on('$destroy', function() {
            $scope.activityModal.remove();
        });
        $scope.showUpdateActivity = function() {
            $ionicActionSheet.show({
                titleText: '确认' + $scope.buttonName + '？',
                buttons: [{
                    text: $scope.buttonName
                }],
                destructiveText: '',
                cancelText: "取消",
                cancel: function() {
                    console.log('CANCELLED');
                },
                buttonClicked: function(index) {

                    if (index == 0) {
                        updateActivity();
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
        var updateActivity = function() {
            //1参加活动，2退出活动，3完成活动（发起人权利),4撤销活动,5.获取活动参与者列表
            var _opc = 5;
            switch ($scope.buttonName) {
                case '参加':
                    _opc = 1;
                    break;
                case '退出活动':
                    _opc = 2;
                    break;
                case '撤销':
                    _opc = 4;
                    break;
                case '完成':
                    _opc = 3;
                    break;
                default:
                    break;
            }
            var UpdateActivity_params = {
                'menberID': $scope.mideApp_user._id,
                'activityID': $scope.current_activitys._id,
                'opc': _opc
            };
            MideApp.ajaxPost('UpdateActivity.ashx', UpdateActivity_params, function(data) {

                if (data.code == 0) {
                    switch ($scope.buttonName) {
                        case '参加':
                            $scope.current_activitys.menberlist.push($scope.mideApp_user);
                            $scope.buttonName = '退出活动'
                            MideApp.myNotice('您成功参加该活动');
                            break;
                        case '退出活动':
                            $scope.buttonName = '参加'
                            MideApp.myNotice('您已退出该活动');
                            for (var i = 0; i < $scope.current_activitys.menberlist.length; i++) {
                                if ($scope.current_activitys.menberlist[i]._id == $scope.mideApp_user._id) {
                                    var _list = $scope.current_activitys.menberlist.splice(i, 1);
                                    console.log(_list);
                                }
                            }
                            break;
                        case '撤销':
                            $scope.buttonName = ''
                            $scope.closeActivityModal();
                            break;
                        case '完成':
                            $scope.buttonName = ''
                            break;
                        default:
                            break;
                    }

                }

            }, function(data, status) {
                return MideApp.myNotice("网络错误" + status)

            });
        }
        $scope.pushActivity = {};
        $scope.showPushActivirySheet = function(info) {

            if (angular.isUndefined($scope.pushActivity.title)) {
                return MideApp.myNotice('标题未填写');
            }
            if (angular.isUndefined($scope.pushActivity.linkman)) {
                return MideApp.myNotice('联系人未填写');
            }
            if (angular.isUndefined($scope.pushActivity.linkphone)) {
                return MideApp.myNotice('联系电话异常,应为11位数字');
            }
            if (angular.isUndefined($scope.pushActivity.linkaddress)) {
                return MideApp.myNotice('地址未填写');
            }
            if (angular.isUndefined($scope.pushActivity.activitytype)) {
                return MideApp.myNotice('活动类型未填写');
            }
            if (angular.isUndefined($scope.pushActivity.region)) {
                return MideApp.myNotice('区域未填写');
            }
            if (angular.isUndefined($scope.pushActivity.begintime)) {
                return MideApp.myNotice('开始时间未填写');
            }
            if (angular.isUndefined($scope.pushActivity.needmenbercount)) {
                return MideApp.myNotice('人数未填写');
            }
            if (angular.isUndefined($scope.pushActivity.detail)) {
                return MideApp.myNotice('详情未填写');
            }
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
                        var TeamAction_params = {
                            'activityID': 0,
                            'menberID': $scope.mideApp_user._id,
                            'promoterid': $scope.mideApp_user._id,
                            'title': $scope.pushActivity.title,
                            'opc': 6,
                            'linkman': $scope.pushActivity.linkman,
                            'linkphone': $scope.pushActivity.linkphone,
                            'linkaddress': $scope.pushActivity.linkaddress,
                            'activitytype': $scope.pushActivity.activitytype,
                            'region': $scope.pushActivity.region,
                            'begintime': $scope.pushActivity.begintime,
                            'needmenbercount': $scope.pushActivity.needmenbercount,
                            'detail': $scope.pushActivity.detail
                        };
                        MideApp.ajaxPost('UpdateActivity.ashx', TeamAction_params, function(data) {

                            if (data.code == 0) {
                                // $scope.activityConfig.activitys.push($scope.pushActivity);
                                // MideApp.LocCache.save('activityList', $scope.pushActivity);

                                // $rootScope.$broadcast('activityList.update');
                                $scope.doRefresh();
                                MideApp.myNotice('发布成功', 1500, function() {
                                    $scope.pushActivity = {};
                                    $scope.closePushActivityModal();
                                });

                            } else {
                                MideApp.myNotice(data.message);
                            }

                        }, function(data, status) {
                            return MideApp.myNotice("网络错误" + status)

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
        $ionicModal.fromTemplateUrl('templates/pushActivity.html', {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function(modal) {
            $scope.pushActivityModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closePushActivityModal = function() {
            $scope.pushActivityModal.hide();
        };
        $scope.showPushActivityModal = function() {

            $scope.pushActivityModal.show();
        };
        $scope.$on('$destroy', function() {
            $scope.pushActivityModal.remove();
        });

        // "设置时间"Event
        $scope.getDate = function() {


            var mydate = new Date();
            if (typeof($scope.pushActivity.begintime) != "undefined") {
                mydate = new Date($scope.pushActivity.begintime);
            }

            var options = {
                date: mydate,
                mode: 'datetime'
            };

            datePicker.show(options, function(date) {
                $timeout(function() {
                    $scope.pushActivity.begintime = date;
                }, 10);

            }, function(err) {
                // alert(err)
                // MideApp.myNotice('修改失败')
            });
        }

    })
    .controller('ChatsCtrl', function($scope, $rootScope, $state, $ionicModal, $ionicScrollDelegate,
        $ionicActionSheet, $timeout, $cordovaFile) {
        MideApp.setBackManner('back');
        $rootScope.tabsHidden = "tabs-show";
        MideApp.intoMyController($scope, $rootScope, $state);

        $scope.chatsConfig = {
            errormsg: false,
            infinite: true,
            page: 1,
            chats: []
        };
        $scope.doRefresh = function() {
            var mideApp_user = MideApp.LocCache.load('User') || null;
            if (mideApp_user) {
                load_chats(mideApp_user._id, function() {
                    $scope.$broadcast('scroll.refreshComplete');

                });
            } else {
                $scope.$broadcast('scroll.refreshComplete');
            }


        };
        $scope.infinite = function() {
            var mideApp_user = MideApp.LocCache.load('User') || null;
            if (mideApp_user) {
                load_chats(mideApp_user._id, function() {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            } else {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
        }
        var load_chats = function(userId, callback) {

            var GetNoticeList_params = {
                'menberid': userId,
                'PageIndex': $scope.chatsConfig.page
            };
            MideApp.ajaxPost('GetNoticeList.ashx', GetNoticeList_params, function(data) {
                if (data.code == 0) {
                    if (!(data.data == null || data.data == '')) {
                        if ($scope.chatsConfig.page == 1) {
                            $scope.chatsConfig.chats = data.data;
                        } else {
                            $scope.chatsConfig.chats = $scope.chatsConfig.chats.concat(data.data);
                        }
                        $scope.chatsConfig.page = $scope.chatsConfig.page + 1;
                        $scope.chatsConfig.errormsg = !$scope.chatsConfig.chats.length;
                        $scope.chatsConfig.infinite = data.data.length > 0;
                        GetHelpRequestList_params = {
                            'PageIndex': $scope.chatsConfig.page
                        };
                        MideApp.LocCache.save('chats', $scope.chatsConfig);
                        MideApp.MemCache.save('chats', $scope.chatsConfig);
                        // $rootScope.$broadcast('chats.update');
                        MideApp.writeFile($cordovaFile, "chats.json", $scope.chatsConfig, true);

                    } else {
                        $scope.chatsConfig.infinite = false;
                    }

                } else {
                    $scope.chatsConfig.infinite = false;
                }
                callback && callback();

            }, function(data, status) {
                MideApp.myNotice("网络错误" + status)
                callback && callback();
            });
        }

        $scope.deleteItem = function(k, id) {

            $ionicActionSheet.show({
                titleText: '确定删除？',
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
                        MideApp.httpGet('mideData/user.json', function(data) {

                            $scope.arrId = [];
                            $scope.arrId.push(id);
                            $scope.chats.splice(k, 1);
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
        $scope.$on('$destroy', function() {
            $scope.chatModal.remove();
        });
    })

.controller('GitfCtrl', function($scope, $rootScope, $ionicLoading, $state,
    $ionicActionSheet, $ionicModal, $ionicScrollDelegate, $cordovaFile, $cordovaNetwork,
    $timeout, $ionicSlideBoxDelegate, Tools) {
    MideApp.setBackManner('exit');
    $rootScope.tabsHidden = "tabs-show";
    MideApp.intoMyController($scope, $rootScope, $state);
    var mideApp_user = MideApp.LocCache.load('User') || {};

    var load_giftBanner = function(callback) {

        try {
            if (!MideApp.isOnline()) {
                $cordovaFile.readAsText(cordova.file.externalDataDirectory, "giftBanner.json")
                    .then(function(success) {
                        $scope.giftBanner = angular.fromJson(success);
                        var _handle = $ionicSlideBoxDelegate.$getByHandle("giftBanner");
                        if (_handle._instances.length != 0) {
                            _handle.update();
                        }
                    }, function(error) {});
                callback && callback();
                return MideApp.myNotice('暂无网络连接...');
            }
        } catch (e) {

        }

        MideApp.httpGet('wygyData/Banner.json', function(data) {
            // $scope.giftBanner=[];
            $scope.giftBanner = data.data;
            var _handle = $ionicSlideBoxDelegate.$getByHandle("giftBanner");
            if (_handle._instances.length != 0) {
                _handle.update();
            }
            // MideApp.MemCache.save('topics-list', $scope.config);
            // MideApp.LocCache.save('topics-list', $scope.config);
            MideApp.writeFile($cordovaFile, "giftBanner.json", $scope.giftBanner, true);
            callback && callback();
        }, function() {
            // $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    // load_giftBanner();

    var load_banner = function(callback) {
        if (MideApp.isOnline()) {
            var GetBanner_params = {
                'GroupID': 2
            };
            MideApp.ajaxPost('GetBannerPictures.ashx', GetBanner_params, function(data) {
                // alert("GetBannerPictures success is " + data);
                $scope.giftBanner = data.data;
                $scope.isShowBanner = false;
                var _handle = $ionicSlideBoxDelegate.$getByHandle("giftBanner");
                if (_handle._instances.length != 0) {
                    _handle.update();
                }
                MideApp.LocCache.save('giftBanner', data.data);
                MideApp.writeFile($cordovaFile, 'giftBanner.json', data.data, true);
                callback && callback();

            }, function(data, status) {
                MideApp.myNotice("网络错误" + status)
                callback && callback();
            });
        } else {
            MideApp.myNotice("暂无网络连接...");
            callback && callback();
        }
    }
    $scope.load_Catch_banner = function(callback) {
        // alert("load_Catch_banner");
        try {
            var _giftBanner = MideApp.LocCache.load('giftBanner', 1800);

            if (_giftBanner) {
                $scope.giftBanner = _giftBanner;
                var _handle = $ionicSlideBoxDelegate.$getByHandle("giftBanner");
                if (_handle._instances.length != 0) {
                    _handle.update();
                }

                callback && callback();
            } else {
                // alert("没有缓存数据banners");
                load_banner(callback);
            }

        } catch (e) {
            // console.log(e);
        }
    }
    $scope.load_Catch_banner(function() {

    });

    var load_gift = function(callback) {

        try {
            if (!MideApp.isOnline()) {
                $cordovaFile.readAsText(cordova.file.externalDataDirectory, "gifts.json")
                    .then(function(success) {
                        $scope.gifts = angular.fromJson(success);
                    }, function(error) {});
                callback && callback();
                return MideApp.myNotice('暂无网络连接...');
            }
        } catch (e) {

        }

        MideApp.ajaxPost('GetGiftList.ashx', {}, function(data) {
            if (data.code == 0) {
                $scope.gifts = data.data;
                MideApp.writeFile($cordovaFile, "gifts.json", $scope.config, true);
            }
            callback && callback();

        }, function(data) {
            MideApp.myNotice("网络错误" + data.status)
            $cordovaFile.readAsText(cordova.file.externalDataDirectory, "gifts.json")
                .then(function(success) {
                    $scope.gifts = angular.fromJson(success);
                }, function(error) {});
            callback && callback();
        });
    };
    load_gift();

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
        $scope.buyGift = Tools.findById($scope.gifts, giftId);
        $scope.buyGift.buyCount = 1;
        $ionicScrollDelegate.$getByHandle('giftDetailScroll').scrollTop();
        $scope.giftModal.show();
    };
    $scope.$on('$destroy', function() {
        $scope.giftModal.remove();
    });

    $scope.showGiftsheet = function(info, gift) {
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
                    var mideApp_user = MideApp.LocCache.load('User') || null;
                    if (!mideApp_user) {
                        MideApp.myNotice("请先登录");
                        $scope.closeGiftModal();
                        $state.go("tab.account");
                        return false;
                    } else {
                        if ($scope.buyGift._needscores * $scope.buyGift.buyCount > mideApp_user._scores) {
                            MideApp.myNotice("积分不足");
                            return true;
                        }
                        $ionicLoading.show();
                        var params = {
                            'giftID': $scope.buyGift._id,
                            'menberID': mideApp_user._id,
                            'giftCount': $scope.buyGift.buyCount,
                            'status': '0'
                        };
                        MideApp.ajaxPost('ExchangeForGift.ashx', params, function(data) {
                            console.log("ExchangeForGift.ashx 返回数据" + data.code);
                            if (data.code == 0) {
                                var mideApp_user = MideApp.LocCache.load('User') || null;
                                if (mideApp_user) {
                                    mideApp_user._scores -= $scope.buyGift._needscores * $scope.buyGift.buyCount;
                                    MideApp.LocCache.save('User', mideApp_user);
                                    $rootScope.$broadcast('User.update');
                                }
                                $ionicLoading.hide();
                                $scope.doRefresh();
                                MideApp.myNotice(info + '成功')
                                $scope.closeGiftModal();

                            } else {
                                $ionicLoading.hide();
                                MideApp.myNotice(data.message);
                            }


                        }, function(data) {
                            MideApp.myNotice("网络错误" + data.status)
                        });

                    }

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
    $scope.doRefresh = function() {
        load_banner(function() {
            load_gift(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    }
})

.controller('AccountCtrl', function($scope, $rootScope, $rootScope, $state,
    $log, $ionicActionSheet, $ionicModal, $ionicHistory, $timeout,
    $ionicLoading, $ionicPopover, $filter, $ionicScrollDelegate, $cordovaFile,
    $cordovaKeyboard, Tools, Data, UserCache) {
    MideApp.setBackManner('exit');
    $rootScope.tabsHidden = "tabs-show";
    MideApp.intoMyController($scope, $rootScope, $state);

    // 监听登录
    $rootScope.$on('app.login', function() {
        $log.debug('login broadcast handle');
        // get current user
        // var currentUser = User.getCurrentUser();
        $scope.mideApp_user = MideApp.LocCache.load("User") || {};
    });

    // 监听登录
    $rootScope.$on('User.update', function() {
        $scope.mideApp_user = MideApp.LocCache.load("User") || {};
    });

    var mideApp_user = MideApp.LocCache.load('User') || {
        'islogin': false
    };

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
        $scope.mideApp_user = {
            'islogin': false
        };
        UserCache.clearUser();
        // track event
        /* if (window.analytics) {
             window.analytics.trackEvent('User', 'logout');
         }*/
        // 刷新页面
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
        $ionicScrollDelegate.$getByHandle('accountScroll').scrollTop();
        $scope.showLoginModal();

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
                    MideApp.httpGet('mideData/user.json', function(data) {
                        if (index == 0) {
                            $scope.mideApp_user.gender = "男";
                        } else {
                            $scope.mideApp_user.gender = "女";
                        }
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

    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.loginModal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLoginModal = function() {
        $scope.loginModal.hide();
    };
    $scope.showLoginModal = function() {
        $scope.loginModal.show();
        // $ionicScrollDelegate.$getByHandle("loginScroll").scrollTop();

    };
    $scope.$on('$destroy', function() {
        $scope.loginModal.remove();
    });
    $scope.gotoState = function(stateName, checkLogin) {
        var _checkLogin = typeof(arguments[1]) != 'undefined' ? arguments[1] : true;
        if (typeof($scope.mideApp_user._status) == 'undefined' && _checkLogin) {
            $scope.showLoginModal();
        } else {
            $scope.closeLoginModal();
            $state.go(stateName);
        }

    }
    $scope.doLogin = function() {
        if (typeof(cordova) != 'undefined') {
            $cordovaKeyboard.close();
        }

        if (!MideApp.isOnline()) {
            return MideApp.myNotice('暂无网络连接...');
        }
        if (angular.isUndefined($scope.mideApp_user.username)) {
            return MideApp.myNotice('账号未填写...');
        }
        if (angular.isUndefined($scope.mideApp_user.password)) {
            return MideApp.myNotice('密码未填写...');
        }

        $ionicLoading.show();
        var appLogin_params = {
            'username': $scope.mideApp_user.username,
            'psw': Tools.MD5($scope.mideApp_user.password),
        };
        MideApp.ajaxPost('AppLogin.ashx', appLogin_params, function(data) {
            if (data.code == 0) {
                var _user = data.data['<Menber>k__BackingField'];
                //status:0正常，1待审核，2禁止
                if (_user._status < 2) {
                    $scope.mideApp_user = _user;

                    var _privilege = data.data['<Privilege>k__BackingField'];
                    var privilege_list = [];
                    for (var i = 0; i < _privilege.length; i++) {
                        var _buttonname = _privilege[i]._buttonname;
                        var _modulename = _privilege[i]._modulename

                        privilege_list.push(_modulename + _buttonname);
                    }
                    $scope.mideApp_user.privilege = privilege_list;

                    switch ($scope.mideApp_user._flag) {
                        case 0:
                            $scope.mideApp_user._flagName = '游客';
                            break;
                        case 1:
                            $scope.mideApp_user._flagName = '求助者';
                            break;
                        case 2:
                            $scope.mideApp_user._flagName = '志愿者';
                            break;
                        default:
                    }
                    switch ($scope.mideApp_user._status) {
                        case 0:
                            $scope.mideApp_user._statusName = '正常';
                            break;
                        case 1:
                            $scope.mideApp_user._statusName = '待审核';
                            break;
                        default:
                            $scope.mideApp_user._statusName = '其他';
                    }
                    $scope.mideApp_user.islogin = true;
                    UserCache.setUser(_user); //缓存用户信息

                    $ionicLoading.hide();
                    $rootScope.$broadcast('app.login');
                    $scope.closeLoginModal();
                    $state.go("tab.account");
                } else {
                    MideApp.myNotice('登录失败');
                }



            } else {
                MideApp.myNotice(data.message);
            }

        }, function(data, status) {
            MideApp.myNotice("网络错误" + status)
        });

    };

    $ionicModal.fromTemplateUrl('templates/basicInfo.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function(modal) {
        $scope.basicInfoModal = modal;
    });

    $scope.closeBasicInfoModal = function() {
        $scope.basicInfoModal.hide();
    };


    $scope.showBasicInfoModal = function(isActive) {
        $scope.isActive = isActive;
        var mideApp_user_basic = $scope.mideApp_user_basic = MideApp.LocCache.load('User') || {};

        mideApp_user_basic.countries = Data.getCityData();

        if (mideApp_user_basic._country != '') {
            mideApp_user_basic.this_country = $filter('filter')(mideApp_user_basic.countries, {
                label: mideApp_user_basic._country
            })[0];
            if (mideApp_user_basic._province != '') {
                mideApp_user_basic.this_provinces = $filter('filter')(mideApp_user_basic.this_country.provinces, {
                    label: mideApp_user_basic._province
                })[0];
                if (mideApp_user_basic._city != '') {
                    mideApp_user_basic.this_city = $filter('filter')(mideApp_user_basic.this_provinces.cities, {
                        label: mideApp_user_basic._city
                    })[0];
                }
            }
        }
        // 更换国家的时候清空省
        $scope.$watch('mideApp_user_basic.country', function(country) {
            mideApp_user_basic.province = null;
        });
        // 更换省的时候清空城市
        $scope.$watch('mideApp_user_basic.province', function(province) {
            mideApp_user_basic.city = null;
        });

        mideApp_user_basic.educations = Data.getEducationData();
        if (mideApp_user_basic._education != '') {
            mideApp_user_basic.this_education = $filter('filter')(mideApp_user_basic.educations, {
                label: mideApp_user_basic._education
            })[0];
        }

        mideApp_user_basic.serviceintentions = Data.getIntentionData();
        if (mideApp_user_basic._serviceintention != '') {
            mideApp_user_basic.this_serviceintention = $filter('filter')(mideApp_user_basic.serviceintentions, {
                label: mideApp_user_basic._serviceintention
            })[0];
        }



        $ionicScrollDelegate.$getByHandle('basicInfoScroll').scrollTop();
        $scope.basicInfoModal.show();
    };
    $scope.$on('$destroy', function() {
        $scope.basicInfoModal.remove();
    });

    $scope.isActive = "a";
    $scope.changeTab = function(evt) {
        var elem = evt.currentTarget;
        $scope.isActive = elem.getAttributeNode('data-active').value;
    };

    $scope.changeBasic = function() {
        if (!MideApp.isOnline()) {
            return MideApp.myNotice('暂无网络连接...');
        }

        // if (angular.isUndefined($scope.mideApp_user_basic._photourl)) {
        //     return MideApp.myNotice('账号未填写...');
        // }

        if (angular.isUndefined($scope.mideApp_user_basic._nickname)) {
            return MideApp.myNotice('姓名未填写...');
        }
        if (angular.isUndefined($scope.mideApp_user_basic._sex)) {
            return MideApp.myNotice('性别未填写...');
        }
        if (angular.isUndefined($scope.mideApp_user_basic._birthday)) {
            return MideApp.myNotice('出身年月未填写...');
        }
        if (angular.isUndefined($scope.mideApp_user_basic._phone)) {
            return MideApp.myNotice('联系电话未填写...');
        }
        if (angular.isUndefined($scope.mideApp_user_basic._email)) {
            return MideApp.myNotice('邮箱未填写...');
        }
        if (angular.isUndefined($scope.mideApp_user_basic._qq)) {
            return MideApp.myNotice('QQ未填写...');
        }
        $ionicLoading.show();

        var UpdateMenberInfo_params = {
            'menberid': $scope.mideApp_user_basic._id,
            'nickname': $scope.mideApp_user_basic._nickname,
            'avatar_url': $scope.mideApp_user_basic._photourl,
            'sex': $scope.mideApp_user_basic._sex,
            'birthday': $scope.mideApp_user_basic._birthday,
            'phoneNumber': $scope.mideApp_user_basic._phone,
            'email': $scope.mideApp_user_basic._email,
            'QQnumber': $scope.mideApp_user_basic._qq,

        };
        MideApp.ajaxPost('UpdateMenberInfo.ashx', UpdateMenberInfo_params, function(data) {
            if (data.code == 0) {
                var mideApp_user = MideApp.LocCache.load('User') || null;
                if (mideApp_user) {
                    mideApp_user._nickname = $scope.mideApp_user_basic._nickname;
                    mideApp_user._photourl = $scope.mideApp_user_basic._photourl;
                    mideApp_user._sex = $scope.mideApp_user_basic._sex;
                    mideApp_user._birthday = $scope.mideApp_user_basic._birthday;
                    mideApp_user._phone = $scope.mideApp_user_basic._phone;
                    mideApp_user._email = $scope.mideApp_user_basic._email;
                    mideApp_user._qq = $scope.mideApp_user_basic._qq;

                    MideApp.LocCache.save('User', mideApp_user);
                    $rootScope.$broadcast('User.update');
                }

            }

            MideApp.myNotice(data.message)
            $scope.closeBasicInfoModal();

        }, function(data, status) {
            MideApp.myNotice("网络错误" + status)

        });

    }
    $scope.changeForHelp = function() {
        if (!MideApp.isOnline()) {
            return MideApp.myNotice('暂无网络连接...');
        }
        if (!$scope.mideApp_user_basic.this_country) {
            return MideApp.myNotice('国家未选择...');
        }
        if (!$scope.mideApp_user_basic.this_provinces) {
            return MideApp.myNotice('省份未选择...');
        }
        if (!$scope.mideApp_user_basic.this_city) {
            return MideApp.myNotice('城市未选择...');
        }
        if (!$scope.mideApp_user_basic._district) {
            return MideApp.myNotice('区域未填写...');
        }

        if (!$scope.mideApp_user_basic._district) {
            return MideApp.myNotice('社区未选择...');
        }
        if (!$scope.mideApp_user_basic._community) {
            return MideApp.myNotice('社区未选择...');
        }

        if (!$scope.mideApp_user_basic._personalid) {
            return MideApp.myNotice('身份证未填写...');
        }
        if (!$scope.mideApp_user_basic._address) {
            return MideApp.myNotice('常住地址未填写...');
        }
        if (!$scope.mideApp_user_basic._wechat) {
            return MideApp.myNotice('微信未填写...');
        }

        $ionicLoading.show();

        var UpdateMenberInfo_params = {
            'menberid': $scope.mideApp_user_basic._id,
            'country': $scope.mideApp_user_basic.this_country.label,
            'province': $scope.mideApp_user_basic.this_provinces.label,
            'city': $scope.mideApp_user_basic.this_city.label,
            'district': $scope.mideApp_user_basic._district,
            'community': $scope.mideApp_user_basic._community,
            'identity': $scope.mideApp_user_basic._personalid,
            'address': $scope.mideApp_user_basic._address,
            'weixinNumber': $scope.mideApp_user_basic._wechat,
            'flag': 1,

        };
        MideApp.ajaxPost('UpdateMenberInfo.ashx', UpdateMenberInfo_params, function(data) {
            if (data.code == 0) {
                var mideApp_user = MideApp.LocCache.load('User') || null;
                if (mideApp_user) {

                    mideApp_user._country = $scope.mideApp_user_basic.this_country.label;
                    mideApp_user._province = $scope.mideApp_user_basic.this_provinces.label;
                    mideApp_user._city = $scope.mideApp_user_basic.this_city.label;
                    mideApp_user._district = $scope.mideApp_user_basic._district;
                    mideApp_user._community = $scope.mideApp_user_basic._community;
                    mideApp_user._personalid = $scope.mideApp_user_basic._personalid;
                    mideApp_user._address = $scope.mideApp_user_basic._address;
                    mideApp_user._wechat = $scope.mideApp_user_basic._wechat;

                    if (mideApp_user._flag < 1) {
                        mideApp_user._flag = 1;
                        mideApp_user._flagName = '求助者';
                        mideApp_user._status = 1;
                        mideApp_user._statusName = '待审核';
                    } else if (mideApp_user.flag < 2) {
                        mideApp_user._flag = 2;
                        mideApp_user._flagName = '志愿者';
                        mideApp_user._status = 1;
                        mideApp_user._statusName = '待审核';
                    }
                    MideApp.LocCache.save('User', mideApp_user);
                    $rootScope.$broadcast('User.update');
                }

            }

            MideApp.myNotice(data.message)
            $scope.closeBasicInfoModal();

        }, function(data, status) {
            MideApp.myNotice("网络错误" + status)

        });

    }
    $scope.changeVolunteer = function() {
        if (!MideApp.isOnline()) {
            return MideApp.myNotice('暂无网络连接...');
        }
        if (angular.isUndefined($scope.mideApp_user_basic.this_education.label)) {
            return MideApp.myNotice('学历未填写...');
        }
        if (angular.isUndefined($scope.mideApp_user_basic._major))  {
            return MideApp.myNotice('专业未填写...');
        }
        if (angular.isUndefined($scope.mideApp_user_basic._specialskill))  {
            return MideApp.myNotice('特长未填写...');
        }
        if (angular.isUndefined($scope.mideApp_user_basic.this_serviceintention.label)) {
            return MideApp.myNotice('服务意愿未选择...');
        }
        if (angular.isUndefined($scope.mideApp_user_basic._servicetimeinterval))  {
            return MideApp.myNotice('服务时段未填写...');
        }

        $ionicLoading.show();
        var UpdateMenberInfo_params = {
            'menberid': $scope.mideApp_user_basic._id,
            'education': $scope.mideApp_user_basic.this_education.label,
            'profession': $scope.mideApp_user_basic._major,
            'speciality': $scope.mideApp_user_basic._specialskill,
            'intention': $scope.mideApp_user_basic.this_serviceintention.label,
            'intentionTime': $scope.mideApp_user_basic._servicetimeinterval,
            'flag': 2,

        };
        MideApp.ajaxPost('UpdateMenberInfo.ashx', UpdateMenberInfo_params, function(data) {
            if (data.code == 0) {
                var mideApp_user = MideApp.LocCache.load('User') || null;
                if (mideApp_user) {

                    mideApp_user._education = $scope.mideApp_user_basic.this_education.label;
                    mideApp_user._major = $scope.mideApp_user_basic._major;
                    mideApp_user._specialskill = $scope.mideApp_user_basic._specialskill;
                    mideApp_user._serviceintention = $scope.mideApp_user_basic.this_serviceintention.label,
                        mideApp_user._servicetimeinterval = $scope.mideApp_user_basic._servicetimeinterval;

                    if (mideApp_user.flag < 2) {
                        mideApp_user._flag = 2;
                        mideApp_user._flagName = '志愿者';
                        mideApp_user._status = 1;
                        mideApp_user._statusName = '待审核';
                    }
                    MideApp.LocCache.save('User', mideApp_user);
                    $rootScope.$broadcast('User.update');
                }
                $scope.closeBasicInfoModal();

            }

            MideApp.myNotice(data.message)


        }, function(data, status) {
            MideApp.myNotice("网络错误" + status)

        });

    }
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
                if (index == 0) {
                    $scope.mideApp_user_basic._sex = "男";
                } else {
                    $scope.mideApp_user_basic._sex = "女";
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
        if (typeof($scope.mideApp_user_basic._birthday) != "undefined") {
            mydate = new Date($scope.mideApp_user_basic._birthday);
        }

        var options = {
            date: mydate,
            mode: 'date'
        };

        datePicker.show(options, function(date) {
            $timeout(function() {
                $scope.mideApp_user_basic._birthday = date;
            }, 10);

        }, function(err) {
            // alert(err)
            // MideApp.myNotice('修改失败')
        });
    }

    ///////////////////////////求助与帮助//////////////////////////////////////
    $ionicModal.fromTemplateUrl('templates/helpAndAsk.html', {
        scope: $scope,
        animation: 'slide-in-right'
    }).then(function(modal) {
        $scope.helpAndAskModal = modal;
    });
    $scope.MyHelpConfig = MideApp.MemCache.load('MyHelp-list') || {
        errormsg: false,
        infinite: true,
        number: 10,
        page: 1,
        topics: []
    };

    $scope.AskConfig = MideApp.MemCache.load('myAsk-list') || {
        errormsg: false,
        infinite: true,
        number: 10,
        page: 1,
        topics: []
    };
    $scope.closeHelpAndAskModal = function() {
        $scope.helpAndAskModal.hide();
    };
    $scope.showHelpAndAskModal = function(isActive) {
        if (typeof($scope.mideApp_user.islogin) == false) {
            $scope.showLoginModal();
        } else {
            $scope.helpAndAsk_isActive = isActive;

            $scope.activeConfig = $scope.AskConfig;

            $ionicScrollDelegate.$getByHandle('helpAndAskScroll').scrollTop();
            $scope.helpAndAskModal.show();
        }

    };
    $scope.$on('$destroy', function() {
        $scope.helpAndAskModal.remove();
    });


    $scope.helpAndAsk_changeTab = function(evt) {
        var elem = evt.currentTarget;
        $scope.helpAndAsk_isActive = elem.getAttributeNode('data-active').value;

        if ($scope.helpAndAsk_isActive == "help") {
            $scope.activeConfig = $scope.MyHelpConfig;
            if ($scope.MyHelpConfig.topics.length == 0) {
                $scope.doRefresh();
            }
        } else {
            $scope.activeConfig = $scope.AskConfig;
            if ($scope.AskConfig.topics.length == 0) {
                $scope.doRefresh();
            }
        }
    };

    var load_help_page = function(callback) {
        try {
            if (!MideApp.isOnline()) {
                $cordovaFile.readAsText(cordova.file.externalDataDirectory, "MyHelp-list.json")
                    .then(function(success) {
                        $scope.MyHelpConfig = angular.fromJson(success);
                        $scope.MyHelpConfig.infinite = 0;
                    }, function(error) {});
                callback && callback();
                return MideApp.myNotice('暂无网络连接...');
            }
        } catch (e) {
            // console.log(e);
        }

        var GetHelpRequestList_params = {
            'menberID': $scope.mideApp_user._id,
            'Type': 2,
            'PageIndex': $scope.MyHelpConfig.page
        };
        MideApp.ajaxPost('GetHelpRequestList.ashx', GetHelpRequestList_params, function(data) {
            if (data.code == 0) {
                if (!(data.data == null || data.data == '')) {
                    if ($scope.MyHelpConfig.page == 1) {
                        $scope.MyHelpConfig.topics = data.data;
                    } else {
                        $scope.MyHelpConfig.topics = $scope.MyHelpConfig.topics.concat(data.data);
                    }
                    $scope.MyHelpConfig.page = $scope.MyHelpConfig.page + 1;
                    $scope.MyHelpConfig.errormsg = !$scope.MyHelpConfig.topics.length;
                    $scope.MyHelpConfig.infinite = data.data.length > 0;
                    MideApp.writeFile($cordovaFile, "MyHelp-list.json", $scope.config, true);

                } else {
                    $scope.MyHelpConfig.infinite = false;
                }

            } else {
                $scope.MyHelpConfig.infinite = false;
            }
            $scope.activeConfig = $scope.MyHelpConfig;
            callback && callback();


        }, function(data) {
            MideApp.myNotice("网络错误" + data.status)
            $cordovaFile.readAsText(cordova.file.externalDataDirectory, "MyHelp-list.json")
                .then(function(success) {
                    $scope.MyHelpConfig = angular.fromJson(success);
                    $scope.MyHelpConfig.infinite = 0;
                }, function(error) {});
            $scope.activeConfig = $scope.MyHelpConfig;
            callback && callback();
        });
    };

    var load_ask_page = function(callback) {
        try {
            if (!MideApp.isOnline()) {
                $cordovaFile.readAsText(cordova.file.externalDataDirectory, "myAsk-list.json")
                    .then(function(success) {
                        $scope.MyHelpConfig = angular.fromJson(success);
                        $scope.MyHelpConfig.infinite = 0;
                    }, function(error) {});
                callback && callback();
                return MideApp.myNotice('暂无网络连接...');
            }
        } catch (e) {
            // console.log(e);
        }

        var GetHelpRequestList_params = {
            'menberID': $scope.mideApp_user._id,
            'Type': 1,
            'PageIndex': $scope.AskConfig.page
        };
        MideApp.ajaxPost('GetHelpRequestList.ashx', GetHelpRequestList_params, function(data) {
            if (data.code == 0) {
                if (!(data.data == null || data.data == '')) {
                    if ($scope.AskConfig.page == 1) {
                        $scope.AskConfig.topics = data.data;
                    } else {
                        $scope.AskConfig.topics = $scope.AskConfig.topics.concat(data.data);
                    }
                    $scope.AskConfig.page = $scope.AskConfig.page + 1;
                    $scope.AskConfig.errormsg = !$scope.AskConfig.topics.length;
                    $scope.AskConfig.infinite = data.data.length > 0;
                    MideApp.writeFile($cordovaFile, "myAsk-list.json", $scope.config, true);

                } else {
                    $scope.AskConfig.infinite = false;
                }

            } else {
                $scope.AskConfig.infinite = false;
            }
            $scope.activeConfig = $scope.AskConfig;
            callback && callback();


        }, function(data, status) {
            MideApp.myNotice("网络错误" + status)
            $cordovaFile.readAsText(cordova.file.externalDataDirectory, "myAsk-list.json")
                .then(function(success) {
                    $scope.AskConfig = angular.fromJson(success);
                    $scope.AskConfig.infinite = 0;
                }, function(error) {});
            $scope.activeConfig = $scope.AskConfig;
            callback && callback();
        });
    };
    $scope.moreDataCanBeLoaded = function() {
        return true;
    }
    $scope.activeConfig = {
        'infinite': false
    };
    $scope.helpAndAsk_infinite = function() {
        if ($scope.helpAndAsk_isActive == "help") {
            load_help_page(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        } else {
            load_ask_page(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

    }
    $scope.doRefresh = function() {
        if ($scope.helpAndAsk_isActive == "help") {
            $scope.MyHelpConfig.topics = [];
            $scope.MyHelpConfig.page = 1;
            load_help_page(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        } else {
            $scope.AskConfig.topics = [];
            $scope.AskConfig.page = 1;
            load_ask_page(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

    }
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

    $scope.showTopicModal = function(topicId) {
        var mideApp_user = MideApp.LocCache.load('User') || null;
        $scope.current_id = "" + topicId;
        $scope.current_topic = $filter("topicFilter")($scope.activeConfig.topics, topicId);


        if ($scope.current_topic.HelpRequest._status == 0) {
            if ($scope.current_topic.HelpRequest._type == 1) {
                $scope.buttonName = '助他';
            } else if ($scope.current_topic.HelpRequest._type == 2) {
                $scope.buttonName = '求他';
            }
            if (mideApp_user && $scope.current_topic.Author._id == mideApp_user._id) {
                $scope.show_help_button = false;
            } else {
                $scope.show_help_button = true;
            }
        } else if ($scope.current_topic.HelpRequest._status == 1) {

            if (mideApp_user && $scope.current_topic.Author._id == mideApp_user._id) {
                $scope.buttonName = '完成';
                $scope.show_help_button = true;
            } else {
                $scope.show_help_button = false;
            }
        } else {
            $scope.show_help_button = false;
        }
        // if(mideApp_user&&mideApp_user._id==$scope.current_topic.Author._id){
        //     $scope.show_help_button= false;
        // }
        $ionicScrollDelegate.$getByHandle('topicMainScroll').scrollTop();
        $scope.topicModal.show();
    };
    $scope.$on('$destroy', function() {
        $scope.topicModal.remove();
    });
    $scope.help = function() {

        $ionicActionSheet.show({
            titleText: '确认' + $scope.buttonName + '？',
            buttons: [{
                text: $scope.buttonName
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
                    var mideApp_user = MideApp.LocCache.load('User') || null;
                    if (!mideApp_user) {
                        $scope.closeTopicModal();
                        $state.go("tab.account");
                        return false;
                    } else {
                        $ionicLoading.show();
                        var _status = 1;
                        if ($scope.buttonName == '完成') {
                            _status = 2;
                        }
                        var UpdateHelp_params = {
                            'helpRequestID': $scope.current_topic.ID, //请求单号
                            'underTakerID': mideApp_user._id, //接单者ID
                            'status': _status, //动作状态
                        };
                        MideApp.ajaxPost('UpdateHelpRequest.ashx', UpdateHelp_params, function(data) {
                            if (data.code == 0) {
                                $scope.current_topic.HelpRequest._status = _status;
                                $ionicLoading.hide();
                                $scope.closeTopicModal();
                                MideApp.myNotice('成功')
                            } else {
                                MideApp.myNotice(data.message);
                            }

                        }, function(data) {
                            MideApp.myNotice("网络错误" + data.status)
                        });
                    }

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

.controller('RegCtrl', function($scope, $http, $rootScope, $ionicActionSheet,
    $state, $ionicLoading, $timeout, $cordovaCamera, $ionicModal,
    $ionicScrollDelegate, Tools, Data) {
    MideApp.setBackManner('back');
    $rootScope.tabsHidden = "tabs-hide";
    $scope.mideApp_user_reg = {};
    MideApp.intoMyController($scope, $rootScope, $state);

    var mideApp_user_reg = $scope.mideApp_user_reg = {};
    mideApp_user_reg.countries = Data.getCityData();
    // 更换国家的时候清空省
    $scope.$watch('mideApp_user_reg.country', function(country) {
        mideApp_user_reg.province = null;
    });
    // 更换省的时候清空城市
    $scope.$watch('mideApp_user_reg.province', function(province) {
        mideApp_user_reg.city = null;
    });

    mideApp_user_reg.educationData = Data.getEducationData();

    mideApp_user_reg.intentionData = Data.getIntentionData();

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
                    $scope.mideApp_user_reg.avatar_url = "data:image/jpeg;base64," + imageData;
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
                    // $scope.mideApp_user_reg.avatar_url = "data:image/jpeg;base64," + imageData;
                    $scope.mideApp_user_reg.avatar_url = imageData[0];
                }, 10);

            },
            function(error) {
                alert('Error: ' + error);
            }, options);
    };
    $scope.showGetImagesheet = function() {
        $ionicActionSheet.show({
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
                    $scope.mideApp_user_reg.gender = "男";
                } else {
                    $scope.mideApp_user_reg.gender = "女";
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
        if (typeof($scope.mideApp_user_reg.birthday) != "undefined") {
            mydate = new Date($scope.mideApp_user_reg.birthday);
        }

        var options = {
            date: mydate,
            mode: 'date'
        };

        datePicker.show(options, function(date) {
            $timeout(function() {
                $scope.mideApp_user_reg.birthday = date;
            }, 10);



        }, function(err) {
            alert(err)
                // MideApp.myNotice('修改失败')
        });
    }

    $scope.doReg = function(flag) {
        if (!MideApp.isOnline()) {
            return MideApp.myNotice('暂无网络连接...');
        }
        if (flag == 1) {
            if (angular.isUndefined($scope.mideApp_user_reg.username)) {
                return MideApp.myNotice('账号未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.password)) {
                return MideApp.myNotice('密码未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.confirmPassword)) {
                return MideApp.myNotice('确认密码未填写...');
            }
            if ($scope.mideApp_user_reg.password != $scope.mideApp_user_reg.confirmPassword) {
                return MideApp.myNotice('密码不一致');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.nickname)) {
                return MideApp.myNotice('姓名未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.gender)) {
                return MideApp.myNotice('性别未填写...');
            }
            if (!angular.isUndefined($scope.mideApp_user_reg.birthday)) {
                return MideApp.myNotice('出身年月未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.phoneNumber)) {
                return MideApp.myNotice('手机号未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.email)) {
                return MideApp.myNotice('邮箱未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.QQnumber)) {
                return MideApp.myNotice('QQ未填写...');
            }
        }
        if (flag == 2) {
            if (angular.isUndefined($scope.mideApp_user_reg.country)) {
                return MideApp.myNotice('国家未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.province)) {
                return MideApp.myNotice('省份未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.city)) {
                return MideApp.myNotice('城市未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.district)) {
                return MideApp.myNotice('区未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.community)) {
                return MideApp.myNotice('社区未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.identity)) {
                return MideApp.myNotice('身份证号未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.address)) {
                return MideApp.myNotice('常住地址未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.weixinNumber)) {
                return MideApp.myNotice('微信号未填写...');
            }
        }
        if (flag == 3) {
            if (angular.isUndefined($scope.mideApp_user_reg.education)) {
                return MideApp.myNotice('学历未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.profession)) {
                return MideApp.myNotice('专业未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.speciality)) {
                return MideApp.myNotice('特长未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.intention)) {
                return MideApp.myNotice('服务意愿未填写...');
            }
            if (angular.isUndefined($scope.mideApp_user_reg.intentionTime)) {
                return MideApp.myNotice('服务时间未填写...');
            }

        }

        $ionicLoading.show();
        var params1 = {
            'username': $scope.mideApp_user_reg.username,
            'psw': Tools.MD5($scope.mideApp_user_reg.password),
            'avatar_url': 'test',
            'nickname': $scope.mideApp_user_reg.nickname,
            'sex': $scope.mideApp_user_reg.gender,
            'birthday': $scope.mideApp_user_reg.birthday,
            'phoneNumber': $scope.mideApp_user_reg.phoneNumber,
            'email': $scope.mideApp_user_reg.email,
            'QQnumber': $scope.mideApp_user_reg.QQnumber
        };



        var params_flag = {
            'flag': flag
        }
        var params = {};

        if (flag == 0) {
            angular.extend(params, params1, params_flag)
        }
        if (flag == 1) {
            var params2 = {
                'country': $scope.mideApp_user_reg.country.label,
                'province': $scope.mideApp_user_reg.province.label,
                'city': $scope.mideApp_user_reg.city.label,
                'district': $scope.mideApp_user_reg.district,
                'community': $scope.mideApp_user_reg.community,
                'identity': $scope.mideApp_user_reg.identity,
                'address': $scope.mideApp_user_reg.address,
                'weixinNumber': $scope.mideApp_user_reg.weixinNumber
            };
            angular.extend(params, params1, params2, params_flag)
        }
        if (flag == 2) {
            var params2 = {
                'country': $scope.mideApp_user_reg.country.label,
                'province': $scope.mideApp_user_reg.province.label,
                'city': $scope.mideApp_user_reg.city.label,
                'district': $scope.mideApp_user_reg.district,
                'community': $scope.mideApp_user_reg.community,
                'identity': $scope.mideApp_user_reg.identity,
                'address': $scope.mideApp_user_reg.address,
                'weixinNumber': $scope.mideApp_user_reg.weixinNumber,
                'education': $scope.mideApp_user_reg.education.label,
                'profession': $scope.mideApp_user_reg.profession,
                'speciality': $scope.mideApp_user_reg.speciality,
                'intention': $scope.mideApp_user_reg.intention.label,
                'intentionTime': $scope.mideApp_user_reg.intentionTime
            };
            angular.extend(params, params1, params2, params_flag)
        }

        MideApp.ajaxPost('register.ashx', params, function(data) {
            if (data.code == 0) {
                $scope.closeReForHelpModal();
                $scope.closeRegVolunteerModal();
                $ionicLoading.hide();

                MideApp.myNotice(data.message);
                $timeout(function() {
                    $state.go("tab.account");
                }, 200);
            } else {
                MideApp.myNotice(data.message);
            }

        }, function(data, status) {
            MideApp.myNotice("网络错误" + status)
        });
    };

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
    $scope.$on('$destroy', function() {
        $scope.reForHelpModal.remove();
    });
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
    $scope.$on('$destroy', function() {
        $scope.regVolunteerModal.remove();
    });

})

// .controller('PhoneCtrl', function($scope, $rootScope, $state, $ionicLoading) {

//         $scope.mideApp_user = MideApp.LocCache.load('User') || {};

//         MideApp.setBackManner('back');
//         $rootScope.tabsHidden = "tabs-hide";
//         MideApp.intoMyController($scope, $rootScope, $state);


//         $scope.save = function() {
//             MideApp.httpGet('mideData/user.json', function(data) {

//                 MideApp.LocCache.save("User", $scope.mideApp_user);
//                 $ionicLoading.hide();
//                 MideApp.myNotice('修改成功')
//                 $state.go("tab.account");
//             });
//         }

//     })
//     .controller('EmailCtrl', function($scope, $rootScope, $state, $ionicLoading) {

//         $scope.mideApp_user = MideApp.LocCache.load('User') || {};

//         MideApp.setBackManner('back');
//         $rootScope.tabsHidden = "tabs-hide";
//         MideApp.intoMyController($scope, $rootScope, $state);


//         $scope.save = function() {
//             MideApp.httpGet('mideData/user.json', function(data) {

//                 MideApp.LocCache.save("User", $scope.mideApp_user);
//                 $ionicLoading.hide();
//                 MideApp.myNotice('修改成功')
//                 $state.go("tab.account");
//             });
//         }

//     })
//     .controller('QQCtrl', function($scope, $rootScope, $state, $ionicLoading) {

//         $scope.mideApp_user = MideApp.LocCache.load('User') || {};

//         MideApp.setBackManner('back');
//         $rootScope.tabsHidden = "tabs-hide";
//         MideApp.intoMyController($scope, $rootScope, $state);


//         $scope.save = function() {
//             MideApp.httpGet('mideData/user.json', function(data) {

//                 MideApp.LocCache.save("User", $scope.mideApp_user);
//                 $ionicLoading.hide();
//                 MideApp.myNotice('修改成功')
//                 $state.go("tab.account");
//             });
//         }

//     })
//     .controller('RegionCtrl', function($scope, $rootScope, $state, $ionicLoading) {

//         $scope.mideApp_user = MideApp.LocCache.load('User') || {};

//         MideApp.setBackManner('back');
//         $rootScope.tabsHidden = "tabs-hide";
//         MideApp.intoMyController($scope, $rootScope, $state);


//         $scope.save = function() {
//             MideApp.httpGet('mideData/user.json', function(data) {

//                 MideApp.LocCache.save("User", $scope.mideApp_user);
//                 $ionicLoading.hide();
//                 MideApp.myNotice('修改成功')
//                 $state.go("tab.account");
//             });
//         }

//     })
//     .controller('IdentityCtrl', function($scope, $rootScope, $state, $ionicLoading) {

//         $scope.mideApp_user = MideApp.LocCache.load('User') || {};

//         MideApp.setBackManner('back');
//         $rootScope.tabsHidden = "tabs-hide";
//         MideApp.intoMyController($scope, $rootScope, $state);


//         $scope.save = function() {
//             MideApp.httpGet('mideData/user.json', function(data) {

//                 MideApp.LocCache.save("User", $scope.mideApp_user);
//                 $ionicLoading.hide();
//                 MideApp.myNotice('修改成功')
//                 $state.go("tab.account");
//             });
//         }

//     })
//     .controller('AddressCtrl', function($scope, $rootScope, $state, $ionicLoading) {

//         $scope.mideApp_user = MideApp.LocCache.load('User') || {};

//         MideApp.setBackManner('back');
//         $rootScope.tabsHidden = "tabs-hide";
//         MideApp.intoMyController($scope, $rootScope, $state);


//         $scope.save = function() {
//             MideApp.httpGet('mideData/user.json', function(data) {

//                 MideApp.LocCache.save("User", $scope.mideApp_user);
//                 $ionicLoading.hide();
//                 MideApp.myNotice('修改成功')
//                 $state.go("tab.account");
//             });
//         }

//     })
//     .controller('WeixinNumberCtrl', function($scope, $rootScope, $state, $ionicLoading) {

//         $scope.mideApp_user = MideApp.LocCache.load('User') || {};

//         MideApp.setBackManner('back');
//         $rootScope.tabsHidden = "tabs-hide";
//         MideApp.intoMyController($scope, $rootScope, $state);


//         $scope.save = function() {
//             MideApp.httpGet('mideData/user.json', function(data) {

//                 MideApp.LocCache.save("User", $scope.mideApp_user);
//                 $ionicLoading.hide();
//                 MideApp.myNotice('修改成功')
//                 $state.go("tab.account");
//             });
//         }

//     })
//     .controller('EducationCtrl', function($scope, $rootScope, $state, $ionicLoading) {

//         $scope.mideApp_user = MideApp.LocCache.load('User') || {};

//         MideApp.setBackManner('back');
//         $rootScope.tabsHidden = "tabs-hide";
//         MideApp.intoMyController($scope, $rootScope, $state);


//         $scope.save = function() {
//             MideApp.httpGet('mideData/user.json', function(data) {

//                 MideApp.LocCache.save("User", $scope.mideApp_user);
//                 $ionicLoading.hide();
//                 MideApp.myNotice('修改成功')
//                 $state.go("tab.account");
//             });
//         }

//     })
//     .controller('ProfessionCtrl', function($scope, $rootScope, $state, $ionicLoading) {

//         $scope.mideApp_user = MideApp.LocCache.load('User') || {};

//         MideApp.setBackManner('back');
//         $rootScope.tabsHidden = "tabs-hide";
//         MideApp.intoMyController($scope, $rootScope, $state);


//         $scope.save = function() {
//             MideApp.httpGet('mideData/user.json', function(data) {

//                 MideApp.LocCache.save("User", $scope.mideApp_user);
//                 $ionicLoading.hide();
//                 MideApp.myNotice('修改成功')
//                 $state.go("tab.account");
//             });
//         }

//     })
//     .controller('SpecialityCtrl', function($scope, $rootScope, $state, $ionicLoading) {

//         $scope.mideApp_user = MideApp.LocCache.load('User') || {};

//         MideApp.setBackManner('back');
//         $rootScope.tabsHidden = "tabs-hide";
//         MideApp.intoMyController($scope, $rootScope, $state);


//         $scope.save = function() {
//             MideApp.httpGet('mideData/user.json', function(data) {

//                 MideApp.LocCache.save("User", $scope.mideApp_user);
//                 $ionicLoading.hide();
//                 MideApp.myNotice('修改成功')
//                 $state.go("tab.account");
//             });
//         }

//     })
//     .controller('IntentionCtrl', function($scope, $rootScope, $state, $ionicLoading) {

//         $scope.mideApp_user = MideApp.LocCache.load('User') || {};

//         MideApp.setBackManner('back');
//         $rootScope.tabsHidden = "tabs-hide";
//         MideApp.intoMyController($scope, $rootScope, $state);


//         $scope.save = function() {
//             MideApp.httpGet('mideData/user.json', function(data) {

//                 MideApp.LocCache.save("User", $scope.mideApp_user);
//                 $ionicLoading.hide();
//                 MideApp.myNotice('修改成功')
//                 $state.go("tab.account");
//             });
//         }

//     })
//     .controller('IntentionTimeCtrl', function($scope, $rootScope, $state, $ionicLoading) {

//         $scope.mideApp_user = MideApp.LocCache.load('User') || {};

//         MideApp.setBackManner('back');
//         $rootScope.tabsHidden = "tabs-hide";
//         MideApp.intoMyController($scope, $rootScope, $state);


//         $scope.save = function() {
//             MideApp.httpGet('mideData/user.json', function(data) {

//                 MideApp.LocCache.save("User", $scope.mideApp_user);
//                 $ionicLoading.hide();
//                 MideApp.myNotice('修改成功')
//                 $state.go("tab.account");
//             });
//         }

//     })
.controller('ForgetPasswordCtrl', function($scope, $rootScope, $state, $ionicLoading) {

        $scope.forget = {};

        MideApp.setBackManner('back');
        $rootScope.tabsHidden = "tabs-hide";
        MideApp.intoMyController($scope, $rootScope, $state);


        $scope.post = function() {
            var _params = {
                'menberName': $scope.forget.username,
                'email': $scope.forget.email,
            };
            MideApp.ajaxPost('GetBackPsw.ashx', _params, function(data) {
                if (data.code == 0) {
                    MideApp.myNotice('已经发送至邮箱', 1500, function() {
                        $scope.forget = {};
                        $state.go('tab.account');
                    });

                } else {
                    MideApp.myNotice(data.message);
                }

            }, function(data, status) {
                MideApp.myNotice("网络错误" + status)
            });
            // MideApp.httpGet('mideData/user.json', function(data) {

            //     MideApp.LocCache.save("myEmail", $scope.forget.myEmail);
            //     $ionicLoading.hide();
            //     MideApp.myNotice('发送成功')
            //     $state.go("tab.forgetCode");
            // });
        }

    })
    .controller('ForgetCodeCtrl', function($scope, $rootScope, $state, $ionicLoading) {

        $scope.myEmail = MideApp.LocCache.load("myEmail") || '';
        $scope.code = '';
        MideApp.setBackManner('back');
        $rootScope.tabsHidden = "tabs-hide";
        MideApp.intoMyController($scope, $rootScope, $state);


        $scope.post = function() {
            $ionicLoading.show();
            MideApp.httpGet('mideData/user.json', function(data) {

                $ionicLoading.hide();
                MideApp.myNotice('验证成功')
                $state.go("tab.resetPassword");
            });
        }

    })
    .controller('ResetPasswordCtrl', function($scope, $rootScope, $state, $ionicLoading) {

        $scope.pwd = {};
        MideApp.setBackManner('back');
        $rootScope.tabsHidden = "tabs-hide";
        MideApp.intoMyController($scope, $rootScope, $state);


        $scope.post = function() {
            if ($scope.pwd.newPassWord1 != $scope.pwd.newPassWord2) {
                MideApp.myNotice('两密码不一致');
            } else {
                MideApp.httpGet('mideData/user.json', function(data) {

                    $ionicLoading.hide();
                    MideApp.myNotice('成功')
                    $scope.pwd.newPassWord1 = "";
                    $scope.pwd.newPassWord2 = "";
                    $state.go("tab.account");
                    return true;
                });
            }

        }

    })
    .controller('MyGiftCtrl', function($scope, $rootScope, $state, $ionicLoading, $cordovaFile) {

        $scope.pwd = {};
        MideApp.setBackManner('back');
        $rootScope.tabsHidden = "tabs-hide";
        MideApp.intoMyController($scope, $rootScope, $state);


        mideApp_user = MideApp.LocCache.load('User') || null;
        if (mideApp_user == null) {
            $state.includes = [];
            $state.go("tab.account", {
                reload: true
            });
            return false;
        }

        $scope.myGiftConfig = {
            'infinite': true,
            'page': 1,
            'gifts': []
        };

        var load_mygift = function(callback) {

            try {
                if (!MideApp.isOnline()) {
                    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "mygifts.json")
                        .then(function(success) {
                            $scope.myGiftConfig.gifts = angular.fromJson(success);
                        }, function(error) {});
                    callback && callback();
                    return MideApp.myNotice('暂无网络连接...');
                }
            } catch (e) {

            }
            var mygift_params = {
                'MenberID': mideApp_user._id,
                'PageIndex': $scope.myGiftConfig.page
            };
            MideApp.ajaxPost('GetGiftList.ashx', mygift_params, function(data) {

                if (data.code == 0) {
                    if (!(data.data == null || data.data == '')) {
                        if ($scope.myGiftConfig.page == 1) {
                            $scope.myGiftConfig.gifts = data.data;
                        } else {
                            $scope.myGiftConfig.gifts = $scope.myGiftConfig.gifts.concat(data.data);
                        }
                        $scope.myGiftConfig.page = $scope.myGiftConfig.page + 1;
                        $scope.myGiftConfig.errormsg = !$scope.myGiftConfig.gifts.length;
                        $scope.myGiftConfig.infinite = data.data.length > 0;
                        MideApp.writeFile($cordovaFile, "mygifts.json", $scope.myGiftConfig, true);

                    } else {
                        $scope.myGiftConfig.infinite = false;
                    }

                } else {
                    $scope.myGiftConfig.infinite = false;
                }

                callback && callback();


            }, function(data) {
                MideApp.myNotice("网络错误" + data.status)
                $cordovaFile.readAsText(cordova.file.externalDataDirectory, "mygifts.json")
                    .then(function(success) {
                        $scope.myGiftconfig.gifts = angular.fromJson(success);
                    }, function(error) {});
                callback && callback();
            });
        };

        $scope.infinite = function() {
            load_mygift(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }
        $scope.doRefresh = function() {
            $scope.myGiftConfig.gifts = [];
            $scope.myGiftConfig.page = 1;
            load_mygift(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }


    })
    .controller('FeedbackCtrl', function($scope, $rootScope, $state, $ionicScrollDelegate,
        $ionicModal, $ionicLoading, $filter, $cordovaFile, $cordovaNetwork, $timeout, UserCache) {
        //没有接口获取回馈列表
        $scope.pwd = {};
        MideApp.setBackManner('back');
        $rootScope.tabsHidden = "tabs-hide";
        MideApp.intoMyController($scope, $rootScope, $state);

        $scope.config = {
            infinite: true,
            page: 1,
            dataList: []
        };
        var load_page = function(callback) {
            try {
                if (!MideApp.isOnline()) {
                    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "feedback.json")
                        .then(function(success) {
                            $scope.config = angular.fromJson(success);
                            $scope.config.infinite = 0;
                        }, function(error) {});
                    callback && callback();
                    return MideApp.myNotice('暂无网络连接...');
                }
            } catch (e) {
                // console.log(e);
            }
            var GetHelpRequestList_params = {
                'PageIndex': $scope.config.page
            };
            MideApp.ajaxPost('GetHelpRequestList.ashx', GetHelpRequestList_params, function(data) {
                if (data.code == 0) {
                    if (!(data.data == null || data.data == '')) {
                        if ($scope.config.page == 1) {
                            $scope.config.topics = data.data;
                        } else {
                            $scope.config.topics = $scope.config.topics.concat(data.data);
                        }
                        $scope.config.page = $scope.config.page + 1;
                        $scope.config.errormsg = !$scope.config.topics.length;
                        $scope.config.infinite = data.data.length > 0;
                        MideApp.writeFile($cordovaFile, "topics.json", $scope.config, true);

                    } else {
                        $scope.config.infinite = false;
                    }

                } else {
                    $scope.config.infinite = false;
                }

                callback && callback();


            }, function(data) {
                MideApp.myNotice("网络错误" + data.status)
                $cordovaFile.readAsText(cordova.file.externalDataDirectory, "topics.json")
                    .then(function(success) {
                        $scope.config = angular.fromJson(success);
                        $scope.config.infinite = 0;
                    }, function(error) {});
                callback && callback();
            });
        };

        $ionicModal.fromTemplateUrl('templates/feedback.html', {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function(modal) {
            $scope.feedbackModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeFeedbackModal = function() {
            $scope.feedbackModal.hide();
        };
        $scope.showFeedbackModal = function(id) {
            $scope.showId = {
                "id": id
            };
            $ionicScrollDelegate.scrollTop();
            $scope.feedbackModal.show();
        };
        $scope.$on('$destroy', function() {
            $scope.feedbackModal.remove();
        });
        $scope.feedbackData = {};
        $scope.feedbackSend = function() {
            if (angular.isUndefined($scope.feedbackData.detail)) {
                return MideApp.myNotice("请输出反馈意见");
            }
            var _user = UserCache.getUser();
            if (angular.isUndefined(_user._id)) {
                return MideApp.myNotice("请先登录");
            }
            $ionicLoading.show({
                template: '<div class="ion-load-c loading-icon"></div>加载中...'
            });
            var _params = {
                'menberid': _user._id,
                'detail': $scope.feedbackData.detail,

            };
            MideApp.ajaxPost('AddFeedBack.ashx', _params, function(data) {

                $ionicLoading.hide();
                if (data.code == 0) {
                    return MideApp.myNotice(data.message, 1500, function() {
                        $scope.feedbackData = {};
                        $state.go('tab.account');
                    }, function() {

                    });


                } else {
                    return MideApp.myNotice(data.mesage);
                }
            }, function(data, status) {
                MideApp.myNotice("网络错误" + status)
            });
        }



    })
    .controller('rankCtrl', function($scope, $rootScope, $ionicActionSheet, $state, $ionicLoading, $timeout, $ionicPopover, $filter, $cordovaFile, RankTabs) {
        MideApp.setBackManner('back');
        $rootScope.tabsHidden = "tabs-hide";
        MideApp.intoMyController($scope, $rootScope, $state);

        mideApp_user = MideApp.LocCache.load('User') || null;
        if (mideApp_user == null) {
            $state.includes = [];
            $state.go("tab.account", {
                reload: true
            });
            return false;
        }

        $scope.rankTabs = [{
            value: 'country',
            label: mideApp_user._country
        }, {
            value: 'province',
            label: mideApp_user._province
        }, {
            value: 'city',
            label: mideApp_user._city
        }];
        $scope.currentRankTabs = "country";
        $scope.currentRank = $filter("filter")($scope.rankTabs, {
            value: $scope.currentRankTabs
        })[0];

        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl('templates/rankPopover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.rankPopover = popover;
        });


        var load_rankList = function(tab, callback) {
            try {
                if (!MideApp.isOnline()) {
                    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "rankList_" + tab + ".json")
                        .then(function(success) {
                            $scope.rankList = angular.fromJson(success);
                        }, function(error) {});
                    callback && callback();
                    return MideApp.myNotice('暂无网络连接...');
                }
            } catch (e) {
                // console.log(e);
            }
            // string country = context.Request["country"];//全国
            // string province = context.Request["province"];//广东
            // string city = context.Request["city"];//广州
            var GetRankList_params = {};
            if (tab == 'city') {
                GetRankList_params = {
                    'city': mideApp_user._city
                }
            } else if (tab == 'province') {
                GetRankList_params = {
                    'province': mideApp_user._province
                }
            } else {
                GetRankList_params = {
                    'country': mideApp_user._country
                }
            }

            MideApp.ajaxPost('GetRankList.ashx', GetRankList_params, function(data) {
                if (data.code == 0) {
                    if (!(data.data == null || data.data == '')) {

                        $scope.rankList = data.data;

                        MideApp.writeFile($cordovaFile, "rankList_" + tab + ".json", $scope.rankList, true);

                    } else {
                        $scope.rankList = [];
                    }

                } else {
                    MideApp.myNotice(data.message)
                }

                callback && callback();


            }, function(data) {
                MideApp.myNotice("网络错误");
                // $cordovaFile.readAsText(cordova.file.externalDataDirectory, "rankList_" + tab + ".json")
                //     .then(function(success) {
                //         $scope.rankList = angular.fromJson(success);
                //     }, function(error) {});
                callback && callback();
            });
        };
        load_rankList();
        $scope.openRankPopover = function($event) {
            console.log('show popover');
            $scope.rankPopover.show($event);
        };

        $scope.changeTab = function(tab) {
            // $scope.rankList = MideApp.LocCache.load("rankList_" + tab) || [];
            load_rankList(tab, function() {
                $scope.rankPopover.hide();
                $scope.currentRankTabs = tab;
                $scope.currentRank = $filter("filter")($scope.rankTabs, {
                    value: $scope.currentRankTabs
                })[0];
            });
            // MideApp.httpGet('mideData/rank' + tab + ".json", function(data) {
            //     $scope.rankList = data.data;
            //     MideApp.LocCache.save("rankList_" + tab, $scope.rankList);
            //     $scope.currentRankTabs = tab;
            //     $scope.currentRank = $filter("filter")($scope.rankTabs, {
            //         value: $scope.currentRankTabs
            //     })[0];
            // });

            // $scope.rankPopover.hide();

        };


    })
    .controller('helpCtrl', function($scope, $rootScope, $ionicActionSheet, $state, $ionicLoading, $timeout) {
        MideApp.setBackManner('back');
        $rootScope.tabsHidden = "tabs-hide";
        MideApp.intoMyController($scope, $rootScope, $state);


        $scope.tabActive = 1;

        $scope.selectTab = function(index) {
            $scope.tabActive = index;
        }

    })
    .controller('MyHelpCtrl', function($scope, $rootScope, $ionicActionSheet, $state, $ionicLoading, $timeout) {

        $scope.MyHelpConfig = MideApp.MemCache.load('MyHelp-list') || {
            errormsg: false,
            infinite: true,
            number: 10,
            page: 1,
            MyHelp: []
        };

        var load_page = function(callback) {
            if (!MideApp.isOnline()) {
                return MideApp.myNotice('暂无网络连接...');
            }

            MideApp.httpGet('mideData/myhelp.json', function(data) {


                $scope.MyHelpConfig.page = $scope.MyHelpConfig.page + 1;
                $scope.MyHelpConfig.MyHelp = $scope.MyHelpConfig.MyHelp.concat(data.data);
                $scope.MyHelpConfig.errormsg = !$scope.MyHelpConfig.MyHelp.length;
                $scope.MyHelpConfig.infinite = data.data.length;
                $ionicLoading.hide();
                callback && callback();
                MideApp.MemCache.save('MyHelp-list', $scope.MyHelpConfig);
                MideApp.LocCache.save('MyHelp-list', $scope.MyHelpConfig);

                if ($scope.MyHelpConfig.page > 5) {
                    $scope.MyHelpConfig.infinite = 0;
                }

            }, function() {
                // $scope.$broadcast('scroll.infiniteScrollComplete');
            });

        };
        $scope.moreDataCanBeLoaded = function() {
            return true;
        }

        $scope.infinite = function() {
            load_page(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }
        $scope.doRefresh = function() {
            $scope.MyHelpConfig.MyHelp = [];
            $scope.MyHelpConfig.page = 1;
            load_page(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    })
    .controller('MyAskCtrl', function($scope, $rootScope, $ionicActionSheet, $state, $ionicLoading, $timeout) {

        $scope.AskConfig = MideApp.MemCache.load('myAsk-list') || {
            errormsg: false,
            infinite: true,
            number: 10,
            page: 1,
            myAsk: []
        };

        var load_page = function(callback) {
            if (!MideApp.isOnline()) {
                return MideApp.myNotice('暂无网络连接...');
            }

            MideApp.httpGet('mideData/myask.json', function(data) {



                $scope.AskConfig.page = $scope.AskConfig.page + 1;
                $scope.AskConfig.myAsk = $scope.AskConfig.myAsk.concat(data.data);
                $scope.AskConfig.errormsg = !$scope.AskConfig.myAsk.length;
                $scope.AskConfig.infinite = data.data.length;
                $ionicLoading.hide();
                callback && callback();
                MideApp.MemCache.save('myAsk-list', $scope.AskConfig);
                MideApp.LocCache.save('myAsk-list', $scope.AskConfig);

                if ($scope.AskConfig.page > 5) {
                    $scope.AskConfig.infinite = 0;
                }

            }, function() {
                // $scope.$broadcast('scroll.infiniteScrollComplete');
            });

        };
        $scope.moreDataCanBeLoaded = function() {
            return true;
        }

        $scope.infinite = function() {
            load_page(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }
        $scope.doRefresh = function() {
            $scope.AskConfig.myAsk = [];
            $scope.AskConfig.page = 1;
            load_page(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }
    })
    .controller('MyTeamCtrl', function($scope, $rootScope, $ionicActionSheet, $state, $ionicLoading,
        $timeout, $ionicModal, $ionicScrollDelegate, $filter, $http, $cordovaFile, Tools) {

        MideApp.setBackManner('back');
        $rootScope.tabsHidden = "tabs-hide";
        MideApp.intoMyController($scope, $rootScope, $state);

        $scope.config = {
            infinite: true,
            page: 1,
            dataList: []
        }

        $scope.myteamCconfig = {
                infinite: true,
                page: 1,
                dataList: []
            }
            // 监听登录
        $rootScope.$on('myteam.update', function() {
            $scope.myteamCconfig = MideApp.LocCache.load('myteamList');
            if ($scope.Tab_isActive == "myteam") {
                $scope.config = $scope.myteamCconfig;
            }
        });
        $scope.searchConfig = {
            infinite: true,
            page: 1,
            dataList: []
        }
        var mideApp_user = $scope.mideApp_user = MideApp.LocCache.load('User') || null;
        if (!mideApp_user) {
            $state.go("tab.account");
            return false;
        }

        // ["ActivityPublishActivity", "TeamCreateTeam"]  privilege
        $scope.show_CreateTeam = false;
        if (angular.isArray($scope.mideApp_user.privilege)) {
            if (Tools.inArray("TeamCreateTeam", $scope.mideApp_user.privilege) != -1) {
                $scope.show_CreateTeam = true;
            }
        }

        $scope.Tab_isActive = 'myteam';

        $scope.changeTab = function(evt) {
            var elem = evt.currentTarget;
            $scope.Tab_isActive = elem.getAttributeNode('data-active').value;
            var _data = {};
            if ($scope.Tab_isActive == "myteam") {
                _data = MideApp.LocCache.load('myteamList');


            } else {
                _data = MideApp.LocCache.load('searchTeamList');
            }
            if (_data) {
                $scope.config = _data;
            } else {
                $scope.config = {
                    infinite: true,
                    page: 1,
                    dataList: []
                }
            }

        };
        var load_page_myteamCconfig = function(callback) {
            try {
                if (!MideApp.isOnline()) {
                    $cordovaFile.readAsText(cordova.file.externalDataDirectory, $scope.Tab_isActive + ".json")
                        .then(function(success) {
                            $scope.myteamCconfig = angular.fromJson(success);
                            $scope.myteamCconfig.infinite = 0;
                        }, function(error) {});
                    callback && callback();
                    return MideApp.myNotice('暂无网络连接...');
                }
            } catch (e) {
                // console.log(e);
            }

            var GetMyTeamList_params = {
                'PageIndex': $scope.myteamCconfig.page,
                'menberid': mideApp_user._id
            };


            MideApp.ajaxPost('GetMyTeamList.ashx', GetMyTeamList_params, function(data) {
                if (data.code == 0) {
                    if (!(data.data == null || data.data == '')) {
                        if ($scope.myteamCconfig.page == 1) {
                            $scope.myteamCconfig.dataList = data.data;
                        } else {
                            $scope.myteamCconfig.dataList = $scope.myteamCconfig.dataList.concat(data.data);
                        }
                        $scope.myteamCconfig.page = $scope.myteamCconfig.page + 1;
                        $scope.myteamCconfig.errormsg = !$scope.myteamCconfig.dataList.length;
                        $scope.myteamCconfig.infinite = data.data.length > 0;
                        MideApp.LocCache.save('myteamList', $scope.myteamCconfig);
                        MideApp.writeFile($cordovaFile, $scope.Tab_isActive + ".json", $scope.myteamCconfig, true);

                    } else {
                        $scope.myteamCconfig.infinite = false;
                    }

                } else {
                    $scope.myteamCconfig.infinite = false;
                }

                $scope.config = $scope.myteamCconfig;


                callback && callback();

            }, function(data, status) {
                MideApp.myNotice("网络错误" + status)
                if (cordova) {
                    $cordovaFile.readAsText(cordova.file.externalDataDirectory, $scope.Tab_isActive + ".json")
                        .then(function(success) {
                            $scope.myteamCconfig = angular.fromJson(success);
                            $scope.myteamCconfig.infinite = 0;
                        }, function(error) {});
                }

                callback && callback();
            });
        };
        var load_page_searchConfig = function(callback) {
            try {
                if (!MideApp.isOnline()) {
                    $cordovaFile.readAsText(cordova.file.externalDataDirectory, $scope.Tab_isActive + ".json")
                        .then(function(success) {
                            $scope.searchConfig = angular.fromJson(success);
                            $scope.searchConfig.infinite = 0;
                        }, function(error) {});
                    callback && callback();
                    return MideApp.myNotice('暂无网络连接...');
                }
            } catch (e) {
                // console.log(e);
            }

            var GetMyTeamList_params = {
                'PageIndex': $scope.searchConfig.page,
                'teamname': $scope.searchConfig.teamName
            };


            MideApp.ajaxPost('GetMyTeamList.ashx', GetMyTeamList_params, function(data) {
                if (data.code == 0) {
                    if (!(data.data == null || data.data == '')) {
                        if ($scope.searchConfig.page == 1) {
                            $scope.searchConfig.dataList = data.data;
                        } else {
                            $scope.searchConfig.dataList = $scope.searchConfig.dataList.concat(data.data);
                        }
                        $scope.searchConfig.page = $scope.searchConfig.page + 1;
                        $scope.searchConfig.errormsg = !$scope.searchConfig.dataList.length;
                        $scope.searchConfig.infinite = data.data.length > 0;

                        MideApp.LocCache.save('searchTeamList', $scope.searchConfig);
                        MideApp.writeFile($cordovaFile, $scope.Tab_isActive + ".json", $scope.searchConfig, true);

                    } else {
                        $scope.searchConfig.infinite = false;
                    }

                } else {
                    $scope.searchConfig.infinite = false;
                }

                $scope.config = $scope.searchConfig;


                callback && callback();

            }, function(data, status) {
                MideApp.myNotice("网络错误" + status)
                if (cordova) {
                    $cordovaFile.readAsText(cordova.file.externalDataDirectory, $scope.Tab_isActive + ".json")
                        .then(function(success) {
                            $scope.searchConfig = angular.fromJson(success);
                            $scope.searchConfig.infinite = 0;
                        }, function(error) {});
                }

                callback && callback();
            });
        };
        $scope.moreDataCanBeLoaded = function() {
            return true;
        }

        $scope.infinite = function() {
            if ($scope.Tab_isActive == "myteam") {
                load_page_myteamCconfig(function() {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            } else {
                load_page_searchConfig(function() {
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            }

        }
        $scope.doRefresh = function() {
            $scope.config.page = 1;
            if ($scope.Tab_isActive == "myteam") {
                load_page_myteamCconfig(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            } else {
                load_page_searchConfig(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            }

        }

        $scope.searchTeam = function() {
            $scope.searchConfig.page = 1;
            load_page_searchConfig(function() {
                $scope.$broadcast('scroll.refreshComplete');
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        $scope.createTeam = {};
        $ionicModal.fromTemplateUrl('templates/createTeam.html', {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function(modal) {
            $scope.CreateTeamModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeCreateTeamModal = function() {
            $scope.CreateTeamModal.hide();
        };
        $scope.showCreateTeamModal = function() {

            // $ionicScrollDelegate.scrollTop();
            $scope.CreateTeamModal.show();
        };
        $scope.$on('$destroy', function() {
            $scope.CreateTeamModal.remove();
        });

        $scope.showCreateTeamSheet = function(info) {
            if (angular.isUndefined($scope.createTeam.name)) {
                return MideApp.myNotice('团队名未填写');
            }
            if (angular.isUndefined($scope.createTeam.linkman)) {
                return MideApp.myNotice('联系人未填写');
            }
            if (angular.isUndefined($scope.createTeam.linkphone)) {
                return MideApp.myNotice('联系电话异常,应为11位数字');
            }
            if (angular.isUndefined($scope.createTeam.linkaddress)) {
                return MideApp.myNotice('地址未填写');
            }
            if (angular.isUndefined($scope.createTeam.teamaim)) {
                return MideApp.myNotice('详情未填写');
            }
            if (angular.isUndefined($scope.createTeam.serviceintention)) {
                return MideApp.myNotice('服务意愿未填写');
            }
            if (angular.isUndefined($scope.createTeam.region)) {
                return MideApp.myNotice('区域未填写');
            }
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
                        var TeamAction_params = {
                            'teamid': 0,
                            'menberid': $scope.mideApp_user._id,
                            'captainid': $scope.mideApp_user._id,
                            'name': $scope.createTeam.name,
                            'opc': 5,
                            'linkman': $scope.createTeam.linkman,
                            'linkphone': $scope.createTeam.linkphone,
                            'linkaddress': $scope.createTeam.linkaddress,
                            'teamaim': $scope.createTeam.teamaim,
                            'serviceintention': $scope.createTeam.serviceintention,
                            'region': $scope.createTeam.region
                        };
                        MideApp.ajaxPost('TeamAction.ashx', TeamAction_params, function(data) {

                            if (data.code == 0) {
                                $scope.myteamCconfig.dataList.push($scope.createTeam);
                                MideApp.LocCache.save('myteamList', $scope.myteamCconfig);
                                $rootScope.$broadcast('myteam.update');

                                MideApp.myNotice('创建团队成功', 1500, function() {
                                    $scope.createTeam = {};
                                    $scope.closeCreateTeamModal();
                                });

                            } else {
                                MideApp.myNotice(data.message);
                            }

                        }, function(data, status) {
                            return MideApp.myNotice("网络错误" + status)

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

        $ionicModal.fromTemplateUrl('templates/teamDetail.html', {
            scope: $scope,
            animation: 'slide-in-right'
        }).then(function(modal) {
            $scope.teamDetailModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeTeamDetailModal = function() {
            $scope.teamDetailModal.hide();
        };
        $scope.showTeamDetailModal = function(id) {

            $scope.current_team = Tools.findById($scope.config.dataList, id);

            var UpdateActivity_params = {
                'menberID': $scope.mideApp_user._id,
                'teamid': id,
                'opc': 4
            };
            MideApp.ajaxPost('TeamAction.ashx', UpdateActivity_params, function(data) {
                if (data.code == 0) {
                    $scope.current_team.menberlist = data.data;

                    if ($scope.current_team._captainid == $scope.mideApp_user._id) {

                        $scope.buttonName = '解散';

                    } else {

                        if ($scope.current_team.menberlist.length != 0) {
                            var _me = Tools.findById($scope.current_team.menberlist, $scope.mideApp_user._id);
                            if (_me) {
                                $scope.buttonName = '退出团队';
                            } else {
                                $scope.buttonName = '加入';

                            }
                        } else {
                            $scope.buttonName = '加入';
                        }
                    }

                } else {
                    $scope.activityConfig.infinite = false;
                    return false;
                }

                $ionicScrollDelegate.$getByHandle('teamDetailMainScroll').scrollTop();
                $scope.teamDetailModal.show();

            }, function(data, status) {
                return MideApp.myNotice("网络错误" + status)

            });
        };
        $scope.$on('$destroy', function() {
            $scope.teamDetailModal.remove();
        });

        $scope.showTeamAction = function() {
            $ionicActionSheet.show({
                titleText: '确认' + $scope.buttonName + '？',
                buttons: [{
                    text: $scope.buttonName
                }],
                destructiveText: '',
                cancelText: "取消",
                cancel: function() {
                    console.log('CANCELLED');
                },
                buttonClicked: function(index) {

                    if (index == 0) {
                        TeamAction();
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
        var TeamAction = function() {
            //1参加活动，2退出活动，3完成活动（发起人权利),4撤销活动,5.获取活动参与者列表
            var _opc = 1;
            switch ($scope.buttonName) {
                case '加入':
                    _opc = 1;
                    break;
                case '退出团队':
                    _opc = 2;
                    break;
                case '解散':
                    _opc = 3;
                    break;
                case '创建团队':
                    _opc = 5;
                    break;
                default:
                    break;
            }
            var TeamAction_params = {
                'menberid': $scope.mideApp_user._id,
                'teamid': $scope.current_team._id,
                'opc': _opc
            };
            MideApp.ajaxPost('TeamAction.ashx', TeamAction_params, function(data) {

                if (data.code == 0) {
                    switch ($scope.buttonName) {
                        case '加入':
                            $scope.current_team.menberlist.push($scope.mideApp_user);
                            $scope.myteamCconfig.dataList.push($scope.current_team);
                            MideApp.LocCache.save('myteamList', $scope.myteamCconfig);
                            $rootScope.$broadcast('myteam.update');
                            $scope.buttonName = '退出团队'
                            MideApp.myNotice('您成功加入该团队');
                            break;
                        case '退出团队':
                            $scope.buttonName = '加入'
                            MideApp.myNotice('您已退出该团队');
                            for (var i = 0; i < $scope.current_team.menberlist.length; i++) {
                                if ($scope.current_team.menberlist[i]._id == $scope.mideApp_user._id) {
                                    $scope.current_team.menberlist.splice(i, 1);

                                }
                            }
                            for (var i = 0; i < $scope.myteamCconfig.dataList.length; i++) {
                                if ($scope.myteamCconfig.dataList[i]._id == $scope.current_team._id) {
                                    $scope.myteamCconfig.dataList.splice(i, 1);

                                }
                            }
                            MideApp.LocCache.save('myteamList', $scope.myteamCconfig);
                            $rootScope.$broadcast('myteam.update');
                            break;
                        case '解散':
                            for (var i = 0; i < $scope.myteamCconfig.dataList.length; i++) {
                                if ($scope.myteamCconfig.dataList[i]._id == $scope.current_team._id) {
                                    $scope.myteamCconfig.dataList.splice(i, 1);

                                }
                            }
                            MideApp.LocCache.save('myteamList', $scope.myteamCconfig);
                            $rootScope.$broadcast('myteam.update');
                            $scope.buttonName = ''
                            MideApp.myNotice("该团队已解散", 1500, function() {
                                $scope.closeTeamDetailModal();
                            })
                            break;
                        default:
                            break;
                    }

                }

            }, function(data, status) {
                return MideApp.myNotice("网络错误" + status)

            });
        }

    })


;
