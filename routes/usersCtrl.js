// Imports
require('dotenv').config()
let bcrypt = require('bcryptjs')
let jwtUtils = require('../utils/jwt.utils')
let models = require('../models')
var asyncLib = require('async');
let randToken = require('rand-token').uid
const validator = require('email-validator');
const { checkPassword, checkPhoneNumber, sendConfirmationEmail, sendResetPasswordEmail } = require('../funcs/functions');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let config = require('../config/config')
const { randomCode } = require('../funcs/functions');

// Routers
module.exports = {
    register: function(req, res) {
        let nom = req.body.nom
        let prenom = req.body.prenom
        let email = req.body.email
        let password = req.body.password
        let password_confirm = req.body.password_confirm
        let address = req.body.address
        let zipCode = req.body.zipCode
        let city = req.body.city
        let token = randomCode(60, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

        if (nom == null || prenom == null || email == null || password == null || address == null || zipCode == null || city == null) {
            return res.status(400).json({ 'error': 'all fields must be filled in.' });
        }

        if (nom.length >= 20 || nom.length <= 4) {
            return res.status(400).json({ 'error': 'wrong first name (must be length 5 - 12)' });
        }

        if (prenom.length >= 20 || prenom.length <= 4) {
            return res.status(400).json({ 'error': 'wrong last name (must be length 5 - 12)' });
        }

        if (!validator.validate(email)) {
            return res.status(400).json({ 'error': 'email is not valid' });
        }

        if (!checkPassword(password)) {
            return res.status(400).json({ 'error': 'password invalid (Min 1 special character - Min 1 number. - Min 8 characters or More)' });
        }

        if(password !== password_confirm) {
            return res.status(400).json({ 'error': 'passwords do not match.' });
        }

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                        attributes: ['email'],
                        where: { email: email }
                    })
                    .then(function(userFound) {
                        done(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify this user' });
                    });
            },
            function(userFound, done) {
                if (!userFound) {
                    bcrypt.hash(password, 5, function(err, bcryptedPassword) {
                        done(null, userFound, bcryptedPassword);
                    });
                } else {
                    return res.status(409).json({ 'error': 'user already exist' });
                }
            },
            function(userFound, bcryptedPassword, done) {
                let newUser = models.User.create({
                        last_name: nom,
                        first_name: prenom,
                        email: email,
                        password: bcryptedPassword,
                        address: address,
                        zipCode:zipCode,
                        city:city,
                        confirmationToken: token

                    })
                    .then(function(newUser) {
                        done(newUser);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'cannot add user' });
                    });
            }
        ], function(newUser) {
            if (newUser) {
                sendConfirmationEmail(newUser.email, newUser.last_name, newUser.id, 'http://localhost:3000'+ config.rootAPI, token)
                return res.status(201).json({
                    'msg': 'un mail de confirmation vous a été envoyé afin de valider votre compte à l\'adresse : ' + newUser.email
                });
            } else {
                return res.status(500).json({ 'error': 'cannot add user' });
            }
        });
    },
    // Email sending to confirm account
    confirmEmail: function(req, res) {
        // Params
        var userId = parseInt(req.params.userId);
        var token = req.body.token;

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                        where: { id: userId, confirmationToken: token }
                    }).then(function(userFound) {
                        done(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },
            function(userFound, done) {
                if (userFound) {
                    userFound.update({
                        confirmationToken: null,
                        confirmedAt: new Date(Date.now())

                    }).then(function() {
                        done(userFound);
                    }).catch(function(err) {
                        res.status(500).json({ 'error': 'cannot found user' });
                    });
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ], function(userFound) {
            if (userFound) {
                return res.status(200).json({
                    'msg': 'Votre compte a bien été validé, veuillez à présent vous connecter.'
                });
            } else {
                return res.status(500).json({ 'error': 'INVALID TOKEN.' });
            }
        });
    },

    // Login
    login: function(req, res) {

        // Params
        var email = req.body.email;
        var password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                        where: { email: email }
                    })
                    .then(function(userFound) {
                        done(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },
            function(userFound, done) {
                if (userFound && userFound.confirmedAt !== null) {
                    bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                        done(null, userFound, resBycrypt);
                    });
                } else {
                    return res.status(404).json({ 'error': 'Utilisateur introuvable.' });
                }
            },
            function(userFound, resBycrypt, done) {
                if (resBycrypt) {
                    done(userFound);
                } else {
                    return res.status(403).json({ 'error': 'Email ou mot de passe INVALIDE.' });
                }
            }
        ], function(userFound) {
            if (userFound) {
                return res.status(200).json({
                    'userId': userFound.id,
                    'email': userFound.email,
                    'token': jwtUtils.generateTokenForUser(userFound)
                });
            } else {
                return res.status(500).json({ 'error': 'cannot log on user' });
            }
        });

    },

    // Login employe
    EmployeLogin: function(req, res) {

            // Params
            var email = req.body.email;
            var password = req.body.password;
    
            if (email == null || password == null) {
                return res.status(400).json({ 'error': 'missing parameters' });
            }
    
            asyncLib.waterfall([
                function(done) {
                    models.Employe.findOne({
                            where: { email: email }
                        })
                        .then(function(userFound) {
                            done(null, userFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                },
                function(userFound, done) {
                    if (userFound) {
                        bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                            done(null, userFound, resBycrypt);
                        });
                    } else {
                        return res.status(404).json({ 'error': 'Utilisateur introuvable.' });
                    }
                },
                function(userFound, resBycrypt, done) {
                    if (resBycrypt) {
                        done(userFound);
                    } else {
                        return res.status(403).json({ 'error': 'Email ou mot de passe INVALIDE.' });
                    }
                }
            ], function(userFound) {
                if (userFound) {
                    return res.status(200).json({
                        'employeId': userFound.id,
                        'email': userFound.email,
                        'token': jwtUtils.generateTokenForUser(userFound)
                    });
                } else {
                    return res.status(500).json({ 'error': 'cannot log on user' });
                }
            });
    
    },
    // Email sending to confirm account
    forgotPassword: function(req, res) {
        // Params
        let email = req.body.email

        if (email == null) {
            return res.status(400).json({ 'error': 'Invalid credencials' });
        }

        if (!validator.validate(email)) {
            return res.status(400).json({ 'error': 'email is not valid' });
        }


        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                        where: { email: email }
                    }).then(function(userFound) {
                        done(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify user email' });
                    });
            },
            function(userFound, done) {
                if (userFound && userFound.confirmedAt !== null) {
                    const resetToken = randToken(64);
                    userFound.update({
                        resetToken: resetToken,
                        resetAt: new Date(Date.now()),
                        expiredAt: new Date(Date.now() + (60 * 60 * 1000))
                    }).then(function(userFound) {
                        sendResetPasswordEmail(userFound.email, userFound.username, 'http://localhost:3000'+ config.rootAPI, userFound.id, resetToken)
                        done(userFound);
                    }).catch(function(err) {
                        res.status(500).json({ 'error': 'cannot update user password.' });
                    });
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ], function(userFound) {
            if (userFound) {
                return res.status(201).json({
                    'msg': 'Pour réinitialiser votre mot de passe un mail vous a été envoyer l\'adresse : ' + userFound.email + ' ' + new Date(Date.now())
                });
            } else {
                return res.status(500).json({ 'error': 'cannot update user profile' });
            }
        });

    },

    // RESET PASSWORD
    resetPassword: function(req, res) {
        // Params
        let userId = parseInt(req.params.userId);
        let token = req.params.token;
        let password = req.body.password
        let password_confirm = req.body.password_confirm


        if (!checkPassword(password)) {
            return res.status(400).json({ 'error': 'password invalid (must length 6 - 10 and include 1 number at least)' });
        }
        if(password_confirm != password) {
            return res.status(400).json({ 'error': 'password do not match.' });
        }

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                        where: { id: userId }
                    }).then(function(userFound) {
                        done(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify this user' });
                    });
            },
            function(userFound, done) {
                if (userFound) {
                    bcrypt.hash(password, 5, function(err, bcryptedPassword) {
                        done(null, userFound, bcryptedPassword);
                    });
                } else {
                    return res.status(409).json({ 'error': 'user not exist' });
                }
            },
            function(userFound, bcryptedPassword, done) {
                if (userFound && userFound.resetToken !== null && userFound.resetToken === token) {
                    if (userFound.expiredAt > new Date(Date.now())) {
                        userFound.update({
                            password: bcryptedPassword,
                            resetAt: null,
                            resetToken: null,
                            expiredAt: null

                        }).then(function() {
                            done(userFound);
                        }).catch(function(err) {
                            res.status(500).json({ 'error': 'cannot found user' });
                        });
                    } else {
                        res.status(404).json({ 'error': 'Your token is not valid.' });
                    }

                } else {
                    res.status(404).json({ 'error': 'ce lien n\'est plus valide....' });
                }
            },
        ], function(userFound) {
            if (userFound) {
                return res.status(201).json({ 'msg': 'Votre mot de pass a bien été modifié.' });
            } else {
                return res.status(500).json({ 'error': 'cannot validate your password.' });
            }
        });

    },

    // Find ALL Users
    listUsers: function(req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId <= 0) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        models.User.findOne({
            where: { id: userId }
        }).then(function(user) {
            if (user.role == 'admin') {
                models.User.findAll({
                    where: {
                        role: {
                          [Op.notLike]: '%admin%'
                        }
                      }

                }).then(function(user2) {
                    if (user2) {
                        res.status(200).json(user2);
                    }
                }).catch(function(err) {
                    res.status(500).json({ 'error': 'cannot fetch user' });
                });
            } else {
                res.status(404).json({ 'error': 'Accès non autorisé.' });
            }

        }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot fetch user' });
        });
    },
     // Find User By EMAIL from admin
     getUserByEmail: function(req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var email = req.params.email;

        if (userId <= 0) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        if (!validator.validate(email)) {
            return res.status(400).json({ 'error': 'email is not valid' });
        }
        models.User.findOne({
            where: { id: userId, role: 'admin' },
        }).then(function(user) {
            if (user) {
                models.User.findAll({
                    where: {email: email}
                }).then(function(user2) {
                    if (user2) {
                        return res.status(200).json(user2);
                    }else{
                       return res.status(404).json({ 'error': 'User not found' });
                    }
                }).catch(function(err) {
                    res.status(404).json({ 'error': 'cannot fetch user......' + email });
                });
            } else {
               return res.status(404).json({ 'error': 'Accès non autorisé.....' });
            }

        }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot fetch user...' });
        });
    },
    // Find Employe By EMAIL
    getEmployeByEmail: function(req, res) {
            // Getting auth header
            var headerAuth = req.headers['authorization'];
            var userId = jwtUtils.getUserId(headerAuth);
            var email = req.params.email;
    
            if (userId <= 0) {
                return res.status(400).json({ 'error': 'missing parameters' });
            }
            if (!validator.validate(email)) {
                return res.status(400).json({ 'error': 'email is not valid' });
            }
            models.User.findOne({
                where: { id: userId, role: 'admin' },
            }).then(function(user) {
                if (user) {
                    models.Employe.findAll({
                        where: {email: email}
                    }).then(function(user2) {
                        if (user2) {
                            return res.status(200).json(user2);
                        }else{
                           return res.status(404).json({ 'error': 'Employe not found' });
                        }
                    }).catch(function(err) {
                        res.status(404).json({ 'error': 'cannot fetch Employe......' + email });
                    });
                } else {
                   return res.status(404).json({ 'error': 'Accès non autorisé.....' });
                }
    
            }).catch(function(err) {
                res.status(500).json({ 'error': 'cannot fetch Employe...' });
            });
    },
     // Find User By EMAIL from employe
     getUserByEmailFromEmploye: function(req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);
        var email = req.params.email;

        if (userId <= 0) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        if (!validator.validate(email)) {
            return res.status(400).json({ 'error': 'email is not valid' });
        }
        models.Employe.findOne({
            where: { id: userId }
        }).then(function(user) {
            if (user) {
                models.User.findAll({
                    where: {email: email}

                }).then(function(user2) {
                    if (user2) {
                        res.status(201).json(user2);
                    }else{
                        res.status(404).json({ 'error': 'User not found' });
                    }
                }).catch(function(err) {
                    res.status(404).json({ 'error': 'cannot fetch user......' + email });
                });
            } else {
                res.status(404).json({ 'error': 'Accès non autorisé.' });
            }

        }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot fetch user...' });
        });
    },
    // user account after login
    getUserProfile: function(req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0)
            return res.status(400).json({ 'error': 'wrong token' });

        models.User.findOne({
            attributes: ['last_name', 'first_name', 'email', 'city', 'address', 'zipCode'],
            where: { id: userId }
        }).then(function(user) {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        }).catch(function(err) {
            res.status(500).json({ 'error': 'cannot fetch this user' });
        });
    },

    // update user profile
    updateUserProfile: function(req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        let nom = req.body.nom
        let prenom = req.body.prenom
        var address = req.body.address;
        var city = req.body.city;
        var zipCode = req.body.zipCode;

        if (nom.length >= 20 || nom.length <= 4) {
            return res.status(400).json({ 'error': 'wrong first name (must be length 5 - 12)' });
        }

        if (prenom.length >= 20 || prenom.length <= 4) {
            return res.status(400).json({ 'error': 'wrong last name (must be length 5 - 12)' });
        }

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                        where: { id: userId }
                    }).then(function(userFound) {
                        done(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },
            function(userFound, done) {
                if (userFound) {
                    userFound.update({
                        last_name: (nom ? nom : userFound.nom),
                        first_name: (prenom ? prenom : userFound.prenom),
                        address: (address ? address : userFound.address),
                        city: (city ? city : userFound.city),
                        zipCode: (zipCode ? zipCode : userFound.zipCode)
                    }).then(function() {
                        done(userFound);
                    }).catch(function(err) {
                        res.status(500).json({ 'error': 'cannot update user' });
                    });
                } else {
                    res.status(404).json({ 'error': 'user not found' });
                }
            },
        ], function(userFound) {
            if (userFound) {
                return res.status(201).json(userFound);
            } else {
                return res.status(500).json({ 'error': 'cannot update user profile' });
            }
        });
    },
    // update user profile by admin
    updateUserProfileByAdmin: function(req, res) {
            // Getting auth header
            var headerAuth = req.headers['authorization'];
            var userId = jwtUtils.getUserId(headerAuth);
    
            // Params
            let email = req.params.email;
            let nom = req.body.nom
            let prenom = req.body.prenom
            var address = req.body.address;
            var city = req.body.city;
            var zipCode = req.body.zipCode;
    
            if (nom.length >= 20 || nom.length <= 4) {
                return res.status(400).json({ 'error': 'wrong first name (must be length 5 - 12)' });
            }
    
            if (prenom.length >= 20 || prenom.length <= 4) {
                return res.status(400).json({ 'error': 'wrong last name (must be length 5 - 12)' });
            }
            if (!validator.validate(email)) {
                return res.status(400).json({ 'error': 'email is not valid' });
            }
    
            asyncLib.waterfall([
                function(done) {
                    models.User.findOne({
                        where: { id: userId, role: 'admin'}
                        }).then(function(userAdmin) {
                            done(null, userAdmin);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                },
                function(userAdmin, done){
                    if (userAdmin){
                        models.User.findOne({
                            where: { email: email }
                        }).then(function(userFound) {
                            done(null, userFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                    }else {
                        res.status(500).json({ 'error': 'Acces denied' });
                    }

                },
                function(userFound, done) {
                    if (userFound) {
                        userFound.update({
                            last_name: (nom ? nom : userFound.nom),
                            first_name: (prenom ? prenom : userFound.prenom),
                            address: (address ? address : userFound.address),
                            city: (city ? city : userFound.city),
                            zipCode: (zipCode ? zipCode : userFound.zipCode)
                        }).then(function() {
                            done(userFound);
                        }).catch(function(err) {
                            res.status(500).json({ 'error': 'cannot update user' });
                        });
                    } else {
                        res.status(404).json({ 'error': 'user not found' });
                    }
                },
            ], function(userFound) {
                if (userFound) {
                    return res.status(201).json(userFound);
                } else {
                    return res.status(500).json({ 'error': 'cannot update user profile' });
                }
            });
    },
    // update employe profile by admin
     updateUserProfileEmployeByAdmin: function(req, res) {
            // Getting auth header
            var headerAuth = req.headers['authorization'];
            var userId = jwtUtils.getUserId(headerAuth);
    
            // Params
            let email = req.params.email;
            let nom = req.body.nom
            let prenom = req.body.prenom
            let newEmail = req.body.email
    
            if (nom.length >= 20 || nom.length <= 4) {
                return res.status(400).json({ 'error': 'wrong first name (must be length 5 - 12)' });
            }
    
            if (prenom.length >= 20 || prenom.length <= 4) {
                return res.status(400).json({ 'error': 'wrong last name (must be length 5 - 12)' });
            }
            if (!validator.validate(email)) {
                return res.status(400).json({ 'error': 'INVALID PARAMETER' });
            }
            if(!validator.validate(newEmail)){
                return res.status(400).json({ 'error': 'email is not valid' });
            }
            asyncLib.waterfall([
                function(done) {
                    models.User.findOne({
                        where: { id: userId, role: 'admin'}
                        }).then(function(userAdmin) {
                            done(null, userAdmin);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                },
                function(userAdmin, done){
                    if (userAdmin){
                        models.Employe.findOne({
                            where: { email: email }
                        }).then(function(userFound) {
                            done(null, userFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                    }else {
                        res.status(500).json({ 'error': 'Access denied' });
                    }

                },
                function(userFound, done) {
                    if (userFound) {
                        userFound.update({
                            nom: (nom ? nom : userFound.nom),
                            fiprenomrst_name: (prenom ? prenom : userFound.prenom),
                            email: (newEmail ? newEmail : userFound.email)
                        }).then(function() {
                            done(userFound);
                        }).catch(function(err) {
                            res.status(500).json({ 'error': 'cannot update employe' });
                        });
                    } else {
                        res.status(404).json({ 'error': 'employe not found' });
                    }
                },
            ], function(userFound) {
                if (userFound) {
                    return res.status(201).json(userFound);
                } else {
                    return res.status(500).json({ 'error': 'cannot update user profile' });
                }
            });
    },
    // update user profile by admin
    destroyUserProfileByAdmin: function(req, res) {
            // Getting auth header
            var headerAuth = req.headers['authorization'];
            var userId = jwtUtils.getUserId(headerAuth);
    
            // Params
            let email = req.params.email;

            if (!validator.validate(email)) {
                return res.status(400).json({ 'error': 'email is not valid' });
            }
    
            asyncLib.waterfall([
                function(done) {
                    models.User.findOne({
                        where: { id: userId, role: 'admin'}
                        }).then(function(userAdmin) {
                            done(null, userAdmin);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                },
                function(userAdmin, done){
                    if (userAdmin){
                        models.User.findOne({
                            where: { email: email }
                        }).then(function(userFound) {
                            done(null, userFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                    }else {
                        res.status(500).json({ 'error': 'Acces denied' });
                    }

                },
                function(userFound, done) {
                    if (userFound) {
                        models.User.destroy({
                            where: { email: email }
                        }).then(function() {
                            done(userFound);
                        }).catch(function(err) {
                            res.status(500).json({ 'error': 'cannot delete the user' });
                        });
                    } else {
                        res.status(404).json({ 'error': 'user not found' });
                    }
                },
            ], function(userFound) {
                if (userFound) {
                    return res.status(204).json({'msg' : 'resource deleted successfully'});
                } else {
                    return res.status(500).json({ 'error': 'cannot delete user profile' });
                }
            });
    },

    // update user profile by admin
    destroyEmployeProfileByAdmin: function(req, res) {
            // Getting auth header
            var headerAuth = req.headers['authorization'];
            var userId = jwtUtils.getUserId(headerAuth);
    
            // Params
            let email = req.params.email;

            if (!validator.validate(email)) {
                return res.status(400).json({ 'error': 'email is not valid' });
            }
    
            asyncLib.waterfall([
                function(done) {
                    models.User.findOne({
                        where: { id: userId, role: 'admin'}
                        }).then(function(userAdmin) {
                            done(null, userAdmin);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                },
                function(userAdmin, done){
                    if (userAdmin){
                        models.Employe.findOne({
                            where: { email: email }
                        }).then(function(userFound) {
                            done(null, userFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'unable to verify user' });
                        });
                    }else {
                        res.status(500).json({ 'error': 'Acces denied' });
                    }

                },
                function(userFound, done) {
                    if (userFound) {
                        models.Employe.destroy({
                            where: { email: email }
                        }).then(function() {
                            done(userFound);
                        }).catch(function(err) {
                            res.status(500).json({ 'error': 'cannot delete the user' });
                        });
                    } else {
                        res.status(404).json({ 'error': 'user not found' });
                    }
                },
            ], function(userFound) {
                if (userFound) {
                    return res.status(204).json({'msg' : 'resource deleted successfully'});
                } else {
                    return res.status(500).json({ 'error': 'cannot delete user profile' });
                }
            });
    },
    createEmploye: function(req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        let nom = req.body.nom
        let prenom = req.body.prenom
        let email = req.body.email
        let password = req.body.password
        let password_confirm = req.body.password_confirm
        let magasin = req.body.magasin

        if (nom == null || prenom == null || email == null || password == null || magasin == null) {
            return res.status(400).json({ 'error': 'all fields must be filled in.' });
        }

        if (nom.length >= 20 || nom.length <= 4) {
            return res.status(400).json({ 'error': 'wrong first name (must be length 5 - 12)' });
        }

        if (prenom.length >= 20 || prenom.length <= 4) {
            return res.status(400).json({ 'error': 'wrong last name (must be length 5 - 12)' });
        }

        if (!validator.validate(email)) {
            return res.status(400).json({ 'error': 'email is not valid' });
        }

        if (!checkPassword(password)) {
            return res.status(400).json({ 'error': 'password invalid (Min 1 special character - Min 1 number. - Min 8 characters or More)' });
        }

        if(password !== password_confirm) {
            return res.status(400).json({ 'error': 'passwords do not match.' });
        }

        if (userId <= 0) {
            return res.status(400).json({ 'error': 'missing token' });
        }
        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                        where: { id: userId, role: 'admin'}
                    })
                    .then(function(userAdmin) {
                        done(null, userAdmin);
                    })
                    .catch(function(err) {
                        return res.status(401).json({ 'error': 'User admin not found' });
                    });
            },
            function(userAdmin, done) {
                if (userAdmin){
                       models.Employe.findOne({
                        attributes: ['email'],
                        where: { email: email }
                    })
                    .then(function(userFound) {
                        done(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'unable to verify this user' });
                    });
                } else {
                    return res.status(401).json({ 'error': 'Access Denied.' });
                }

            },
            function(userFound, done) {
                if (!userFound) {
                    bcrypt.hash(password, 5, function(err, bcryptedPassword) {
                        done(null, userFound, bcryptedPassword);
                    });
                } else {
                    return res.status(409).json({ 'error': 'employe already exist. ' });
                }
            },
            function(userFound, bcryptedPassword, done) {
                let newUser = models.Employe.create({
                        nom: nom,
                        prenom: prenom,
                        email: email,
                        password: bcryptedPassword,
                        magasin: magasin

                    })
                    .then(function(newUser) {
                        done(newUser);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': 'cannot add employe' });
                    });
            }
        ], function(newUser) {
            if (newUser) {
                return res.status(201).json({'msg': 'account created with success.'});
            } else {
                return res.status(500).json({ 'error': 'cannot add user' });
            }
        });
    }
}