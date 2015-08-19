angular.module('starter.services', [])

.factory('Chats', function() {
        // Might use a resource here that returns a JSON array
        console.log("Chats");
        // Some fake testing data
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

        return {
            all: function() {
                return chats;
            },
            remove: function(chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function(chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('Gift', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var gifts = [{
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
        }, ];

        return {
            all: function() {
                return gifts;
            },
            remove: function(gift) {
                gifts.splice(Gift.indexOf(gift), 1);
            },
            get: function(giftId) {
                for (var i = 0; i < gifts.length; i++) {
                    if (gifts[i].id === parseInt(giftId)) {
                        return gifts[i];
                    }
                }
                return null;
            }
        };
    })
    ///
    ///
    .factory('Topics', function($resource, $rootScope, Storage, User, ENV) {
       // var APIUrl = ENV.localapi + '/topics.json',
        var APIUrl = ENV.api + '/topics',
            // 用来存储话题类别的数据结构，包含了下一页、是否有下一页等属性
            topics = {},
            currentTab = "all";

        var resource = $resource(APIUrl, {}, {
            query: {
                method: 'get',
                params: {
                    /* tab: '@tab',
                     page: 1,
                     limit: 20,
                     mdrender: true*/
                },
                timeout: 20000
            }
        });


        return {
            fetchTopStories: function() {
                // console.log("currentTab: " + currentTab);
                var hasNextPage = false;
                resource.query({
                    tab: currentTab
                }, function(r) {
                    // console.log(r);
                    if (r.data.length < 20) {
                        hasNextPage = false;
                    }
                    topics[currentTab] = {
                        'nextPage': 2,
                        'hasNextPage': hasNextPage,
                        'data': r.data
                    };
                    // topics[currentTab] = r.data;
                    $rootScope.$broadcast('ioniclub.topicsUpdated', topics[currentTab].data);
                    // console.table(topics);

                });

            },
            getTopics: function() {
                return topics[currentTab].data;
            },
            setCurrentTab: function(tab) {
                currentTab = tab;
                this.fetchTopStories();
                // $rootScope.$broadcast('ioniclub.topicsUpdated', topics[currentTab]);
            },
            getCurrentTab: function() {
                return currentTab;
            },
            increaseNewTopicsCount: function() {
                var nextPage = topics[currentTab].nextPage;
                var hasNextPage = topics[currentTab].hasNextPage;
                var topicsData = topics[currentTab].data;
                resource.query({
                    tab: currentTab,
                    page: nextPage,
                    limit: 20,
                    mdrender: true

                }, function(r) {
                    // console.log(r);
                    nextPage++;
                    if (r.data.length < 20) {
                        hasNextPage = false;
                    }
                    topicsData = topicsData.concat(r.data);
                    topics[currentTab] = {
                        'nextPage': nextPage,
                        'hasNextPage': hasNextPage,
                        'data': topicsData
                    };
                    // topics[currentTab] = r.data;
                    $rootScope.$broadcast('ioniclub.topicsUpdated', topics[currentTab]);
                    // console.table(topics);

                });
            },
            hasNextPage: function() {
                if (topics[currentTab] === undefined) {
                    return false;
                }
                return topics[currentTab].hasNextPage;
            },
            saveNewTopic: function(newTopicData) {
                var currentUser = User.getCurrentUser();
                return resource.save({
                    accesstoken: currentUser.accesstoken
                }, newTopicData);
            }

        };


    })
    .factory('Topic', function($resource, $rootScope, $q, Storage, User, My, ENV) {
        var APIUrl = ENV.api + '/topic/:id',
            topic,
            currentTab = "all";
        var resource = $resource(ENV.api + '/topic/:id', {
            id: '@id',
        }, {
            reply: {
                method: 'post',
                url: ENV.api + '/topic/:topicId/replies'
            },
            upReply: {
                method: 'post',
                url: ENV.api + '/reply/:replyId/ups'
            },
            collect: {
                method: 'post',
                url: ENV.api + '/topic/collect'
            },
            de_collect: {
                method: 'post',
                url: ENV.api + '/topic/de_collect'
            }
        });
        return {
            getById: function(id) {
                // console.log("id:" + id + "   topic:" + topic);
                if (topic !== undefined && topic.id === id) {
                    var topicDefer = $q.defer();
                    topicDefer.resolve({
                        data: topic
                    });
                    return {
                        $promise: topicDefer.promise
                    };
                }
                return this.get(id);
            },
            get: function(id) {
                return resource.get({
                    id: id
                }, function(response) {
                    topic = response.data;
                });

            },
            saveReply: function(topicId, replyData) {
                var reply = angular.extend({}, replyData);
                var currentUser = User.getCurrentUser();
                // add send from
                if (My.getSettings().sendFrom) {
                    reply.content = replyData.content + '\n<br/> 发自 [Ioniclub](https://github.com/IonicChina/ioniclub)';
                }
                return resource.reply({
                    topicId: topicId,
                    accesstoken: currentUser.accesstoken
                }, reply);
            },
            upReply: function(replyId) {
                var currentUser = User.getCurrentUser();
                return resource.upReply({
                    replyId: replyId,
                    accesstoken: currentUser.accesstoken
                }, null, function(response) {
                    if (response.success) {
                        angular.forEach(topic.replies, function(reply, key) {
                            if (reply.id === replyId) {
                                if (response.action === 'up') {
                                    reply.ups.push(currentUser.id);
                                } else {
                                    reply.ups.pop();
                                }
                            }
                        });
                    }
                });
            },
            collect: function(topicId) {
                var currentUser = User.getCurrentUser();
                return resource.collect({
                    topic_id: topicId,
                    accesstoken: currentUser.accesstoken
                });
            },
            de_collect: function(topicId) {
                var currentUser = User.getCurrentUser();
                return resource.de_collect({
                    topic_id: topicId,
                    accesstoken: currentUser.accesstoken
                });
            }
        };

    })
    ///
    .factory('Storage', function() {
        "use strict";
        return {
            set: function(key, data) {
                return window.localStorage.setItem(key, window.JSON.stringify(data));
            },
            get: function(key) {

                return window.JSON.parse(window.localStorage.getItem(key));
            },
            remove: function(key) {
                return window.localStorage.removeItem(key);
            }
        };
    })
    .factory('Push', function(ENV) {
        var push;
        return {
            setBadge: function(badge) {
                if (push) {

                    plugins.jPushPlugin.setBadge(badge);
                }
            },
            resetBadge: function() {
                if (push) {
                    plugins.jPushPlugin.resetBadge();
                }
            },
            setAlias: function(alias) {
                if (push) {
                    plugins.jPushPlugin.setAlias(alias);

                }
            },
            check: function() {

                if (window.jpush && push) {

                    window.jpush = null;
                }
            },
            init: function(notificationCallback) {


                push = window.plugins && window.plugins.jPushPlugin;
                if (push) {


                    plugins.jPushPlugin.init();
                    plugins.jPushPlugin.setDebugMode(false);
                    try {
                        if (plugins.jPushPlugin.isPlatformIOS()) {
                            plugins.jPushPlugin.setLogOFF();
                        }
                        plugins.jPushPlugin.openNotificationInAndroidCallback = notificationCallback;

                        plugins.jPushPlugin.receiveNotificationIniOSCallback = notificationCallback;
                    } catch (exception) {
                        console.debug('exception--------------------');
                        console.debug("JPushPlugin initexception ： " + exception);
                    }
                }
            },
            stopPush: function() {
                // 停止推送
                plugins.jPushPlugin.stopPush();


            },
            resumePush: function() {
                // 唤醒推送

                plugins.jPushPlugin.resumePush();

            }
        };
    })
    .factory('CommonService', function($http, $rootScope, LXS, Storage) {

        return {
            getIOSVersion: function() {

                return $http.post(LXS.api + "/getIOSVersion.do")
                    .success(function(data, status, headers, config) {


                        $rootScope.$broadcast('lxs.IOSVersionUpdate', data);
                    });
            },
            getAndroidVersion: function() {

                return $http.post(LXS.api + "/getAndroidVersion.do")
                    .success(function(data, status, headers, config) {

                        $rootScope.$broadcast('lxs.AndroidVersionUpdate', data);
                    });
            }
        };
    })
    .factory('Tabs', function() {
        return [{
            value: 'all',
            label: '全部'
        }, {
            value: 'share',
            label: '分享'
        }, {
            value: 'ask',
            label: '问答'
        }, {
            value: 'job',
            label: '招聘'
        }, {
            value: 'bb',
            label: '吐槽'
        }, {
            value: undefined,
            label: '其他'
        }];
    })
    .filter('tabName', function(Tabs) {
        return function(tab) {
            for (var i in Tabs) {
                if (Tabs[i].value === tab) {
                    return Tabs[i].label;
                }
            }
        };
    })
    .filter('link', function($sce) {
        return function(content) {
            if (typeof content === 'string') {
                var userLinkRegex = /href="\/user\/([\S]+)"/gi;
                var noProtocolSrcRegex = /src="\/\/([\S]+)"/gi;
                var externalLinkRegex = /href="((?!#\/user\/)[\S]+)"/gi;
                return $sce.trustAsHtml(
                    content
                    .replace(userLinkRegex, 'href="#/user/$1"')
                    .replace(noProtocolSrcRegex, 'src="https://$1"')
                    .replace(externalLinkRegex, "onClick=\"window.open('$1', '_blank', 'location=yes')\"")
                );
            }
            return content;
        };
    })
    .filter('protocol', function() {
        return function(src) {
            // add https protocol
            if (/^\/\//gi.test(src)) {
                return 'https:' + src;
            } else {
                return src;
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

.factory('User', function(ENV, $resource, $log, $q, Storage, Push) {
        var storageKey = 'user';
        var resource = $resource(ENV.api + '/accesstoken');
        var userResource = $resource(ENV.api + '/user/:loginname', {
            loginname: ''
        });
        var user = Storage.get(storageKey) || {};
        return {
            login: function(loginName) {

                return userResource.get({
                    loginname: loginName
                }, function(response) {
                    if (typeof response.data !="undefined") {
                        user = response.data;
                        Storage.set(storageKey, user);
                    } else {
                        //error_msg: "user `aaa` is not exists"
                    }

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
    })
    .factory('Messages', function(ENV, $resource, $log, User) {
        var messages = {};
        var messagesCount = 0;
        var resource = $resource(ENV.api + '/messages', null, {
            count: {
                method: 'get',
                url: ENV.api + '/message/count'
            },
            markAll: {
                method: 'post',
                url: ENV.api + '/message/mark_all'
            }
        });
        return {
            currentMessageCount: function() {
                return messagesCount;
            },
            getMessageCount: function() {
                $log.debug('get messages count');
                var currentUser = User.getCurrentUser();
                return resource.count({
                    accesstoken: currentUser.accesstoken
                });
            },
            getMessages: function() {
                $log.debug('get messages');
                var currentUser = User.getCurrentUser();
                return resource.get({
                    accesstoken: currentUser.accesstoken
                });
                // return messages;
            },
            markAll: function() {
                $log.debug('mark all as read');
                var currentUser = User.getCurrentUser();
                return resource.markAll({
                    accesstoken: currentUser.accesstoken
                }, function(response) {
                    $log.debug('marked messages as read:', response);
                    messagesCount = 0;
                });
            }
        };
    })
    .factory('My', function(ENV, $resource, $log, Storage) {
        var storageKey = 'settings';
        var settings = Storage.get(storageKey) || {
            sendFrom: true,
            showAvatar: true,
            version: ENV.version
        };
        return {
            getSettings: function() {
                $log.debug('get settings', settings);
                return settings;
            },
            setSettings: function(key, value) {
                settings[key] = value;
                // return settings;
                $log.debug('set settings', settings);
            },
            save: function(settings) {
                $log.debug('save settings', settings);
                Storage.set(storageKey, settings);
            }
        };
    })
    .directive('lazyContainer', [
        function() {
            var uid = 0;

            function getUid(el) {
                return el.__uid || (el.__uid = '' + ++uid);
            }

            return {
                restrict: 'EA',
                controller: ['$scope', '$element', function($scope, $element) {
                    var elements = {};

                    function onLoad() {
                        var $el = angular.element(this);
                        var uid = getUid($el);

                        $el.css('opacity', 1);

                        if (elements.hasOwnProperty(uid)) {
                            delete elements[uid];
                        }
                    }

                    function isVisible(elem) {
                        var containerRect = $element[0].getBoundingClientRect();
                        var elemRect = elem[0].getBoundingClientRect();
                        var xVisible, yVisible;
                        var offset = 50;

                        if (elemRect.bottom + offset >= containerRect.top &&
                            elemRect.top - offset <= containerRect.bottom) {
                            yVisible = true;
                        }

                        if (elemRect.right + offset >= containerRect.left &&
                            elemRect.left - offset <= containerRect.right) {
                            xVisible = true;
                        }

                        return xVisible && yVisible;
                    }

                    function checkImage() {
                        Object.keys(elements).forEach(function(uid) {
                            var obj = elements[uid],
                                iElement = obj.iElement,
                                iScope = obj.iScope;
                            if (isVisible(iElement)) {
                                iElement.attr('src', iScope.lazySrc);
                            }
                        });
                    }

                    this.addImg = function(iScope, iElement, iAttrs) {
                        iElement.bind('load', onLoad);
                        iScope.$watch('lazySrc', function() {
                            if (isVisible(iElement)) {
                                iElement.attr('src', iScope.lazySrc);
                            } else {
                                var uid = getUid(iElement);
                                iElement.css({
                                    'background-color': '#fff',
                                    'opacity': 0,
                                    '-webkit-transition': 'opacity 1s',
                                    'transition': 'opacity 1s'
                                });
                                elements[uid] = {
                                    iElement: iElement,
                                    iScope: iScope
                                };
                            }
                        });
                        iScope.$on('$destroy', function() {
                            iElement.unbind('load');
                        });
                    };

                    $element.bind('scroll', checkImage);
                    $element.bind('resize', checkImage);
                }]
            };
        }
    ])
    .directive('lazySrc', [
        function() {
            return {
                restrict: 'A',
                require: '^lazyContainer',
                scope: {
                    lazySrc: '@'
                },
                link: function(iScope, iElement, iAttrs, containerCtrl) {
                    containerCtrl.addImg(iScope, iElement, iAttrs);
                }
            };
        }
    ])
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
