const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const activityRoutes = require('./routes/activityRoutes');
const mediaRoutes = require('./routes/mediaRoutes');

dotenv.config();
const app = express();

// Middleware para analisar JSON
app.use(express.json());

// Rotas da aplicação
app.use('/api/auth', authRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/media', mediaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});
