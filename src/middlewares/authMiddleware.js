const jwt = require('jsonwebtoken');
require('dotenv').config();

const AuthMiddleware = {
    authenticateToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            console.error('Token não fornecido ou inválido.');
            return res.status(401).send('Acesso negado. Token não fornecido ou inválido.');
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error('Falha na verificação do token:', err);
                return res.status(403).send('Falha na verificação do token.');
            }

            req.user = user;  // Armazena os dados do usuário no request para uso posterior
            next();  // Continua para o próximo middleware ou rota
        });
    }
};

module.exports = AuthMiddleware;