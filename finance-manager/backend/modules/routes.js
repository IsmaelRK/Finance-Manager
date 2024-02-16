const express = require('express')
const app = express()

const {getSubtotalFromDb} = require("./routeModules/getSubtotalFromDb");
const {getTotalFromDb} = require("./routeModules/getTotalFromDb");
const {updateTotalOnDb} = require("./routeModules/updateTotalOnDb");
const {createTransaction} = require("./routeModules/createTransaction");
const {getTransactionsFromDb} = require("./routeModules/getTransactionsFromDb");
const {updateTransaction} = require("./routeModules/updateTransaction");
const {deleteTransaction} = require("./routeModules/deleteTransaction");

function buildRoutes() {

    const routes = [

        {
            requestType: app.get,
            uri: '/get-subtotal',
            executeFunction: getSubtotalFromDb

        },

        {
            requestType: app.get,
            uri: '/get-total',
            executeFunction: getTotalFromDb

        },

        {
            requestType: app.put,
            uri: '/update-total/:total',
            executeFunction: updateTotalOnDb

        },

        {
            requestType: app.post,
            uri: '/transactions',
            executeFunction: createTransaction

        },

        {
            requestType: app.get,
            uri: '/transactions',
            executeFunction: getTransactionsFromDb

        },

        {
            requestType: app.put,
            uri: '/transactions/:id',
            executeFunction: updateTransaction

        },

        {
            requestType: app.delete,
            uri: '/transactions/:id',
            executeFunction: deleteTransaction

        }

    ]

    return routes

}

module.exports = {buildRoutes}