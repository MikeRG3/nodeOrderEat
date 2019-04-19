const mongoose = require('mongoose');

const { Schema } = mongoose;

const sesionSchema = new Schema({
    mesa: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: String,
        enum: ['Abierta', 'Cerrada'],
        default: 'Abierta'
    },
    fecha: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    hora: {
        type: String,
        default: new Date().toLocaleTimeString()
    }

});


module.exports = mongoose.model('Sesion', sesionSchema);