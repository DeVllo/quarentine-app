const express = require('express');
const router = express.Router();

const { format } = require('timeago.js');

const helpers = {};

helpers.timeago = (timestamp) => {
    return format(timestamp)
}

module.exports = helpers;