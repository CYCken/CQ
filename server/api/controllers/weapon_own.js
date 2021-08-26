const WeaponOwn = require("../model/weapon_own");

exports.get_one = async (req, res) => {
  try {
    const weapon = await WeaponOwn.findById({
      _id: req.params.weaponId,
    })
      .select(
        "_id name attribute1 attribute2 attribute1_detail attribute2_detail sigil1 sigil2 sigil_set"
      )
      .populate("sigil1")
      .populate("sigil2");
    if (!weapon) {
      res.status(404).json({
        message: "Weapon not found",
      });
    } else {
      res.status(200).json({
        Weapon: weapon,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create_weapon = async (req, res) => {
  const weapon = new WeaponOwn({
    attribute1: req.body.attribute1,
    attribute2: req.body.attribute2,
    attribute1_detail: req.body.attribute1_detail,
    attribute2_detail: req.body.attribute2_detail,
    sigil1: req.body.sigil1_id,
    sigil2: req.body.sigil2_id,
    sigil_set: req.body.sigil_set,
    character: req.body.character_id,
  });
  try {
    const savePost = await weapon.save();
    res.status(201).json(savePost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.update_one = async (req, res) => {
  const updateOps = {};
  /*
  request body
  [ {"propName":"attribute1", "value":"f"},
    {"propName":"attribute2", "value":"f"}
  ]
  */
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  try {
    const updateWeapon = await WeaponOwn.updateOne(
      { _id: req.params.weaponId },
      { $set: updateOps }
    );
    res.status(200).json(updateWeapon);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete_one = async (req, res) => {
  try {
    const deleteWeapon = await WeaponOwn.deleteOne({
      _id: req.params.weaponId,
    });
    res.status(200).json(deleteWeapon);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
