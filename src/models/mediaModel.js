const db = require('../config/db');

const Media = {
    getByActivityId: (activityId, callback) => {
        const query = 'SELECT * FROM media_uploads WHERE activity_id = ?';
        db.query(query, [activityId], callback);
    },

    create: (activityId, filePath, mediaType, callback) => {
        const query = `
            INSERT INTO media_uploads (activity_id, file_path, media_type) 
            VALUES (?, ?, ?)
        `;
        db.query(query, [activityId, filePath, mediaType], callback);
    }
};

module.exports = Media;
