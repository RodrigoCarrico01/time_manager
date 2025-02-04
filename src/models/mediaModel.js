const db = require('../config/db');
const path = require('path');

const Media = {
    getByActivityId: (activityId, callback) => {
        const query = 'SELECT * FROM media_uploads WHERE activity_id = ?';
        db.query(query, [activityId], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                // Inclui a extensão correta nos resultados retornados
                const updatedResults = results.map(result => {
                    return {
                        ...result,
                        file_path: result.file_path + path.extname(result.file_path)
                    };
                });
                callback(null, updatedResults);
            }
        });
    },

    create: (activityId, filePath, mediaType, callback) => {
        const query = `
            INSERT INTO media_uploads (activity_id, file_path, media_type) 
            VALUES (?, ?, ?)
        `;
        db.query(query, [activityId, filePath, mediaType], (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }
};

module.exports = Media;
