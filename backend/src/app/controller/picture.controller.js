const Picture = require('../models/Picture');
const User = require('../models/User');
const Evento = require('../models/Evento')
const pictureService = require('../services/picture.service');
const { userInfo } = require('os');


const createPicture = async (req, res) => {


    try {
       
        const {name} = req.body;   
        const file = req.file;

        const picture = new Picture({
            name,
            src: file.path,
        });
        console.log(req.body.referenciaEvento);
        console.log(req.body.referenciaUser);
        if (req.body.referenciaEvento){
            const evento = await Evento.findById(req.body.referenciaEvento);
            if(!evento){
                res.status(400).send({ message: "Não foi possível encontrar o evento" });
                return;
            }
            evento.imagem = picture.src;
            await evento.updateOne(evento);

        }
        if(req.body.referenciaUser){
            const user = await User.findById(req.body.referenciaUser);
            if(!user){
                res.status(400).send({ message: "Não foi possível encontrar o usuário" });
                return;
            }
            user.avatar = picture.src;
            await user.updateOne(user);
        }

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

    const picture = await Picture.findPictureById(id);

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

    const picture = await Picture.findByIdAndUpdate(id, req.body, req.file);

    if (!picture) {
        res.status(400).send({ message: "Não foi possível encontrar a imagem" });
        return;
    }

    res.status(200).send({ message: "Imagem atualizada com sucesso" });
};

module.exports = { createPicture, findAllPictures, findPictureById, deletePicture, updatePicture };