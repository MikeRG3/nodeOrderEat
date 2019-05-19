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

    await Usuario.findById({ _id })
        .populate('favoritos')
        .exec((err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err.message
                });
            }
            console.log(usuarioDB);
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
usuarioCtrl.getFav = async(req, res) => {

    let usuario = req.params.usuario;

    Usuario.findById({ _id: usuario })
        //.populate('favoritos')
        .exec((err, usuarioDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err.message
                });
            }

            res.json({
                ok: true,
                favoritos: usuarioDB.favoritos
            })
        })
}

usuarioCtrl.updateFav = async(req, res) => {
    let usuario = req.body.usuario;
    let favoritos = req.body.favoritos;
    console.log(favoritos);

    Usuario.findOneAndUpdate({ _id: usuario }, { $set: { "favoritos": favoritos } }, { new: true }, (err, usuarioDB) => {
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
    })
}

module.exports = usuarioCtrl;