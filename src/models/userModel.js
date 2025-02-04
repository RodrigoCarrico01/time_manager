const db = require('../config/db');

const User = {
   getAllIds: (callback) => {
        const query = 'SELECT id FROM users ORDER BY id';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    // Cria o utilizador com um ID específico
    create: (id, name, email, passwordHash, callback) => {
        const query = 'INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)';
        db.query(query, [id, name, email, passwordHash], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
};

module.exports = User;
