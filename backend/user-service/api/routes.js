'use strict';

const controller = require('./controller');

module.exports = (app) => {
    app.route('/')
        .get(controller.root);
    app.route('/api/v1/users')
        .get(controller.getUsers)
        .post(controller.addUser)
    app.route('/api/v1/users/:username')
        .get(controller.getUser)
        .patch(controller.updateUser)
        .delete(controller.deleteUser);

    app.route('/api/v1/searches')
        .get(controller.getUsers)
        .post(controller.addUser)
    app.route('/api/v1/searches/:search')
        .get(controller.getUser)
        .patch(controller.updateUser)
        .delete(controller.deleteUser)

};
