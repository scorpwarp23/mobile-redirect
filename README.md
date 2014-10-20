METEOR MOBILE/TABLET Redirect Package
=========

cybit:mobile-redirect is a meteor package that allows meteor developers to re-route mobile & tablet traffic to specific URLs. If it is installed in the context of a mobile app, it redirects non-mobile traffic to the core app/URL and vice versa.

**Version 1.0**

About
------------
We recently launched a public beta app that was built using `MeteorJS`. We found that `MeteorJS` fairs very poorly in mobile & tablet browsers. This is due to the heavy `JS` component that exists in `MeteorJS` apps. The mobile browser is seldom allocated the memory or processing power to render the app. We decided to build a separate app for mobile users and redirect traffic there. Redirecting traffic in the client side code is in-efficient. There is a need for developers to be able to redirect users during initial requests itself. There was no way to do this until now. **There is NOW!**

Features
------------
  - Supports Meteor versions 0.9.0 and above.**We haven't tested it for prior releases**
  - Install it with a single command
  - Support for both mobile app and core app contexts
  - Supports separate redirection for mobile & tablet apps
  - Passes route & query parameter contexts as well as cookies (to maintain login status for a user)
  - Define your own redirect URL(s) - **must be a URL other than your app.**

Setup
------------
Just run `meteor add cybit:mobile-redirect` in your meteor app directory.

Configuration
------------
**This is the default configuration. It's already part of the package.**

```
MOBILE_REDIRECT_CONFIG={
    mobile_url:"http://www.example.com",//The default url to redirect the user to, for mobiles. Note that the route & all parameters are sent as a querystring

    unknown_action:"deny",//When a device that is mobile but is neither phone nor tablet what to do. Use `'deny'` to follow the mobile action, `'allow'` to let the user through to the main app.

    redirect_tablet:true,//Set this to `true` if tablet traffic should also be redirected. Set it to `false` if you wish to allow tablet traffic through.

    tablet_url:"http://www.example.com",//The default url to redirect the user to for tablets. Note that the route & all parameters are sent as a querystring

    on_exception:"allow",//Action to be performed if there's an exception. Use `'deny'` to follow the mobile action, `'allow'` to let the user through to the main app.

    current_context:"core", //Context of this package installation. Use `'core'` to redirect mobile traffic elsewhere. User `'mobile'` to redirect non-mobile traffic.

    non_mobile_url:"https://app.linkwok.com", //URL to redirect non-mobile traffic to if the context of this package installation is `"mobile"`

    redirect_desktop:false //This parameter is used when the current context is `mobile`. It is used to define whether desktop traffic should be redirected away from the mobile app.

};

```


If you wish to override only some properties you can simply do `MOBILE_REDIRECT_CONFIG."property"="value"` in your main server block.

Alternatively you can override the whole object in your main server block.

Contributions
------------
Contributions are always welcome. If you have any issue that you can resolve then send us a pull request. 

TESTS
------------
We'll have the test scripts up in a few days. 

License
------------

MIT

**Free Software, Hell Yeah!**

Contributors
------------
Abhijeet Sutar: [ajduke]

Shrenik Kenia (**Me**): [shrenik] 
[ajduke]:http://github.com/ajduke
[shrenik]:http://github.com/scorpwarp23
