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
        plato: {
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
    total: {
        type: Number,
    },
    fecha: {
        type: String,
        default: new Date().toDateString()
    },
    hora: {
        type: String,
        default: new Date().toTimeString()
    }
});


module.exports = mongoose.model('Pedido', pedidoSchema);