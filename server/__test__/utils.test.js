const utils = require('../src/services/db');
const commons = require('../config/commons.json');

describe('db return ohm', () => {
    test('returns Ohm object', () => {
        expect(utils.getOhmById('1')).toBeDefined();
    });

    test('has a valid history', async () => {
        const ohm = await utils.getOhmById('1');
        const isValidStatus = commons.statuses.includes(ohm.history[0].state)
        expect(isValidStatus).toBe(true);
    });
})
