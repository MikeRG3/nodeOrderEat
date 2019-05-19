const _path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
//Borrar directorios no vacios
const rimraf = require("rimraf");

class FileSystem {

    constructor() {}

    guardarImagenTemporal(file, platoId) {

        let promesa = new Promise((resolve, reject) => {

            const path = this.crearCarpetaPlato(platoId);

            //Nombre archivo
            const nombreArchivo = this.generarNombre(file.name);

            //mover archiv

            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        });

        return promesa;
    }

    crearCarpetaPlato(platoId) {

        const pathPlato = _path.resolve(__dirname, '../uploads', platoId);
        const pathPlatoTemp = pathPlato + '/temp';

        //Borra el directorio
        rimraf.sync(_path.resolve(__dirname, '../uploads', platoId, 'posts'))


        const existe = fs.existsSync(pathPlato);
        console.log(existe);
        if (!existe) {
            fs.mkdirSync(pathPlato);
            fs.mkdirSync(pathPlatoTemp);
        }

        return pathPlatoTemp;
    }
    borrarDirectorio(platoId) {
        console.log(_path.resolve(__dirname, '../uploads', platoId));
        rimraf.sync(_path.resolve(__dirname, '../uploads', platoId))

    }
    generarNombre(nombreOriginal) {

        const nombreArray = nombreOriginal.split('.');
        const extension = nombreArray[nombreArray.length - 1];

        const nombreUnico = uniqid();

        return `${nombreUnico}.${extension}`;
    }

    imagenesaPost(platoId) {
        const pathPlatoTemp = _path.resolve(__dirname, '../uploads', platoId, 'temp');
        const pathPlatoPost = _path.resolve(__dirname, '../uploads', platoId, 'posts');

        if (!fs.existsSync(pathPlatoTemp)) {
            return [];
        }
        if (!fs.existsSync(pathPlatoPost)) {
            fs.mkdirSync(pathPlatoPost);
        }

        const imagenesTemp = this.obtenerImagenes(pathPlatoTemp, platoId);

        imagenesTemp.forEach(imagen => {
            fs.renameSync(`${pathPlatoTemp}/${imagen}`, `${pathPlatoPost}/${imagen}`)
        })

        return imagenesTemp;

    }

    obtenerImagenes(pathPlatoTemp) {

        return fs.readdirSync(pathPlatoTemp) || [];

    }

    getImg(platoId, img) {
        const pathPlatoPost = _path.resolve(__dirname, '../uploads', platoId, 'posts');
        // const existe = fs.existsSync( pathFoto );
        // if ( !existe ) {
        //     return path.resolve( __dirname, '../assets/400x250.jpg' );
        // }
        return `${pathPlatoPost}/${img}`;
    }
}

module.exports = FileSystem;