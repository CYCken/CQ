const Occupation = require("../model/occupation");

exports.get_all = async (req, res) => {
  try {
    const occupations = await Occupation.find();
    res.status(200).json(occupations);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.get_one = async (req, res) => {
  try {
    const occupation = await Occupation.findOne({
      name: req.params.characterName,
    });
    res.status(200).json(occupation);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create_occupation = async (req, res) => {
  const occupation = new Occupation({
    occupation: req.body.occupation,
  });
  try {
    const savePost = await occupation.save();
    res.status(201).json(savePost);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create_heros = async (req, res) => {
  try {
    const occupation = await Occupation.findOne({
      occupation: req.params.occupation,
    });
    const update = await Occupation.updateOne(
      { _id: occupation._id },
      { $push: { heros: req.body } }
    );
    res.status(200).json("update success");
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete_heros = async (req, res) => {
  try {
    const occupation = await Occupation.findOne({
      occupation: req.params.occupation,
    });
    await Occupation.updateOne(
      { _id: occupation._id },
      { $pull: { heros: { $in: req.body } } }
    );
    res.status(200).json("update success");
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete_occupation = async (req, res) => {
  try {
    const getoccupation = await Occupation.findOne({
      name: req.params.occupation,
    });
    const occupation = await Occupation.deleteOne({
      _id: getoccupation._id,
    });
    res.status(200).json(occupation);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
