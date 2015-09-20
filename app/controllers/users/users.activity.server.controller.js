/**
 * Created by yves on 19/09/15.
 */
'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    User = mongoose.model('User');

/**
 * Signup
 */
exports.getIntensity = function(req, res) {
    User.findOne({username: req.params.username}, function(err,object){
            console.log("[L20:user.activity.server.controller]: " + object.intensityPreference);
            res.send(object.intensityPreference);
        });

};
exports.setIntensity = function(req, res) {
    User.findOneAndUpdate({username: req.params.username},{$set: {intensityPreference:req.params.intensity}},
        {upsert:true}, function(err,object){
            if (err) return res.send(500, { error: err });
            return res.send('succesfully saved');
        });

};
exports.getMood = function(req, res) {
    User.findOne({username: req.params.username}, function(err,object){
        console.log(object);
        res.send(object.moodPreference);
    });

};
exports.setMood = function(req, res) {
    User.findOneAndUpdate({username: req.params.username},{$set: {moodPreference:req.params.mood}},
        {upsert:true}, function(err,object){
            if (err) return res.send(500, { error: err });
            return res.send('succesfully saved');
        });

};
