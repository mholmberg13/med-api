const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderer_name: {type: String, required: true},
    order_email: {type: String, required: true},
    product_amount: {type: Number, required: true},
    street_address: {type: String, required: true},
    city: {type: String, required: true},
    state_region: {type: String, required: true},
    country: {type: String, required: true}
});

module.exports = Order = mongoose.model('order', OrderSchema);