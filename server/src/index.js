const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const Utils = require('./services/db');
app.use(bodyParser.json())

function serve() {
    app.get('/ohms/ohm-details/:id', async (req, res) => {
        const ohm = await Utils.getOhmById(req.params.id);
        res.send(ohm);
    })

    app.get('/ohms/order/:trackingId', async (req, res) => {
        const ohm = await Utils.getOrderByTrackingId(req.params.trackingId);
        res.send(ohm);
    })

    app.get('/ohms/update-order/:trackingId', async (req, res) => {
        const ohm = await Utils.progressOrder(req.params.trackingId);
        res.send(ohm);
    })

    app.post('/ohms/conclude-order/:trackingId', async (req, res) => {
        const ohm = await Utils.concludeOrder(req.params.trackingId, req.body);
        res.send(ohm);
    })

    app.listen(3000, () => console.log('listening on port 3000'));
}

serve();