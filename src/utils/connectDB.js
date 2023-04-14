const mongoose = require('mongoose');

function connectDB(app, PORT, DB) {
    mongoose.connect(DB)
        .then(() => {
                app.listen(PORT, () => {
                    console.log(`
                    ---- ELISA SERVER -----
                    PORT: ${PORT}
                    `)
                })
        })
        .catch(err => console.log(err))
}

module.exports = connectDB;