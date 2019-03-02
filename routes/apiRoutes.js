const User = require('../models/user');
const Kudo = require('../models/kudo');

module.exports = function(app) {

    app.get('/api/user', function(req, res) {
        User.find({}).populate('noteTo').populate('noteFrom')
        .then(function(userList) {
            res.json(userList);
        }).catch(function(err) {
            res.json(err);
        });
    });

    app.post('/api/user', function(req, res) {
        User.create(req.body).then(function(newUser) {
            res.json(newUser);
        }).catch(function(err) {
            res.json(err);
        });
    });

    app.get('/api/kudo', function(req, res) {
        Kudo.find({}).populate('toUser').populate('fromUser')
        .then(function(kudoList) {
            res.json(kudoList);
        }).catch(function(err) {
            res.json(err);
        });
    });

    app.post('/api/kudo', function(req, res) {
        const toId = req.body.toId;
        const fromId = req.body.fromId;
        const newEntry = {
            title: req.body.title,
            body: req.body.body,
            fromUser: req.body.fromId,
            toUser: req.body.toId
        };
        let newKudoId;
        Kudo.create(newEntry).then(function(kudoData) {
            newKudoId = kudoData._id;
            return User.findOneAndUpdate({_id: toId}, {$push: {noteTo: newKudoId} }, {new: true});
        }).then(function(toData) {
            return User.findOneAndUpdate({_id: fromId}, {$push: {noteFrom: newKudoId} }, {new: true});
        }).then(function(fromData) {
            res.json(fromData);
        }).catch(function(err) {
            res.json(err);
        });
    });

    app.delete('/api/kudo', function(req, res) {
        Kudo.findByIdAndDelete(req.body).then(function(res) {
            res.json(res);
        }).catch(function(err) {
            res.json(err);
        })
    })
};