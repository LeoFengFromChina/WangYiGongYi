angular.module('starter.controllers', [])
    .controller('StartCtrl', function($scope, $rootScope, $state, $http, $timeout, $interval,
        $ionicPopup, $ionicActionSheet, $ionicPlatform, $ionicLoading, $ionicHistory, $rootScope) {
        console.log("typeof MideApp is" + typeof MideApp);
        MideApp.intoMyController($scope, $rootScope, $state);

        // Wait for Cordova to load
        //  document.addEventListener("deviceready", onDeviceReady, false);

        // Cordova is ready
        /* function onDeviceReady() {
             // var db = window.sqlitePlugin.openDatabase("Database", "1.0", "Demo", -1);

             var db = window.sqlitePlugin.openDatabase("database.sqlite3");

             db.transaction(function(tx) {
                 tx.executeSql('CREATE TABLE IF NOT EXISTS cache (id INTEGER primary key, key TEXT,val TEXT, ttl DATETIME)');
             });
             var MySQLite = getSQLiteClass(db);
             MideApp.setMySQLite(MySQLite);

             $state.go("tab.topics");
             return;
         }*/
        $state.go("tab.topics");

    })
    .controller('TabCtrl', function($scope, $rootScope, $state) {

    })
    .controller('TopicsCtrl', function($http, $ionicActionSheet, $scope, $state,
        $rootScope, $cordovaFileTransfer, $ionicScrollDelegate, $cordovaFile,
        $ionicLoading, $ionicModal, $filter, $timeout, $cordovaNetwork, $cordovaImagePicker,
        $ionicSlideBoxDelegate, Tools) {
        MideApp.setBackManner('exit');
        $rootScope.tabsHidden = "tabs-show";
        MideApp.intoMyController($scope, $rootScope, $state);

        var load_banner = function(callback) {
            try {
                if (!$cordovaNetwork.isOnline()) {
                    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "banners.json")
                        .then(function(success) {
                            $scope.banners = angular.fromJson(success);
                            var _handle = $ionicSlideBoxDelegate.$getByHandle("topicsBanner");
                            if (_handle._instances.length != 0) {
                                _handle.update();
                            }

                            callback && callback();
                        }, function(error) {});
                    return MideApp.myNotice('暂无网络连接...');
                }
            } catch (e) {
                // console.log(e);
            }
            // MideApp.httpGet('wygyData/Banner.json', function(data) {
            //     // $scope.banners = [];
            //     $scope.banners = data.data;
            //     $scope.isShowBanner = false;
            //     var _handle = $ionicSlideBoxDelegate.$getByHandle("topicsBanner");
            //     if (_handle._instances.length != 0) {
            //         _handle.update();
            //     }
            //     MideApp.writeFile($cordovaFile, 'banners.json', JSON.stringify(data.data), true);
            //     callback && callback();
            // }, function() {


            // });
            var GetBanner_params = {
                'GroupID': 1
            };
            MideApp.ajaxPost('GetBannerPictures.ashx', GetBanner_params, function(data) {
                $scope.banners = data.data;
                $scope.isShowBanner = false;
                var _handle = $ionicSlideBoxDelegate.$getByHandle("topicsBanner");
                if (_handle._instances.length != 0) {
                    _handle.update();
                }
                MideApp.writeFile($cordovaFile, 'banners.json', JSON.stringify(data.data), true);
                callback && callback();

            }, function(data) {
                MideApp.myNotice("网络错误" + data.status)
            });

        }
        load_banner();
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
            var mideApp_user = MideApp.LocCache.load('User') || null;
            if (!mideApp_user) {
                $state.go("tab.account");
                return false;
            } else {
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
                        if (angular.isUndefined($scope.newTopic.title)) {
                            return MideApp.myNotice('标题未填写...');
                        }
                        if (angular.isUndefined($scope.newTopic.linkman)) {
                            return MideApp.myNotice('联系人未填写...');
                        }
                        if (angular.isUndefined($scope.newTopic.linkphone)) {
                            return MideApp.myNotice('联系电话未填写...');
                        }
                        if (angular.isUndefined($scope.newTopic.beginTime)) {
                            return MideApp.myNotice('开始时间未填写...');
                        }
                        if (angular.isUndefined($scope.newTopic.region)) {
                            return MideApp.myNotice('区域未填写...');
                        }
                        if (angular.isUndefined($scope.newTopic.serviceIntention)) {
                            return MideApp.myNotice('类型未填写...');
                        }
                        if (angular.isUndefined($scope.newTopic.duration)) {
                            return MideApp.myNotice('时长未填写...');
                        }
                        if (angular.isUndefined($scope.newTopic.title)) {
                            return MideApp.myNotice('详情未填写...');
                        }
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
                            'beginTime': $scope.newTopic.beginTime,
                            'region': $scope.newTopic.region,
                            'serviceIntention': $scope.newTopic.serviceIntention,
                            'duration': $scope.newTopic.duration,
                            'detail': $scope.newTopic.detail,

                        };
                        MideApp.ajaxPost('AddHelp.ashx', AddNewHelpRequest_params, function(data) {
                            $scope.closeNewTopicModal();
                            $scope.newTopic = {};
                            $ionicLoading.hide();

                            MideApp.myNotice(info + '成功')

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
            var mideApp_user = MideApp.LocCache.load('User') || null;
            if (!mideApp_user) {
                $state.go("tab.account");
                return false;
            } else {
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
                            'beginTime': $scope.newHelp.topicTime,
                            'region': $scope.newHelp.region,
                            'serviceIntention': $scope.newHelp.type,
                            'duration': $scope.newHelp.long,
                            'detail': $scope.newHelp.content,

                        };
                        MideApp.ajaxPost('AddHelp.ashx', AddNewHelpRequest_params2, function(data) {
                            if (data.code == 0) {
                                $scope.closeNewHelpModal();
                                $scope.newHelp = {};
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

        var load_page = function(callback) {
            try {
                if (!$cordovaNetwork.isOnline()) {
                    $cordovaFile.readAsText(cordova.file.externalDataDirectory, "topics.json")
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
                        MideApp.writeFile($cordovaFile, "topics.json", JSON.stringify($scope.config), true);

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

        $scope.moreDataCanBeLoaded = function() {
            return true;
        }

        $scope.infinite = function() {
            load_page(function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        }

        $scope.doRefresh = function() {
            load_banner(function() {
                $scope.config.page = 1;
                load_page(function() {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            });

        }
        $scope.doRefresh(); //初始化

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
    .controller('ChatsCtrl', function($scope, $rootScope, $state, $ionicModal, $ionicScrollDelegate, $ionicActionSheet, $timeout) {
        MideApp.setBackManner('back');
        $rootScope.tabsHidden = "tabs-show";
        MideApp.intoMyController($scope, $rootScope, $state);


        $scope.doRefresh = function() {
            var mideApp_user = MideApp.LocCache.load('User') || null;
            if (mideApp_user) {
                load_chats(mideApp_user.userId, function() {
                    $scope.$broadcast('scroll.refreshComplete');

                });
            } else {
                $scope.$broadcast('scroll.refreshComplete');
            }


        };
        var load_chats = function(userId, callback) {
            MideApp.httpGet("mideData/message.json?userId=" + userId, function(data) {
                if (data.code == 0) {
                    $scope.chats = data.data;
                } else {
                    MideApp.myNotice(data.message);
                }
                callback && callback();

            });
        }
        var mideApp_user = MideApp.LocCache.load('User') || null;
        if (mideApp_user) {
            load_chats(mideApp_user.userId, function() {

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
    $timeout, $ionicSlideBoxDelegate) {
    MideApp.setBackManner('back');
    $rootScope.tabsHidden = "tabs-show";
    MideApp.intoMyController($scope, $rootScope, $state);
     var mideApp_user = MideApp.LocCache.load('User') || {};
    var load_giftBanner = function(callback) {

        try {
            if (!$cordovaNetwork.isOnline()) {
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
            MideApp.writeFile($cordovaFile, "giftBanner.json", JSON.stringify($scope.giftBanner), true);
            callback && callback();
        }, function() {
            // $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }

    load_giftBanner();

    var load_gift = function(callback) {

        try {
            if (!$cordovaNetwork.isOnline()) {
                $cordovaFile.readAsText(cordova.file.externalDataDirectory, "gifts.json")
                    .then(function(success) {
                        $scope.gifts = angular.fromJson(success);
                    }, function(error) {});
                callback && callback();
                return MideApp.myNotice('暂无网络连接...');
            }
        } catch (e) {

        }

        // MideApp.httpGet('wygyData/AllGiftList.json', function(data) {
        //     $scope.gifts = data.data;

        //     // MideApp.MemCache.save('topics-list', $scope.config);
        //     // MideApp.LocCache.save('topics-list', $scope.config);
        //     MideApp.writeFile($cordovaFile, "gifts.json", JSON.stringify($scope.config), true);
        //     callback && callback();
        // }, function() {
        //     // $scope.$broadcast('scroll.infiniteScrollComplete');
        // });

        MideApp.ajaxPost('GetGiftList.ashx', {}, function(data) {
            if (data.code == 0) {
                $scope.gifts = data.data;
                MideApp.writeFile($cordovaFile, "gifts.json", JSON.stringify($scope.config), true);
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
        $scope.giftShowId = {
            "_id": giftId
        };
        $ionicScrollDelegate.$getByHandle('giftDetailScroll').scrollTop();
        $scope.giftModal.show();
    };
    $scope.$on('$destroy', function() {
        $scope.giftModal.remove();
    });
    $scope.showGiftsheet = function(info,giftID) {
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
                        $scope.closeGiftModal();
                        $state.go("tab.account");
                        return false;
                    } else {
                        $ionicLoading.show();
                        // string giftID = context.Request["giftID"];
                        // string menberID = context.Request["menberID"];
                        // string giftCount = context.Request["giftCount"];
                        // string status = context.Request["status"];//0已兑换，1已领取
                        var params = {
                            'giftID':giftID,
                            'menberID': mideApp_user._id,
                            'giftCount': 1,
                            'status': '0'
                        };
                        MideApp.ajaxPost('ExchangeForGift.ashx', params, function(data) {
                            if (data.code == 0) {
                                $ionicLoading.hide();
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
        load_giftBanner(function() {
            load_gift(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        });
    }
})

.controller('AccountCtrl', function($scope, $rootScope, $rootScope, $state,
    $log, $ionicActionSheet, $ionicModal, $ionicHistory, $timeout,
    $ionicLoading, $ionicPopover, $filter, $ionicScrollDelegate, $cordovaFile, Tools) {
    MideApp.setBackManner('back');
    $rootScope.tabsHidden = "tabs-show";
    MideApp.intoMyController($scope, $rootScope, $state);

    // 监听登录
    $rootScope.$on('app.login', function() {
        $log.debug('login broadcast handle');
        // get current user
        // var currentUser = User.getCurrentUser();
        $scope.mideApp_user = MideApp.LocCache.load("User") || {};
        $rootScope.tabsHidden = "tabs-show";
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
                var _user = data.data;
                $scope.mideApp_user = _user;
                MideApp.LocCache.save('User', _user);
                MideApp.MemCache.save('User', _user);

                $ionicLoading.hide();
                $rootScope.$broadcast('app.login');
                $scope.closeLoginModal();
                $state.go("tab.account");


            } else {
                MideApp.myNotice(data.message);
            }

        }, function(data) {
            MideApp.myNotice("网络错误" + data.status)
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
        $scope.mideApp_user_basic = MideApp.LocCache.load('User') || {};
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
        if (!$scope.mideApp_user_basic.username) {
            return MideApp.myNotice('账号未填写...');
        }

        if (!$scope.mideApp_user_basic.gender) {
            return MideApp.myNotice('性别未填写...');
        }
        if (!$scope.mideApp_user_basic.birthday) {
            return MideApp.myNotice('出身年月未填写...');
        }
        if (!$scope.mideApp_user_basic.phoneNumber) {
            return MideApp.myNotice('联系电话未填写...');
        }
        if (!$scope.mideApp_user_basic.email) {
            return MideApp.myNotice('邮箱未填写...');
        }
        if (!$scope.mideApp_user_basic.QQnumber) {
            return MideApp.myNotice('QQ未填写...');
        }
        $ionicLoading.show();
        MideApp.httpGet('mideData/user.json', function(data) {

            MideApp.LocCache.save("User", $scope.mideApp_user);
            $ionicLoading.hide();
            MideApp.myNotice('修改成功')
            $scope.closeBasicInfoModal();
        }, function() {
            $ionicLoading.hide();
        });

    }
    $scope.changeForHelp = function() {
        if (!MideApp.isOnline()) {
            return MideApp.myNotice('暂无网络连接...');
        }
        if (!$scope.mideApp_user_basic.region) {
            return MideApp.myNotice('地区未填写...');
        }

        if (!$scope.mideApp_user_basic.identity) {
            return MideApp.myNotice('身份证未填写...');
        }
        if (!$scope.mideApp_user_basic.birthday) {
            return MideApp.myNotice('出身年月未填写...');
        }
        if (!$scope.mideApp_user_basic.address) {
            return MideApp.myNotice('常住地址未填写...');
        }
        if (!$scope.mideApp_user_basic.weixinNumber) {
            return MideApp.myNotice('微信未填写...');
        }

        $ionicLoading.show();
        MideApp.httpGet('mideData/user.json', function(data) {

            MideApp.LocCache.save("User", $scope.mideApp_user);
            $ionicLoading.hide();
            MideApp.myNotice('修改成功')
            $scope.closeBasicInfoModal();
        }, function() {
            $ionicLoading.hide();
        });

    }
    $scope.changeVolunteer = function() {
        if (!MideApp.isOnline()) {
            return MideApp.myNotice('暂无网络连接...');
        }
        if (!$scope.mideApp_user_basic.education) {
            return MideApp.myNotice('学历未填写...');
        }

        if (!$scope.mideApp_user_basic.profession) {
            return MideApp.myNotice('专业未填写...');
        }
        if (!$scope.mideApp_user_basic.speciality) {
            return MideApp.myNotice('特长未填写...');
        }
        if (!$scope.mideApp_user_basic.intention) {
            return MideApp.myNotice('服务意愿未填写...');
        }
        if (!$scope.mideApp_user_basic.intentionTime) {
            return MideApp.myNotice('服务时间未填写...');
        }

        $ionicLoading.show();
        MideApp.httpGet('mideData/user.json', function(data) {
            $scope.mideApp_user = $scope.mideApp_user_basic;
            MideApp.LocCache.save("User", $scope.mideApp_user);
            $ionicLoading.hide();
            MideApp.myNotice('修改成功')
            $scope.closeBasicInfoModal();
        }, function() {
            $ionicLoading.hide();
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
                    $scope.mideApp_user_basic.gender = "男";
                } else {
                    $scope.mideApp_user_basic.gender = "女";
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
        if (typeof($scope.mideApp_user_basic.birthday) != "undefined") {
            mydate = new Date($scope.mideApp_user_basic.birthday);
        }

        var options = {
            date: mydate,
            mode: 'datetime'
        };

        datePicker.show(options, function(date) {
            $timeout(function() {
                $scope.mideApp_user_basic.birthday = date;
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
        if (typeof($scope.mideApp_user._status) == 'undefined') {
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
            if (!$cordovaNetwork.isOnline()) {
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
            'UnderTakerID': $scope.mideApp_user._id,
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
                    MideApp.writeFile($cordovaFile, "MyHelp-list.json", JSON.stringify($scope.config), true);

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
            if (!$cordovaNetwork.isOnline()) {
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
            'PromoterID': $scope.mideApp_user._id,
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
                    MideApp.writeFile($cordovaFile, "myAsk-list.json", JSON.stringify($scope.config), true);

                } else {
                    $scope.AskConfig.infinite = false;
                }

            } else {
                $scope.AskConfig.infinite = false;
            }
            $scope.activeConfig = $scope.AskConfig;
            callback && callback();


        }, function(data) {
            MideApp.myNotice("网络错误" + data.status)
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
                $scope.$broadcast('scroll.infiniteScrollComplete');
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
            'nickname': '',
            'sex': $scope.mideApp_user_reg.gender,
            'birthday': '1982-09-09',
            'phoneNumber': $scope.mideApp_user_reg.phoneNumber,
            'email': $scope.mideApp_user_reg.email,
            'QQnumber': $scope.mideApp_user_reg.QQnumber
        };

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
        var params3 = {
            'education': $scope.mideApp_user_reg.education.label,
            'profession': $scope.mideApp_user_reg.profession,
            'speciality': $scope.mideApp_user_reg.speciality,
            'intention': $scope.mideApp_user_reg.intention.label,
            'intentionTime': $scope.mideApp_user_reg.intentionTime
        };
        var params_flag = {
            'flag': flag
        }
        var params = {};

        if (flag == 1) {
            angular.extend(params, params1, params_flag)
        } else if (flag == 2) {
            angular.extend(params, params1, params2, params_flag)
        } else if (flag == 3) {
            angular.extend(params, params1, params2, params3, params_flag)
        }

        MideApp.ajaxPost('register.ashx', params, function(data) {
            $scope.closeReForHelpModal();
            $scope.closeRegVolunteerModal();
            $ionicLoading.hide();

            MideApp.myNotice('注册成功')
            $timeout(function() {
                $state.go("tab.account");
            }, 200);
        }, function(data) {
            MideApp.myNotice("网络错误" + data.status)
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
            MideApp.httpGet('mideData/user.json', function(data) {

                MideApp.LocCache.save("myEmail", $scope.forget.myEmail);
                $ionicLoading.hide();
                MideApp.myNotice('发送成功')
                $state.go("tab.forgetCode");
            });
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
    .controller('MyGiftCtrl', function($scope, $rootScope, $state, $ionicLoading) {

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
            //$state.go('^'); // As $scope.search() changes the state, this is not even needed.


        }

        $scope.mytime = new Date();

    })
    .controller('FeedbackCtrl', function($scope, $rootScope, $state, $ionicScrollDelegate, $ionicModal, $ionicLoading, $filter) {

        $scope.pwd = {};
        MideApp.setBackManner('back');
        $rootScope.tabsHidden = "tabs-hide";
        MideApp.intoMyController($scope, $rootScope, $state);

        var _items = [{
            "id": 1,
            "content": "怎么页面打不开的啊？",
            "addtime": "2015-09-11 11:00:00",
            "Reply": "请查看是不是没有网络连接",
            "ReplyTime": "2015-09-13 12:00:00"
        }, {
            "id": 2,
            "content": "怎么页面打不开的啊？怎么页面打不开的啊？怎么页面打不开的啊？怎么页面打不开的啊？怎么页面打不开的啊？怎么页面打不开的啊？",
            "addtime": "2015-09-11 11:00:00",
            "Reply": "请查看是不是没有网络连接",
            "ReplyTime": "2015-09-13 12:00:00"
        }, {
            "id": 3,
            "content": "怎么页面打不开的啊？",
            "addtime": "2015-09-11 11:00:00",
            "Reply": "请查看是不是没有网络连接",
            "ReplyTime": "2015-09-13 12:00:00"
        }, {
            "id": 4,
            "content": "怎么页面打不开的啊？",
            "addtime": "2015-09-11 11:00:00",
            "Reply": "",
            "ReplyTime": ""
        }];
        $scope.items = _items;

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
        $scope.feedbackData = "";
        $scope.feedbackSend = function() {
            if (!$scope.feedbackData) {
                return
            } else {
                $ionicLoading.show();
                MideApp.httpGet('mideData/user.json', function(data) {
                    var _id = $scope.items.length + 1;
                    var _now = $filter('date')(new Date, 'yyyy-MM-dd HH:mm:ss')
                    var _data = {
                        "id": _id,
                        "content": $scope.feedbackData,
                        "addtime": _now,
                        "Reply": "",
                        "ReplyTime": ""
                    }
                    $scope.items.push(_data)
                    $ionicLoading.hide();
                    $scope.feedbackData = "";
                    $ionicScrollDelegate.scrollTop();
                    MideApp.myNotice('发送成功')
                });
            }

        }

    })
    .controller('rankCtrl', function($scope, $rootScope, $ionicActionSheet, $state, $ionicLoading, $timeout, $ionicPopover, $filter, RankTabs) {
        MideApp.setBackManner('back');
        $rootScope.tabsHidden = "tabs-hide";
        MideApp.intoMyController($scope, $rootScope, $state);

        $scope.rankTabs = RankTabs;
        $scope.currentRankTabs = "all";
        $scope.currentRank = $filter("filter")($scope.rankTabs, {
            value: $scope.currentRankTabs
        })[0];

        // .fromTemplateUrl() method
        $ionicPopover.fromTemplateUrl('templates/rankPopover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.rankPopover = popover;
        });
        $scope.rankList = MideApp.LocCache.load("rankList_all") || [];
        $timeout(function() {
            MideApp.httpGet("mideData/rankall.json", function(data) {
                if (data.code == 0) {
                    $scope.rankList = data.data;
                    MideApp.LocCache.save("rankList_all", $scope.rankList);
                } else {
                    MideApp.myNotice(data.message);
                }

            });

        }, 200);

        $scope.openRankPopover = function($event) {
            console.log('show popover');
            $scope.rankPopover.show($event);
        };

        $scope.changeTab = function(tab) {
            $scope.rankList = MideApp.LocCache.load("rankList_" + tab) || [];

            MideApp.httpGet('mideData/rank' + tab + ".json", function(data) {
                $scope.rankList = data.data;
                MideApp.LocCache.save("rankList_" + tab, $scope.rankList);
                $scope.currentRankTabs = tab;
                $scope.currentRank = $filter("filter")($scope.rankTabs, {
                    value: $scope.currentRankTabs
                })[0];
            });

            $scope.rankPopover.hide();
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
    .controller('MyTeamCtrl', function($scope, $rootScope, $ionicActionSheet, $state, $ionicLoading, $timeout, $ionicModal, $ionicScrollDelegate, $filter, $http) {

        MideApp.setBackManner('back');
        $rootScope.tabsHidden = "tabs-hide";
        MideApp.intoMyController($scope, $rootScope, $state);
        $scope.TeamConfig = MideApp.MemCache.load('team-list') || {
            errormsg: false,
            infinite: true,
            number: 10,
            page: 1,
            teams: []
        };

        var load_page = function(callback) {
            if (!MideApp.isOnline()) {
                return MideApp.myNotice('暂无网络连接...');
            }

            MideApp.httpGet('mideData/user.json', function(data) {
                var _id = $scope.TeamConfig.teams.length + 1;
                var _obj = {
                    "data": [{
                        "id": _id,
                        "title": _id + "医院义工", //标题
                        "sponsor": "oky", //发起人
                        "contacts": "oky", //联系人
                        "phone": "13580530583",
                        "type": "活动类型",
                        "region": "所属区域",
                        "activityTime": "所属区域",
                        "location": "所属区域",
                        "totalNumber": "所属区域",
                        "content": "去因为做义工，帮助病人日常生活",
                        "addtime": "2015-08-02 22:33:00"
                    }]
                }

                $scope.TeamConfig.page = $scope.TeamConfig.page + 1;
                $scope.TeamConfig.teams = $scope.TeamConfig.teams.concat(_obj.data);
                $scope.TeamConfig.errormsg = !$scope.TeamConfig.teams.length;
                $scope.TeamConfig.infinite = _obj.data.length;
                $ionicLoading.hide();
                callback && callback();
                MideApp.MemCache.save('team-list', $scope.TeamConfig);
                MideApp.LocCache.save('team-list', $scope.TeamConfig);

                if ($scope.TeamConfig.page > 5) {
                    $scope.TeamConfig.infinite = 0;
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
            $scope.TeamConfig.teams = [];
            $scope.TeamConfig.page = 1;
            load_page(function() {
                $scope.$broadcast('scroll.refreshComplete');
            });
        }

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
        $scope.showCreateTeamModal = function(id) {
            $scope.showId = {
                "id": id
            };
            $ionicScrollDelegate.scrollTop();
            $scope.CreateTeamModal.show();
        };
        $scope.$on('$destroy', function() {
            $scope.CreateTeamModal.remove();
        });

        $scope.showCreateTeamSheet = function(info) {
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
                        MideApp.httpGet('mideData/user.json', function(data) {

                            var _id = $scope.TeamConfig.teams.length + 1;
                            var _now = $filter("date")(new Date, "yyyy-MM-dd HH:mm:ss");
                            var _obj = {
                                "data": [{
                                    "id": _id,
                                    "title": _id + "医院义工", //标题
                                    "sponsorId": 1, //发起人id
                                    "sponsor": "oky", //发起人
                                    "contacts": "oky", //联系人
                                    "phone": "13580530583",
                                    "type": "活动类型",
                                    "region": "所属区域",
                                    "activityTime": "所属区域",
                                    "location": "所属区域",
                                    "totalNumber": "所属区域",
                                    "content": "去因为做义工，帮助病人日常生活",
                                    "addtime": _now
                                }]
                            }
                            $scope.TeamConfig.teams = $scope.TeamConfig.teams.concat(_obj.data);
                            $ionicLoading.hide();

                            MideApp.myNotice(info + '成功')
                            $scope.closeCreateTeamModal();
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
            $scope.showId = {
                "id": id
            };
            $ionicScrollDelegate.scrollTop();
            $scope.teamDetailModal.show();
        };
        $scope.$on('$destroy', function() {
            $scope.teamDetailModal.remove();
        });

    })


;
