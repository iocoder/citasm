/* import libraries */
var fs   = require('fs');
var jimp = require('jimp');

/* file controller */
class FileController {

  async upload(name, content) {
    /* variables to hold file addess */
    var filePath;
    var fileURL;

    /* check if name is empty */
    if (name == undefined || name === '') {
      throw Error("File name is empty.");
    }

    /* name cannot contain dots */
    if (name.includes(".")) {
      throw Error("File name shouldn't include dots or extension.");
    }

    /* validate image buffer */
    if (content == undefined || content.buffer == undefined) {
      throw Error("No file is selected for upload.")
    }

    /* compute address */
    filePath = "public/images/" + name + ".jpg";
    fileURL  = "https://citizenassembly.net/images/" + name + ".jpg";

    /* make sure file doesn't exist */
    if (fs.existsSync(filePath)) {
      throw Error("File " + filePath + " already exists on the server.");
    }

    /* read image and convert it to jpg, then write to disk */
    jimp.read(content.buffer, (err, img) => {
      if (err) {
        throw err;
      } else {
        img.write(filePath);
      }
    });

    /* return uploaded file URL */
    return fileURL;
  }

}

/* return the controller */
module.exports = new FileController;
