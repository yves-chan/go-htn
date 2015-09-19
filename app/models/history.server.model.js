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
var HistorySchema = new Schema({
    username: String,
    date: {
        type:Date
    },
    activity: String
}, {collection:'histories'});


function History(history) {
    this.username = history.username;
    this.date = history.date;
    this.activity = history.activity;
}

var historyModel = mongoose.model('History', HistorySchema);

/*
 Saves an admin to the admin database
 */
History.prototype.save = function() {
    var history = {
        username: this.username,
        date: this.date,
        activity: this.activity
    };
    var newHistory = new historyModel(history);
    newHistory.save(function(err) {
        if (err) {
            console.error('History save failed [history.server.model.js]');
        }
    });
};

/**
 * Find all histories for a user
 */
History.getAll = function(username, callback) {
    historyModel.find(
        {username: username},
        function(err, doc) {
            if (err) {
                return callback(err);
            }
            callback(null, doc);
        });
};

module.exports = History;
module.exports.historyModel = historyModel;
