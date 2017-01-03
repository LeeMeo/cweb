require.config({
    baseUrl: "../lib",
    paths: {
        lib: "../lib",
        index: "../src/js/index",
        angular: "angular/angular",
        bootstrap: "bootstrap/dist/js/bootstrap",
        jquery: "jquery/dist/jquery",
        "pnotify.animate": "pnotify/dist/pnotify.animate",
        "pnotify.buttons": "pnotify/dist/pnotify.buttons",
        "pnotify.callbacks": "pnotify/dist/pnotify.callbacks",
        "pnotify.confirm": "pnotify/dist/pnotify.confirm",
        pnotify: "pnotify/dist/pnotify",
        "pnotify.desktop": "pnotify/dist/pnotify.desktop",
        "pnotify.history": "pnotify/dist/pnotify.history",
        "pnotify.mobile": "pnotify/dist/pnotify.mobile",
        "pnotify.nonblock": "pnotify/dist/pnotify.nonblock",
        requirejs: "requirejs/require",
        metisMenu: "metisMenu/dist/metisMenu",
        "jquery.slimscroll": "jquery-slimscroll/jquery.slimscroll.min",
        PACE: "PACE/pace"
    },
    map: {
        "*": {
            css: "require-css/css"
        }
    },
    shim: {
        bootstrap: [
            "jquery"
        ],
        metisMenu: [
            "css!lib/metisMenu/dist/metisMenu.min.css"
        ],
        "jquery.slimscroll": [
            "jquery"
        ],
        pnotify: [
            "css!lib/pnotify/dist/pnotify.css"
        ],
        "pnotify.buttons": [
            "pnotify",
            "css!lib/pnotify/dist/pnotify.buttons.css"
        ]
    },
    packages: [

    ]
});
require(['jquery', 'index'], function($, idx) {
    console.log(idx);
    //index.stdout;
});