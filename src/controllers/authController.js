const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthController = {
    register: (req, res) => {
        const { name, email, password } = req.body;

        // Obter todos os IDs existentes
        User.getAllIds((err, results) => {
            if (err) {
                console.error('Erro ao buscar IDs existentes:', err);  // LOG DO ERRO
                return res.status(500).send('Erro ao buscar IDs existentes.');
            }

            // Encontrar o menor ID disponível
            let nextId = 1;
            if (results.length > 0) {
                for (let i = 0; i < results.length; i++) {
                    if (results[i].id !== nextId) {
                        break;
                    }
                    nextId++;
                }
            }

            // Hash da password
            bcrypt.hash(password, 10, (hashErr, hash) => {
                if (hashErr) {
                    console.error('Erro ao gerar o hash da password:', hashErr);  // LOG DO ERRO
                    return res.status(500).send('Erro ao gerar o hash da password.');
                }

                // Criar o utilizador com o ID correto
                User.create(nextId, name, email, hash, (createErr, result) => {
                    if (createErr) {
                        console.error('Erro ao registar o utilizador:', createErr);  // LOG DO ERRO
                        return res.status(500).send('Erro ao registar o utilizador.');
                    }
                    res.status(201).send({ message: 'Utilizador registado com sucesso!', userId: nextId });
                });
            });
        });
    },

    login: (req, res) => {
        const { email, password } = req.body;

        User.findByEmail(email, (error, results) => {
            if (error || results.length === 0) {
                console.error('Erro ao procurar utilizador pelo email:', error);  // LOG DO ERRO
                return res.status(401).send('Credenciais inválidas.');
            }

            const user = results[0];

            bcrypt.compare(password, user.password_hash, (err, isMatch) => {
                if (err || !isMatch) {
                    console.error('Erro ao comparar a password:', err);  // LOG DO ERRO
                    return res.status(401).send('Credenciais inválidas.');
                }

                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).send({ token });
            });
        });
    }
};

module.exports = AuthController;