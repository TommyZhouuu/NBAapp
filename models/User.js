const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: {
    games: { type: Array, default: [] },
    teams: { type: Array, default: [] },
    players: { type: Array, default: [] },
  },
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
