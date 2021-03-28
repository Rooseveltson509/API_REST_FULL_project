// Imports
require('dotenv').config()
const sendmail = require('sendmail')();

// Constants
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/;
const PHONE_NUMBER = /^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/;
const PRICE_REGEX = /^[1-9]{3,6}$/;

exports.randomCode = function(length, chars){
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

exports.checkPassword = function(pwd) {
    return PASSWORD_REGEX.test(pwd)
}

exports.checkPhoneNumber = function(phone) {
    return PHONE_NUMBER.test(phone)
}

exports.checkPrice = function(price) {
    return PRICE_REGEX.test(price)
}

let allowlist = ['http://localhost:3000/', 'http://localhost', 'http://localhost:3000']
exports.corsOptionsDelegate = function(req, callback) {
    let corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        console.log("origin is there : " + allowlist.indexOf(req.header('Origin')))
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        console.log("testet" + allowlist.indexOf(req.header('Origin')))
        corsOptions = { origin: false } // disable CORS for this request
        //console.log("testet : " + corsOptions.origin)
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

exports.sendConfirmationEmail = function(toUser, toUserName, newUserId, domain, tokenRandom) {
    sendmail({
        from: 'roosecbapro@gmail.com',
        to: toUser,
        subject: 'Email de vérification',
        html: `<h1 style="text-align: center; color: #20d8ed;"><strong>Welcome ${toUserName}</strong></h1>
        <p style="text-align: center;">Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</strong></p>
        <p style="text-align: center;">&nbsp;</p>
        <p style="text-align: center;"><strong><img style="display: block; margin-left: auto; margin-right: auto;" src="https://res.cloudinary.com/belum-punya/image/upload/v1487666277/datadrivensystems/tripbuilder.png" alt="bandereau" width="543" height="330" /></strong></p>
        <p>&nbsp;</p>
        <p style="text-align: center;">If that doesn't work, copy and paste the following link in your browser<br />If you have any questions, just reply to this email—we're always happy to help out</p>
        <p style="text-align: center;">Please copy YOUR KEY: <strong style="font-size:16px;">${tokenRandom}</strong>  and validate your account.</p>
        <p style="text-align: center;"><a style="background: orange; color: #ffffff; padding: 10px 50px; border-radius: 3px;" href="${domain}/validation/${newUserId}">confirm account</a></p>
        <p style="text-align: center;">&nbsp;</p>
        <p style="text-align: center; font-size: 10px;"><code>Trip Builder Pro is a registered business name of Trip Builder Pro England Limited.</code><br /><code>Registered in London as a private limited company, Company Number 4777441</code><br /><code>registered Office: Wilton Plaza, Wilton Place, London</code></p>
        <p>&nbsp;</p>`,
    }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
}


exports.sendResetPasswordEmail = function(toUser, toUserName, domain, newUserId, resetToken) {
    sendmail({
        from: 'roosecbapro@gmail.com',
        to: toUser,
        subject: 'Email de vérification',
        html: `<h1 style="text-align: center; color: #20d8ed;"><strong>Welcome ${toUserName}</strong></h1>
        <p style="text-align: center;">To reset your password please follow this link.</strong></p>
        <p style="text-align: center;">&nbsp;</p>
        <p style="text-align: center;"><strong><img style="display: block; margin-left: auto; margin-right: auto;" src="https://res.cloudinary.com/belum-punya/image/upload/v1487666277/datadrivensystems/tripbuilder.png" alt="bandereau" width="543" height="330" /></strong></p>
        <p>&nbsp;</p>
        <p style="text-align: center;">If that doesn't work, copy and paste the following link in your browser<br />If you have any questions, just reply to this email—we're always happy to help out</p>
        <p style="text-align: center;">&nbsp;</p>
        <p style="text-align: center;"><a style="background: orange; color: #ffffff; padding: 10px 50px; border-radius: 3px;" href="${domain}/reinit_password/${newUserId}/${resetToken}">modifier mon mot de passe.</a></p>
        <p style="text-align: center;">&nbsp;</p>
        <p style="text-align: center; font-size: 10px;"><code>Trip Builder Pro is a registered business name of Trip Builder Pro England Limited.</code><br /><code>Registered in London as a private limited company, Company Number 4777441</code><br /><code>registered Office: Wilton Plaza, Wilton Place, London</code></p>
        <p>&nbsp;</p>`,
    }, function(err, reply) {
        console.log(err && err.stack);
        console.dir(reply);
    });
}