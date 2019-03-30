const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlatoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido']
    },
    precio: {
        type: Number,
        required: [true, 'Precio requerido']
    },
    ingredientes: [{
        nombre: { type: String },
        alergeno: { type: String }
    }],
    categoria: {
        orden: {
            type: String,
            required: [true, 'Categoria orden requerida'],
            enum: ['Entrante', 'Primer Plato', 'Segundo Plato', 'Postre', 'Bebida'],
        },
        tipo: {
            type: String,
            required: [true, 'Categoria tipo requerida'],
            enum: ['Embutidos', 'Ensaladas', 'Pastas/Arroces', 'Sopas', 'Pizzas', 'Bocadillos', 'Carnes', 'Pescados', 'Vinos', 'Cervezas', 'Refrescos', 'Postre'],
        }
    },
    descripcion: {
        type: String

    },
    imagenes: [{
        type: String
    }],
    sugerencia: {
        type: Boolean,
        default: false
    },
    menu: {
        type: Boolean,
        default: false
    },
    fav: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Plato', PlatoSchema);


// {
// 	"nombre":"spaghettis",
// 	"precio":23,
// 	"ingredientes":[
// 		{
// 		"nombre":"pasta",
// 		"alergeno":"gluten"
// 		},
// 		{
// 		"nombre":"chorizo",
// 		"alergeno":"carne"
// 		}
// 	],
// 	"categoria":{
// 		"orden":"Primer Plato",
// 		"tipo":"Pastas/Arroces"
// 	}
// }