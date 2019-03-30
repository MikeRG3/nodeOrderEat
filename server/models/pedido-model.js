const mongoose = require('mongoose');

const { Schema } = mongoose;

const pedidoSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mesa: {
        type: Number,
        required: true
    },
    sesion: {
        type: Schema.Types.ObjectId,
        ref: 'Sesion',
        required: true
    },
    linea_pedido: [{
        platos: {
            type: Schema.Types.ObjectId,
            ref: 'Plato'
        },
        cantidad: {
            type: Number
        },
        precio: {
            type: Number
        },
        estado: {
            type: String,
            enum: ['Recibido', 'Cocinando', 'Preparado', 'Servido'],
            default: 'Recibido'
        }
    }],
    estado: {
        type: String,
        enum: ['Pendiente', 'Completado'],
        default: 'Pendiente'
    },
    pago: {
        type: Boolean,
        default: false
    },
    fecha: {
        type: Date,
        default: new Date()
    }
});


module.exports = mongoose.model('Pedido', pedidoSchema);