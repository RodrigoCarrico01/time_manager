const Media = require('../models/mediaModel');
const path = require('path');
const fs = require('fs');

const MediaController = {
    upload: (req, res) => {
        const { activityId } = req.body;
        const file = req.file;

        if (!file) {
            console.error('Nenhum ficheiro foi enviado.');  // LOG DO ERRO
            return res.status(400).send('Nenhum ficheiro foi enviado.');
        }

        // Determina a extensão correta do ficheiro
        const fileExtension = path.extname(file.originalname);
        const newFilePath = `${file.path}${fileExtension}`;

        // Renomeia o ficheiro para incluir a extensão correta
        fs.rename(file.path, newFilePath, (err) => {
            if (err) {
                console.error('Erro ao renomear o ficheiro:', err);  // LOG DO ERRO
                return res.status(500).send('Erro ao processar o ficheiro.');
            }

            // 1. Obter todos os IDs existentes para a tabela media_uploads
            Media.getAllIds((idErr, results) => {
                if (idErr) {
                    console.error('Erro ao buscar IDs de mídia existentes:', idErr);  // LOG DO ERRO
                    return res.status(500).send('Erro ao buscar IDs de mídia existentes.');
                }

                // 2. Encontrar o menor ID disponível
                let nextId = 1;
                if (results.length > 0) {
                    for (let i = 0; i < results.length; i++) {
                        if (results[i].id !== nextId) {
                            break;
                        }
                        nextId++;
                    }
                }

                // Define o tipo de mídia baseado na extensão
                const mediaType = file.mimetype.startsWith('image') ? 'image' : 'video';

                // 3. Guarda o caminho completo no banco de dados
                Media.create(nextId, activityId, newFilePath, mediaType, (error, result) => {
                    if (error) {
                        console.error('Erro ao guardar o ficheiro:', error);  // LOG DO ERRO
                        return res.status(500).send('Erro ao guardar o ficheiro.');
                    }
                    res.status(201).send({ message: 'Ficheiro carregado com sucesso!', filePath: newFilePath, mediaId: nextId });
                });
            });
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