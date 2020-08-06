const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('db.json');
const config = require('../../config/db.config.json');
const lang = require('../components/multilanguage');

let dbService;

(async () => {
    dbService = await initDB();
})()

async function initDB() {
    const db = await low(adapter);
    await db.defaults(config).write();

    return db;
}

async function getOhmById(id) {
    const ohm = dbService.get('ohms')
        .find({ id })
        .value()

    return ohm;
}

async function getOrderByTrackingId(trackingId) {
    return dbService.get('ohms')
        .find({trackingId});
}

function getNextStatus(actualStatus) {
    let actualStatusId = lang.STATUSES.indexOf(actualStatus)
    const newStateId = ++actualStatusId;
    return newStateId;
}

function getUpdatedHistoryField(orderToUpdateValues, newState) {
    const timestamp = `${Math.trunc(new Date().getTime() / 10000)}`;

    orderToUpdateValues.history.push({
        state: newState,
        at: timestamp
    });
    return orderToUpdateValues.history;
}

async function progressOrder(trackingId) {
    const orderToUpdateObj = await getOrderByTrackingId(trackingId);

    const orderToUpdateValues = orderToUpdateObj
        .value()

    const actualStatus = orderToUpdateValues.status;
    const newStateId = getNextStatus(actualStatus);

    if (newStateId > lang.STATUSES.length - 1) {
        return orderToUpdateObj;
    }

    const newState = lang.STATUSES[newStateId];

    const updatedHistory = getUpdatedHistoryField(orderToUpdateValues, newState);

    const propertiesToUpdate = {
        status: newState,
        history: updatedHistory
    };

    const ohm = orderToUpdateObj
        .assign(propertiesToUpdate)
        .value()

    return ohm;
}

async function concludeOrder(trackingId, params) {
    const orderToUpdateObj = await getOrderByTrackingId(trackingId);
    const updatedHistory = getUpdatedHistoryField(orderToUpdateObj.value(), params.status);

    return orderToUpdateObj
        .assign({
            status: params.status,
            history: updatedHistory
        })
        .value()
}

module.exports = { getOhmById, getOrderByTrackingId, progressOrder, concludeOrder }