/**
 * Created by yves on 19/09/15.
 */
/**
 * Created by yves on 19/09/15.
 */
'use strict';

/**
 * Module dependencies.
 */

module.exports = function(app) {
    // Activity Routes
    var histories = require('../../app/controllers/history.server.controller');

    app.route('/history/record/:email/:activity').post(histories.record);
    app.route('/history/:email').get(histories.getHistory);

};
