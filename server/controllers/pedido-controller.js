const Pedido = require('../models/pedido-model');
const pedidoCtrl = {};

pedidoCtrl.crearPedido = async(req, res) => {
    let pedido = new Pedido(req.body);


    await pedido.save((err, pedidoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }
        res.json({
            ok: true,
            pedidoDB
        })
    })
};

pedidoCtrl.getPedido = async(req, res) => {
    let id = req.query.id;
    Pedido.findById({ _id: id })
        .populate('usuario')
        .populate('sesion')
        .populate('linea_pedido.plato')
        .exec((err, pedidoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err.message
                });
            }

            res.json({
                ok: true,
                pedidoDB
            })
        })

}


//Muestra los pedidos realizados en una misma sesion
pedidoCtrl.getPedidoSesion = async(req, res) => {
    let sesion = req.params.sesion;
    Pedido.find({ sesion })
        .populate('linea_pedido.plato')
        .exec((err, pedidoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err.message
                });
            }

            res.json({
                ok: true,
                pedidoDB
            })
        })

}
pedidoCtrl.getPedidos = async(req, res) => {

    Pedido.find({ estado: 'Pendiente' })
        .populate('linea_pedido.plato')
        .exec((err, pedidoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err.message
                });
            }

            res.json({
                ok: true,
                pedidoDB
            })
        })

}

//Muestra los pedidos que se han realizado en la fecha actual en la que se solicita
pedidoCtrl.getPedidoCurso = async(req, res) => {

    let fecha = new Date().toLocaleDateString();
    let usuario = req.params.usuario;


    Pedido.find({ usuario: usuario, fecha: fecha })
        .populate('linea_pedido.plato')
        .exec((err, pedidoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err.message
                });
            }

            res.json({
                ok: true,
                pedidoDB
            })
        })

}

pedidoCtrl.getHistorial = async(req, res) => {

    let usuario = req.params.usuario;

    Pedido.find({ usuario: usuario })
        .populate('linea_pedido.plato')
        .exec((err, pedidosDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err.message
                });
            }

            res.json({
                ok: true,
                pedidosDB
            })
        })
}

pedidoCtrl.actualizarEstadoPedido = async(pedido) => {


    let estado = 'Completado';

    await Pedido.findOneAndUpdate({ _id: pedido }, { $set: { estado: estado } }, { new: true }, (err, platoDB) => {
        if (err) {
            console.log("Error al actualizar pedido");
        }

        console.log("Pedido completado");
    })
}
pedidoCtrl.actualizarEstadoLineaPedido = async(req, res) => {

    let pedido = req.body.pedido;
    let plato = req.body.plato;
    let estado = req.body.estado;

    await Pedido.findOneAndUpdate({ _id: pedido, 'linea_pedido._id': plato }, { $set: { 'linea_pedido.$.estado': estado } }, { new: true }, (err, platoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }

        //Si todos los platps  estan servidos, se cambia el estado del pedido a COMPLETADO
        let servido = 0;
        platoDB.linea_pedido.forEach(linea => {
            if (linea.estado == 'Servido') {
                servido++;
            }
        });

        if (servido == platoDB.linea_pedido.length) {
            pedidoCtrl.actualizarEstadoPedido(platoDB._id)
        }


        res.json({
            ok: true,
            platoDB
        });
    })
}

module.exports = pedidoCtrl;