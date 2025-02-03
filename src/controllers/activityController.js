const Activity = require('../models/activityModel');

const ActivityController = {
    create: (req, res) => {
        const { userId, categoryId, description, startTime, endTime } = req.body;

        Activity.create(userId, categoryId, description, startTime, endTime, (error, result) => {
            if (error) {
                console.error('Erro ao criar a atividade:', error);  // LOG DO ERRO
                return res.status(500).send('Erro ao criar a atividade.');
            }
            res.status(201).send({ message: 'Atividade criada com sucesso!' });
        });
    },

    getAllByUser: (req, res) => {
        const { userId } = req.params;

        Activity.getAllByUser(userId, (error, results) => {
            if (error) {
                console.error('Erro ao criar a atividade:', error);  // LOG DO ERRO
                return res.status(500).send('Erro ao criar a atividade.');
            }
            res.status(200).send(results);
        });
    }
};

module.exports = ActivityController;
