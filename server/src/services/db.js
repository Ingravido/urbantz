const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('db.json');
const config = require('../../config/db.config.json');
const commons = require('../../config/commons.json');

const db = (async () => {
  const _db = await low(adapter);
  await _db.defaults(config).write();
  return _db;
})()

async function getOhmById(id) {
    const _db = await db;
    const ohm = _db.get('ohms')
        .find({ id })
        .value()

    return ohm;
}

async function getOrderByTrackingId(trackingId) {
    const _db = await db;
    const ohm = _db.get('ohms')
        .find({ trackingId })
        .value()

    return ohm;
}

async function progressOrder(trackingId) {
    const _db = await db;

    const orderToUpdateObj = _db.get('ohms')
        .find({ trackingId });

    const orderToUpdateValues = orderToUpdateObj
        .value()

    const actualStatus = orderToUpdateValues.status;

    let actualStatusId = commons.statuses.indexOf(actualStatus)
    const newStateId = ++actualStatusId;

    if (newStateId > commons.statuses.length - 1) {
        return orderToUpdateObj;
    }

    const newState = commons.statuses[newStateId];
    const actualHistory = orderToUpdateValues.history

    const timestamp = `${Math.trunc( new Date().getTime() / 10000 )}`;

    actualHistory.push({
        state: newState,
        at: timestamp
    });

    const propertiesToUpdate = {
        status: newState,
        history: actualHistory
    };

    const ohm = orderToUpdateObj
        .assign(propertiesToUpdate)
        .value()

    return ohm;
}

module.exports = { getOhmById, getOrderByTrackingId, progressOrder }