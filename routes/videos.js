const express = require('express')
const router = express.Router()
const { alreadyin } = require('../middlewares/auth')
const Video = require('../models/Video')
const multer = require('multer')
const fs = require('fs')
const path = require('path')



// show add page
router.get('/add', alreadyin, (req, res) => {
  res.render('addvideo', {
  })
});


// router.get('/lecture/:id', alreadyin, (req, res) => {
//   res.render('lectureinfo', {
//   })
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg') {
//       cb(null, 'thumbnails')
//     } else if (file.mimetype === 'video/mp4') {
//       cb(null, 'videos')
//     } else {
//       console.log(file.mimetype)
//       cb({ error: 'Mime type not supported' })
//     }
//   },

//   filename: (req, file, cd) => {
//     cd(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
//   }
// });


// const upload = multer({ storage: storage });
// //process the add form      \      /videos
// router.post('/', alreadyin, upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }]), async (req, res, next) => {
//   try {
//     req.body.user = req.user.id;

//     const title = req.body.title;
//     const description = req.body.description;
//     const status = req.body.status;
//     const thumbnail = req.files.thumbnail[0].path;
//     const video = req.files.video[0].path;
//     const user = req.user.id

//     await Video.create([{ title, description, status, thumbnail, video, user }])
//     res.redirect('/dashboard')
//   } catch (err) {
//     console.log(err)
//     res.render('error/500')
//   }
// });

router.post('/', alreadyin, async (req, res, next) => {
  try {
    req.body.user = req.user.id;
    const title = req.body.title;
    const description = req.body.description;
    const preview = req.body.preview;
    const lecture_category = req.body.lecture_category;
    const lecture_month = req.body.lecture_month;
    const lecture_day = req.body.lecture_day;
    const lecturer_role = req.body.lecturer_role;


    const user = req.user.id

    await Video.create([{ title, description, preview, lecture_category, lecture_day, lecture_category, lecture_month, lecturer_role, user }])
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
});






//show single stories
router.get('/:id', async (req, res) => {
  try {
    let video = await Video.findById(req.params.id)
      .populate('user')
      .lean()
    if (!video) {
      return res.render('error/500')
    }
    res.render('lectureinfo', {
      video,//this is me passing the data to the view
    })
  } catch (err) {
    console.log(err)
    res.render('error/404')
  }
});


//edit videos
router.get('/edit/:id', alreadyin, async (req, res) => {
  try {
    const video = await Video.findOne({
      _id: req.params.id,
    }).lean()
    res.render('edit', {
      video,//this is me passing the data to the view
    })
  } catch (err) {
    console.log(err)
    res.render('error/500')
  }
});



// show add page
router.delete('/:id', alreadyin, async (req, res) => {
  try {
    await Video.deleteOne({ _id: req.params.id })
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err)
    return res.render(' error/500')
  }

});



module.exports = router
