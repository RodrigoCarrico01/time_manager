const db = require('../config/db');

const Category = {
    getAll: (callback) => {
        const query = 'SELECT * FROM categories';
        db.query(query, callback);
    },

    create: (name, callback) => {
        const query = 'INSERT INTO categories (name) VALUES (?)';
        db.query(query, [name], callback);
    }
};

module.exports = Category;
