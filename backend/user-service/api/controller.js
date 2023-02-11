'use strict';
const mongoose = require('mongoose');
const properties = require('../package.json')
const { User, Search } = require('./model')
mongoose.connect('mongodb://mongo-container:27017/mydb', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
    console.log("we're connected!")
});

let controllers = {
    root: (_, res) => {
        res.send("Root endpoint")
    },
    getUser: (req, res) => {
        User.findOne({ username: req.params.username }, (err, user) => {
            if (err) return res.status(500).send("Something bad happened");
            res.send(user);
        })
    },
    getUsers: (_, res) => {
        User.find((err, users) => {
            if (err) return res.status(500).send("Something bad happened");
            res.send(users);
        });
    },
    addUser: (req, res) => {
        const user = new User(req.body);
        console.log(user);
        user.save((err) => {
            if (err) return res.status(500).send("Something bad happened");
            res.send("user added success");
        });
    },
    updateUser: (req, res) => {
        User.updateOne({ username: req.params.username }, req.body, (err, user) => {
            if (err) return res.status(500).send("Something bad happened");
            res.send(user);
        })
    },
    deleteUser: (req, res) => {
        User.deleteOne({ username: req.params.username }, (err) => {
            if (err) return res.status(500).send("Something bad happened");
            res.send(`user: ${req.params.username} deleted successfully`);
        })
    },
    getSearch: (req, res) => {
        Search.findOne({ productTitle: req.params.productTitle }, (err, search) => {
            if (err) return res.status(500).send("Something bad happened");
            res.send(search);
        })
    },
    getSearches: (_, res) => {
        Search.find((err, searches) => {
            if (err) return res.status(500).send("Something bad happened");
            res.send(searches);
        });
    },
    addSearch: (req, res) => {
        const search = new Search(req.body);
        console.log(search);
        search.save((err) => {
            if (err) return res.status(500).send("Something bad happened");
            res.send("search added success");
        });
    },
    updateSearch: (req, res) => {
        Search.updateOne({ productTitle: req.params.productTitle }, req.body, (err, search) => {
            if (err) return res.status(500).send("Something bad happened");
            res.send(search);
        })
    },
    deleteSearch: (req, res) => {
        Search.deleteOne({ productTitle: req.params.productTitle }, (err) => {
            if (err) return res.status(500).send("Something bad happened");
            res.send(`search for: ${req.params.productTitle} deleted successfully`);
        })
    }
};

module.exports = controllers;
