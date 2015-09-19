/**
 * Created by yves on 19/09/15.
 */

'use strict';
var _ = require('lodash'),
    mongoose = require('mongoose'),
    History = mongoose.model('History');

exports.record = function(req, res) {
    console.log(req.params);
    History.findOneAndUpdate({email: req.params.email},{$push: {date:Date.now(), activity:req.params.activity}},
    {upsert:true}, function(err,object){
        if (err) return res.send(500, { error: err });
        return res.send('succesfully saved');
    });


};

exports.getHistory = function(req, res) {
	History.find({email: req.params.email}, function(err, history) {
		if (err) return res.send(500, {error: err});
		res.send(history);
	});
};
