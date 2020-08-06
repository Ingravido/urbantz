const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync('db.json');
const config = require('../../config/db.config.json');
const lang = require('../../lang/index');

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
    return _db.get('ohms')
        .find({trackingId});
}

async function progressOrder(trackingId) {
    const orderToUpdateObj = await getOrderByTrackingId(trackingId);

    const orderToUpdateValues = orderToUpdateObj
        .value()

    const actualStatus = orderToUpdateValues.status;

    let actualStatusId = lang.STATUSES.indexOf(actualStatus)
    const newStateId = ++actualStatusId;

    if (newStateId > lang.STATUSES.length - 1) {
        return orderToUpdateObj;
    }

    const newState = lang.STATUSES[newStateId];
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

async function concludeOrder(trackingId, propertiesToUpdate) {
    const orderToUpdateObj = await getOrderByTrackingId(trackingId);

    return orderToUpdateObj
        .assign(propertiesToUpdate)
        .value()
}

module.exports = { getOhmById, getOrderByTrackingId, progressOrder, concludeOrder }