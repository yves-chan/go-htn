/**
 * Created by yves on 19/09/15.
 */

'use strict';
var _ = require('lodash'),
    mongoose = require('mongoose'),
    Activity = mongoose.model('Activity');

exports.getActivity = function(req, res) {
    console.log(req.params);
    Activity.find({mood: req.params.mood, intensity: {$lt: req.params.intensity + 2, $gt: req.params.intensity - 2}}, function(err,object){
        console.log(object);
        res.send(object);
    });


};

exports.getActivityByName = function(req, res) {
    console.log(req.params);
    Activity.findOne({name: req.params.name}, function(err,object){
        console.log(object);
        res.send(object);
    });


};

exports.increaseCount = function(req, res) {
    console.log("L19 @ history.controller : " + req.params);
    Activity.findOneAndUpdate({name: req.params.name}, {$inc: {count: 1}}, {upsert: true}, function(err,object){
        console.log(object);
        res.send(object);
    });
}
