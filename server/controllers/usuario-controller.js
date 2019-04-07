const Usuario = require('../models/usuario-model');
const usuarioCtrl = {};

//usuario/registro
usuarioCtrl.registro = async(req, res) => {
    usuario = new Usuario(req.body);

    await usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }

        res.json({
            ok: true,
            usuarioDB
        });

    })

};
//usuario/registro
usuarioCtrl.registroAnonimo = async(req, res) => {
    usuario = new Usuario();

    await usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }

        res.json({
            ok: true,
            usuarioDB
        });
        usuario = usuarioDB;
    });

    return usuario;

};

usuarioCtrl.login = (req, res) => {
    let login = req.body;

    Usuario.findOne({ email: login.email, pass: login.pass }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }

        if (usuarioDB == undefined) {
            res.json({
                ok: false
            });
        } else {

            res.json({
                ok: true,
                usuarioDB
            });
        }
    })
};


//usuario/:id
usuarioCtrl.getUsuario = async(req, res) => {
    let _id = req.params.id;
    console.log(_id);
    await Usuario.findById({ _id }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }
        res.json({
            ok: true,
            usuarioDB
        })

    });
};


//usuario/
usuarioCtrl.getUsuarios = async(req, res) => {

    await Usuario.find({}, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }
        res.json(usuarioDB)

    });
};

usuarioCtrl.updateUsuario = (req, res) => {
    let usuario = new Usuario(req.body);
    //console.log(usuario._id);

    Usuario.findOneAndUpdate({ _id: usuario._id }, { $set: { nombre: usuario.nombre, email: usuario.email, telefono: usuario.telefono, pass: usuario.pass } }, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }
        res.json({
            ok: true,
            usuarioDB
        })
    });

};

module.exports = usuarioCtrl;