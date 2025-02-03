const Media = require('../models/mediaModel');

const MediaController = {
    upload: (req, res) => {
        const { activityId } = req.body;
        const file = req.file;

        if (!file) {
            console.error('Nenhum ficheiro foi enviado.');  // LOG DO ERRO
            return res.status(400).send('Nenhum ficheiro foi enviado.');
        }

        Media.create(activityId, file.path, file.mimetype.startsWith('image') ? 'image' : 'video', (error, result) => {
            if (error) {
                console.error('Erro ao guardar o ficheiro:', error);  // LOG DO ERRO
                return res.status(500).send('Erro ao guardar o ficheiro.');
            }
            res.status(201).send({ message: 'Ficheiro carregado com sucesso!' });
        });
    },

    getByActivityId: (req, res) => {
        const { activityId } = req.params;

        Media.getByActivityId(activityId, (error, results) => {
            if (error) {
                console.error('Erro ao buscar os ficheiros:', error);  // LOG DO ERRO
                return res.status(500).send('Erro ao buscar os ficheiros.');
            }
            res.status(200).send(results);
        });
    }
};

module.exports = MediaController;
