const Mesa = require('../models/mesa-model');
const mesaCtrl = {};

//carta
mesaCtrl.crearMesa = async(req, res) => {
    let numero = req.params.numero;
    let mesasDB = [];
    for (let i = 1; i <= numero; i++) {

        mesasDB.push(new Mesa({
            numero: i,
        }));


    }
    await Mesa.insertMany(mesasDB, (err, mesaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }

        res.json({
            ok: true,
            mesasDB
        })
    })


};

//carta/

mesaCtrl.getMesas = async(req, res) => {
    await Mesa.find((err, mesaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }

        res.json({
            ok: true,
            mesaDB
        });

    })

}

mesaCtrl.mesaOcupada = (numero) => (
    new Promise((resolve, reject) => {
        let estado;
        Mesa.find({ numero: numero }, { estado: 1 }, (err, mesaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err.message
                });
            }
            resolve(mesaDB[0].estado);

        })
    })

);

mesaCtrl.ocuparMesa = (numero) => (
    new Promise((resolve, reject) => {
        Mesa.findOneAndUpdate({ numero: numero }, { estado: "Ocupada" }, (err, mesaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err.message
                });
            }
            resolve(true)
        })
    })
)

mesaCtrl.liberarMesa = (numero) => (
    new Promise((resolve, reject) => {
        Mesa.findOneAndUpdate({ numero: numero }, { estado: "Libre" }, { new: true }, (err, mesaDB) => {
            if (err) {
                relsove("error");
            }

            resolve(mesaDB.estado)
        })
    })
)

mesaCtrl.cargarMesas = (req, res) => {

    Mesa.find({ estado: "Libre" }, (err, mesaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }

        res.json({
            ok: true,
            mesaDB
        });
    });
}



module.exports = mesaCtrl;