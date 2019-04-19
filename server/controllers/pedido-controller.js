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

module.exports = pedidoCtrl;