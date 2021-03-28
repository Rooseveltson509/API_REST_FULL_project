require('dotenv').config()
let bcrypt = require('bcryptjs')
let jwtUtils = require('../utils/jwt.utils')
let models = require('../models')
var asyncLib = require('async');
const { randomCode } = require('../funcs/functions');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    // Find User Ticket By code
    getTicketByCodeEmploye: function(req, res) {
            // Getting auth header
            var headerAuth = req.headers['authorization'];
            var userId = jwtUtils.getUserId(headerAuth);
            var code = req.params.code;
    
            if (userId <= 0) {
                return res.status(400).json({ 'error': 'missing parameters' });
            }

            models.User.findOne({
                where: { id: userId },
            }).then(function(user) {
                if (user) {
                    models.Ticket.findOne({
                        attributes: ['userId', 'gain', 'etat', 'code'],
                        where: {code: code, userId: user.id},
                        include: [{
                            model: models.User,
                            attributes: ['id', 'first_name', 'last_name', 'email', 'city', 'address', 'zipCode'],
                        }]
                    }).then(function(ticket) {
                        if (ticket) {
                            return res.status(200).json(ticket);
                        }else{
                           return res.status(404).json({ 'error': 'Ticket not found' });
                        }
                    }).catch(function(err) {
                        res.status(404).json({ 'error': 'cannot fetch Ticket......' });
                    });
                } else {
                   return res.status(404).json({ 'error': 'Accès non autorisé.....' });
                }
    
            }).catch(function(err) {
                res.status(500).json({ 'error': 'cannot fetch Ticket...' });
            });
    },
     // Find all Tickets from user
    getAllTicketsFromUserEmploye: function(req, res) {
            // Getting auth header
            var headerAuth = req.headers['authorization'];
            var userId = jwtUtils.getUserId(headerAuth);
            var code = req.params.code;
    
            if (userId <= 0) {
                return res.status(400).json({ 'error': 'missing parameters' });
            }

            models.User.findOne({
                where: { id: userId },
            }).then(function(user) {
                if (user) {
                    models.Ticket.findAll({
                        attributes: ['gain', 'etat', 'code'],
                        where: {userId: userId}
                    }).then(function(ticket) {
                        if (ticket) {
                            return res.status(200).json(ticket);
                        }else{
                           return res.status(404).json({ 'error': 'Ticket not found' });
                        }
                    }).catch(function(err) {
                        res.status(404).json({ 'error': 'cannot fetch Ticket......' });
                    });
                } else {
                   return res.status(404).json({ 'error': 'Accès non autorisé.....' });
                }
    
            }).catch(function(err) {
                res.status(500).json({ 'error': 'cannot fetch Ticket...' });
            });
    },
    // Find User Ticket By code
    assignedTicketForUserEmploye: function(req, res) {
                // Getting auth header
                let headerAuth = req.headers['authorization'];
                let userId = jwtUtils.getUserId(headerAuth);
                let code = req.params.code;
        
                if (userId <= 0) {
                    return res.status(400).json({ 'error': 'missing parameters' });
                }

                asyncLib.waterfall([
                    function(done) {
                        models.Employe.findOne({
                                where: { id: userId }
                            }).then(function(userFound) {
                                done(null, userFound);
                            })
                            .catch(function(err) {
                                return res.status(500).json({ 'error': 'unable to verify user ' + userId });
                            });
                    },
                    function(userFound, done) {
                        if (userFound) {
                            models.Ticket.findOne({
                                where: {code: code, etat: 'distribue'}
                            }).then(function(ticketFound) {
                                done(null, ticketFound, userFound);
                            }).catch(function(err) {
                                res.status(500).json({ 'error': 'cannot fetch ticket' });
                            });
                        } else {
                            res.status(404).json({ 'error': 'user not found' });
                        }
                    },
                    function(ticketFound, userFound, done) {
                        if (ticketFound) {
                                ticketFound.update({
                                userId: ticketFound.userId,
                                etat: 'valide',
                                magasin: userFound.magasin,
                                validateAt: new Date(),
                                where: { id: ticketFound.id }
                            }).then(function() {
                                done(ticketFound);
                            }).catch(function(err) {
                                res.status(500).json({ 'error': 'cannot update ticket'});
                            });
                        } else {
                            res.status(404).json({ 'error': 'ticket not found...' });
                        }
                    },
                ], function(ticketFound) {
                    if (ticketFound) {
                        return res.status(200).json({'msg': 'the ticket has been assigned with success.'});
                    } else {
                        return res.status(500).json({ 'error': 'cannot update ticket' });
                    }
                });
    },

    // FIND AND COUNT ALL TICKET
    findAndCountAllEmployee: function(req, res) {
            // Getting auth header
            var headerAuth = req.headers['authorization'];
            var userId = jwtUtils.getUserId(headerAuth);
    
            if (userId <= 0) {
                return res.status(400).json({ 'error': 'missing parameters' });
            }

            models.Employe.findOne({
                where: { id: userId },
            }).then(function(user) {
                if (user) {
                    models.Ticket.findAll({
                        attributes: [
                          'gain',
                          [Sequelize.fn('COUNT', Sequelize.col('gain')), 'count']
                        ],
                        group: 'gain',
                        raw: true,
                        logging: true
                      }).then(data => {
                        console.log('Query Result', data);
                        return res.status(200).json(data);
                      }).catch(function(err) {
                        res.status(404).json({ 'error': 'cannot fetch Ticket......' });
                    });
                } else {
                   return res.status(404).json({ 'error': 'Accès non autorisé.....' });
                }
    
            }).catch(function(err) {
                res.status(500).json({ 'error': 'cannot fetch Ticket...' });
            });
    }
    ,
    // found the winning tickets
    findTheWinningTicket: function(req, res) {
            // Getting auth header
            var headerAuth = req.headers['authorization'];
            var userId = jwtUtils.getUserId(headerAuth);
    
            if (userId <= 0) {
                return res.status(400).json({ 'error': 'missing parameters' });
            }

            models.Employe.findOne({
                where: { id: userId },
            }).then(function(user) {
                if (user) {
                    models.Ticket.findAll({
                        attributes: [
                          'gain',
                          [Sequelize.fn('COUNT', Sequelize.col('gain')), 'gangné']
                        ],
                        group: 'gain',
                        where: { etat: 'valide' },
                        raw: true,
                        logging: true
                      }).then(data => {
                        console.log('Query Result', data);
                        return res.status(200).json(data);
                      }).catch(function(err) {
                        res.status(404).json({ 'error': 'cannot fetch Ticket......' });
                    });
                } else {
                   return res.status(404).json({ 'error': 'Accès non autorisé.....' });
                }
    
            }).catch(function(err) {
                res.status(500).json({ 'error': 'cannot fetch Ticket...' });
            });
    }
}