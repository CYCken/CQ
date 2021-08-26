const express = require("express");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  //cb = callback
  destination: function (req, file, cb) {
    cb(null, `./images/heros/${req.body.occupation}`);
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

const CharacterController = require("../controllers/character");

router.get("/", CharacterController.get_all);
router.get("/:occupation", CharacterController.get_with_occupation);
router.get("/:occupation/:characterId", CharacterController.get_one);

router.post(
  "/",
  upload.single("heroImage"),
  CharacterController.create_character
);
router.post("/test", upload.single("heroImage"), CharacterController.test);

router.patch("/:characterId", CharacterController.set_occupation);
router.patch(
  "/image/:characterId",
  upload.single("heroImage"),
  CharacterController.set_heroImage
);
router.patch("/:characterId/:weapon_option", CharacterController.create_weapon);
router.patch(
  "/:characterId/:weapon_option/delete",
  CharacterController.delete_weapon
);

router.delete("/:characterId", CharacterController.delete_one);

module.exports = router;
