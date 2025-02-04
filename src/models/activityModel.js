const db = require('../config/db');

const Activity = {
    getAllIds: (callback) => {
        const query = 'SELECT id FROM activities ORDER BY id';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    getAllByUser: (userId, callback) => {
        const query = `
            SELECT activities.*, categories.name AS category_name 
            FROM activities 
            INNER JOIN categories ON activities.category_id = categories.id 
            WHERE activities.user_id = ?
        `;
        db.query(query, [userId], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    },

    create: (id, userId, categoryId, description, startTime, endTime, callback) => {
        const query = `
            INSERT INTO activities (id, user_id, category_id, description, start_time, end_time) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [id, userId, categoryId, description, startTime, endTime], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
};

module.exports = Activity;
