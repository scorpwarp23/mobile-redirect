Package.describe({
  summary: "Redirect mobile etc. traffic based on app context",
  version: "1.0.0",
  git: "https://github.com/scorpwarp23/mobile-redirect.git"
});

Package.on_use(function(api) {
    api.versionsFrom('METEOR@0.9.0');
    api.use('webapp', 'server');
    api.use('underscore','server');
    // make sure we come after livedata, so we load after the sockjs
    // server has been instantiated.
    api.add_files('mobile_redirect_config.js', 'server');
    api.export('MOBILE_REDIRECT_CONFIG', 'server');
    api.add_files('mobile_redirect.js', 'server');


});

Npm.depends({
    "mobile-detect":"0.4.1",
    "parseurl":"1.3.0"
});