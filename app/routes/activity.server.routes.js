/**
 * Created by yves on 19/09/15.
 */
'use strict';

/**
 * Module dependencies.
 */

module.exports = function(app) {
    // Activity Routes
    var activities = require('../../app/controllers/activity.server.controller');

    app.route('/getActivity/:mood/:intensity').get(activities.getActivity);

};
