const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    bookmarkedIds: [{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
