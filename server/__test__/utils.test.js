const utils = require('../src/services/db');
const lang = require('../lang/index');

describe('db return ohm', () => {
    test('returns Ohm object', () => {
        expect(utils.getOhmById('1')).toBeDefined();
    });

    test('has a valid history', async () => {
        const ohm = await utils.getOhmById('1');
        const isValidStatus = lang.statuses.includes(ohm.history[0].state)
        expect(isValidStatus).toBe(true);
    });
})
