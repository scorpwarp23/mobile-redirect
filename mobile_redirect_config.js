MOBILE_REDIRECT_CONFIG={
    mobile_url:"http://www.example.com",//The default url to redirect the user to for mobiles. Note that the route & all parameters are sent as a querystring
    unknown_action:"deny",//When a device that is mobile but is neither phone nor tablet what to do. Use `'deny'` to follow the mobile action, `'allow'` to let the user through to the main app.
    redirect_tablet:true,//Set this to `true` if tablet traffic should also be redirected. Set it to `false` if you wish to allow tablet traffic through.
    tablet_url:"http://www.example.com",//The default url to redirect the user to for tablets. Note that the route & all parameters are sent as a querystring
    on_exception:"allow",//Action to be performed if there's an exception. Use `'deny'` to follow the mobile action, `'allow'` to let the user through to the main app.
    current_context:"core", //Context of this package installation. Use `'core'` to redirect mobile traffic elsewhere. User `'mobile'` to redirect non-mobile traffic.
    non_mobile_url:"https://app.linkwok.com", //URL to redirect non-mobile traffic to if the context of this package installation is `"mobile"`
    redirect_desktop:false //This parameter is used when the current context is `mobile`. It is used to define whether desktop traffic should be redirected away from the mobile app.
};
