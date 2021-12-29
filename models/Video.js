const mongoose = require('mongoose')


const VideoSchema = new mongoose.Schema({

  title: {
    $type: String,
  },

  preview: {
    $type: String,
  },

  lecturer_role: {
    $type: String,
  },

  description: {
    $type: String,
  },

  lecture_month: {
    $type: String,
  },

  lecture_day: {
    $type: String,
  },

  lecture_category: {
    $type: String,
    default: 'Computer Engineering',
    enum: [
      "Sciences",
      "Mathematics",
      "Architecture",
      "Banking and Finance",
      "Chemical Engineering",
      "Computer Engineering",
    ],
  },

  // thumbnail: {
  //   $type: String,
  // },

  // video: {
  //   $type: String
  // },

  // status: {
  //   $type: String,
  //   default: 'public',
  //   enum: ['public', 'private'],
  // },

  user: {
    $type: mongoose.ObjectId,
    ref: 'User',
  },

  createdAt: {
    $type: Date,
    default: Date.now,
  },
},
  { typeKey: '$type' }
)

// create the model for users and expose it to our app
module.exports = mongoose.model('Video', VideoSchema)

