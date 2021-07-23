// Imports
let express = require('express');
let cors = require('cors')
const corsOption = require('./funcs/functions')
let usersCtrl = require('./routes/usersCtrl');
let ticketCtrl = require('./routes/ticketsCtrl');
const employeCtrl = require('./routes/employeCtrl');

// Router
exports.router = (function() {
    let apiRouter = express.Router();

    // 1-a Users routes
    apiRouter.route('/user/register', cors(corsOption.corsOptionsDelegate)).post(usersCtrl.register);
    apiRouter.route('/user/login', cors(corsOption.corsOptionsDelegate)).post(usersCtrl.login);
    apiRouter.route('/employe/login', cors(corsOption.corsOptionsDelegate)).post(usersCtrl.EmployeLogin);
    apiRouter.route('/user/me', cors(corsOption.corsOptionsDelegate)).get(usersCtrl.getUserProfile);
    apiRouter.route('/user/me', cors(corsOption.corsOptionsDelegate)).put(usersCtrl.updateUserProfile);
    apiRouter.route('/user/pwd/me', cors(corsOption.corsOptionsDelegate)).put(usersCtrl.updateUserPassword);
    apiRouter.route('/user/mailValidation/:userId/', cors(corsOption.corsOptionsDelegate)).post(usersCtrl.confirmEmail);
    apiRouter.route('/user/forget', cors(corsOption.corsOptionsDelegate)).post(usersCtrl.forgotPassword);
    apiRouter.route('/user/restpwd/:userId/:token', cors(corsOption.corsOptionsDelegate)).post(usersCtrl.resetPassword);
    // 1-b Users routes('/admin/')
    apiRouter.route('/user/admin/:email', cors(corsOption.corsOptionsDelegate)).put(usersCtrl.updateUserProfileByAdmin);
    apiRouter.route('/user/admin/employe/:email', cors(corsOption.corsOptionsDelegate)).put(usersCtrl.updateUserProfileEmployeByAdmin);
    apiRouter.route('/user/admin/:email', cors(corsOption.corsOptionsDelegate)).delete(usersCtrl.destroyUserProfileByAdmin);
    apiRouter.route('/employe/admin/:email', cors(corsOption.corsOptionsDelegate)).delete(usersCtrl.destroyEmployeProfileByAdmin);
    apiRouter.route('/admin/users', cors(corsOption.corsOptionsDelegate)).get(usersCtrl.listUsers);
    apiRouter.route('/admin/employees', cors(corsOption.corsOptionsDelegate)).get(usersCtrl.EmployeesList);
    apiRouter.route('/admin/employe/new', cors(corsOption.corsOptionsDelegate)).post(usersCtrl.createEmployee);
    apiRouter.route('/user/admin/:email', cors(corsOption.corsOptionsDelegate)).get(usersCtrl.getUserByEmail);
    apiRouter.route('/user/admin/employe/:email', cors(corsOption.corsOptionsDelegate)).get(usersCtrl.getEmployeByEmail);
    apiRouter.route('/user/employe/:email', cors(corsOption.corsOptionsDelegate)).get(usersCtrl.getUserByEmailFromEmploye);
    // admin / store-tickets
    apiRouter.route('/admin/tickets/store', cors(corsOption.corsOptionsDelegate)).post(usersCtrl.findTicketsByStore);
    apiRouter.route('/admin/tickets/', cors(corsOption.corsOptionsDelegate)).get(usersCtrl.ticketsList);
    apiRouter.route('/admin/tickets/remaining', cors(corsOption.corsOptionsDelegate)).get(usersCtrl.remainingTickets);
    apiRouter.route('/admin/tickets/gains', cors(corsOption.corsOptionsDelegate)).get(usersCtrl.winningTickets);

    // 2- Tickets routes
    apiRouter.route('/ticket/new', cors(corsOption.corsOptionsDelegate)).post(ticketCtrl.createTicket);
    apiRouter.route('/ticket/create/', cors(corsOption.corsOptionsDelegate)).post(ticketCtrl.createTicketForUser);
    apiRouter.route('/ticket/:code', cors(corsOption.corsOptionsDelegate)).get(ticketCtrl.getTicketByCode);
    apiRouter.route('/user/tickets', cors(corsOption.corsOptionsDelegate)).get(ticketCtrl.getAllTicketsFromUser);
    apiRouter.route('/user/tickets/:store', cors(corsOption.corsOptionsDelegate)).get(ticketCtrl.getAllTicketsByStore);
    //2- Tickets routes(/employe/)
    apiRouter.route('/employee/pwd/me', cors(corsOption.corsOptionsDelegate)).put(employeCtrl.updateEmployeePassword);
    apiRouter.route('/employe/ticket/:code', cors(corsOption.corsOptionsDelegate)).get(employeCtrl.assignedTicketForUser);
    apiRouter.route('/employe/tickets/', cors(corsOption.corsOptionsDelegate)).get(employeCtrl.findAndCountTickets);
    apiRouter.route('/employe/tickets/remaining', cors(corsOption.corsOptionsDelegate)).get(employeCtrl.findRemainingTickets);
    apiRouter.route('/employe/tickets/gains', cors(corsOption.corsOptionsDelegate)).get(employeCtrl.findTheWinningTicket);

    return apiRouter;
})();