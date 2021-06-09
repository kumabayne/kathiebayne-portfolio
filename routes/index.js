const express = require('express');
const router = express.Router();

const galleryItems = require('../public/data/galleryItems');
const galleryData = require('../public/data/gallery.json');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Gallery Page', path: req.path, galleryItems: galleryItems });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About', path: req.path, galleryItems: galleryItems });
});

router.get('/resume', function(req, res, next) {
  res.render('index', { title: 'Résumé', path: req.path });
});

router.get('/:category', function(req, res, next) {
  const category = req.params.category;
  const gallery = galleryData.gallery;
  gallery.map(galleryObj => {
    if (galleryObj[category]) {
      res.render('gallery', { title: galleryObj.title, directory: category, images: galleryObj[category] });
    }
  });
});

module.exports = router;
