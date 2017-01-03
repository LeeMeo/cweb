/*
 *
 *   INSPINIA - Responsive Admin Theme
 *   version 2.6
 *
 */
define(["jquery", "bootstrap", "pnotify", "pnotify.buttons", "metisMenu", "jquery.slimscroll"], function($, b, PNotify) {
    var $SIDEMENU = $('#side-menu'),
        $MENUCONTENT = $('#menu-content');

    function menuLoad() {
        $.ajax({
            type: "GET",
            url: "../data/menu.json",
            async: false,
            success: function(data) {
                var content = "";
                $.each(data["RESULTSET"], function(i, d) {
                    var _id = d.RES_ID,
                        _name = d.RES_NAME,
                        _pid = d.PARENT_RES_ID,
                        _icon = (d.ICON == "" || d.ICON == undefined) ? "fa-th-large" : d.ICON;
                    if (_pid == 0) {
                        content += '<li class="menu-folder" data-menu-id="' + _id +
                            '"><a href="#"><i class="fa ' + _icon +
                            '"></i> <span class="nav-label">' + _name +
                            '</span> <span class="fa arrow"></span></a>' +
                            '<ul class="nav nav-second-level collapse">';
                        $.each(data["RESULTSET"], function(f, item) {
                            if (item.PARENT_RES_ID == _id) {
                                content += '<li class="menu-leaf" data-menu-id="' +
                                    item.RES_ID + '"><a href="#' + item.URL + '" >' +
                                    item.RES_NAME + '</a></li>';
                            }
                        });
                        content += '</ul></li>';
                    }
                });
                // console.log(content);
                $SIDEMENU.append(content);
            }
        });
    }
    menuLoad();
    /*********************************************************************************************/
    // Add body-small class if window less than 768px
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
    // MetsiMenu
    $SIDEMENU.metisMenu();
    // Minimalize menu
    $('.navbar-minimalize').on('click', function() {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });
    // Tooltips demo
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });
    // Full height of sidebar
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
        var navbarHeigh = $('nav.navbar-default').height();
        var wrapperHeigh = $('#page-wrapper').height();
        if (navbarHeigh > wrapperHeigh) {
            $('#page-wrapper').css("min-height", navbarHeigh + "px");
        }
        if (navbarHeigh < wrapperHeigh) {
            $('#page-wrapper').css("min-height", $(window).height() + "px");
        }
        if ($('body').hasClass('fixed-nav')) {
            if (navbarHeigh > wrapperHeigh) {
                $('#page-wrapper').css("min-height", navbarHeigh - 60 + "px");
            } else {
                $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
            }
        }
    }
    fix_height();
    // Fixed Sidebar
    $(window).bind("load", function() {
        if ($("body").hasClass('fixed-sidebar')) {
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }
    });
    // Move right sidebar top after scroll
    // $(window).scroll(function() {
    //     if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
    //         $('#right-sidebar').addClass('sidebar-top');
    //     } else {
    //         $('#right-sidebar').removeClass('sidebar-top');
    //     }
    // });
    $(window).bind("load resize scroll", function() {
        if (!$("body").hasClass('body-small')) {
            fix_height();
        }
    });
    $("[data-toggle=popover]").popover();
    // Add slimscroll to element
    $('.full-height-scroll').slimscroll({
        height: '100%'
    });
    // Minimalize menu when screen is less than 768px
    $(window).bind("resize", function() {
        if ($(this).width() < 769) {
            $('body').addClass('body-small')
        } else {
            $('body').removeClass('body-small')
        }
    });
    // Local Storage functions
    // Set proper body class and plugins based on user configuration
    if (localStorageSupport()) {
        var collapse = localStorage.getItem("collapse_menu");
        var fixedsidebar = localStorage.getItem("fixedsidebar");
        var fixednavbar = localStorage.getItem("fixednavbar");
        var boxedlayout = localStorage.getItem("boxedlayout");
        var fixedfooter = localStorage.getItem("fixedfooter");
        var body = $('body');
        if (fixedsidebar == 'on') {
            body.addClass('fixed-sidebar');
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }
        if (collapse == 'on') {
            if (body.hasClass('fixed-sidebar')) {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }
            } else {
                if (!body.hasClass('body-small')) {
                    body.addClass('mini-navbar');
                }
            }
        }
        if (fixednavbar == 'on') {
            $(".navbar-static-top").removeClass('navbar-static-top').addClass('navbar-fixed-top');
            body.addClass('fixed-nav');
        }
        if (boxedlayout == 'on') {
            body.addClass('boxed-layout');
        }
        if (fixedfooter == 'on') {
            $(".footer").addClass('fixed');
        }
    }
    // check if browser support HTML5 local storage
    function localStorageSupport() {
        return (('localStorage' in window) && window['localStorage'] !== null)
    }
    // For demo purpose - animation css script
    function animationHover(element, animation) {
        element = $(element);
        element.hover(function() {
            element.addClass('animated ' + animation);
        }, function() {
            //wait for animation to finish before removing classes
            window.setTimeout(function() {
                element.removeClass('animated ' + animation);
            }, 2000);
        });
    }

    function SmoothlyMenu() {
        if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
            // Hide menu in order to smoothly turn on when maximize menu
            $SIDEMENU.hide();
            // For smoothly turn on menu
            setTimeout(function() {
                $SIDEMENU.fadeIn(400);
            }, 200);
        } else if ($('body').hasClass('fixed-sidebar')) {
            $SIDEMENU.hide();
            setTimeout(function() {
                $SIDEMENU.fadeIn(400);
            }, 100);
        } else {
            // Remove all inline style from jquery fadeIn function to reset menu state
            $SIDEMENU.removeAttr('style');
        }
    }
    // Dragable panels
    function WinMove() {
        var element = "[class*=col]";
        var handle = ".ibox-title";
        var connect = "[class*=col]";
        $(element).sortable({
            handle: handle,
            connectWith: connect,
            tolerance: 'pointer',
            forcePlaceholderSize: true,
            opacity: 0.8
        }).disableSelection();
    }
    /*********************************************************************************************/
    var menutool = {
        getMenuId: function(hash) {
            return $SIDEMENU.find('a[href="#' + hash + '"]').parent().attr('data-menu-id');
        },
        getMenu: function(id) {
            return $SIDEMENU.find('li[data-menu-id="' + id + '"]');
        },
        getTab: function(id) {
            return $MENUCONTENT.find('.tabs-container ul [data-menu-id="' + id + '"]');
        },
        getTabContent: function(id) {
            return $MENUCONTENT.find('.tabs-container .tab-content [data-menu-id="' + id + '"]');
        },
        getUrl: function(id) {
            return getMenu(id).children('a').attr('href');
        }
    };
    // onhashchange 用于选中菜单，加载子菜单内容
    $(window).on("hashchange", function(event) {
        navTo(window.location.hash);
    });

    function navTo(hash) {
        if (hash == "" || hash == undefined || hash == "#") return;
        var url = hash.indexOf('#') == 0 ? hash.slice(1) : hash;
        var _menuid = menutool.getMenuId(url),
            _menu = menutool.getMenu(_menuid),
            _tab = menutool.getTab(_menuid),
            _content = menutool.getTabContent(_menuid);
        if (_tab.length > 0) {
            _tab.tab('show');
            $SIDEMENU.find('li.menu-folder ul li.menu-leaf.active').removeClass("active");
            _menu.addClass("active");
        } else {
            // 创建tab-content
            _content = $('<div data-menu-id="' + _menuid + '" id="menu-tab-' + _menuid +
                '" class="tab-pane"><div class="panel-body"></div></div>');
            _content.find('.panel-body').load(url, function(response, status, xhr) {
                if (status == "error") {
                    new PNotify({
                        title: '菜单加载错误',
                        type: 'error',
                        styling: 'bootstrap3',
                        mouse_reset: false,
                        delay: 3000,
                        text: xhr.status + " " + xhr.statusText
                    });
                    return;
                    // $(this).html("菜单加载错误: " + xhr.status + " " + xhr.statusText);
                }
                // 动态加载完毕后，添加tab-list
                $MENUCONTENT.find('.tab-content').append(_content);
                _tab = $('<li data-menu-id="' + _menuid + '"><a data-toggle="tab" href="#menu-tab-' +
                    _menuid + '">' + _menu.children('a').html() +
                    ' <i class="fa fa-times"></i></a></li>');
                $MENUCONTENT.find('.tabs-container ul').append(_tab);
                _tab.find('a i.fa-times').on('click', closeTab);
                _tab.find('a').click();
            });
        }
    }
    navTo(window.location.hash);

    function closeTab() {
        var $this = $(this),
            _menuid = $this.parents('li').attr('data-menu-id'),
            _tab = menutool.getTab(_menuid),
            _content = menutool.getTabContent(_menuid);
        _content.remove();
        if (_tab.prev().attr('data-menu-id') == undefined) {
            _tab.prev().children('a').click();
            $SIDEMENU.find('.active').removeClass("active");
            window.location.hash = "#";
        } else {
            menutool.getMenu(_tab.prev().attr('data-menu-id')).click();
        }
        _tab.remove();
    }
})