const Activity = require('../models/activityModel');

const ActivityController = {
    create: (req, res) => {
        const { userId, categoryId, description, startTime, endTime } = req.body;

        // 1. Obter todos os IDs existentes
        Activity.getAllIds((err, results) => {
            if (err) {
                console.error('Erro ao buscar IDs de atividades existentes:', err);  // LOG DO ERRO
                return res.status(500).send('Erro ao buscar IDs de atividades existentes.');
            }

            // 2. Encontrar o menor ID disponível
            let nextId = 1;  // Começa no 1º se não houver atividades
            if (results.length > 0) {
                for (let i = 0; i < results.length; i++) {
                    if (results[i].id !== nextId) {
                        break;  // Se houver uma lacuna, utiliza-a
                    }
                    nextId++;
                }
            }

            // 3. Criar a atividade com o ID correto
            Activity.create(nextId, userId, categoryId, description, startTime, endTime, (error, result) => {
                if (error) {
                    console.error('Erro ao criar a atividade:', error);  // LOG DO ERRO
                    return res.status(500).send('Erro ao criar a atividade.');
                }
                res.status(201).send({ message: 'Atividade criada com sucesso!', activityId: nextId });
            });
        });
    },

    getAllByUser: (req, res) => {
        const { userId } = req.params;

        Activity.getAllByUser(userId, (error, results) => {
            if (error) {
                console.error('Erro ao buscar atividades do utilizador:', error);  // LOG DO ERRO
                return res.status(500).send('Erro ao buscar atividades do utilizador.');
            }
            res.status(200).send(results);
        });
    }
};

module.exports = ActivityController;