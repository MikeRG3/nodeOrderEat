const Plato = require('../models/plato-model');
const platoCtrl = {};

const FileSystem = require('../classes/FileSystem');

//carta
platoCtrl.crearPlato = async(req, res) => {
    plato = new Plato(req.body);
    console.log(req.body);

    subirImagen(req.files, plato._id + "").then(() => {
            const fileSystem = new FileSystem();
            const imagenes = fileSystem.imagenesaPost(plato._id + "");

            plato.imagenes = imagenes;


            plato.save((err, platoDB) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        error: err.message
                    });
                }

                res.json({
                    ok: true,
                    platoDB
                });

            })
        })
        .catch((err) => {

            res.status(400).json({
                ok: false,
                error: err.message
            });
        });

};

platoCtrl.modificarPlato = async(req, res) => {

    plato = new Plato(req.body);

    let update = {
        $set: {
            nombre: plato.nombre,
            precio: plato.precio,
            descripcion: plato.descripcion,
            menu: plato.menu,
            sugerencia: plato.sugerencia,
            "categoria.orden": plato.categoria.orden,
            "categoria.tipo": plato.categoria.tipo

        }
    };
    if (req.files) {
        console.log("Sube imagen");
        subirImagen(req.files, plato._id + "").then(() => {
                const fileSystem = new FileSystem();
                const imagenes = fileSystem.imagenesaPost(plato._id + "");

                update.$set.imagenes = imagenes;
                console.log(update);

                Plato.findOneAndUpdate({ _id: plato._id }, update, { new: true }, (err, platoDB) => {
                    if (err) {
                        return res.status(400).json({
                            ok: false,
                            error: err.message
                        });
                    }

                    res.json({
                        ok: true,
                        platoDB
                    });

                })
            })
            .catch((err) => {

                res.status(400).json({
                    ok: false,
                    error: err.message
                });
            });
    } else {

        Plato.findOneAndUpdate({ _id: plato._id }, update, { returnNewDocument: true }, (err, platoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err.message
                });
            }

            res.json({
                ok: true,
                platoDB
            });

        })
    }

};

function subirImagen(archivo, platoId) {
    console.log(archivo.imagenes);
    return new Promise(async(resolve, reject) => {

        if (!archivo) {

            reject("No se subió ningun archivo");
        }

        const file = archivo.imagenes;

        if (!file) {

            reject("No se subió ningun archivo de tipo imagen");
        }

        if (!file.mimetype.includes('image')) {

            reject("No se subió ningun archivo de tipo imagen");
        }

        const fileSystem = new FileSystem();

        await fileSystem.guardarImagenTemporal(file, platoId);

        resolve()
    })

}

platoCtrl.eliminarPlato = async(req, res) => {
    let plato = req.body;
    const fileSystem = new FileSystem();
    console.log(plato);
    fileSystem.borrarDirectorio(plato._id);

    Plato.findByIdAndDelete({ _id: plato._id }, (err, platoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }

        res.json({
            ok: true,
            platoDB
        });
    })
}

platoCtrl.getImagen = async(req, res) => {
    platoId = req.query.id;
    img = req.query.img;
    const fileSystem = new FileSystem();
    pathImg = fileSystem.getImg(platoId, img);
    console.log(pathImg);
    // res.json({
    //         img: pathImg
    //     })
    res.sendFile(pathImg);

}


platoCtrl.getPlatos = async(req, res) => {

    await Plato.find((err, platoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }

        res.json({
            ok: true,
            platoDB
        });

    })

}

platoCtrl.getPlato = async(req, res) => {
    let id = req.query.id;
    await Plato.find({ _id: id }, (err, platoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }

        res.json({
            ok: true,
            platoDB
        });

    })

}

//Sacamos todas las categorias de los platos segun Orden
platoCtrl.categoriaOrden = async(req, res) => {

    await Plato.distinct("categoria.orden", (err, orden) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }

        res.json({
            ok: true,
            orden
        });
    })
}

//Sacamos todas las categorias de los platos segun TIPO
platoCtrl.categoriaTipo = async(req, res) => {

    await Plato.distinct("categoria.tipo", (err, orden) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }

        res.json({
            ok: true,
            orden
        });
    })
}

//Plato por categoria
platoCtrl.platosCategoria = async(req, res) => {
    let categoria = req.query.categoria;
    console.log(req.query);
    await Plato.find({ $or: [{ "categoria.orden": categoria }, { "categoria.tipo": categoria }] }, (err, platoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }

        res.json({
            ok: true,
            platoDB
        });
    })
}

platoCtrl.getMenu = async(req, res) => {


    await Plato.find({ menu: true })
        .sort({ 'categoria.orden': 1 })
        .exec((err, platoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err.message
                });
            }
            console.log(platoDB);
            res.json({
                ok: true,
                platoDB
            });
        })
}

platoCtrl.getSugerencias = async(req, res) => {

    await Plato.find({ sugerencia: true }, (err, platoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err.message
            });
        }

        res.json({
            ok: true,
            platoDB
        });
    })
}



module.exports = platoCtrl;