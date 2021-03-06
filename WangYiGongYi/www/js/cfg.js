var myConfig = {

}
var Patterns = {
    1: /^1\d{10}$/, //mobile
    6: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/, //email
    3: /^\d{5,11}$/
}


var MideApp = function() {
    var API_Host = 'http://oukeye.github.io/'; //http://api.yibeiban.com:8888';
    var API_Home = "http://120.24.230.139/AppData/"; //"http://192.168.1.105/datainterface/";//
    var API_Lock = false;

    /* To be inited or changed in ctrl */
    var BackManner = null;
    var MySQLite = null;

    var $ionicHistory = null;
    var $ionicLoading = null;
    var $http = null;
    var $state = null;
    var $scope = null;
    var $rootScope = null;
    var $menusScope = null;
    var $timeout = null;
    /* End */

    var backward = function(callback) {
        switch (BackManner) {
            case 'exit':
                callback && callback()

                break;
            case 'appBack':
                navigator.app.backHistory();
                break;
            case 'back':
                $ionicHistory.goBack();
                setBackManner('exit');
                break;
            case 'wait':
                $state.go('menus.job-main');
                break;
            default:
                break;
        }
    }

    var isOnline = function() {
        // return true;
        // var networkState = navigator.connection.type;
        // return networkState !== Connection.UNKNOWN && networkState !== Connection.NONE;
        if(typeof(Connection)=='undefined'){
            return true;
        }
        try {
            return navigator && navigator.connection && navigator.connection.type != Connection.NONE;
        } catch (e) {
            alert("isOnline e is " + e);
            // return true;
        }


    };
    //var myLogger = function(i){return console.log(JSON.stringify(i));};
    var myLogger = function() {
        for (var i = 0; i < arguments.length; i++) {
            console.log(JSON.stringify(arguments[i]));
        }
    };

    var MemCache = function() {
        var data = {};
        var conn = {};
        conn.save = function(key, val) {
            data[key] = {
                'ttl': Date.now(),
                'val': val
            };
            return data[key];
        }
        conn.load = function(key, ttl) {
            return (data[key] && (data[key].ttl > Date.now() - (ttl || 60 * 60 * 24 * 365) * 1000)) ? data[key].val : false;
        }
        conn.clear = function() {
            return data = {};
        }
        return conn;
    }();

    var LocCache = function() {
        // set: function(key, data) {
        //       return window.localStorage.setItem(key, window.JSON.stringify(data));
        //   },
        //   get: function(key) {

        //       return window.JSON.parse(window.localStorage.getItem(key));
        //   },
        //   remove: function(key) {
        //       return window.localStorage.removeItem(key);
        //   }
        var data = {};
        var conn = {};
        conn.save = function(key, val) {
            try {
                key = ('&' == key.substring(0, 1)) ? key : '~' + key;
                data[key] = {
                    'ttl': Date.now(),
                    'val': val
                };
                window.localStorage.setItem(key, window.JSON.stringify(data[key]));
                return data[key];
            } catch (e) {
                return false;
            }
        }
        conn.load = function(key, ttl) {
            try {
                key = ('&' == key.substring(0, 1)) ? key : '~' + key;
                data[key] = window.JSON.parse(window.localStorage.getItem(key));;
                return (data[key] && (data[key].ttl > Date.now() - (ttl || 60 * 60 * 24 * 365) * 1000)) ? data[key].val : false;
            } catch (e) {
                return false;
            }
        }
        conn.clear = function(clear_key, prefix) {
            prefix = prefix || '~';
            Object.keys(localStorage).forEach(function(key) {
                if (typeof(clear_key) == 'undefined') {
                    if (key.substring(0, 1) == prefix) {
                        window.localStorage.removeItem(key);
                    }
                } else {
                    if (key == prefix + clear_key) {
                        window.localStorage.removeItem(key);
                    }
                }

            });
        }
        return conn;
    }();

    var SqlCache = function() {
        var conn = {};
        conn.save = function(key, val, callback) {

            if (typeof(MySQLite) != "undefined") {
                alert("JSON.stringify(val) :" + JSON.stringify(val).length);
                MySQLite && MySQLite.saveRecords('cache', [{
                    'key': key,
                    'val': JSON.stringify(val),
                    'ttl': Date.now()
                }], callback);


            }

        }
        conn.load = function(key, ttl, callback) {
            var wrapper = function(res) {

                if (!res.rows || !res.rows.item(0) || !res.rows.item(0).val) {
                    return callback(false);
                }
                var json = JSON.parse(res.rows.item(0).val);
                if (!json) {
                    return callback(false);
                }
                return callback(json);
            }
            if (typeof(MySQLite) != "undefined") {
                MySQLite && MySQLite.findRecords('cache', "WHERE `key` = '#key#' AND `ttl`< #ttl#".replace('#key#', key).replace('#ttl#', Date.now() - (ttl * 1000 || 0)), wrapper);

            }
        }
        return conn;
    }();
    var myNotice = function(msg, timeout, prev, post) {
        $ionicLoading.show({
            template: '<div style="z-index:999;">'+msg+'</div>',

            noBackdrop: true
        });
        $timeout(function() {
            prev && prev();
            $ionicLoading.hide();
            post && post();
        }, timeout || 1500);
        return false;
    }

    var myRemote = function(target, params, done, fail) {
        if (!isOnline()) {
            return myLogger('Connection.NONE');
        }
        var lock = API_Home + target + ":" + JSON.stringify(params);
        if (API_Lock == lock) {
            return myLogger('Http Locked:' + API_Lock);
        }
        API_Lock = lock;

        LocCache.save('&remote:' + target, LocCache.load('&remote:' + target) + 1);
        $http({
                'method': 'POST',
                'url': API_Home + target,
                'params': params,
                'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                'timeout': 10000
            }

        ).success(function(data, status) {
            API_Lock = false;
            $ionicLoading.hide();
            if (status == 200) {
                done && done(data);
            } else {
                $ionicLoading.hide();
                fail ? fail(data) : myNotice(data ? data.errmsg : '发生错误');
            }
        }).error(function(data, status) {
            API_Lock = false;
            if (true) {
                $ionicLoading.hide();
                fail ? fail(data, status) : myNotice(data ? data.errmsg : '网络异常:');
            }
        });


    }


    var ajaxPost = function(target, params, done, fail) {
        // console.log(target + " 请求ajax");
        myRemote(target, params, done, fail);
        // $.ajax({
        //     type: "post",
        //     url: API_Home + target,
        //     data: params,
        //     dataType: "json",
        //     success: function(data) {
        //         done && done(data);
        //     },
        //     error: function(data) {
        //         fail && fail(data);
        //     }
        // });
    }

    var myGetData = function(target, done, fail) {
        if (!isOnline()) {
            return myLogger('Connection.NONE');
        }
        var lock = target; //var lock = API_Host+target + ":" + JSON.stringify(params);
        if (API_Lock == lock) {
            return myLogger('Http Locked:' + API_Lock);
        }
        API_Lock = lock;

        // LocCache.save('&remote:' + target, LocCache.load('&remote:' + target) + 1);
        $http({
            method: 'GET',
            url: API_Host + target
        }).
        success(function(data, status, headers, config) {
            API_Lock = false;
            if (status) {
                done && done(data);
            } else {

                $ionicLoading.hide();
                fail ? fail(data) : myNotice(data ? data.errmsg : '发生错误' + status);
            }
        }).
        error(function(data, status, headers, config) {
            API_Lock = false;
            if (true) {
                $ionicLoading.hide();
                fail ? fail(data) : myNotice(data ? data.errmsg : '网络异常:' + status);
            }
        });


    }

    var httpGet = function(target, done, fail) {
        myGetData(target, done, fail);
    }

    var getMySQLite = function() {
        return MySQLite;
    }
    var setMySQLite = function(conn) {
        MySQLite = conn;
    }

    var setBackManner = function(type) {
        BackManner = type;
    }

    var setMyionicHistory = function(obj) {
        $ionicHistory = obj;
    }
    var setMyIonicLoading = function(obj) {
        $ionicLoading = obj;
    }
    var setMyHttp = function(obj) {
        $http = obj;
    }
    var setMyTimeout = function(obj) {
        $timeout = obj;
    }
    var setMenusScope = function(obj) {
        $menusScope = obj;
    }
    var setMyRootScope = function(obj) {
        $rootScope = obj;
    }
    var getMyRootScope = function() {
        return $rootScope;
    }
    var intoMyController = function(scope, state) {
        $scope = scope;
        $state = state;
        $scope.myConfig = myConfig;
        $scope.back = function(tabshow) {
            backward(tabshow);
        };
        $scope.$on("$destroy", function() {
            exitMyController();
        });
    }
    var exitMyController = function() {
        $scope = null;
        $state = null;
    }

    var updateUnread = function() {
        if (mideApp_user && mideApp_user.profile && mideApp_user.profile.id_ybb && mideApp_user.profile.secret) {
            var params = {
                'id_ybb': mideApp_user.profile.id_ybb,
                'secret': mideApp_user.profile.secret,
                'params': {}
            }
            myRemote('/message/unread-number', params, function(data) {
                if ($menusScope) {
                    $menusScope.badge_number = data.result.unread_number || '';
                    window.plugins && window.plugins.jPushPlugin && window.plugins.jPushPlugin.setBadge($menusScope.badge_number);
                }
            });
        }
    }

    var insertUnread = function() {
        if ($menusScope) {
            $menusScope.badge_number = ($menusScope.badge_number * 1 || 0) + 1;
        }
    }

    var ws_interval = 0;
    var ws_valid = 0;

    var initWebSocket = function() {
        setTimeout(function() {
            makeWebSocket();
        }, 3000 + Math.random() * ws_interval * 1000);
    }
    var makeWebSocket = function() {
        var time = Date.now();
        if (!isOnline() || !mideApp_user || !mideApp_user.profile) {
            initWebSocket();
            return false;
        }

        var address = 'ws://api.yibeiban.com:8888/websocket/message/app/connect?id_ybb=#id_ybb#&secret=#secret#';
        var address = address.replace('#id_ybb#', mideApp_user.profile.id_ybb).replace('#secret#', mideApp_user.profile.secret);

        var ws = new WebSocket(address);

        ws.onopen = function(e) {};
        ws.onclose = function(e) {
            initWebSocket();
        };
        ws.onerror = function(e) {};
        ws.onmessage = function(e) {
            var json = JSON.parse(e.data);
            if ($scope.onmessage) {
                return $scope.onmessage(json);
            }
            if (1 == json.type) {
                if ($menusScope) {
                    $menusScope.$apply(function() {
                        insertUnread();
                    });
                }
            }
        };
    }


    var downloadfile = function(cordovaFileTransfer, url, targetName, successCallback, errCallback, progress) {
        document.addEventListener('deviceready', function() {

            var targetPath = cordova.file.externalDataDirectory + targetName;
            var trustHosts = true
            var options = {};
            cordovaFileTransfer.download(url, targetPath, options, trustHosts)
                .then(function(result) {
                    successCallback(result);

                }, function(err) {
                    errCallback(err);
                }, function(progress) {
                    progress(progress);
                });

        }, false);
    }

    var writeFile = function(cordovaFile, targetFileName, data, replace) {
        if (typeof(cordova) != 'undefined') {
            document.addEventListener('deviceready', function() {
                var _dataCache = {
                    'addtime': Math.round(new Date().getTime() / 1000),
                    'data': data
                }
                cordovaFile.writeFile(cordova.file.externalDataDirectory, targetFileName, JSON.stringify(_dataCache), replace)
                    .then(function(success) {

                    }, function(error) {

                    }, replace || true);
            }, false);
        } else {

        }

    };


    var readAsText = function(cordovaFile, targetFileName, successCallback, errorCallback) {
        if (typeof(cordova) != 'undefined') {
            document.addEventListener('deviceready', function() {
                if (typeof(cordova.file) == 'undefined') {
                    errorCallback && errorCallback(error);
                } else {
                    cordovaFile.readAsText(cordova.file.externalDataDirectory, targetFileName)
                        .then(function(success) {
                            successCallback && successCallback(success);
                        }, function(error) {
                            errorCallback && errorCallback(error);
                        });
                }


            }, false);
        } else {
            errorCallback && errorCallback();
        }

    }

    initWebSocket();

    var mideapp = {}
    mideapp.downloadfile = downloadfile;
    mideapp.backward = backward;
    mideapp.isOnline = isOnline;
    mideapp.myLogger = myLogger;
    mideapp.MemCache = MemCache;
    mideapp.LocCache = LocCache;
    mideapp.SqlCache = SqlCache;
    mideapp.myNotice = myNotice;
    mideapp.myRemote = myRemote;
    mideapp.ajaxPost = ajaxPost;
    mideapp.httpGet = httpGet;
    mideapp.getMySQLite = getMySQLite;
    mideapp.setMySQLite = setMySQLite;

    mideapp.updateUnread = updateUnread;
    mideapp.insertUnread = insertUnread;

    mideapp.setBackManner = setBackManner;

    mideapp.setMyionicHistory = setMyionicHistory;
    mideapp.setMyIonicLoading = setMyIonicLoading;

    mideapp.setMyHttp = setMyHttp;
    mideapp.setMyTimeout = setMyTimeout;
    mideapp.setMenusScope = setMenusScope;
    mideapp.setMyRootScope = setMyRootScope;
    mideapp.getMyRootScope = getMyRootScope;
    mideapp.intoMyController = intoMyController;
    mideapp.exitMyController = exitMyController;

    mideapp.writeFile = writeFile;
    mideapp.readAsText = readAsText;

    mideapp.API_Home = API_Home;
    return mideapp;
}();

var mideApp_user = null;
