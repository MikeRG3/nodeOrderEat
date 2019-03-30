const mongoose = require('mongoose');

const { Schema } = mongoose;

const mesaSchema = new Schema({
    numero: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['Libre', 'Ocupada'],
        default: 'Libre'
    }
});


module.exports = mongoose.model('Mesa', mesaSchema);