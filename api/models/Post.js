const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: String,
  summary: String,
  content: String,
  cover: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
}, {
  timestamps: true, 
});

module.exports = mongoose.model('Post', PostSchema);
