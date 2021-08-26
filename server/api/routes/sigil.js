const express = require("express");
const router = express.Router();
const SigilsController = require("../controllers/sigil");

const multer = require("multer");
const storage = multer.diskStorage({
  //cb = callback
  destination: function (req, file, cb) {
    cb(null, `./images/sigils`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  //reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);
  else cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1021 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/", SigilsController.get_all);
router.get("/:sigilId", SigilsController.get_one);

router.post("/", upload.single("sigilImage"), SigilsController.create_sigil);

router.patch(
  "/image/:sigilId",
  upload.single("sigilImage"),
  SigilsController.set_image
);

router.delete("/:sigilId", SigilsController.delete_one);

module.exports = router;
