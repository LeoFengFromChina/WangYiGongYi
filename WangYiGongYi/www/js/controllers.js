angular.module('starter.controllers', [])
    .controller('StartCtrl', function($scope, $state, $http, $timeout, $interval,
        $ionicPopup, $ionicActionSheet, $ionicPlatform, $ionicLoading, $ionicHistory, $rootScope) {
        console.log("typeof MideApp is" + typeof MideApp);
        MideApp.intoMyController($scope, $state);

        $state.go('tab.topics');
        // var guideByUser = function(user) {
        //     if (user.profile && user.profile.step == 1) {
        //         $state.go('tab.topics');

        //     } else {
        //         $state.go('tab.topics');
        //     }
        // };

        // if (mideApp_user) {
        //     return guideByUser(mideApp_user);
        // }

        document.addEventListener("deviceready", onDeviceReady, false);

        function onDeviceReady() {
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


    })
    .controller('TabCtrl', function($scope, $state) {
        console.log('TabCtrl');
        $scope.topics = function() {
            // mideApp.MemCache.save('job-main', false);
            $state.go('tab.topics');
        };
        $scope.chats = function() {
            // mideApp.MemCache.save('say-list', false);
            $state.go('tab.chats');
        };
        $scope.gift = function() {
            // mideApp.MemCache.save('msg-list', false);
            $state.go('tab.gitf');
        };
        $scope.account = function() {
            $state.go('tab.account');
        };
    })
    .controller('TopicsCtrl', function($scope, $state) {
        MideApp.setBackManner('exit');
        MideApp.intoMyController($scope, $state, "tabs-show");
        $scope.$root.tabsHidden = "tabs-show";

        obj = {
            "data": [{
                "id": "555f205aef16811c3ea0a79a",
                "author_id": "54e175958d90a57f050e1625",
                "tab": "share",
                "content": "<div class=\"markdown-text\"><h2>介绍</h2>\n<blockquote>\n<p>这些天趁换工作的时间在家把客户端搞出来了，第一个版本，略糙，不要留什么情面，求拍砖求吐槽~</p>\n</blockquote>\n<blockquote>\n<p>N多地方参(zhao)考(chao)了大神<a href=\"http://ionichina.com/user/lanceli\">@lanceli</a>的<a href=\"https://cnodejs.org/topic/545aee5a3e1f39344c5b3b3e\">CNode社区</a>，大神不要打我啊~~</p>\n</blockquote>\n<h2>源码</h2>\n<p><a href=\"https://github.com/IonicChina/ioniclub\">https://github.com/IonicChina/ioniclub</a></p>\n<h2>下载地址</h2>\n<p><img src=\"http://r.ionichina.com/public/images/appdownload.png\" alt=\"下载二维码\"></p>\n<p><a href=\"https://itunes.apple.com/cn/app/id996999423\" target=\"_blank\">iOS</a>/<a href=\"https://fir.im/fqvr\" target=\"_blank\">Android</a></p>\n<p><strong>iOS尚未审核通过，无法下载</strong></p>\n<h2>主要功能</h2>\n<ol>\n<li>\n<p><strong>话题</strong></p>\n<ul>\n<li>浏览</li>\n<li>新建</li>\n<li>回复</li>\n</ul>\n</li>\n<li>\n<p><strong>探索</strong></p>\n<ul>\n<li>还没想好弄啥，打算弄点儿好玩儿的东西</li>\n</ul>\n</li>\n<li>\n<p><strong>我</strong></p>\n<ul>\n<li>个人信息</li>\n<li>收藏(跳票。。。)</li>\n<li>消息</li>\n<li>设置</li>\n</ul>\n</li>\n</ol>\n<h2>好了，拍吧。。。</h2>\n</div>",
                "title": "【公告】Ioniclub -- ionichina社区移动客户端来了，求拍砖、求吐槽",
                "last_reply_at": "2015-08-21T02:33:00.896Z",
                "good": true,
                "top": true,
                "reply_count": 37,
                "visit_count": 4015,
                "create_at": "2015-05-22T12:26:02.597Z",
                "author": {
                    "loginname": "DongHongfei",
                    "avatar_url": "https://avatars.githubusercontent.com/u/5700428?v=3&s=120"
                }
            }, {
                "id": "55de7aa8628dd6dc21b07e60",
                "author_id": "5514ab05b6421f9166aa5f81",
                "tab": "share",
                "content": "<div class=\"markdown-text\"><h2>介绍</h2>\n<p>这几天闲着没事，就做了个第三方的Ionic社区的移动客户端，练练手，界面设计和图片资源直接从官方版拿来的。真懒o(︶︿︶)o 唉</p>\n<p>网站开放出来的接口，都已全部实现，大家可以下着试试看。</p>\n<h2>源码</h2>\n<p>暂时不开源，等整理完代码和修复BUG后再进行开源</p>\n<h2>下载地址</h2>\n<p><img src=\"http://r.ionichina.com/Fv3rzyipIDAiNeIrw4hPFWp7u-On\" alt=\"下载.png\"></p>\n<p><a href=\"https://fir.im/p7rs\" title=\"android\">Android</a></p>\n<h2>已知缺陷</h2>\n<p>1.没有推送</p>\n<p>2.没做断网处理</p>\n<p>3.没做流量相关，所以没流量的请在WIFI情况下使用</p>\n<p>4.登录后再次点击&quot;个人中心&quot;，会跳转至登录页面</p>\n</div>",
                "title": "论坛第三方移动客户端",
                "last_reply_at": "2015-08-27T02:49:12.943Z",
                "good": false,
                "top": false,
                "reply_count": 0,
                "visit_count": 4,
                "create_at": "2015-08-27T02:49:12.943Z",
                "author": {
                    "loginname": "zxj963577494",
                    "avatar_url": "https://avatars.githubusercontent.com/u/6766515?v=3&s=120"
                }
            }, {
                "id": "55dda4ea628dd6dc21b07e5e",
                "author_id": "5540539cfc91e0dc3d89118a",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>IOS下的splash screen目前开发中有两种实现的方案。\n第一种是：不用第三方的插件 直接在XCODE里面设置就OK。但是有个问题就是，splash screen完后会出现短暂的白屏。毕竟要splash完后 才开始加载本地页面。\n第二种是：用第三方的插件，但是这里也有个问题就是 在splash 上面会有一个系统自带的loading图标在转动。体验很不好。\n有没有大神，有更好的解决方案。</p>\n</div>",
                "title": "关于IOS下splash screen的问题。",
                "last_reply_at": "2015-08-26T11:37:14.059Z",
                "good": false,
                "top": false,
                "reply_count": 0,
                "visit_count": 14,
                "create_at": "2015-08-26T11:37:14.059Z",
                "author": {
                    "loginname": "starrychan",
                    "avatar_url": "https://avatars.githubusercontent.com/u/11535980?v=3&s=120"
                }
            }, {
                "id": "54e453ee2be672f1111c01e1",
                "author_id": "54e175958d90a57f050e1625",
                "tab": "share",
                "content": "<div class=\"markdown-text\"><p>ionicframework中android和ios在默认样式上有一些不同的地方，官方文档中都有说明，但是经常会想不起。</p>\n<p>1.tab位置，$ionicConfigProvider, tabs.position(value)</p>\n<p>Android 默认是顶部(top)，Ios是底部 (bottom)</p>\n<p><a href=\"http://ionicframework.com/docs/api/provider/$ionicConfigProvider/\">官方文档</a></p>\n<p>2.标题android默认靠左边，ios默认居中</p>\n<p>navBar.alignTitle(value)</p>\n<p>Which side of the navBar to align the title. Default center.\n<a href=\"http://ionicframework.com/docs/api/provider/$ionicConfigProvider/\">官方文档</a></p>\n</div>",
                "title": "ionic默认样式android和ios的一些不同",
                "last_reply_at": "2015-08-26T08:11:54.117Z",
                "good": false,
                "top": false,
                "reply_count": 10,
                "visit_count": 2923,
                "create_at": "2015-02-18T08:57:18.639Z",
                "author": {
                    "loginname": "DongHongfei",
                    "avatar_url": "https://avatars.githubusercontent.com/u/5700428?v=3&s=120"
                }
            }, {
                "id": "55dbe3e0628dd6dc21b07e47",
                "author_id": "551b537653c5c8f4148ef893",
                "tab": "share",
                "content": "<div class=\"markdown-text\"><p><strong>Material Design Lite简介</strong></p>\n<p>本文主要介绍Material Design设计语言的HTML/CSS/JS部分实现。\n本文所对应的小练习和示例均可以访问：<a href=\"http://www.hubwiz.com/class/55adae643ad79a1b05dcbf77\">http://www.hubwiz.com/class/55adae643ad79a1b05dcbf77</a>。</p>\n<p><strong>一、设计语言</strong></p>\n<p>github项目地址：<a href=\"https://github.com/google/material-design-lite\">https://github.com/google/material-design-lite</a></p>\n<p><strong>拟真 vs. 扁平</strong></p>\n<p>在iso7之前，Apple采用的是拟真化设计语言，期望通过模拟现实世界的物体，给用户 身临其境的感觉。自metro和ios7开始的扁平化设计语言则相反，它着意去掉冗余的装 饰效果（比如透视、纹理、渐变等等能做出3D效果的元素），让“信息”本身重新作为核心 被凸显出来。</p>\n<p>从下面的对比图中，我们可以体会到两种设计语言的差异：</p>\n<p><img src=\"http://www.hubwiz.com/course/55adae643ad79a1b05dcbf77/img/flat.jpg\" alt=\"flat.jpg\"></p>\n<p><strong>Material Design</strong></p>\n<p>如果说拟真代表设计语言的一个极端，而扁平代表设计语言的另一个极端，那么Material Design则居于两者之间更偏右的位置：</p>\n<p><img src=\"http://www.hubwiz.com/course/55adae643ad79a1b05dcbf77/img/design.png\" alt=\"design.png\"></p>\n<p>在Material Design中，屏幕里看上去平整的一个 App 界面，事实上不同控件之间都拥有 着层级关系。不同控件之间的层级关系会使用阴影作为表示，而阴影的深浅，代表的正是这个 控件在 Z 轴的高度：</p>\n<p><img src=\"http://www.hubwiz.com/course/55adae643ad79a1b05dcbf77/img/material.png\" alt=\"material.png\"></p>\n<p><strong>二、材料/Material</strong></p>\n<p>Material Design 里的材料/Material实际上是一种虚构出来的材料，：厚度无限薄（1dp），面积 无限大，能变换造型，也能按照规律移动 —— 你可以把它当做一张纸（事实上，Material Design 曾一度传说要改名为Quantum Paper - 量子纸）：</p>\n<p><img src=\"http://www.hubwiz.com/course/55adae643ad79a1b05dcbf77/img/material-thick.png\" alt=\"material-thick.png\"></p>\n<p>上面的两幅图示，左边正确地表达了Material Design的设计理念：材料有厚度，但是无差别的1dp 厚。右边的图过于拟真地表现了材料的厚度，因此是错误的。</p>\n<p>虽然每一块 Material 都是扁的，但他们所处的环境，其实是一个 3D 空间，这意味着所有处于 Material Design 设置的这个三维环境里的控件，都拥有 XYZ 三个维度，Z轴垂直于屏幕，使用 阴影表现材料的高度，阴影越重，Z值越高，距离用户越近。在下面的动图中，你可以直观地体会到 阴影的变化对我们感官的影响：</p>\n<p><img src=\"http://www.hubwiz.com/course/55adae643ad79a1b05dcbf77/img/material-elevation.gif\" alt=\"material-elevation\"></p>\n<p>因此，Material Design 并不是单纯的扁平化，它在保留了扁的控件的同时，采用了立体的虚拟空间， 简言之，Material Design的核心是：扁而不平。</p>\n<p><strong>Material Design Lite</strong></p>\n<p>MDL中定义了一组样式类mdl-shadow–Ndp，用于声明材料的阴影，N的有效取值为：2/3/4/6/8/16。</p>\n<p>为元素应用阴影样式类很简单：</p>\n<pre class=\"prettyprint\"><code>&lt;!--为元素声明2dp的阴影--&gt;\n&lt;any class=&quot;mdl-shadow--2dp&quot;&gt;...&lt;/any&gt;\n</code></pre><p><strong>三、色彩/Color</strong></p>\n<p>Material Design中的色彩灵感来自于现代建筑、道路标识、路面标记及运动场等 大胆运用色调、高光和阴影，充满动感的场景。</p>\n<p><img src=\"http://www.hubwiz.com/course/55adae643ad79a1b05dcbf77/img/style_color_introduction.jpg\" alt=\"style_color_introduction.png\"></p>\n<p>Material Design使用19个调色板（red、pink、purple等）用来约束设计中色彩的使用。 在每个调色板中，色调为500的颜色为基准色，其他颜色是基准色在不同色调（50-900, A100-700） 下的表现。</p>\n<p>在右边的示例代码中，我们绘制了Material Design完整的调色板集。每一行是一个调色板， 每一列表示一个色调。你可以将鼠标移动到一个颜色上，查看其RGB值。</p>\n<p><strong>Material Design Lite</strong></p>\n<p>在MDL中，我们可以使用样式类mdl-color–{palette}-{hue}来设置背景色，使用样式类 mdl-color-text–{palette}-{hue}来设置前景色：</p>\n<pre class=\"prettyprint\"><code>&lt;div class=&quot;mdl-color--red mdl-color-text--grey-50&quot;&gt;\nthis is a gray text on red background.\n&lt;/div&gt;\n</code></pre><p><strong>四、色彩运用</strong></p>\n<p>毫无疑问，我们在一个界面中不能无约束的使用色彩，那将使事情变得一团糟。 说好听点，没有约束，就不再是设计，而成为艺术了。</p>\n<p>Material Design给出了一些通常条件下的约束：</p>\n<p><strong>1. 最多用两个调色板</strong></p>\n<p>在一个界面中最多使用两个调色板，从主调色板选择最多三个色调，从辅调色板选择 一个强调色。下面的示例选择indigo调色板中的三个色调（100、500和700），从pink 调色板中选择色调A200作为强调色：</p>\n<p><img src=\"http://www.hubwiz.com/course/55adae643ad79a1b05dcbf77/img/choose-palette.png\" alt=\"choose-palette.png\"></p>\n<p><strong>2. 为文本、图标和分割线应用透明度</strong></p>\n<p>通过为文本设置透明度来表达文本的相对重要性：</p>\n<p><img src=\"http://www.hubwiz.com/course/55adae643ad79a1b05dcbf77/img/text-opacity.png\" alt=\"text-opacity.png\"></p>\n<p>对于深色背景的浅色文字，最重要的文本使用87%的透明度，次重要的文本使用54%的 透明度。提示性文本，例如输入框、标签、被禁止的文字等使用26%的透明度。</p>\n<p>对于浅色背景的深色文字，最重要的文本使用100%的透明度，次重要的文本使用70%的 透明度，其他文本使用30%的透明度。</p>\n<p><strong>3. 工具栏和状态栏</strong></p>\n<p>工具栏和大色块应当使用调色板中色调为500的颜色为基准色。状态栏应当选择 调色板中比基准色略深的色调为700的颜色。</p>\n<p>在下面的示例中，左图的工具栏和右图的大色块，使用了indigo调色板中的色调 500的基准色；而两幅图顶端的状态栏则使用了indigo调色板中的色调700的深色：</p>\n<p><img src=\"http://www.hubwiz.com/course/55adae643ad79a1b05dcbf77/img/toolbar-color.png\" alt=\"toolbar-color.png\"></p>\n<p><strong>4. 使用强调色</strong></p>\n<p>在大色块上绝对不要使用强调色，对动作按钮、开关或滑动条之类的组件应当使用强调色：</p>\n<p><img src=\"http://www.hubwiz.com/course/55adae643ad79a1b05dcbf77/img/accent-color.png\" alt=\"accent-color.png\"></p>\n<p><strong>五、图标/Icon</strong></p>\n<p>Google提供了适用于Material Design的图标字体，我们可以直接在前端样式表中使用<a href=\"/user/font-face\">@font-face</a>引用这些字体：</p>\n<pre class=\"prettyprint\"><code>/*icon.css*/\n[@font-face](/user/font-face) {\nfont-family: &#x27;Material Icons&#x27;;\nfont-style: normal;\nfont-weight: 400;\nsrc: local(&#x27;Material Icons&#x27;), local(&#x27;MaterialIcons-Regular&#x27;),\nurl(material-icons.woff2) format(&#x27;woff2&#x27;),\nurl(material-icons.woff) format(&#x27;woff&#x27;);\n}\n \n.material-icons {\nfont-family: &#x27;Material Icons&#x27;;\nfont-weight: normal;\nfont-style: normal;\nfont-size: 24px;\nline-height: 1;\nletter-spacing: normal;\ntext-transform: none;\ndisplay: inline-block;\nword-wrap: normal;\n-webkit-font-smoothing: antialiased;\n/*text-rendering must be set for local host fonts*/\ntext-rendering: optimizeLegibility;\n-moz-font-feature-settings: &#x27;liga&#x27;;\n-moz-osx-font-smoothing: grayscale;\n}\n</code></pre><p>在页面中要使用图标字体，只需要应用上面定义的material-icons样式：</p>\n<pre class=\"prettyprint\"><code>&lt;i class=&quot;material-icons&quot;&gt;face&lt;/i&gt;\n</code></pre><p>上面的示例创建了一个笑脸图标，face用来指定要显示的图标，也可以 使用其对应的数字编码：</p>\n<pre class=\"prettyprint\"><code>&lt;i class=&quot;material-icons&quot;&gt;&amp;#xE87C;&lt;/i&gt;\n</code></pre><p>具体的图标名和编码，参阅Material Icons官网（需FQ）：<a href=\"https://www.google.com/design/icons/\">https://www.google.com/design/icons/</a></p>\n<p><strong>六、排版/Typography</strong></p>\n<p>Material Design提供了11种规格的文字样式供不同场景下排版使用:</p>\n<p><img src=\"http://www.hubwiz.com/course/55adae643ad79a1b05dcbf77/img/typography.jpg\" alt=\"typography.jpg\"></p>\n<p><strong>Material Design Lite</strong></p>\n<p>在MDL中，使用样式类mdl-typography–{name}声明文本的排版样式：</p>\n<pre class=\"prettyprint\"><code>&lt;h1 class=&quot;mdl-typography--title&quot;&gt;Hello,Material Design&lt;/h1&gt;\n&lt;p class=&quot;mdl-typography--body-2&quot;&gt;this is a demo&lt;/p&gt;\n</code></pre><p><strong>最后，对应的小练习和示例可以访问：<a href=\"http://www.hubwiz.com/class/55adae643ad79a1b05dcbf77\">http://www.hubwiz.com/class/55adae643ad79a1b05dcbf77</a>。</strong></p>\n</div>",
                "title": "Material Design Lite，简洁惊艳的前端工具箱。",
                "last_reply_at": "2015-08-26T02:34:26.386Z",
                "good": false,
                "top": false,
                "reply_count": 6,
                "visit_count": 138,
                "create_at": "2015-08-25T03:41:20.088Z",
                "author": {
                    "loginname": "2596887568",
                    "avatar_url": "https://avatars.githubusercontent.com/u/9349200?v=3&s=120"
                }
            }, {
                "id": "55dc93a1628dd6dc21b07e55",
                "author_id": "55936d72c77703dc583ab537",
                "tab": "share",
                "content": "<div class=\"markdown-text\"><p>我用的 wordpress 的可视化模式写的， 没办法粘贴过来呀。。。。</p>\n<p>下面是链接： <a href=\"http://xyzhang.me/index.php/2015/08/26/how-to-debug-cordova-app-with-ease/\">http://xyzhang.me/index.php/2015/08/26/how-to-debug-cordova-app-with-ease/</a></p>\n<p>希望会对大家有所帮助 :-D</p>\n</div>",
                "title": "分享自己刚写的一个小博客： 如何轻松调试Cordova应用",
                "last_reply_at": "2015-08-25T16:11:13.877Z",
                "good": false,
                "top": false,
                "reply_count": 0,
                "visit_count": 55,
                "create_at": "2015-08-25T16:11:13.877Z",
                "author": {
                    "loginname": "BenBBear",
                    "avatar_url": "https://avatars.githubusercontent.com/u/7659710?v=3&s=120"
                }
            }, {
                "id": "55b58b900c6a8c0e05f82efa",
                "author_id": "55b2da020c6a8c0e05f82ee7",
                "tab": "bb",
                "content": "<div class=\"markdown-text\"><p>求其他的ionic社区地址</p>\n</div>",
                "title": "网站活动量好小，问个东西连个回复都没有，访问量也少的可怜",
                "last_reply_at": "2015-08-25T12:25:42.108Z",
                "good": false,
                "top": false,
                "reply_count": 10,
                "visit_count": 383,
                "create_at": "2015-07-27T01:38:24.688Z",
                "author": {
                    "loginname": "liygheart",
                    "avatar_url": "https://avatars.githubusercontent.com/u/6915570?v=3&s=120"
                }
            }, {
                "id": "55dc3054628dd6dc21b07e4c",
                "author_id": "55af17d50c6a8c0e05f82ebe",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p><img src=\"http://r.ionichina.com/Fm162j1KCbdzKG01ztyOXFB26e0e\" alt=\"QQ图片20150825170710.png\"></p>\n</div>",
                "title": "时区问题？",
                "last_reply_at": "2015-08-25T09:07:32.559Z",
                "good": false,
                "top": false,
                "reply_count": 0,
                "visit_count": 15,
                "create_at": "2015-08-25T09:07:32.559Z",
                "author": {
                    "loginname": "guke1991",
                    "avatar_url": "https://avatars.githubusercontent.com/u/6972503?v=3&s=120"
                }
            }, {
                "id": "55dbdada628dd6dc21b07e46",
                "author_id": "5590e4e946cb5ff7268cef48",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>问题是这样的：\n我现在要获取#www距离顶部的距离,前提是上面有ionnavbar且ioncontent的top值为44px\n理论上距离上边缘应该是44px左右，但是实际上却为0\n谁遇到过没，帮忙解释下他是怎么实现的</p>\n<p>下面是代码\n&lt;ion-view  title=\"标题Demo111\"&gt;\n&lt;ion-content&gt;\n&lt;p id=&quot;www&quot; style=&quot;background:red;height:20px;margin:0 10px&quot;&gt;sdf&lt;/p&gt;\n&lt;/ion-content&gt;\n&lt;/ion-view&gt;</p>\n<p>下面是控制器\nvar node = document.getElementById(‘www’);\nvar offset = $ionicPosition.offset(angular.element(node));\nconsole.log(offset.top)</p>\n<p>结果却是offset.top=0;</p>\n<p>offset的实现方式是getBoundingClientRect.即相对于窗口的距离</p>\n<p><img src=\"http://r.ionichina.com/FnuBQk8y1mkgZIz53z0bc_Y9TVih\" alt=\"QQ图片20150825105722.png\"></p>\n</div>",
                "title": "ioncontent内的偏移量获取偏差的问题",
                "last_reply_at": "2015-08-25T03:02:50.880Z",
                "good": false,
                "top": false,
                "reply_count": 0,
                "visit_count": 39,
                "create_at": "2015-08-25T03:02:50.880Z",
                "author": {
                    "loginname": "yougucaofan",
                    "avatar_url": "https://avatars.githubusercontent.com/u/3615860?v=3&s=120"
                }
            }, {
                "id": "55dac9cf628dd6dc21b07e3b",
                "author_id": "5594e645c77703dc583ab551",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>在某些模块里面看到，如果用户未登录，显示登陆界面，如果已登录，显示已登录界面，这部分在IONIC里面怎么实现？看到有些人代码用下面这个，为什么我的不行的？\n$(“#notLogin”).hide();\n$(“#hasLogon”).show();</p>\n<p>//未登录时显示\n<div>\n&lt;label class=\"item item-input\"&gt;\n&lt;input type=\"email\" placeholder=\"Email\" ng-model=\"data.username\"&gt;\n&lt;/label&gt;\n&lt;label class=\"item item-input\"&gt;\n&lt;input type=\"password\" placeholder=\"Password\" ng-model=\"data.password\"&gt;\n&lt;/label&gt;\n&lt;button class=\"button button-block button-positive\" ng-click=\"login()\"&gt;\n<i></i> login\n&lt;/button&gt;\n</div>\n//已登录时显示\n<div>\n&lt;button class=\"button button-block button-assertive\" ng-click=\"logout()\"&gt;\n<i></i> logout\n&lt;/button&gt;\n</div></p>\n</div>",
                "title": "登陆及注销界面问题",
                "last_reply_at": "2015-08-24T10:17:39.240Z",
                "good": false,
                "top": false,
                "reply_count": 3,
                "visit_count": 87,
                "create_at": "2015-08-24T07:37:51.134Z",
                "author": {
                    "loginname": "maxer028",
                    "avatar_url": "https://avatars.githubusercontent.com/u/9819187?v=3&s=120"
                }
            }, {
                "id": "5530a7b37288e1f23047ede0",
                "author_id": "5514ab05b6421f9166aa5f81",
                "tab": "share",
                "content": "<div class=\"markdown-text\"><h1>简介</h1>\n<pre class=\"prettyprint\"><code>本插件使用友盟统计，简单实现了友盟统计的基本功能，如启动次数等，暂不包含页面统计等。\n</code></pre><h1>使用说明</h1>\n<h3>1.切换目录</h3>\n<p>运行命令行，切换到你想保存的插件的目录，在这里将插件保存至使用D:\\plugins目录下</p>\n<pre class=\"prettyprint\"><code>    cd D:\\plugins\n</code></pre><h3>2.下载插件</h3>\n<pre class=\"prettyprint\"><code>    git clone https://github.com/zxj963577494/cn.zxj.cordova.UmengAnalyticsPlugin.git\n</code></pre><h2>Android</h2>\n<h3>1.配置AppKey和Channel</h3>\n<p>打开插件目录下的plugin.xml文件</p>\n<pre class=\"prettyprint\"><code>    &lt;meta-data android:name=&quot;UMENG_CHANNEL&quot; android:value=&quot;YOUR_CHANNEL&quot;/&gt;\n    &lt;meta-data android:name=&quot;UMENG_APPKEY&quot; android:value=&quot;YOUR_APP_KEY&quot;/&gt;\n</code></pre><pre class=\"prettyprint\"><code>YOUR_CHANNEL：填写渠道名称，如360、wodajia、QQ等，可以自定义渠道，在统计后台可以看到渠道信息\nYOUR_APP_KEY：填写从友盟获取的APPKey\n</code></pre><h3>2.更改包名</h3>\n<p>打开插件目录\\src\\android\\UmengAnalyticsPlugin.java 文件，找到import your.package.name.R，将其替换为：import 你实际项目包的名称.R。</p>\n<h3>3.安装插件</h3>\n<p>使用命令行，切换至ionic所在目录，安装插件</p>\n<pre class=\"prettyprint\"><code>ionic plugin add D:\\plugins\\cn.zxj.cordova.UmengAnalyticsPlugin\n</code></pre><h3>4.配置代码</h3>\n<p>在app.js文件中添加插件所需的代码</p>\n<pre class=\"prettyprint language-javascript\"><code>    .run([&#x27;$ionicPlatform&#x27;, function ($ionicPlatform) {\n            $ionicPlatform.ready(function () {\n                if (window.cordova &amp;&amp; window.cordova.plugins.Keyboard) {\n                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);\n                }\n                if (window.StatusBar) {\n                    // org.apache.cordova.statusbar required\n                    StatusBar.styleDefault();\n                }\n\n                //初始化友盟统计配置\n                window.plugins.umengAnalyticsPlugin.init();\n                //调试模式\n                window.plugins.umengAnalyticsPlugin.setDebugMode(true);\n\n                //注意，这段代码是应用退出前保存统计数据，请在退出应用前调用\n                //window.plugins.umengAnalyticsPlugin.onKillProcess();\n            });\n        }])\n</code></pre><h3>5.参考资料</h3>\n<p><a href=\"http://dev.umeng.com/analytics/android-doc/integration\">友盟统计分析Android文档 </a>\nWindwos Phone 8</p>\n<hr>\n<h3>1.配置AppKey和Channel</h3>\n<p>打开插件目录下的wp\\UmengAnalyticsPlugin.cs文件</p>\n<pre class=\"prettyprint language-c#\"><code>UmengAnalytics.Init(&quot;YOUR_APP_KEY&quot;);\n</code></pre><pre class=\"prettyprint\"><code>或者\n</code></pre><pre class=\"prettyprint language-c#\"><code>UmengAnalytics.Init(&quot;YOUR_APP_KEY&quot;,&quot;YOUR_CHANNEL&quot;);\n</code></pre><pre class=\"prettyprint\"><code>YOUR_APP_KEY：填写从友盟获取的APPKey\nYOUR_CHANNEL：填写渠道名称，默认值为Marketplace，可以自定义渠道，在统计后台可以看到渠道信息\n</code></pre><h3>2.安装插件</h3>\n<p>使用命令行，切换至ionic所在目录，安装插件</p>\n<pre class=\"prettyprint\"><code>ionic plugin add D:\\plugins\\cn.zxj.cordova.UmengAnalyticsPlugin\n</code></pre><h3>3.配置代码</h3>\n<p>在app.js文件中添加插件所需的代码</p>\n<pre class=\"prettyprint language-javascript\"><code>    .run([&#x27;$ionicPlatform&#x27;, function ($ionicPlatform) {\n            $ionicPlatform.ready(function () {\n                if (window.cordova &amp;&amp; window.cordova.plugins.Keyboard) {\n                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);\n                }\n                if (window.StatusBar) {\n                    // org.apache.cordova.statusbar required\n                    StatusBar.styleDefault();\n                }\n\n                //初始化友盟统计\n                window.plugins.umengAnalyticsPlugin.init();\n            });\n        }])\n</code></pre><h3>4.参考资料</h3>\n<p><a href=\"http://dev.umeng.com/analytics/wp-doc/wp8-integration\">友盟统计分析Windows Phone 8 文档 </a></p>\n<h2>IOS</h2>\n<h3>1.配置AppKey和Channel</h3>\n<p>打开插件目录下的ios\\UmengAnalyticsPlugin.m文件</p>\n<pre class=\"prettyprint language-Objective-C\"><code> [MobClick startWithAppkey:@&quot;YOU_APP_KEY&quot; reportPolicy:BATCH   channelId:@&quot;YOUR_CHANNEL&quot;];\n</code></pre><pre class=\"prettyprint\"><code>YOUR_APP_KEY：填写从友盟获取的APPKey\nYOUR_CHANNEL：填写渠道名称，默认为&quot;App Store&quot;渠道，可以自定义渠道，在统计后台可以看到渠道信息\n</code></pre><h3>2.安装插件</h3>\n<p>使用命令行，切换至ionic所在目录，安装插件</p>\n<pre class=\"prettyprint\"><code>ionic plugin add D:\\plugins\\cn.zxj.cordova.UmengAnalyticsPlugin\n</code></pre><h3>3.配置代码</h3>\n<p>在app.js文件中添加插件所需的代码</p>\n<pre class=\"prettyprint language-javascript\"><code>    .run([&#x27;$ionicPlatform&#x27;, function ($ionicPlatform) {\n            $ionicPlatform.ready(function () {\n                if (window.cordova &amp;&amp; window.cordova.plugins.Keyboard) {\n                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);\n                }\n                if (window.StatusBar) {\n                    // org.apache.cordova.statusbar required\n                    StatusBar.styleDefault();\n                }\n\n                //初始化友盟统计\n                window.plugins.umengAnalyticsPlugin.init();\n            });\n        }])\n</code></pre><h3>4.参考资料</h3>\n<p><a href=\"http://dev.umeng.com/analytics/ios-doc/integration\">友盟统计分析IOS文档 </a></p>\n</div>",
                "title": "友盟统计Cordova插件分享",
                "last_reply_at": "2015-08-24T06:20:20.230Z",
                "good": true,
                "top": false,
                "reply_count": 15,
                "visit_count": 1665,
                "create_at": "2015-04-17T06:26:59.653Z",
                "author": {
                    "loginname": "zxj963577494",
                    "avatar_url": "https://avatars.githubusercontent.com/u/6766515?v=3&s=120"
                }
            }, {
                "id": "55d89cfa628dd6dc21b07e1d",
                "author_id": "55950562c77703dc583ab561",
                "tab": "share",
                "content": "<div class=\"markdown-text\"><p>相信很多同学都会遇到跨域问题！\n跨域问题只是在PC端浏览器做调试的时候出现，真正打包成APP在手机上运行是不存在这个问题的。\n那么我们可以通过关闭chrome的安全防护，解决这个问题。</p>\n<ol>\n<li>具体操作如图，右击chrome，属性，在目标结尾处加上   --disable-web-security\n<img src=\"http://r.ionichina.com/FgsZKqZrkXnq-dlVAw1_TOuxLrvr\" alt=\"QQ截图20150823000012.png\"></li>\n</ol>\n<p>2.双击我们创建的Chrome快捷方式，打开Chrome，如图出现“您使用的是不受支持的命令行标记：–disable-web-security。稳定性和安全性会有所下降”，表示你取消了跨域限制了，可以随意跨域调用数据了</p>\n</div>",
                "title": "快速解决跨域问题！",
                "last_reply_at": "2015-08-23T15:16:08.149Z",
                "good": false,
                "top": false,
                "reply_count": 3,
                "visit_count": 132,
                "create_at": "2015-08-22T16:02:02.426Z",
                "author": {
                    "loginname": "zjcboy",
                    "avatar_url": "https://avatars.githubusercontent.com/u/8294751?v=3&s=120"
                }
            }, {
                "id": "55d9b0c3628dd6dc21b07e25",
                "author_id": "55d9afa2628dd6dc21b07e24",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>用的是\n&lt;input type=&quot;file&quot; …&gt;\n如下图，把下图的\ntake photo or video =》变成 拍照或录像\nchoose existing =》选择相册的图片\n感激不敬\n<img src=\"http://r.ionichina.com/FjeNnSewse9wPKm2S-rUlCOYPH8s\" alt=\"1.pic.jpg\"></p>\n</div>",
                "title": "H5的input标签的file类型如何ios下支持多语言。",
                "last_reply_at": "2015-08-23T12:19:34.492Z",
                "good": false,
                "top": false,
                "reply_count": 1,
                "visit_count": 53,
                "create_at": "2015-08-23T11:38:43.769Z",
                "author": {
                    "loginname": "enjory520",
                    "avatar_url": "https://avatars.githubusercontent.com/u/6407210?v=3&s=120"
                }
            }, {
                "id": "55d89020628dd6dc21b07e1b",
                "author_id": "55d81e1a628dd6dc21b07e0f",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>刚开始接触ionic，大家都使用什么工具进行开发，我用的是webstorm\n我使用generator-ionic 生成了代码框架，代码框架如下：\n├── Gruntfile.js            - Configuration of all Grunt tasks\n├── package.json            - Dev dependencies and required Cordova plugins\n├── bower.json              - Lists front-end dependencies\n├── config.xml              - Global Cordova configuration\n├── .gitignore              - Best practices for checking in Cordova apps\n├── resources/              - Scaffolded placeholder Icons and Splashscreens\n│   ├── ios/\n│   ├── android/\n├── app/\n│   ├── index.html          - Main Ionic app entry point\n│   ├── lib/                - Libraries managed by Bower\n│   ├── scripts/            - Custom AngularJS Scripts\n│   ├── styles/             - Stylesheets\n│   ├── templates/          - HTML views\n├── platforms/              - Targeted operating systems\n├── plugins/                - Native plugins\n├── hooks/                  - Cordova lifecycle hooks\n├── merges/                 - Platform specific overrides\n├── coverage/               - Istanbul reports\n├── test/                   - Unit tests\n│   ├── spec/\n├── www/                    - Copied from app/ to be used by Cordova</p>\n<p>但是现在有个问题就是app目录下修改的代码如何能够自动更新到www下，这样开发上效率能够够高些。\n期待大神解答，谢谢</p>\n</div>",
                "title": "小白咨询ionic开发的一些问题：开发工具、代码等等",
                "last_reply_at": "2015-08-23T05:25:08.064Z",
                "good": false,
                "top": false,
                "reply_count": 2,
                "visit_count": 120,
                "create_at": "2015-08-22T15:07:12.578Z",
                "author": {
                    "loginname": "geniuszhe",
                    "avatar_url": "https://avatars.githubusercontent.com/u/10541171?v=3&s=120"
                }
            }, {
                "id": "55af00d30c6a8c0e05f82ebb",
                "author_id": "55920ecec77703dc583ab525",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>用ionic+ng 然后生成的App  用模拟器启动真机时无法访问服务器 我写的方法里面 直接进入error里面了  稍等我截图上代码</p>\n<p><img src=\"http://r.ionichina.com/FthgJRvVDxlclSa2bN1t1agHZV8X\" alt=\"error.png\"></p>\n<p>浏览器可以正常请求到数据  望有遇到过的朋友指点一下 非常感谢啦！</p>\n</div>",
                "title": "ionic 手机端启动无法加载远程数据怎么办",
                "last_reply_at": "2015-08-22T14:23:24.463Z",
                "good": false,
                "top": false,
                "reply_count": 2,
                "visit_count": 292,
                "create_at": "2015-07-22T02:32:51.002Z",
                "author": {
                    "loginname": "zxyuns",
                    "avatar_url": "https://avatars.githubusercontent.com/u/13112161?v=3&s=120"
                }
            }, {
                "id": "55d72e1e628dd6dc21b07e04",
                "author_id": "55bf5f140c1117257f58c7e8",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>用的 fir.im 的打包工具  能安装 但是闪退\nitenuts 生成的 ipa 没法安装\nionic 如何指定  打包的 sdk  版本\n目前 xcode6  ios8.4</p>\n</div>",
                "title": "ionic  打包 ios  闪退 怎么解决",
                "last_reply_at": "2015-08-21T13:56:46.134Z",
                "good": false,
                "top": false,
                "reply_count": 0,
                "visit_count": 76,
                "create_at": "2015-08-21T13:56:46.134Z",
                "author": {
                    "loginname": "bitqiu",
                    "avatar_url": "https://avatars.githubusercontent.com/u/4955106?v=3&s=120"
                }
            }, {
                "id": "55d41437628dd6dc21b07db1",
                "author_id": "55cbf7d60c1117257f58c86e",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>在用tab进行切换时，tab标签中有个href属性，写路由的地址，在controller中配置路由信息，在跳转到该模板的时候，如何初始化数据，使得每次跳转获得的数据都是最新的。谢谢！</p>\n</div>",
                "title": "关于页面切换时数据初始化",
                "last_reply_at": "2015-08-21T08:12:03.939Z",
                "good": false,
                "top": false,
                "reply_count": 3,
                "visit_count": 147,
                "create_at": "2015-08-19T05:29:27.596Z",
                "author": {
                    "loginname": "imkiven",
                    "avatar_url": "https://avatars.githubusercontent.com/u/3353728?v=3&s=120"
                }
            }, {
                "id": "55d441e4628dd6dc21b07db8",
                "author_id": "55554fe8afadfcef27d9cb69",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>视图中有一model，通过定时任务去赋值，比如每隔1秒加1，</p>\n<p>如何保证页面中的值及时更新过来？</p>\n</div>",
                "title": "如何保证定时任务及时刷新视图中的值？",
                "last_reply_at": "2015-08-21T07:20:26.064Z",
                "good": false,
                "top": false,
                "reply_count": 9,
                "visit_count": 118,
                "create_at": "2015-08-19T08:44:20.275Z",
                "author": {
                    "loginname": "Thomsen",
                    "avatar_url": "https://avatars.githubusercontent.com/u/963095?v=3&s=120"
                }
            }, {
                "id": "55d2d55f628dd6dc21b07d9b",
                "author_id": "55554fe8afadfcef27d9cb69",
                "tab": "share",
                "content": "<div class=\"markdown-text\"><p>上传附件</p>\n</div>",
                "title": "ionic怎样上传附件",
                "last_reply_at": "2015-08-20T14:04:32.414Z",
                "good": false,
                "top": false,
                "reply_count": 6,
                "visit_count": 196,
                "create_at": "2015-08-18T06:49:03.763Z",
                "author": {
                    "loginname": "Thomsen",
                    "avatar_url": "https://avatars.githubusercontent.com/u/963095?v=3&s=120"
                }
            }, {
                "id": "550e6c873e61bd2165e3ef68",
                "author_id": "550e6b813e61bd2165e3ef67",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>我看了论坛里面的那篇跨域的文章，但是对于我的需求不是很符合，我需要的是动态的代理，也就是说我具体要访问哪个API地址是不确定的，是要用户输入的，然后根据用户输入的地址去请求。所以那篇文章中的第一种方法肯定不合适，第二种方法不知道行不行，但是看上去好像很麻烦的样子，我试都没打算试一下。。。\n比较理想的是调用<code>cordova</code>的方法，用<code>cordova</code>去做代理，但是现在好像没有？</p>\n</div>",
                "title": "关于ionic跨域问题",
                "last_reply_at": "2015-08-20T04:53:30.106Z",
                "good": false,
                "top": false,
                "reply_count": 12,
                "visit_count": 1433,
                "create_at": "2015-03-22T07:17:27.914Z",
                "author": {
                    "loginname": "erguotou520",
                    "avatar_url": "https://avatars.githubusercontent.com/u/7945757?v=3&s=120"
                }
            }, {
                "id": "55b6ef4abed4df00218f0e07",
                "author_id": "55b6ee8bbed4df00218f0e06",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>求大神告诉我现在的ionic版本能不能开发windows phone 8的app</p>\n</div>",
                "title": "ionic开发windows phone 8的问题",
                "last_reply_at": "2015-08-20T02:32:05.744Z",
                "good": false,
                "top": false,
                "reply_count": 2,
                "visit_count": 236,
                "create_at": "2015-07-28T02:56:10.654Z",
                "author": {
                    "loginname": "zqofnewbie",
                    "avatar_url": "https://avatars.githubusercontent.com/u/13531051?v=3&s=120"
                }
            }, {
                "id": "55d2bff3628dd6dc21b07d95",
                "author_id": "55d2bf2e628dd6dc21b07d94",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>如题  现在项目搭建好了  在电脑上的浏览器运行能展示出来高德地图出来,但是打包成apk后完全没有反应</p>\n</div>",
                "title": "ionic 怎么展示高德地图",
                "last_reply_at": "2015-08-20T02:24:30.048Z",
                "good": false,
                "top": false,
                "reply_count": 5,
                "visit_count": 180,
                "create_at": "2015-08-18T05:17:39.681Z",
                "author": {
                    "loginname": "SubDong",
                    "avatar_url": "https://avatars.githubusercontent.com/u/11551646?v=3&s=120"
                }
            }, {
                "id": "55c80b6a0c1117257f58c84a",
                "author_id": "556e68b96f95cfe009e92b1c",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>我在IOS里面设定了个版本号，每次运行服务器上对比，然后判断是否需要更新，，android版直接下载，，ios需要天转到itunes上得网址上， 我用js 在app无法打开。。这个跳转怎么实现？求高人指点</p>\n</div>",
                "title": "ios里面检查更新，怎么跳转到itunes上？",
                "last_reply_at": "2015-08-19T13:58:19.531Z",
                "good": false,
                "top": false,
                "reply_count": 3,
                "visit_count": 195,
                "create_at": "2015-08-10T02:24:42.367Z",
                "author": {
                    "loginname": "shisan",
                    "avatar_url": "https://avatars.githubusercontent.com/u/4010390?v=3&s=120"
                }
            }, {
                "id": "5514b539b6421f9166aa5f88",
                "author_id": "5514ab05b6421f9166aa5f81",
                "tab": "share",
                "content": "<div class=\"markdown-text\"><p>一、准备\nToast插件\n插件地址：cordova plugin add <a href=\"https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git\">https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git</a>\n二：代码</p>\n<pre class=\"prettyprint language-js\\n\"><code>.run(function ($ionicPlatform, $rootScope, $location, $timeout, $ionicHistory, $cordovaToast) {\n        $ionicPlatform.ready(function ($rootScope) {\n            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard\n            // for form inputs)\n            if (window.cordova &amp;&amp; window.cordova.plugins.Keyboard) {\n                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);\n            }\n            if (window.StatusBar) {\n                // org.apache.cordova.statusbar required\n                StatusBar.styleDefault();\n            }\n        });\n        //双击退出\n        $ionicPlatform.registerBackButtonAction(function (e) {\n            //判断处于哪个页面时双击退出\n            if ($location.path() == &#x27;/tab/news&#x27;) {\n                if ($rootScope.backButtonPressedOnceToExit) {\n                    ionic.Platform.exitApp();\n                } else {\n                    $rootScope.backButtonPressedOnceToExit = true;\n                    $cordovaToast.showShortTop(&#x27;再按一次退出系统&#x27;);\n                    setTimeout(function () {\n                        $rootScope.backButtonPressedOnceToExit = false;\n                    }, 2000);\n                }\n            }\n            else if ($ionicHistory.backView()) {\n                $ionicHistory.goBack();\n            } else {\n                $rootScope.backButtonPressedOnceToExit = true;\n                $cordovaToast.showShortTop(&#x27;再按一次退出系统&#x27;);\n                setTimeout(function () {\n                    $rootScope.backButtonPressedOnceToExit = false;\n                }, 2000);\n            }\n            e.preventDefault();\n            return false;\n        }, 101);\n    })</code></pre></div>",
                "title": "Ionic 实现双击返回键退出功能",
                "last_reply_at": "2015-08-18T06:21:44.587Z",
                "good": false,
                "top": false,
                "reply_count": 13,
                "visit_count": 2427,
                "create_at": "2015-03-27T01:41:13.775Z",
                "author": {
                    "loginname": "zxj963577494",
                    "avatar_url": "https://avatars.githubusercontent.com/u/6766515?v=3&s=120"
                }
            }, {
                "id": "55d2b682628dd6dc21b07d93",
                "author_id": "55d2b4fa628dd6dc21b07d92",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>在做一个webapp项目，有许多的视图，有的视图通过iframe加载商品列表，商品详情，有的加载购物车。\n发现各个视图嵌入的iframe(指向同一个domain)之间的<strong>cookie是独立的，表现为session是独立的</strong>。</p>\n<p>尝试在http头部的response headers里加入了：\nP3P:CP=&quot;CURa ADMa DEVa PSAo PSDo OUR BUS UNI PUR INT DEM STA PRE COM NAV OTC NOI DSP COR&quot;\n也没能解决这个问题。</p>\n</div>",
                "title": "ionic多页面嵌入iframe之间的cookie共享怎么解决？",
                "last_reply_at": "2015-08-18T04:37:22.628Z",
                "good": false,
                "top": false,
                "reply_count": 0,
                "visit_count": 132,
                "create_at": "2015-08-18T04:37:22.628Z",
                "author": {
                    "loginname": "kiiio",
                    "avatar_url": "https://avatars.githubusercontent.com/u/12961132?v=3&s=120"
                }
            }, {
                "id": "55d13a55628dd6dc21b07d6a",
                "author_id": "55d13a17628dd6dc21b07d69",
                "tab": "share",
                "content": "<div class=\"markdown-text\"><p><a href=\"http://teahour.fm/2015/08/16/vuejs-creator-evan-you.html\">Teahour.fm 官网</a></p>\n<p>如果你还在纠结前端技术的选型， 那么你真的可以听一听这一期，相信小右同学会给你一些不同的视野。</p>\n<p>本期由 <a href=\"http://weibo.com/poshboytl\">Terry</a> 和 <a href=\"http://weibo.com/rollrollyuan\">袁滚滚</a> 一起主持， 邀请到了 <a href=\"http://vuejs.org/\">Vue.js</a> 的作者 <a href=\"http://weibo.com/arttechdesign\">尤小右</a>, 聊聊前端框架开发背后的故事。</p>\n<p>这一期我们将聊到非常多前端框架和技术，大家也可以听到小右同学对各种前端框架和技术的点评，如果你正愁如何选择你的前端工具栈, 我相信这一期将会对你有非常大的帮助。(涉及到的技术包含 Knockout, BackboneJS, Spine, Marionette, AngularJS, Ember, Ractive.js, React, Flux, webpack, Karma， Jasmine 等等等等)</p>\n<p>涉及到的内容如下：</p>\n<ul>\n<li><a href=\"https://www.meteor.com/\">Meteor</a></li>\n<li><a href=\"http://www.newschool.edu/parsons/\">Parsons School of Design</a></li>\n<li><a href=\"http://clojure.org/\">Clojure</a></li>\n<li><a href=\"http://www.colgate.edu/\">Colgate University</a></li>\n<li><a href=\"https://en.wikipedia.org/wiki/ActionScript\">ActionScript</a></li>\n<li><a href=\"http://thesystemis.com/\">Zachary Lieberman</a></li>\n<li><a href=\"http://www.openframeworks.cc/\">openframeworks</a></li>\n<li><a href=\"http://threejs.org/\">three.js</a></li>\n<li><a href=\"http://www.thefwa.com/profile/google-creative-lab\">Google Creative Lab</a></li>\n<li><a href=\"https://github.com/dataarts\">Google Data Arts Team</a></li>\n<li><a href=\"http://www.aaronkoblin.com/\">Aaron Koblin</a></li>\n<li><a href=\"https://www.chromeexperiments.com/\">Chrome Experiments</a></li>\n<li><a href=\"https://en.wikipedia.org/wiki/Dependency_injection\">Dependency injection</a></li>\n<li><a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty\">Object.defineProperty()</a></li>\n<li><a href=\"http://knockoutjs.com/\">Knockout</a></li>\n<li><a href=\"http://backbonejs.org/\">Backbone.js</a></li>\n<li><a href=\"http://spinejs.com/\">Spine</a></li>\n<li><a href=\"https://angularjs.org/\">AngularJS</a></li>\n<li><a href=\"http://marionettejs.com/\">Marionette</a></li>\n<li><a href=\"https://en.wikipedia.org/wiki/Model_View_ViewModel\">MVVM</a></li>\n<li><a href=\"http://emberjs.com/blog/2015/05/05/glimmer-merging.html\">Glimmer</a></li>\n<li><a href=\"http://www.ractivejs.org/\">Ractive</a></li>\n<li><a href=\"http://facebook.github.io/react/\">React</a></li>\n<li><a href=\"https://facebook.github.io/react/docs/glossary.html\">React Virtual DOM</a></li>\n<li><a href=\"https://facebook.github.io/react/docs/advanced-performance.html\">shouldComponentUpdate (React)</a></li>\n<li><a href=\"https://facebook.github.io/flux/\">Flux</a></li>\n<li><a href=\"https://facebook.github.io/immutable-js/\">Immutable JS</a></li>\n<li><a href=\"http://wiki.commonjs.org/wiki/Modules/1.1\">CommonJS</a></li>\n<li><a href=\"http://substack.net/\">substack</a></li>\n<li><a href=\"http://browserify.org/\">Browserify</a></li>\n<li><a href=\"http://webpack.github.io/\">webpack</a></li>\n<li><a href=\"https://babeljs.io/\">Babel</a></li>\n<li><a href=\"http://coffeescript.org/\">CoffeeScript</a></li>\n<li><a href=\"http://www.typescriptlang.org/\">TypeScript</a></li>\n<li><a href=\"http://jasmine.github.io/\">Jasmine</a></li>\n<li><a href=\"http://mochajs.org/\">Mocha</a></li>\n<li><a href=\"http://karma-runner.github.io/0.13/index.html\">Karma</a></li>\n<li><a href=\"http://www.seleniumhq.org/\">Selenium</a></li>\n<li><a href=\"http://casperjs.org/\">CasperJS</a></li>\n<li><a href=\"http://phantomjs.org/\">PhantomJS</a></li>\n<li><a href=\"http://nightwatchjs.org/\">Nightwatch.js</a></li>\n<li><a href=\"https://saucelabs.com/\">Sauce Labs</a></li>\n<li><a href=\"https://www.browserstack.com/\">BrowserStack</a></li>\n<li><a href=\"http://dailyjs.com/\">DailyJS</a></li>\n<li><a href=\"http://laravel.com/\">Laravel</a></li>\n<li><a href=\"https://laracasts.com/\">Laracasts</a></li>\n<li><a href=\"https://processing.org/\">Processing</a></li>\n<li><a href=\"http://tastejs.com/\">TasteJS</a></li>\n<li><a href=\"https://avalonjs.github.io/\">Avalon</a></li>\n<li><a href=\"http://www.zhihu.com/people/evanyou\">尤小右 知乎</a></li>\n<li><a href=\"http://facebook.github.io/relay/\">Relay</a></li>\n<li><a href=\"https://github.com/tildeio/ember-cli-fastboot\">Ember FastBoot</a></li>\n<li><a href=\"https://github.com/mhart/react-server-example\">react-server-example</a></li>\n<li><a href=\"http://gfxiong.com/\">功夫熊</a></li>\n<li><a href=\"https://book.douban.com/subject/26359758/\">硬派健身</a></li>\n<li><a href=\"http://zhuanlan.zhihu.com/oh-hard/19675148\">硬派健身 － 知乎专栏</a></li>\n<li><a href=\"https://python-china.org/\">Python China</a></li>\n<li><a href=\"https://github.com/zerqu/qingcheng\">青城 Theme</a></li>\n</ul>\n<p>小右口误更正：</p>\n<p>小右到达美国的时间是 05 年</p>\n<p>Typescript 是有类型推导的</p>\n</div>",
                "title": "Teahour.fm 播客 78 期，和 Vue.JS 框架的作者聊聊前端框架开发背后的故事",
                "last_reply_at": "2015-08-18T02:42:02.932Z",
                "good": false,
                "top": false,
                "reply_count": 1,
                "visit_count": 136,
                "create_at": "2015-08-17T01:35:17.042Z",
                "author": {
                    "loginname": "poshboytl",
                    "avatar_url": "https://avatars.githubusercontent.com/u/5960?v=3&s=120"
                }
            }, {
                "id": "55cd725d0c1117257f58c88e",
                "author_id": "55cd6d900c1117257f58c88d",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>就是可以实现全屏 暂停播放 等功能\n就像是在原生的那种感觉\n如果不可以的话 有哪些解决方案呢</p>\n</div>",
                "title": "ionic 是否能够实现类似优酷的那种播放器",
                "last_reply_at": "2015-08-18T01:37:15.584Z",
                "good": false,
                "top": false,
                "reply_count": 1,
                "visit_count": 181,
                "create_at": "2015-08-14T04:45:17.497Z",
                "author": {
                    "loginname": "jimmyyao88",
                    "avatar_url": "https://avatars.githubusercontent.com/u/7344857?v=3&s=120"
                }
            }, {
                "id": "55d18fff628dd6dc21b07d75",
                "author_id": "55363b999ee76e05064d4b09",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>ionic 应用中除了input中文字可以复制粘贴， 其他如<p>标签中的文字都不能长按复制和粘贴\n这个问题怎么解决？</p>\n</div>",
                "title": "求助 ionic 应用中的文字不能长按复制、粘贴",
                "last_reply_at": "2015-08-18T01:35:13.352Z",
                "good": false,
                "top": false,
                "reply_count": 2,
                "visit_count": 132,
                "create_at": "2015-08-17T07:40:47.189Z",
                "author": {
                    "loginname": "zachary931114",
                    "avatar_url": "https://avatars.githubusercontent.com/u/12049427?v=3&s=120"
                }
            }, {
                "id": "55435960fc91e0dc3d8911c1",
                "author_id": "5540497ffc91e0dc3d891185",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>各位好，我建了一个ionic ANDROID项目，其默认的APP图标是一个ionic的图标\n我想使用自己的，就用了ionic resources指令在项目的resources目录下生成了自己的图标，\n并且它也修改了android项目下config.xml文件，把图标都改到了新的图标。\n项目设置截图如下：</p>\n<p><img src=\"http://r.ionichina.com/Fg693crfMnuJ7x99obxLluIkYdYz\" alt=\"无标题.png\"></p>\n<p>奇怪的splash生效了，换成了新的splash。但应用图标却一直还是老的ionic图标\n(drawable的几个目录下的icon.png文件已经是新的icon图标了。)\n请帮忙看一下,图标为什么没有更新呢？</p>\n</div>",
                "title": "ionic项目app图标修改无效的问题",
                "last_reply_at": "2015-08-17T18:47:43.093Z",
                "good": false,
                "top": false,
                "reply_count": 6,
                "visit_count": 435,
                "create_at": "2015-05-01T10:45:52.487Z",
                "author": {
                    "loginname": "r123qq",
                    "avatar_url": "https://avatars.githubusercontent.com/u/12163040?v=3&s=120"
                }
            }, {
                "id": "55cc29cf0c1117257f58c875",
                "author_id": "5540497ffc91e0dc3d891185",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>就是第一次使用APP时，一层半透明的蒙版遮在界面上面，对软件的使用做一些引导性的说明。\n在IONIC中怎么做？ 有没有高手做过？能给点说明或思路，多谢。</p>\n</div>",
                "title": "ionic怎么用蒙版效果做新手引导界面？",
                "last_reply_at": "2015-08-17T03:41:01.416Z",
                "good": false,
                "top": false,
                "reply_count": 1,
                "visit_count": 245,
                "create_at": "2015-08-13T05:23:27.703Z",
                "author": {
                    "loginname": "r123qq",
                    "avatar_url": "https://avatars.githubusercontent.com/u/12163040?v=3&s=120"
                }
            }, {
                "id": "55cdb2cd0c1117257f58c896",
                "author_id": "55cdb24c0c1117257f58c895",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>这个ionic的程序最后发布是apk吗？另外开发环境必须是在linux下吗？windows下的有吗？</p>\n</div>",
                "title": "这个ionic的程序最后发布是apk吗？",
                "last_reply_at": "2015-08-14T09:31:04.558Z",
                "good": false,
                "top": false,
                "reply_count": 1,
                "visit_count": 174,
                "create_at": "2015-08-14T09:20:13.309Z",
                "author": {
                    "loginname": "iamdiffuser",
                    "avatar_url": "https://avatars.githubusercontent.com/u/5362228?v=3&s=120"
                }
            }, {
                "id": "55c1e3a70c1117257f58c80d",
                "author_id": "55af17d50c6a8c0e05f82ebe",
                "tab": "share",
                "content": "<div class=\"markdown-text\"></div>",
                "title": "用百度js的地图定位，打包安装在手机上错误提示：【object PositionError】然后是超时",
                "last_reply_at": "2015-08-14T08:07:41.024Z",
                "good": false,
                "top": false,
                "reply_count": 3,
                "visit_count": 263,
                "create_at": "2015-08-05T10:21:27.826Z",
                "author": {
                    "loginname": "guke1991",
                    "avatar_url": "https://avatars.githubusercontent.com/u/6972503?v=3&s=120"
                }
            }, {
                "id": "55bb38f40c1117257f58c7c6",
                "author_id": "55bae39a0c1117257f58c7bc",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>求解。。</p>\n</div>",
                "title": "小白求问：ion-tabs问题，比如进入商品明细界面的时候 ion-tabs怎样隐藏？",
                "last_reply_at": "2015-08-14T07:37:38.584Z",
                "good": false,
                "top": false,
                "reply_count": 4,
                "visit_count": 433,
                "create_at": "2015-07-31T08:59:32.317Z",
                "author": {
                    "loginname": "touch28",
                    "avatar_url": "https://avatars.githubusercontent.com/u/12858047?v=3&s=120"
                }
            }, {
                "id": "55cd3f5e0c1117257f58c87f",
                "author_id": "557ab41104cf60e57c40ad87",
                "tab": "share",
                "content": "<div class=\"markdown-text\"><p>请参见：<a href=\"http://www.oschina.net/news/65185/ionic-1-1-0\">http://www.oschina.net/news/65185/ionic-1-1-0</a></p>\n<p>其中，这还是比较实用的：\ntabs: adjust tabs and content when hiding the nav bar\nangular: Upgrade to Angular 1.4</p>\n</div>",
                "title": "ionic 1.1.0 发布啦",
                "last_reply_at": "2015-08-14T03:56:00.222Z",
                "good": false,
                "top": false,
                "reply_count": 3,
                "visit_count": 277,
                "create_at": "2015-08-14T01:07:42.428Z",
                "author": {
                    "loginname": "zcgly",
                    "avatar_url": "https://avatars.githubusercontent.com/u/12858975?v=3&s=120"
                }
            }, {
                "id": "55cc2c390c1117257f58c876",
                "author_id": "55cbf7d60c1117257f58c86e",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>ngcordova插件调试可以在浏览器中调试么？\n在使用file插件的时候，\n.controller('signinController’, function($scope, $cordovaFile){\n$scope.initFile = function () {\ndocument.addEventListener('deviceready’, function () {\nconsole.log(“===================”);\nconsole.log(cordova.file.dataDirectory);\n// path, fileName\n$cordovaFile.readAsText(cordova.file.dataDirectory, $scope.inputs.readFile).then(function (success) {\n$scope.readFileResult = 'success ' + JSON.stringify(success);\n}, function (error) {\n$scope.readFileResult = 'error ' + JSON.stringify(error);\n});\n});\n};\n});</p>\n<p>console.log(“===================”);这一行没有进入，始终没法调用。</p>\n</div>",
                "title": "ngcordova插件调试问题",
                "last_reply_at": "2015-08-13T18:14:53.757Z",
                "good": false,
                "top": false,
                "reply_count": 1,
                "visit_count": 155,
                "create_at": "2015-08-13T05:33:45.951Z",
                "author": {
                    "loginname": "imkiven",
                    "avatar_url": "https://avatars.githubusercontent.com/u/3353728?v=3&s=120"
                }
            }, {
                "id": "55cca3620c1117257f58c87a",
                "author_id": "55cbf7d60c1117257f58c86e",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>E:\\Workspaces\\Android\\CNCC&gt;ionic build android\nRunning command: D:\\nodejs\\node.exe E:\\Workspaces\\Android\\CNCC\\hooks\\after_prepare\\010_add_platform_class.js E:\\Workspaces\\Android\\CNCC\nadd to body class: platform-android\nRunning command: cmd &quot;/s /c “E:\\Workspaces\\Android\\CNCC\\platforms\\android\\cordova\\build.bat&quot;”\nANDROID_HOME=D:\\android22\\sdk\nJAVA_HOME=D:\\Java\\jdk1.7.0_06\nRunning: E:\\Workspaces\\Android\\CNCC\\platforms\\android\\gradlew cdvBuildDebug -b E:\\Workspaces\\Android\\CNCC\\platforms\\android\\build.gradle -Dorg.gradle.daemon=true</p>\n<p>FAILURE: Build failed with an exception.</p>\n<ul>\n<li>What went wrong:\nUnable to start the daemon process.\nThis problem might be caused by incorrect configuration of the daemon.\nFor example, an unrecognized jvm option is used.\nPlease refer to the user guide chapter on the daemon at <a href=\"http://gradle.org/docs/2.2.1/userguide/gradle_daemon.html\">http://gradle.org/docs/2.2.1/userguide/gradle_daemon.html</a>\nPlease read the following process output to find out more:</li>\n</ul>\n<hr>\n<p>Error occurred during initialization of VM\nCould not reserve enough space for object heap\nError: Could not create the Java Virtual Machine.\nError: A fatal exception has occurred. Program will exit.</p>\n<ul>\n<li>Try:\nRun with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.</li>\n</ul>\n<p>E:\\Workspaces\\Android\\CNCC\\platforms\\android\\cordova\\node_modules\\q\\q.js:126\nthrow e;\n^\nError code 1 for command: cmd with args: /s /c “E:\\Workspaces\\Android\\CNCC\\platforms\\android\\gradlew cdvBuildDebug -b E:\\Workspaces\\Android\\CNCC\\platforms\\android\\build.gradle -Dorg.gradle.daemon=true”\nERROR building one of the platforms: Error: cmd: Command failed with exit code 1\nYou may not have the required environment or OS to build this project\nError: cmd: Command failed with exit code 1\nat ChildProcess.whenDone (C:\\Users\\JinWu\\AppData\\Roaming\\npm\\node_modules\\cordova\\node_modules\\cordova-lib\\src\\cordova\\superspawn.js:134:23)\nat ChildProcess.emit (events.js:110:17)\nat maybeClose (child_process.js:1015:16)\nat Process.ChildProcess._handle.onexit (child_process.js:1087:5)</p>\n<pre class=\"prettyprint\"><code>求解！谢谢</code></pre></div>",
                "title": "ionic build android 出错",
                "last_reply_at": "2015-08-13T14:02:10.630Z",
                "good": false,
                "top": false,
                "reply_count": 0,
                "visit_count": 156,
                "create_at": "2015-08-13T14:02:10.630Z",
                "author": {
                    "loginname": "imkiven",
                    "avatar_url": "https://avatars.githubusercontent.com/u/3353728?v=3&s=120"
                }
            }, {
                "id": "55cbe9090c1117257f58c86d",
                "author_id": "55c47e500c1117257f58c824",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>在浏览器中调试，模板中采用相对路径如<img src>这样显示完全没有问题，但到了真机之后图片是绝对路径的话就没有问题，但如果是相对路径的话，就显示不出来，据我所知道，模板文件夹相对路径正常情况下是可以显示的，不知道这里为什么不可以？而且通过a标签跳转到相对路径的情况在真机上也是无法作用的。请问有什么解决的有效办法？</p>\n</div>",
                "title": "ionic模板中真机下相对路径的问题",
                "last_reply_at": "2015-08-13T08:02:20.230Z",
                "good": false,
                "top": false,
                "reply_count": 2,
                "visit_count": 133,
                "create_at": "2015-08-13T00:47:05.279Z",
                "author": {
                    "loginname": "moxiaobei2",
                    "avatar_url": "https://avatars.githubusercontent.com/u/11829981?v=3&s=120"
                }
            }, {
                "id": "55cbf82c0c1117257f58c86f",
                "author_id": "55cbf7d60c1117257f58c86e",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>E:\\Workspaces\\Android\\CNCC&gt;cordova plugin add <a href=\"https://github.com/litehelpers/Cordova-sqlite-storage.git\">https://github.com/litehelpers/Cordova-sqlite-storage.git</a>\nFetching plugin “<a href=\"https://github.com/litehelpers/Cordova-sqlite-storage.git\">https://github.com/litehelpers/Cordova-sqlite-storage.git</a>” via git clone\nRepository “<a href=\"https://github.com/litehelpers/Cordova-sqlite-storage.git\">https://github.com/litehelpers/Cordova-sqlite-storage.git</a>” checked out to git ref &quot;master&quot;.\nshell.js: internal error\nError: EXDEV, cross-device link not permitted ‘C:\\Users\\JinWu\\AppData\\Local\\Temp\\git\\1439429125884\\AUTHORS.md’\nat Error (native)\nat Object.fs.renameSync (fs.js:636:18)\nat C:\\Users\\JinWu\\AppData\\Roaming\\npm\\node_modules\\cordova\\node_modules\\cordova-lib\\node_modules\\shelljs\\src\\mv.js:77:8\nat Array.forEach (native)\nat Object._mv (C:\\Users\\JinWu\\AppData\\Roaming\\npm\\node_modules\\cordova\\node_modules\\cordova-lib\\node_modules\\shelljs\\src\\mv.js:53:11)\nat Object.mv (C:\\Users\\JinWu\\AppData\\Roaming\\npm\\node_modules\\cordova\\node_modules\\cordova-lib\\node_modules\\shelljs\\src\\common.js:186:23)\nat C:\\Users\\JinWu\\AppData\\Roaming\\npm\\node_modules\\cordova\\node_modules\\cordova-lib\\src\\plugman\\util\\plugins.js:53:19\nat _fulfilled (C:\\Users\\JinWu\\AppData\\Roaming\\npm\\node_modules\\cordova\\node_modules\\q\\q.js:787:54)\nat self.promiseDispatch.done (C:\\Users\\JinWu\\AppData\\Roaming\\npm\\node_modules\\cordova\\node_modules\\q\\q.js:816:30)\nat Promise.promise.promiseDispatch (C:\\Users\\JinWu\\AppData\\Roaming\\npm\\node_modules\\cordova\\node_modules\\q\\q.js:749:13)</p>\n<pre class=\"prettyprint\"><code>在线安装会出现这个问题，那能不能手动安装？！</code></pre></div>",
                "title": "ngcordova插件安装问题",
                "last_reply_at": "2015-08-13T04:17:51.783Z",
                "good": false,
                "top": false,
                "reply_count": 2,
                "visit_count": 151,
                "create_at": "2015-08-13T01:51:40.182Z",
                "author": {
                    "loginname": "imkiven",
                    "avatar_url": "https://avatars.githubusercontent.com/u/3353728?v=3&s=120"
                }
            }, {
                "id": "55a4736f5c565f9172c8b593",
                "author_id": "55936d72c77703dc583ab537",
                "tab": "share",
                "content": "<div class=\"markdown-text\"><h1>cordova-plugin-leanpush</h1>\n<p>Cordova plugin for <a href=\"https://leancloud.cn\">LeanCloud</a> push notification</p>\n<h2>Installation</h2>\n<ul>\n<li>Fetch from cordova npm</li>\n</ul>\n<pre class=\"prettyprint language-shell\"><code> cordova plugin add cordova-plugin-leanpush  --variable LEAN_APP_ID=&lt;YOUR_LEANCOULD_APP_ID&gt; --variable LEAN_APP_KEY=&lt;YOUR_LEANCOULD_APP_KEY&gt;\n</code></pre><ul>\n<li>Add this to your <code>gulpfile.js</code></li>\n</ul>\n<pre class=\"prettyprint language-js\"><code>gulp.task(&#x27;lpush-install&#x27;, function(done){\n    require(&#x27;./plugins/cordova-plugin-leanpush/lpush-installer.js&#x27;)(__dirname, done);\n});\n</code></pre><ul>\n<li>\n<p><code>npm install --save-dev xml2js &amp;&amp; npm install</code></p>\n</li>\n<li>\n<p>Then exectue this gulp task by running <code>gulp lpush-install</code> in shell.</p>\n</li>\n<li>\n<p>Done.</p>\n</li>\n</ul>\n<h3>Known Android Build Issue</h3>\n<p>See <a href>Attention/Android Build Issue</a></p>\n<h2>Usage</h2>\n<h3>Init</h3>\n<p>Put the initialization Code in your “deviceReady” Code Block (like $ionicPlatform.ready)</p>\n<pre class=\"prettyprint language-js\"><code>window.LeanPush.init();\n</code></pre>\n<h3>Push Related API</h3>\n<p>Coresponding to the <a href=\"https://leancloud.cn/docs/ios_push_guide.html\">Leancloud Push documentation</a>.</p>\n<pre class=\"prettyprint language-js\"><code>\nwindow.LeanPush.subscribe(channel, success, error)  // 订阅频道\nwindow.LeanPush.unsubscribe(channel, success, error) //退订频道\nwindow.LeanPush.clearSubscription(success, error) //退订所有频道\n\nwindow.LeanPush.getInstallation(success, error)  //Installation 表示一个允许推送的设备的唯一标示, 对应数据管理平台中的 _Installation 表\n// success callback:\n// function(data){\n//   data = {\n//        &#x27;deviceType&#x27;:&#x27;android&#x27; or &#x27;ios&#x27;,\n//        &#x27;installationId&#x27;: &#x27;android installation id&#x27; or &#x27;ios deviceToken&#x27;\n//        &#x27;deviceToken&#x27;:    &#x27;ios deviceToken&#x27; or &#x27;android installation id&#x27;\n//   }\n// }\n\n\nwindow.LeanPush.onNotificationReceived(callback) // 一个notification到来的回调函数\n// callback:\n// function(notice){\n//  notice = {\n//     &#x27;prevAppState&#x27;: &#x27;background&#x27; or &#x27;foreground&#x27; or &#x27;closed&#x27;,\n\n//      push到来的时候上一个App状态:\n//      android只有 &#x27;background&#x27; 和 &#x27;closed&#x27;, 因为android所有push都要点击\n//      ios都有，因为ios如果app在前台，系统推送的alert不会出现\n//      用户没有任何操作，app就自动执行notification的函数不好, 可以加个判断\n\n//     &#x27;alert&#x27;:&#x27;Notice Text&#x27;,\n//     &#x27;file_url&#x27;:&#x27;Push File&#x27;,\n//     &#x27;key&#x27;:&#x27;value&#x27;   if you send JSON Type Push, they will map to here.\n//   }\n// }\n    \n\n$rootScope.$on(&#x27;leancloud:notificationReceived&#x27;, callback) // 如果你用了angular， 一个notification会在scope上broadcast这个event\n// callback:\n// function(event, notice){\n//    // event is from angular, notice is same above \n// }\n</code></pre><p>Many Thanks to <a href=\"https://github.com/Hybrid-Force\">Derek Hsu</a> XD 😁</p>\n<h3>About Sending Push</h3>\n<p>Use the <a href=\"https://leancloud.cn/docs/js_guide.html#Push_%E9%80%9A%E7%9F%A5\">JS API: AV.Push</a> that leancloud provide.</p>\n<h3>LeanAnalytics API</h3>\n<p>Corresponding code is forked from <a href=\"https://github.com/Hybrid-Force/cordova-plugin-leancloud\">https://github.com/Hybrid-Force/cordova-plugin-leancloud</a>.</p>\n<p>Only a novice for leancloud I am, so</p>\n<ul>\n<li>\n<p>take a look at the source code <a href=\"https://github.com/BenBBear/cordova-plugin-leanpush/blob/master/www/LeanAnalytics.js\">https://github.com/BenBBear/cordova-plugin-leanpush/blob/master/www/LeanAnalytics.js</a> to know the API</p>\n</li>\n<li>\n<p>and study the <a href=\"https://leancloud.cn/docs/ios_statistics.html\">Leancloud documentation about leanAnalytics</a></p>\n</li>\n</ul>\n<p>is the better way to go.</p>\n<hr>\n<h2>Screen Recording</h2>\n<h3>Android</h3>\n<p><img src=\"https://raw.githubusercontent.com/BenBBear/cordova-plugin-leanpush/master/img/android.gif\" alt></p>\n<h3>IOS</h3>\n<p>See the <a href>Attention Below</a>, the webview can’t <code>alert</code> when <code>onResume</code></p>\n<h4>One</h4>\n<ul>\n<li>notice from close</li>\n<li>notice while foreground</li>\n</ul>\n<p><img src=\"https://raw.githubusercontent.com/BenBBear/cordova-plugin-leanpush/master/img/ios.gif\" alt></p>\n<h4>Two</h4>\n<ul>\n<li>notice from background</li>\n</ul>\n<h5>mobile</h5>\n<p><img src=\"https://raw.githubusercontent.com/BenBBear/cordova-plugin-leanpush/master/img/ios-back-phone.gif\" alt></p>\n<h5>console.log</h5>\n<p><img src=\"https://raw.githubusercontent.com/BenBBear/cordova-plugin-leanpush/master/img/ios-back.gif\" alt></p>\n<p>The debugger in screenshot is <a href=\"https://www.genuitec.com/products/gapdebug/\">GapDebug</a>, debug phonegap in browser :D</p>\n<h2>Behavior</h2>\n<p>The <code>onNotificationReceived callback</code>  and the <code>$rootScope.$emit(&#x27;leancloud:notificationReceived&#x27;)</code> will fires when</p>\n<h3>IOS</h3>\n<ul>\n<li>app in the foreground, notice comes (won’t show the system notification alert)</li>\n<li>app in the background, tap the notification to resume it</li>\n<li>app closed, tap the notification to open it</li>\n</ul>\n<h3>Android</h3>\n<ul>\n<li>app in the foreground, tap the notification to see it</li>\n<li>app in the background, tap the notification to resume it</li>\n<li>app closed, tap the notification to open it</li>\n</ul>\n<h2>Attention</h2>\n<h3>Android Quirk</h3>\n<p>In order to receive push from android, I change the default <code>MainActivity</code> and <code>Application Entry</code>  in that gulp task. Details in the <a href=\"https://github.com/BenBBear/cordova-plugin-leanpush/blob/master/lpush-installer.js\">lpush_installer.js</a>.</p>\n<blockquote>\n<p>So if you use another plugin that also goes this way, then there gonna be conflicts.</p>\n</blockquote>\n<h4>Uninstall</h4>\n<p>For fully uninstallation:</p>\n<pre class=\"prettyprint language-shell\"><code>cordova plugin rm cordova-plugin-leanpush\nionic platform rm android &amp;&amp; ionic platform rm ios\nionic platform add android &amp;&amp; ionic platform add ios\n</code></pre><h3>Don’t Use Alert in the IOS inside Notification Callback</h3>\n<blockquote>\n<p><code>alert</code> is a blocking function.</p>\n</blockquote>\n<h4>IOS UIWebView</h4>\n<p>It will cause the app to freeze when you resume the app by clicking notification. (but it seems ok when the app is in the foreground or closed.)</p>\n<h3>For Android</h3>\n<p>As far as I try, <code>alert</code> is fine, guess is the difference of webView between  IOS and android.</p>\n<h3>Notification Handler</h3>\n<p>There are two ways, both will be fired when notification comes</p>\n<ul>\n<li>\n<p><code>onNotificationReceived</code></p>\n</li>\n<li>\n<p><code>$rootScope.$emit(&#x27;leancloud:notificationReceived&#x27;)</code></p>\n</li>\n</ul>\n<p>You can choose one of them, but may not both.</p>\n<h3>Android Build Issue</h3>\n<ul>\n<li><strong>Error: duplicate files during packaging of APK</strong></li>\n</ul>\n<p><strong>How to Solve:</strong></p>\n<p>insert following code into the <strong>android tag</strong> of <code>platforms/android/build.gradle</code></p>\n<pre class=\"prettyprint language-groovy\"><code> packagingOptions {\n       exclude &#x27;META-INF/LICENSE.txt&#x27;\n       exclude &#x27;META-INF/NOTICE.txt&#x27;\n}\n</code></pre><p>It should look like below</p>\n<pre class=\"prettyprint language-groovy\"><code>android{\n   packagingOptions {\n       exclude &#x27;META-INF/LICENSE.txt&#x27;\n       exclude &#x27;META-INF/NOTICE.txt&#x27;\n   }\n    //stuff\n}\n</code></pre><h2>LICENSE</h2>\n<p>The MIT License (MIT)</p>\n<p>Copyright © 2015 Xinyu Zhang, Derek Hsu</p>\n<hr>\n<p>Note:</p>\n<p>自己完全新手  &gt;.&lt;   mobile 开发方面 只接触过一点点android， 这个插件之前1行objc都没写过  :O</p>\n<p>都是靠借鉴师兄的代码： <a href=\"https://github.com/Hybrid-Force/cordova-plugin-leancloud\">https://github.com/Hybrid-Force/cordova-plugin-leancloud</a>  ，另外加上各种google + 推测 😂</p>\n<p>分享在这里， 希望能有帮助， 要向大家学习哈 :D</p>\n<p>对了github链接在这里: <a href=\"https://github.com/BenBBear/cordova-plugin-leanpush\">https://github.com/BenBBear/cordova-plugin-leanpush</a></p>\n<hr>\n<p>更新了README</p>\n</div>",
                "title": "分享自己最近写的一个 leancloud推送服务的 cordova插件 :D",
                "last_reply_at": "2015-08-11T10:09:15.623Z",
                "good": true,
                "top": false,
                "reply_count": 5,
                "visit_count": 729,
                "create_at": "2015-07-14T02:26:55.402Z",
                "author": {
                    "loginname": "BenBBear",
                    "avatar_url": "https://avatars.githubusercontent.com/u/7659710?v=3&s=120"
                }
            }, {
                "id": "55c47f050c1117257f58c825",
                "author_id": "55c47e500c1117257f58c824",
                "tab": "ask",
                "content": "<div class=\"markdown-text\"><p>如题，run android之后一直是空白页面，这个应该怎么调试？？也无从下手啊？ionic serve完全没问题。</p>\n</div>",
                "title": "ionic 运行后为什么angularjs里面的direactive都显示不出来，但是浏览器是可以的",
                "last_reply_at": "2015-08-10T13:45:55.172Z",
                "good": false,
                "top": false,
                "reply_count": 7,
                "visit_count": 238,
                "create_at": "2015-08-07T09:48:53.715Z",
                "author": {
                    "loginname": "moxiaobei2",
                    "avatar_url": "https://avatars.githubusercontent.com/u/11829981?v=3&s=120"
                }
            }]
        }
        $scope.topics = obj.data;
    })
    .controller('TopicCtrl', function($scope, $state) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state, "tabs-show");
        $scope.$root.tabsHidden = "tabs-hide";

    })
    .controller('ChatsCtrl', function($scope, Chats, $state) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state, "tabs-show");
        $scope.$root.tabsHidden = "tabs-show";

        $scope.doRefresh = function() {
            // Topics.fetchTopStories();
            alert("doRefresh")
        };
        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
    })

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $state) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state, "tabs-show");
        $scope.$root.tabsHidden = "tabs-show";
        $scope.chat = Chats.get($stateParams.chatId);
    })
    .controller('GitfCtrl', function($scope, $state) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state, "tabs-show");
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
    .controller('AccountCtrl', function($scope, $rootScope, $state, $log, $ionicActionSheet) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state, "tabs-show");
        $scope.$root.tabsHidden = "tabs-show";

        // 监听登录
        $rootScope.$on('app.login', function() {
            $log.debug('login broadcast handle');
            // get current user
            // var currentUser = User.getCurrentUser();
            $scope.mideApp_user = mideApp_user || {};

        });

        if (mideApp_user == null) {
            mideApp_user = MideApp.LocCache.load('User') || {};
        }


        var guideByUser = function(user) {
            if (!user.username) { //&& user.username.step == 1

                $state.go('tab.login');
            }
        };

        if (mideApp_user) {
            guideByUser(mideApp_user);
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
            $state.go('tab.login');

            // $state.go("tab.setting", {}, {
            //   reload: true
            // });


        };
    })
    .controller('LoginCtrl', function($scope, $rootScope, $ionicActionSheet, $ionicLoading, $state, $ionicPopup) {
        MideApp.setBackManner('back');
        MideApp.intoMyController($scope, $state, "tabs-show");
        $scope.$root.tabsHidden = "tabs-show";

        // mideApp_user = MideApp.LocCache.load('User');

        // $scope.mideApp_user = mideApp_user || {};
        // if (typeof $scope.mideApp_user.username !== 'undefined') {
        //     $state.go("tab.account");
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
                    phoneNumber: "88888888888",
                    email: "mide@qq.com",
                    QQnumber: "491238861",
                    region: "广州",
                    identity: "9999999999999",
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
                $state.go("tab.account");
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
        MideApp.intoMyController($scope, $state, "tabs-show");
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
                    $state.go("tab.login");
                }, 1000);
                // $rootScope.$broadcast('app.login');

            });
        };

        $scope.regMore = function() {
            MideApp.LocCache.save('User', mideApp_user);
            MideApp.MemCache.save('User', mideApp_user);
            $state.go("tab.regMore", $scope.mideApp_user);
        }

    })

.controller('RegMoreCtrl', function($scope, $ionicActionSheet, $state, $ionicLoading, $timeout) {
    MideApp.setBackManner('back');
    MideApp.intoMyController($scope, $state, "tabs-show");
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
                $state.go("tab.login");
            }, 1000);
            // $rootScope.$broadcast('app.login');

        });
    };

    $scope.regMore = function() {
        MideApp.LocCache.save('User', $scope.mideApp_user);
        MideApp.MemCache.save('User', $scope.mideApp_user);
        $state.go("tab.regMore");
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
});
