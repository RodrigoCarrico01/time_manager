const db = require('../config/db');

const User = {
    create: (name, email, passwordHash, callback) => {
        const query = 'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)';
        db.query(query, [name, email, passwordHash], callback);
    },

    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], callback);
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = User;
