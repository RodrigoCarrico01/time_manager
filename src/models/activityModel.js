const db = require('../config/db');

const Activity = {
    getAllByUser: (userId, callback) => {
        const query = `
            SELECT activities.*, categories.name AS category_name 
            FROM activities 
            INNER JOIN categories ON activities.category_id = categories.id 
            WHERE activities.user_id = ?
        `;
        db.query(query, [userId], callback);
    },

    create: (userId, categoryId, description, startTime, endTime, callback) => {
        const query = `
            INSERT INTO activities (user_id, category_id, description, start_time, end_time) 
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(query, [userId, categoryId, description, startTime, endTime], callback);
    }
};

module.exports = Activity;
