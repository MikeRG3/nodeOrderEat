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
        .populate('linea_pedido.platos')
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

module.exports = pedidoCtrl;