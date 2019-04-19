const Sesion = require('../models/sesion-model');
const Mesa = require('../models/mesa-model');
const Usuario = require('../models/usuario-model');
const sesionCtrl = {};
const usuarioCtrl = require('../controllers/usuario-controller');
const mesaCtrl = require('../controllers/mesa-controller');


sesionCtrl.getSesion = async(req, res) => {

    Sesion.find({})
        .populate('mesa')
        .exec((err, sesionDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err.message
                });
            }

            res.json({
                ok: true,
                sesionDB
            })
        })

};

//Devuelve la sesion activa de una mesa en concreto
sesionCtrl.getSesionMesa = async(req, res) => {
    let mesa = req.params.mesa;

    Sesion.findOne({ 'mesa': mesa, 'estado': 'Abierta' })

    .exec((err, sesionDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }

        res.json({
            ok: true,
            sesionDB
        })
    })

};
sesionCtrl.crearSesion = async(req, res) => {
    let body = req.body;

    //Comprobamos que la mesa en la que se ha abierto sesion está libre u ocupada
    let mesaEstado = await mesaCtrl.mesaOcupada(body.mesa);

    if (mesaEstado == 'Libre') {
        //Si esta libre, la pasamos a ocupada y registramos la sesion,
        console.log("Ocupando mesa: ", await mesaCtrl.ocuparMesa(body.mesa));

        let sesion = new Sesion(body);

        //Si el usuario es la primera vez que utiliza la app, se crea un nuevo
        if (body.usuario == '') {
            //Creamos un usuario vacio
            usuario = new Usuario();

            await usuario.save((err, usuarioDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        error: err.message
                    });
                }
                usuario = usuarioDB;
            });
            //Modificamos el id de usuario que viene por defecto vacio, por el nuevo generado
            sesion.usuario = usuario._id;


        }
        //Si el usuario está registrado, en el body ya se encuentra el id, asi que almacenamos los datos de la sesion

        await sesion.save((err, sesionDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err.message
                });
            }

            res.json({
                ok: true,
                sesionDB
            });
        })
    } else {
        res.json({
            ok: false,
            message: "Mesa ocupada"
        })
    }

    //Si el usuario ya está registrado, se utiliza su id almacenado

    //usuarioCtrl.registroAnonimo(req);
    // console.log(usuario);

};

sesionCtrl.cerrarSesion = async(req, res) => {

    let body = req.body;
    let cerrar = new Promise((resolve, reject) => {
            Sesion.findOneAndUpdate({ _id: body.sesion }, { estado: "Cerrada" }, { new: true }, (err, sesionDB) => {
                if (err) {
                    reject(false)
                }

                resolve(sesionDB.estado)
            })
        }

    );

    let liberarMesa = await mesaCtrl.liberarMesa(body.mesa);
    let cierraSesion = await cerrar;
    res.json({
        sesion: cierraSesion,
        mesa: liberarMesa
    })

};
//Cierra sesiones abiertas y libera mesas ocupadas
sesionCtrl.liberar = async(req, res) => {

    let cerrarSesiones = new Promise((resolve, reject) => {
        Sesion.updateMany({ estado: "Abierta" }, { estado: "Cerrada" }, { new: true }, (err, sesionDB) => {
            if (err) {
                reject(err)
            }

            resolve(sesionDB)
        })
    });

    let liberarMesas = new Promise((resolve, reject) => {
        Mesa.updateMany({ estado: "Ocupada" }, { estado: "Libre" }, { new: true }, (err, mesaDB) => {
            if (err) {
                reject(err)
            }

            resolve(mesaDB)
        })
    });

    res.json({
        ok: true,
        mesas: await liberarMesas,
        sesiones: await cerrarSesiones
    })

}
sesionCtrl.liberarMesa = async(req, res) => {
    let mesa = req.params.mesa;

    let cerrarSesiones = new Promise((resolve, reject) => {
        Sesion.update({ estado: "Abierta", mesa: mesa }, { estado: "Cerrada" }, { new: true }, (err, sesionDB) => {
            if (err) {
                reject(err)
            }

            resolve(sesionDB)
        })
    });

    let liberarMesas = new Promise((resolve, reject) => {
        Mesa.update({ numero: mesa }, { estado: "Libre" }, { new: true }, (err, mesaDB) => {
            if (err) {
                reject(err)
            }

            resolve(mesaDB)
        })
    });

    res.json({
        ok: true,
        mesas: await liberarMesas,
        sesiones: await cerrarSesiones
    })

}


//comprueba sesion activa del usuario
sesionCtrl.compruebaSesion = async(req, res) => {

    let usuario = req.params.usuario;

    Sesion.findOne({ usuario: usuario, estado: "Abierta" }, (err, sesionDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }

        let existe;
        if (sesionDB == null) {
            existe = false;
        } else {
            existe = true;
        }

        res.json({
            ok: true,
            existe,
            sesionDB
        })
    });


}



// sesionCtrl.cierraSesion = (id) =>(
//     new Promise(
//         //     Sesion.findOneAndUpdate({ _id: sesion }, { estado: "Cerrada" }, (err, sesionDB) => {
//         //         if (err) {
//         //             return res.status(400).json({
//         //                 ok: false,
//         //                 error: err.message
//         //             });
//         //         }

//         //         resolve(true)
//         //     })
// )

module.exports = sesionCtrl;