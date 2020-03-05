const rimraf = require('rimraf');
const cloudinary = require('cloudinary');

module.exports = (req, res) => (req.file
  ? cloudinary.v2.uploader.upload(req.file.path, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).send({
        message: 'Internal Server Error while uploading image to cloudinary',
        error,
      });
    }
    rimraf('./uploads/*', e => e);
    return res.status(201).send({
      image_url: result.secure_url,
    });
  })
  : res.status(400).send({
    error: 'Please upload an image file preferrably a jpg',
  }));
