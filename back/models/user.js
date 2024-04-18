const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // Ensure unique email addresses
    },
    password: {
        type: String,
        minlength: 5, // Minimum password length
        
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);
