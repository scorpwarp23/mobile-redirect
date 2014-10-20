var parseurl = Npm.require('parseurl');
var MobileDetect = Npm.require('mobile-detect');
Meteor.startup(function () {

});


var httpServer = WebApp.httpServer;
var oldHttpServerListeners = httpServer.listeners('request').slice(0);
httpServer.removeAllListeners('request');
httpServer.addListener('request', function (req, res) {
    //Modifying the HTTP server listener to validate requests based on the IP address
    //And then based on the result either forwarding the user to the redirect url specified
    //or processing the request.
    var args = arguments;
    try {
        var md = new MobileDetect(req.headers['user-agent']);
        var m1 = md.mobile();
        if (MOBILE_REDIRECT_CONFIG.current_context === "core") {
            //This package has been installed in the context of a non-mobile app. i.e. for desktop/laptop browsers etc. So redirect mobile & tablet (if configured) traffic.
            if (m1 !== null) {
                var m2 = md.phone();
                var m3 = md.tablet();
                var parsed_url = parseurl(req);
                if (parsed_url.href === "/") {
                    route = null
                }
                else {
                    var route = encodeURIComponent(parsed_url.href);
                }
                if (m2 !== null) {
                    //It's a phone!
                    console.info("Redirecting Phone");
                    res.writeHead(302, {
                        'Location': MOBILE_REDIRECT_CONFIG.mobile_url + "?route=" + route
                    });
                    res.end();
                    return;
                }
                else {
                    if (m3 !== null) {
                        if (MOBILE_REDIRECT_CONFIG.redirect_tablet === true) {
                            //It's a tablet
                            console.info("Redirecting Tablet");
                            res.writeHead(302, {
                                'Location': MOBILE_REDIRECT_CONFIG.tablet_url + "?route=" + route
                            });
                            res.end();
                            return;
                        }
                        else {
                            _.each(oldHttpServerListeners, function (oldListener) {
                                oldListener.apply(httpServer, args);
                            });
                        }

                    }
                    else {
                        //This should not happen.Ideally.

                        if (MOBILE_REDIRECT_CONFIG.unknown_action === "deny") {
                            console.info("Mobile Found. Not a phone & Not a tablet. Redirecting as Phone. UA:" + req.headers['user-agent']);
                            res.writeHead(302, {
                                'Location': MOBILE_REDIRECT_CONFIG.mobile_url + "?route=" + route
                            });
                            res.end();
                            return;
                        }
                        else {
                            _.each(oldHttpServerListeners, function (oldListener) {
                                oldListener.apply(httpServer, args);
                            });
                        }
                    }
                }
            }
            else {
                _.each(oldHttpServerListeners, function (oldListener) {
                    oldListener.apply(httpServer, args);
                });
            }
        }
        else {
            //This package has been installed in the context of a mobile app. So redirect desktop, laptop & tablet (if configured) traffic.
            if (m1 !== null) {
                var m2 = md.phone();
                var m3 = md.tablet();
                var parsed_url = parseurl(req);
                if (parsed_url.href === "/") {
                    route = null
                }
                else {
                    var route = encodeURIComponent(parsed_url.href);
                }
                if (m2 !== null) {
                    //It's a phone!
                    _.each(oldHttpServerListeners, function (oldListener) {
                        oldListener.apply(httpServer, args);
                    });
                }
                else {
                    if (m3 !== null) {
                        if (MOBILE_REDIRECT_CONFIG.redirect_tablet === true) {
                            //It's a tablet
                            console.info("Redirecting Tablet");
                            res.writeHead(302, {
                                'Location': MOBILE_REDIRECT_CONFIG.tablet_url + "?route=" + route
                            });
                            res.end();
                            return;
                        }
                        else {
                            _.each(oldHttpServerListeners, function (oldListener) {
                                oldListener.apply(httpServer, args);
                            });
                        }

                    }
                    else {
                        //This should not happen. A mobile but neither a phone nor a tablet.
                        //Here we don't check for unknown_action. Instead we just let the traffic through.
                        _.each(oldHttpServerListeners, function (oldListener) {
                            oldListener.apply(httpServer, args);
                        });
                    }
                }
            }
            else {
                if(MOBILE_REDIRECT_CONFIG.redirect_desktop===true){
                    //If the dev wants to redirect non-mobile traffic.
                    console.info("Redirecting Laptop / Desktop");
                    res.writeHead(302, {
                        'Location': MOBILE_REDIRECT_CONFIG.non_mobile_url + "?route=" + route
                    });
                    res.end();
                    return;
                }
                else{
                    //If the dev wants to allow non-mobile traffic.
                    _.each(oldHttpServerListeners, function (oldListener) {
                        oldListener.apply(httpServer, args);
                    });
                }

            }
        }

    }
    catch (ex) {
        //This exception may occur due to incorrect parsing of the IP address or due to REDIS connection errors.
        // In such cases if the default behaviour is to allow then allow else block.
        if (MOBILE_REDIRECT_CONFIG.current_context === "core") {
            //This package has been installed in the context of a non-mobile app. i.e. for desktop/laptop browsers etc. So redirect mobile & tablet (if configured) traffic.
            if (MOBILE_REDIRECT_CONFIG.on_exception === "deny") {
                console.info("There was an exception for UA:" + req.headers['user-agent'] + "| Exception:" + ex + "| REDIRECTING THE USER TO MOBILE SITE.");
                res.writeHead(302, {
                    'Location': MOBILE_REDIRECT_CONFIG.mobile_url
                });
                res.end();
                return;
            }
            else {
                console.info("There was an exception for UA:" + req.headers['user-agent'] + "| Exception:" + ex + "| LETTING THE USER THROUGH!");
                _.each(oldHttpServerListeners, function (oldListener) {
                    oldListener.apply(httpServer, args);
                });
            }
        }
        else{
            //This package has been installed in the context of a mobile app. Here we don't check for how to handle such traffic. We just let it through.
            console.info("There was an exception for UA:" + req.headers['user-agent'] + "| Exception:" + ex + "| LETTING TRAFFIC THROUGH.");
            _.each(oldHttpServerListeners, function (oldListener) {
                oldListener.apply(httpServer, args);
            });
        }

    }
});

