angular.module('starter.services', ['ngCordova'])
    .factory('Tools', function($cordovaFile, $cordovaToast, $cordovaNetwork) {
        var MD5 = function(string) {

            function RotateLeft(lValue, iShiftBits) {
                return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
            }

            function AddUnsigned(lX, lY) {
                var lX4, lY4, lX8, lY8, lResult;
                lX8 = (lX & 0x80000000);
                lY8 = (lY & 0x80000000);
                lX4 = (lX & 0x40000000);
                lY4 = (lY & 0x40000000);
                lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
                if (lX4 & lY4) {
                    return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                }
                if (lX4 | lY4) {
                    if (lResult & 0x40000000) {
                        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                    } else {
                        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                    }
                } else {
                    return (lResult ^ lX8 ^ lY8);
                }
            }

            function F(x, y, z) {
                return (x & y) | ((~x) & z);
            }

            function G(x, y, z) {
                return (x & z) | (y & (~z));
            }

            function H(x, y, z) {
                return (x ^ y ^ z);
            }

            function I(x, y, z) {
                return (y ^ (x | (~z)));
            }

            function FF(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };

            function GG(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };

            function HH(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };

            function II(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
            };

            function ConvertToWordArray(string) {
                var lWordCount;
                var lMessageLength = string.length;
                var lNumberOfWords_temp1 = lMessageLength + 8;
                var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
                var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
                var lWordArray = Array(lNumberOfWords - 1);
                var lBytePosition = 0;
                var lByteCount = 0;
                while (lByteCount < lMessageLength) {
                    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                    lBytePosition = (lByteCount % 4) * 8;
                    lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                    lByteCount++;
                }
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
                lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                return lWordArray;
            };

            function WordToHex(lValue) {
                var WordToHexValue = "",
                    WordToHexValue_temp = "",
                    lByte, lCount;
                for (lCount = 0; lCount <= 3; lCount++) {
                    lByte = (lValue >>> (lCount * 8)) & 255;
                    WordToHexValue_temp = "0" + lByte.toString(16);
                    WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
                }
                return WordToHexValue;
            };

            function Utf8Encode(string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            };

            var x = Array();
            var k, AA, BB, CC, DD, a, b, c, d;
            var S11 = 7,
                S12 = 12,
                S13 = 17,
                S14 = 22;
            var S21 = 5,
                S22 = 9,
                S23 = 14,
                S24 = 20;
            var S31 = 4,
                S32 = 11,
                S33 = 16,
                S34 = 23;
            var S41 = 6,
                S42 = 10,
                S43 = 15,
                S44 = 21;

            string = Utf8Encode(string);

            x = ConvertToWordArray(string);

            a = 0x67452301;
            b = 0xEFCDAB89;
            c = 0x98BADCFE;
            d = 0x10325476;

            for (k = 0; k < x.length; k += 16) {
                AA = a;
                BB = b;
                CC = c;
                DD = d;
                a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
                d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
                c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
                b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
                a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
                d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
                c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
                b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
                a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
                d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
                c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
                b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
                a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
                d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
                c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
                b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
                a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
                d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
                c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
                b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
                a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
                d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
                c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
                b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
                a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
                d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
                c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
                b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
                a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
                d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
                c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
                b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
                a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
                d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
                c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
                b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
                a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
                d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
                c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
                b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
                a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
                d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
                c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
                b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
                a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
                d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
                c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
                b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
                a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
                d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
                c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
                b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
                a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
                d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
                c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
                b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
                a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
                d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
                c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
                b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
                a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
                d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
                c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
                b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
                a = AddUnsigned(a, AA);
                b = AddUnsigned(b, BB);
                c = AddUnsigned(c, CC);
                d = AddUnsigned(d, DD);
            }

            var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

            return temp.toLowerCase();
        }
        var _findById = function(a, val) {

            for (var i = 0; i < a.length; i++) {
                if (a[i]._id == val) {
                    return a[i]
                };
            }
            return null;
        };
        var formatTime = function(val) {
            var re = /-?\d+/;
            var m = re.exec(val);
            var d = new Date(parseInt(m[0]));
            // 按【2012-02-13 09:09:09】的格式返回日期
            return d.format("yyyy-MM-dd hh:mm:ss");
        }
        var isOnline = function() {
            return $cordovaNetwork.isOnline();
        }
        var showShortTop = function(message) {
            $cordovaToast.showShortTop(message);
        }
        var showShortCenter = function(message) {
            $cordovaToast.showShortCenter(message);
        }
        var showShortBottom = function(message) {
            $cordovaToast.showShortBottom(message);
        }
        var showLongTop = function(message) {
            $cordovaToast.showLongTop(message);
        }
        var showLongCenter = function(message) {
            $cordovaToast.showLongCenter(message);
        }
        var showLongBottom = function(message) {
            $cordovaToast.showLongBottom(message);
        }
        var inArray = function(elem, array, i) {
            var len;

            if (array) {
                //indexOf ：jQuery开始定义了 indexOf = Array.prototype.indexOf 如果有indexOf 方法则用改方法返回，核心为indexOf方法  
                // if (typeof(indexOf)!=) {
                //     return indexOf.call(array, elem, i);
                // }

                len = array.length;
                /* 
                    注意该条语句是给i赋值用的，猛的一看该语句可能产生混淆 
                    首先判断i的值，i ? （i < 0 ? Math.max( 0, len + i ) : i ）: 0 如果 i 未定义 或者i为0 则 把0赋值给i 
                    如果i 定义了并且不为0 执行 i < 0 ? Math.max( 0, len + i ) : i 
                    如果i 为负数，加上则为其加上数组长度，且其值不能小于0 
                */
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

                for (; i < len; i++) {
                    // Skip accessing in sparse arrays 这么判断主要是考虑数组下标不连续的情况注意学习这种方式 i in arry 的判断方式  
                    if (i in array && array[i] === elem) {
                        return i;
                    }
                }
            }

            return -1;
        }
        return {
            inArray: function(elem, array, i) {
                return inArray(elem, array, i);
            },
            MD5: function(string) {
                return MD5(string);
            },
            findById: function(a, val) {
                return _findById(a, val);
            },
            formatTime: function(val) {
                return formatTime(val);
            },
            showShortTop: function(message) {
                showShortTop(message);
            },
            showShortCenter: function(message) {
                showShortCenter(message);
            },
            showShortBottom: function(message) {
                showShortBottom(message);
            },
            showLongTop: function(message) {
                showLongTop(message);
            },
            showLongCenter: function(message) {
                showLongCenter(message);
            },
            showLongBottom: function(message) {
                showLongBottom(message);
            }
        };
    })
    .factory('RankTabs', function() {

        return [{
            value: 'all',
            label: '全国'
        }, {
            value: 'gz',
            label: '广州'
        }, {
            value: 'fs',
            label: '佛山'
        }];
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
    .filter('topicFilter', function() {

        return function(data, id) {
            var result = {};
            if (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].ID == id) {
                        result = data[i];
                    }
                }
            }
            return result;
        };
    })
    .filter('CdateTime', function() {
        Date.prototype.format = function(format) //author: meizz
            {
                var o = {
                    "M+": this.getMonth() + 1, //month
                    "d+": this.getDate(), //day
                    "h+": this.getHours(), //hour
                    "m+": this.getMinutes(), //minute
                    "s+": this.getSeconds(), //second
                    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
                    "S": this.getMilliseconds() //millisecond
                }
                if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(format))
                        format = format.replace(RegExp.$1,
                            RegExp.$1.length == 1 ? o[k] :
                            ("00" + o[k]).substr(("" + o[k]).length));
                return format;
            }
        return function(val, type) {
            var re = /-?\d+/;
            var m = re.exec(val);
            var d = new Date(parseInt(m[0]));
            // 按【2012-02-13 09:09:09】的格式返回日期
            console.log('CdateTime format');
            return d.format("yyyy-MM-dd hh:mm:ss");
        }
    })
    .filter('activityStatus', function() {
        return function(val) {
            var _stautsName = "";
            switch (val) {
                case 0:
                    _stautsName = "报名中"
                    break;
                case 1:
                    _stautsName = "正在开始"
                    break;
                case 2:
                    _stautsName = "已结束"
                    break;
                default:
                    _stautsName = "其他"
            }
            return _stautsName;
        }
    })
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
    )
    .directive('focusMe', function($timeout) {
        return {
            link: function(scope, element, attrs) {
                $timeout(function() {
                    element[0].focus();
                }, 1000);
            }
        };
    })
    .directive('textarea', function() {
        return {
            restrict: 'E',
            link: function(scope, element, attr) {
                var update = function() {

                    var _sh = element[0].scrollHeight
                    var _h = element[0].offsetHeight;
                    if (_sh != _h && _h < _sh && _sh < 200) {
                        element.css("height", (_sh + 4) + "px");
                    }

                };
                scope.$watch(attr.ngModel, function() {
                    update();
                });
            }
        };
    })
    .directive('numberinput', function() {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                buyCount: '=buycount'
            },
            template: '<div class="input-group" style="width: 145px; position: absolute;right: 10px;">' + '<span class="input-group-addon ion-minus-round positive" ng-click="minusBuyCount($event)"></span>' + '<input type="tel" class="form-control" placeholder="手数" ng-model="buyCount">' + '<span class="input-group-addon ion-plus-round button-positive plus"  ng-click="plusBuyCount($event)"></span>' + '</div>',
            link: function(scope, element, attrs, accordionController) {
                var _attrs = attrs;
                var myelement = element;
                scope.minusBuyCount = function($event) {
                    scope.buyCount = parseInt(scope.buyCount) - 1;
                    if (scope.buyCount < 1) {
                        scope.buyCount = 1;
                    }
                };
                scope.plusBuyCount = function($event) {

                    if (scope.buyCount < _attrs.maxcount) {
                        myelement.removeClass("minusHidden");
                        myelement.removeClass("plusHidden");
                        scope.buyCount = parseInt(scope.buyCount) + 1;
                    } else {
                        myelement.addClass("plusHidden");
                    }

                };
            }
        }
    })
   
    .directive("selectTabs", function($filter, $ionicScrollDelegate) {
        return {
            restrict: 'AE',
            scope: {
                data1: '=',
                contentid: "@",
                scrollheight: '@',
                closemodal: '&'
            },
            template: 
            '<div class="row selectList" ng-show="data1">' +
                '<div class="col selectLeft">' +
                '<ion-scroll zooming="false" direction="y" scrollbar-y="false" has-bouncing="true" style="height:{{scrollheight}}px;" delegate-handle="selectLeftScroll">' +
                '<div class="list">' +
                '<div class="item item-icon-right" ng-repeat="selectLeft in data1" ng-click="changeActive(\'{{selectLeft.label}}\')" ng-class="{\'{{selectLeft.label}}\': \'isActive\'}[selectlabel]">' +
                '{{selectLeft.label}}<i class="icon ion-arrow-left-b"></i>' +
                '</div>' +
                '</div>' +
                '</ion-scroll>' +
                '</div>' +
                '<div class="col selectRight">' +
                '<ion-scroll zooming="false" direction="y" scrollbar-y="false" has-bouncing="true" style="height:{{scrollheight}}px;" delegate-handle="selectRightScroll">' +
                '<div class="list">' +
                '<div class="item " ng-repeat="selectRight in data2.childrens" ng-click="selectActive(\'{{selectRight.label}}\')" ng-class="{\'{{selectRight.label}}\': \'isActive\'}[selectactivelabel]">{{selectRight.label}}</div>' +
                '</div>' +
                '</ion-scroll>' +
                '</div>' +
            '</div> '+
            '<div ng-show="!data1" class="center">加载中...</div>',

            link: function(scope, element, attr) {
                scope.$watch('data1',function(newdata,olddata){
                    if(!angular.isUndefined(newdata)){
                        if (newdata.length>0&&angular.isUndefined(scope.data2)) {
                            scope.data2 =newdata[0];
                            if(angular.isUndefined(scope.selectlabel)&&!angular.isUndefined(newdata[0].label)){
                                scope.selectlabel = newdata[0].label;
                            }
                           
                        } 
                    }
                    scope.scrollheight = window.screen.height;
                    
                });

                scope.changeActive = function(label) {
                    scope.selectlabel = label;
                    scope.data2 = $filter('filter')(scope.data1, {
                        label: label
                    })[0];
                    scope.selectactivelabel = '';
                    scope.selelcttext = '';
                    $ionicScrollDelegate.$getByHandle('selectRightScroll').scrollTop();
                };

                scope.selectActive = function(label) {
                    scope.selectactivelabel = label;
                    if (angular.isUndefined(scope.selectlabel) || angular.isUndefined(scope.selectactivelabel)) {
                        scope.selelcttext = '';
                    } else {
                        scope.selelcttext = scope.selectlabel + '-' + scope.selectactivelabel;
                        scope.closemodal({
                            text: scope.selelcttext
                        });
                    }


                }
                
            }

        }
    })
    .directive("selectTabs4", function($filter, $ionicScrollDelegate) {
        return {
            restrict: 'AE',
            scope: {
                data1: '=',
                contentid: "@",
                scrollheight: '@',
                activelabel1:'=',
                activelabel2:'=',
                activelabel3:'=',
                activelabel4:'='
            },
            template: 
                '<div class="row selectList4" ng-show="data1">' +
                    '<div class="col selectLeft">' +
                        '<ion-scroll zooming="false" direction="y" scrollbar-y="false" has-bouncing="true" style="height:{{scrollheight}}px;" delegate-handle="select1Scroll">' +
                            '<div class="list">' +
                            '<div class="item item-icon-right" ng-repeat="selectLeft in data1" ng-click="changeActive1(\'{{selectLeft.label}}\')" ng-class="{\'{{selectLeft.label}}\': \'isActive\'}[activelabel1]">' +
                            '{{selectLeft.label}}<i class="icon ion-arrow-left-b"></i>' +
                            '</div>' +
                            '</div>' +
                        '</ion-scroll>' +
                    '</div>' +
                    '<div class="col selectRight">' +
                        '<ion-scroll zooming="false" direction="y" scrollbar-y="false" has-bouncing="true" style="height:{{scrollheight}}px;" delegate-handle="select2Scroll">' +
                            '<div class="list">' +
                            '<div class="item item-icon-right" ng-repeat="selectRight in data2" ng-click="changeActive2(\'{{selectRight.label}}\')" ng-class="{\'{{selectRight.label}}\': \'isActive\'}[activelabel2]">'+
                            '{{selectRight.label}}<i class="icon ion-arrow-left-b"></i>' +
                            '</div>' +
                            '</div>' +
                        '</ion-scroll>' +
                    '</div>' +
                    '<div class="col selectLeft">' +
                        '<ion-scroll zooming="false" direction="y" scrollbar-y="false" has-bouncing="true" style="height:{{scrollheight}}px;" delegate-handle="select3Scroll">' +
                            '<div class="list">' +
                            '<div class="item item-icon-right" ng-repeat="selectLeft in data3" ng-click="changeActive3(\'{{selectLeft.label}}\')" ng-class="{\'{{selectLeft.label}}\': \'isActive\'}[activelabel3]">' +
                            '{{selectLeft.label}}<i class="icon ion-arrow-left-b"></i>' +
                            '</div>' +
                            '</div>' +
                        '</ion-scroll>' +
                    '</div>' +
                    '<div class="col selectRight">' +
                        '<ion-scroll zooming="false" direction="y" scrollbar-y="false" has-bouncing="true" style="height:{{scrollheight}}px;" delegate-handle="select4Scroll">' +
                            '<div class="list">' +
                            '<div class="item " ng-repeat="selectRight in data4" ng-click="changeActive4(\'{{selectRight.label}}\')" ng-class="{\'{{selectRight.label}}\': \'isActive\'}[activelabel4]">{{selectRight.label}}</div>' +
                            '</div>' +
                        '</ion-scroll>' +
                    '</div>' +
                '</div> '+
                '<div ng-show="!data1" class="center">加载中...</div>',

            link: function(scope, element, attr) {

                scope.$watch('data1',function(newdata,olddata){
                    if(angular.isArray(newdata)&&newdata.length>0){
                        _init(newdata,newdata[0].label);
                    }
                     scope.scrollheight = window.screen.height;
                    
                });
                var _init = function(data,lable){

                    if(angular.isArray(data)&&data.length>0){        
                        var _data = $filter('filter')( data, {
                                label: lable
                            });               
                        //如果_data(筛选出来的结果)是个数组，且长度大于0
                        if(angular.isArray(_data)&&_data.length>0){
                            scope.activelabel1 = _data[0].label;
                            //如果_data第一个元素的childrens是个数组，且长度大于0
                            if(angular.isArray(_data[0].childrens)&&_data[0].childrens.length>0){
                            
                                scope.data2 =  _data[0].childrens;//将父级的第一个元素 赋值

                                scope.activelabel2 = scope.data2[0].label;

                                if(angular.isArray(scope.data2[0].childrens)&&scope.data2[0].childrens.length>0){

                                    scope.data3 =  scope.data2[0].childrens;//将父级的第一个元素 赋值

                                    scope.activelabel3 = scope.data3[0].label;

                                    if(angular.isArray(scope.data3[0].childrens)&&scope.data3[0].childrens.length>0){

                                        scope.data4 =  scope.data3[0].childrens;//将父级的第一个元素 赋值

                                        scope.activelabel4 = scope.data4[0].label;
                                    }else{

                                        scope.activelabel4 = '';
                                        scope.data4=[];
                                    }

                                }else{
                                    scope.activelabel3 = '';
                                    scope.activelabel4 = '';
                                    scope.data3=[];
                                    scope.data4=[];
                                }

                                
                            }else{
                                scope.activelabel2 = '';
                                scope.activelabel3 = '';
                                scope.activelabel4 = '';
                                scope.data2=[];
                                scope.data3=[];
                                scope.data4=[];
                            }

                        }                       
                        $ionicScrollDelegate.$getByHandle('select2Scroll').scrollTop();
                        $ionicScrollDelegate.$getByHandle('select3Scroll').scrollTop();
                        $ionicScrollDelegate.$getByHandle('select4Scroll').scrollTop();
                    }else{
                       scope.activelabel1=='';
                       scope.activelabel2=='';
                       scope.activelabel3=='';
                       scope.activelabel4=='';   
                    }
                };
                scope.$watch('activelabel1',function(newdata,olddata){
                    if(newdata==''){
                       scope.activelabel2='';
                       return false;
                    }
                    _init(scope.data1,newdata);
                });
                scope.$watch('activelabel2',function(newdata,olddata){
                    if(newdata==''){
                       scope.activelabel3='';
                       scope.data2=[]; 
                       return false;
                    }

                    if(angular.isArray(scope.data2)&& scope.data2.length>0){

                       var _data = $filter('filter')( scope.data2, {
                            label: newdata
                        });

                        //如果_data(筛选出来的结果)是个数组，且长度大于0
                        if(angular.isArray(_data)&&_data.length>0){
                       
                            //如果_data第一个元素的childrens是个数组，且长度大于0
                            if(angular.isArray(_data[0].childrens)&&_data[0].childrens.length>0){
                            
                                scope.data3 =  _data[0].childrens;//将父级的第一个元素 赋值

                                scope.activelabel3 = scope.data3[0].label;

                                if(angular.isArray(scope.data3[0].childrens)&&scope.data3[0].childrens.length>0){

                                    scope.data4 =  scope.data3[0].childrens;//将父级的第一个元素 赋值

                                    scope.activelabel4 = scope.data4[0].label;

                                }else{
                                    scope.activelabel4 = '';
                                    scope.data4=[];
                                }

                                
                            }else{
                                scope.activelabel3 = '';
                                scope.activelabel4 = '';
                                scope.data3=[];
                                scope.data4=[];
                            }

                        }                       
                        $ionicScrollDelegate.$getByHandle('select2Scroll').scrollTop();
                        $ionicScrollDelegate.$getByHandle('select3Scroll').scrollTop();
                        $ionicScrollDelegate.$getByHandle('select4Scroll').scrollTop();


                    }
                });
                scope.$watch('activelabel3',function(newdata,olddata){
                    if(newdata==''){
                       scope.activelabel4='';
                       scope.data3=[]; 
                       return false;
                    }
                    if(angular.isArray(scope.data3)&& scope.data3.length>0){

                       var _data = $filter('filter')( scope.data3, {
                            label: newdata
                        });

                        //如果_data(筛选出来的结果)是个数组，且长度大于0
                        if(angular.isArray(_data)&&_data.length>0){
                       
                            //如果_data第一个元素的childrens是个数组，且长度大于0
                            if(angular.isArray(_data[0].childrens)&&_data[0].childrens.length>0){
                            
                                scope.data4 =  _data[0].childrens;//将父级的第一个元素 赋值

                                scope.activelabel4 = scope.data4[0].label;
                                                                
                            }else{
                                scope.activelabel4 = '';
                                scope.data4=[];
                            }

                        }                       
                        $ionicScrollDelegate.$getByHandle('select2Scroll').scrollTop();
                        $ionicScrollDelegate.$getByHandle('select3Scroll').scrollTop();
                        $ionicScrollDelegate.$getByHandle('select4Scroll').scrollTop();
                    }
                });
                scope.$watch('activelabel4',function(newdata,olddata){
                    if(newdata==''){
                       scope.data4=[]; 
                       return false;
                    }
                });


                scope.changeActive1 = function(label) {
                    if(scope.activelabel1 == label){
                        scope.activelabel1='';
                    }else{
                       scope.activelabel1 = label 
                    }
                };
                scope.changeActive2 = function(label) {
                    if(scope.activelabel2 == label){
                        scope.activelabel2='';
                    }else{
                       scope.activelabel2 = label 
                    }
                };
                scope.changeActive3 = function(label) {
                    if(scope.activelabel3 == label){
                        scope.activelabel3='';
                    }else{
                       scope.activelabel3 = label 
                    } 
                };
                scope.changeActive4 = function(label) {
                    if(scope.activelabel4 == label){
                        scope.activelabel4='';
                    }else{
                       scope.activelabel4 = label 
                    } 
                };

            }

        }
    })

    .directive('defaultImg', function() {
        return {
            restrict: 'A',
            scope:{
                defaultsrc:'='
            },
            link: function(scope, element, attributes) {

                var applyNewSrc = function() {
                    var newImg = element.clone(true);

                    newImg.attr('src', scope.defaultsrc);
                    newImg[0].addEventListener("load", function() {
                        element.replaceWith(newImg);
                        element = newImg;
                    });

                };

                // $attributes.$observe('src', applyNewSrc);
                scope.$watch('defaultsrc', applyNewSrc);
            }
        };
    })
    .directive('textEllipsis', function() {
        return {
            restrict: 'A',
            scope:{
                defaultsrc:'='
            },
            link: function(scope, element, attributes) {
                var _e = element;
                var applyNewSrc = function() {
                    var oBox =element;// document.getElementById('demo');
                    // slice() 方法可从已有的数组中返回选定的元素。
                    // 您可使用负值从数组的尾部选取元素。
                    // 如果 end 未被规定，那么 slice() 方法会选取从 start 到数组结尾的所有元素。
                    // 此处需要根据需求自行修改slice()的值，以达到要显示的内容
                    var _p = element[0].textContent.split('</p>');
                    if(element.find("p").length>0){
                        var _h =element.find("p")[0].innerHTML;
                        if(_h.length>50){
                             var demoHtml = element.find("p")[0].innerHTML.slice(0,50) + '...';
                             element.find("p")[0].innerHTML=demoHtml
                        }
                        
                    }
                   
                   
                    // 填充至指定位置
                    // element[0].textContent = demoHtml;

                };

                // $attributes.$observe('src', applyNewSrc);
                scope.$watch('defaultsrc', applyNewSrc);
            }
        };
    })
    .factory('Storage', function() {


        var saveStorage = function(key, val) {
            try {
                key = ('&' == key.substring(0, 1)) ? key : '~' + key;
                var data = [];
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
        var loadStorage = function(key, ttl) {
            try {
                key = ('&' == key.substring(0, 1)) ? key : '~' + key;
                var data = [];
                data[key] = window.JSON.parse(window.localStorage.getItem(key));;
                return (data[key] && (data[key].ttl > Date.now() - (ttl || 60 * 60 * 24 * 365) * 1000)) ? data[key].val : false;
            } catch (e) {
                return false;
            }
        }
        var clearStorage = function(clear_key, prefix) {
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
        return {
            save: function(key, val) {
                return saveStorage(key, val);
            },
            load: function(key, ttl) {

                return loadStorage(key, ttl);
            },
            clear: function(clear_key, prefix) {
                return clearStorage(clear_key, prefix);
            }
        };
    })
    .factory('UserCache', function(Storage) {
        var storageKey = 'User';
        return {
            getUser: function() {
                return Storage.load(storageKey) || {};
            },
            setUser: function(userValue) {
                Storage.save(storageKey, userValue);
            },
            clearUser: function() {
                Storage.clear(storageKey)
            }
        };
    })
    .factory("Data", function($rootScope,Storage) {
        
        var EducationData = [{
                    'label': '博士及以上'
                }, {
                    'label': '硕士'
                }, {
                    'label': '本科'
                }, {
                    'label': '大专'
                }, {
                    'label': '中专'
                }, {
                    'label': '高中'
                }, {
                    'label': '初中'
                }, {
                    'label': '小学'
                }, {
                    'label': '其它'
        }];
       
        var DurationData = [{
            'label': '1小时',
            'value': '1'
        }, {
            'label': '2小时',
            'value': '2'
        }, {
            'label': '3小时',
            'value': '3'
        }, {
            'label': '4小时',
            'value': '4'
        }, {
            'label': '5小时',
            'value': '5'
        }, {
            'label': '6小时',
            'value': '6'
        }, {
            'label': '7小时',
            'value': '7'
        }, {
            'label': '8小时',
            'value': '8'
        }, {
            'label': '9小时',
            'value': '9'
        }, {
            'label': '10小时',
            'value': '10'
        }, {
            'label': '11小时',
            'value': '11'
        }, {
            'label': '12小时',
            'value': '12'
        }, {
            'label': '13小时',
            'value': '13'
        }, {
            'label': '14小时',
            'value': '14'
        }, {
            'label': '15小时',
            'value': '15'
        }, {
            'label': '16小时',
            'value': '16'
        }, {
            'label': '17小时',
            'value': '17'
        }, {
            'label': '18小时',
            'value': '18'
        }, {
            'label': '19小时',
            'value': '19'
        }, {
            'label': '20小时',
            'value': '20'
        }, {
            'label': '21小时',
            'value': '21'
        }, {
            'label': '22小时',
            'value': '22'
        }, {
            'label': '23小时',
            'value': '23'
        }, {
            'label': '24小时',
            'value': '24'
        }];
        var DistrictData = null;
        return {
            getDurationData:function(){
                return DurationData;
            },
            getDistrictData:function(){
                
                if(DistrictData){
                    return DistrictData;
                }else{
                    var _DistrictData = Storage.load('DistrictData.json',60*30);

                    if (!_DistrictData) {
                        if (MideApp.isOnline()) {
                            MideApp.ajaxPost('GetDistrict.ashx', {}, function(data) {
                                if(data.code==0){
                                    DistrictData = data.data;
                                    Storage.save('DistrictData.json',DistrictData);
                                    $rootScope.$broadcast('DistrictData.update',DistrictData);
                                }
                            }, function(data, status) {
                                MideApp.myNotice("网络异常:" + status)
                            });

                        } 
                    }
                }    
                
                  return _DistrictData; 
            },
            getEducationData: function() {
                return EducationData;
            },
            getIntentionData: function() {
                return IntentionData;
            },
            getHelpTypeData: function() {

                var _IntentionList = Storage.load('IntentionList.json',60*30);
                if (!_IntentionList) {
                    if (MideApp.isOnline()) {
                        MideApp.ajaxPost('GetServiceIntentionList.ashx', {}, function(data) {
                            if(data.code==0){
                                var HelpTypeData = data.data;
                                Storage.save('IntentionList.json',HelpTypeData);
                                $rootScope.$broadcast('IntentionList.update',HelpTypeData);
                            }
                        }, function(data, status) {
                            MideApp.myNotice("网络异常:" + status)
                        });

                    } 
                }
                  return _IntentionList;  
                
            }

        }
    });
