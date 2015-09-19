/**
 * Created by yves on 19/09/15.
 */

'use strict';
var _ = require('lodash'),
    mongoose = require('mongoose'),
    Activity = mongoose.model('Activity');

exports.getActivity = function(req, res) {
    console.log(req.params);
    Activity.findOne({mood: req.params.mood, intensity: {$lt: req.params.intensity + 2, $gt: req.params.intensity - 2}}, function(err,object){
        console.log(object);
        res.send(object);
    });


};
