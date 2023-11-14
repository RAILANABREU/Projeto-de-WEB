const Picture = require('../models/Pictures');


const createPicture = async (req, res) => {


    try {
       
        const {name} = req.body;
        const file = req.file;

        const picture = new Picture({
            name,
            src: file.path,
        });

        await picture.save();
        res.status(201).send({ message: "Imagem cadastrada com sucesso",
        picture: {
            _id: picture._id,
            nome: picture.name,
            src: picture.src,
        }
    });

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Não foi possível cadastrar a imagem" });
        return;
    };
}

const findAllPictures = async (req, res) => {
    const pictures = await Picture.find();

    if (!pictures) {
        res.status(400).send({ message: "Não foi possível encontrar imagens" });
        return;
    }

    res.status(200).send(pictures);
};

const findPictureById = async (req, res) => {
    const { id } = req.params;

    const picture = await Picture.findById(id);

    if (!picture) {
        res.status(400).send({ message: "Não foi possível encontrar a imagem" });
        return;
    }

    res.status(200).send(picture);
};

const deletePicture = async (req, res) => {
    const { id } = req.params;

    const picture = await Picture.findByIdAndDelete(id);

    if (!picture) {
        res.status(400).send({ message: "Não foi possível encontrar a imagem" });
        return;
    }

    res.status(200).send({ message: "Imagem excluída com sucesso" });
};

const updatePicture = async (req, res) => {
    const { id } = req.params;
    const { name, file } = req.body;

    if (!name || !file) {
        res.status(400).send({ message: "Todos os campos são obrigatórios" });
        return;
    }

    const picture = await Picture.findByIdAndUpdate(id, req.body);

    if (!picture) {
        res.status(400).send({ message: "Não foi possível encontrar a imagem" });
        return;
    }

    res.status(200).send({ message: "Imagem atualizada com sucesso" });
};

module.exports = { createPicture, findAllPictures, findPictureById, deletePicture, updatePicture };