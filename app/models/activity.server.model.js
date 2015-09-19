/**
 * Created by yves on 19/09/15.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Activity Schema
 */
var ActivitySchema = new Schema({
    name: String,
    mood: [String],// adventurous, lazy, sporty
    intensity: {
        type: Number,
        default: 5,
        min: 0,
        max: 10,
    }
}, {collection:'activities'});


function Activity(activity) {
    this.name = activity.name;
    this.mood = activity.mood;
    this.intensity = activity.intensity;
}

var activityModel = mongoose.model('Activity', ActivitySchema);

/*
 Saves an admin to the admin database
 */
Activity.prototype.save = function() {
    var activity = {
        name: this.name,
        mood: this.mood,
        intensity: this.intensity
    };
    var newActivity = new activityModel(activity);
    newActivity.save(function(err) {
        if (err) {
            console.error('Activity save failed [activity.server.model.js]');
        }
    });
};

/**
 * Find possible not used activity
 */
ActivitySchema.statics.findUniqueActivity = function(mood,intensity, callback) {
    var _this = this;

    _this.findOne({
    mood: mood, intensity:intensity
    }, function(err, activity) {
        if (!err) {
            if (!activity) {
                callback(name);
            } else {
                return _this.findUniqueActivity(mood,intensity, callback);
            }
        } else {
            callback(null);
        }
    });
};

module.exports = Activity;
module.exports.activityModel = activityModel;
