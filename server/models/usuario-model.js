const mongoose = require('mongoose');
const { Schema } = mongoose;

const Plato = mongoose.model("Plato")

const UsuarioSchema = new Schema({
    nombre: {
        type: String
            // ,
            // required: [true, 'Nombre requerido']
    },
    // apellidos: {
    //     type: String,
    //     required: [true, 'Apellidos requeridos']
    // },
    // dni: {
    //     type: String,
    //     required: [true, 'DNI requerido'],
    //     unique: true
    // },
    email: {
        type: String,
        required: [true, 'Email requerido'],
        unique: true,
        default: new Date().getTime()
    },
    telefono: {
        type: Number,
        // required: [true, 'Teléfono requerido'],
        min: 600000000,
        max: 799999999
    },
    pass: {
        type: String
            // ,
            // required: [true, 'Contraseña requerida']
    },
    favoritos: [{

        plato: {
            type: Schema.ObjectId,
            ref: "cartas"
        }

    }],
    pago: {

    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);