const fs = require("fs");
const path = require("path");

const checkFolder = (folder) => (req, res, next) => {
  const uploadPath = path.join(__dirname, `../public/${folder}`);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  req.uploadPath = uploadPath;
  next();
};

module.exports = checkFolder;
