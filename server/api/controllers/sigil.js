const Sigil = require("../model/sigil");
const sigilJson = require("../../sigil.json");

exports.get_one = async (req, res, next) => {
  try {
    const sigil = await Sigil.findById({
      _id: req.params.sigilId,
    }).select("_id name ename attribute sigilImage star");
    if (!sigil) {
      res.status(404).json({
        message: "Sigil not found",
      });
    } else {
      res.status(200).json({
        sigil: sigil,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.get_all = async (req, res, next) => {
  try {
    const sigils = await Sigil.find().select(
      "_id name ename attribute sigilImage star"
    );
    res.status(200).json(sigils);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create_sigil = async (req, res, next) => {
  //store sigils with json
  // sigilJson.map((sigil) => {
  //   console.log(sigil);
  //   const createSigil = new Sigil({
  //     name: sigil.name,
  //     ename: sigil.ename,
  //     attribute: sigil.attribute,
  //   });
  //   try {
  //     Sigil.find({ name: sigil.name }).then((res) => {
  //       if (res.length > 0) {
  //         console.log(sigil.name + " exists");
  //       } else {
  //         createSigil.save();
  //       }
  //     });
  //   } catch (err) {
  //     res.status(500).json({ message: err });
  //   }
  // });
  // res.status(200).json({ message: "success" });

  let image;
  if (req.file == undefined) {
    image = "";
  } else {
    image = req.file.path;
  }

  const sigil = new Sigil({
    name: req.body.name,
    ename: req.body.ename,
    attribute: req.body.attribute,
    star: req.body.star,
    sigilImage: image,
  });
  try {
    const check_exist = await Sigil.find({ ename: req.body.ename });
    if (check_exist.length > 0) {
      res.status(404).json({
        message: "Sigil exists",
      });
    } else {
      const savePost = await sigil.save();
      res.status(201).json(savePost);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.set_image = async (req, res, next) => {
  console.log("update image");
  console.log(req.file);
  try {
    const updateImage = await Sigil.updateOne(
      {
        _id: req.params.sigilId,
      },
      { $set: { sigilImage: req.file.path } }
    );
    res.status(200).json(updateImage);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete_one = async (req, res, next) => {
  try {
    const sigil = await Sigil.deleteOne({
      _id: req.params.sigilId,
    });
    res.status(200).json(sigil);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
