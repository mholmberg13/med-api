const mongoose = require('mongoose');

const printerSchema = new mongoose.Schema({
    name: String,
    print_limit: Number
});

const Printers = mongoose.model('Printer', printerSchema);