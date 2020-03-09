/* - Re groupe all tasks related routes  - */

// const assets = require('../controllers/assets/')

const tasksController = require('../controllers/tasks')

module.exports = function (app) {
    app.route('/task/new').post(tasksController.addNewTask)
    app.route('/task/update').post(tasksController.updateTask)
} 
