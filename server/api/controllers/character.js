const Character = require("../model/character");
const herosJson = require("../../character.json");

exports.get_all = async (req, res) => {
  try {
    const characters = await Character.find()
      .select("_id name occupation weapon_suggest weapon_own heroImage ename")
      .populate({
        path: "weapon_suggest",
        select:
          "name attribute1 attribute2 attribute1_detail attribute2_detail sigil1 sigil2 sigil_set _id description note",
        populate: {
          path: "sigil1 sigil2",
        },
      })
      .populate({
        path: "weapon_own",
        select:
          "name attribute1 attribute2 attribute1_detail attribute2_detail sigil1 sigil2 sigil_set _id",
        populate: {
          path: "sigil1 sigil2",
        },
      });
    res.status(200).json(characters);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.get_with_occupation = async (req, res) => {
  let occupation;
  if (req.params.occupation) {
    occupation = req.params.occupation;
  } else {
    occupation = "warriors";
  }

  try {
    const characters = await Character.find({ occupation: occupation })
      .select("_id name occupation weapon_suggest weapon_own heroImage ename")
      .sort({ _id: -1 })
      .populate({
        path: "weapon_suggest",
        select:
          "name attribute1 attribute2 attribute1_detail attribute2_detail sigil1 sigil2 sigil_set _id description note",
        populate: {
          path: "sigil1 sigil2",
        },
      })
      .populate({
        path: "weapon_own",
        select:
          "name attribute1 attribute2 attribute1_detail attribute2_detail sigil1 sigil2 sigil_set _id",
        populate: {
          path: "sigil1 sigil2",
        },
      });

    res.status(200).json(characters);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.get_one = async (req, res) => {
  try {
    const character = await Character.findById({
      _id: req.params.characterId,
    })
      .select("_id name occupation weapon_suggest weapon_own heroImage ename")
      .populate({
        path: "weapon_suggest",
        select:
          "name attribute1 attribute2 attribute1_detail attribute2_detail sigil1 sigil2 sigil_set _id description note",
        populate: {
          path: "sigil1 sigil2",
        },
      })
      .populate({
        path: "weapon_own",
        select:
          "name attribute1 attribute2 attribute1_detail attribute2_detail sigil1 sigil2 sigil_set _id",
        populate: {
          path: "sigil1 sigil2",
        },
      });
    if (!character) {
      res.status(404).json({
        message: "Hero not found",
      });
    } else {
      res.status(200).json({
        character: character,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
  // try {
  //   const character = await Character.findById({
  //     _id: req.params.characterId,
  //   });
  //   if (!character) {
  //     res.status(404).json({
  //       message: "Hero not found",
  //     });
  //   } else {
  //     const weaponSug = await WeaponSug.find({
  //       character: character._id,
  //     }).select("_id name attribute1 attribute2 character");
  //     const weaponOwn = await WeaponOwn.find({
  //       character: character._id,
  //     }).select("_id name attribute1 attribute2 character");
  //     res.status(200).json({
  //       character: character,
  //       weaponSug: weaponSug,
  //       weaponOwn: weaponOwn,
  //     });
  //   }
  // } catch (err) {
  //   res.status(500).json({ message: err });
  // }
};

exports.create_character = async (req, res) => {
  //store heros with json
  // herosJson.map((occupat) => {
  //   console.log(occupat.occupation);
  //   occupat.heros.map((hero) => {
  //     console.log(hero.name);
  //     console.log(hero.ename);
  //     const character = new Character({
  //       name: hero.name,
  //       ename: hero.ename,
  //       occupation: occupat.occupation,
  //     });
  //     try {
  //       Character.find({ name: hero.name }).then((res) => {
  //         if (res.length > 0) {
  //           console.log(hero.name + " exists");
  //         } else {
  //           character.save();
  //         }
  //       });
  //     } catch (err) {
  //       res.status(500).json({ message: err });
  //     }
  //   });
  // });
  // res.status(200).json({ message: "success" });
  let image;
  if (req.file == undefined) {
    image = "";
  } else {
    image = req.file.path;
  }
  const character = new Character({
    name: req.body.name,
    ename: req.body.ename,
    occupation: req.body.occupation,
    heroImage: image,
  });
  try {
    const check_exist = await Character.find({ ename: req.body.ename });
    if (check_exist.length > 0) {
      res.status(404).json({
        message: "Hero exists",
      });
    } else {
      const savePost = await character.save();
      res.status(201).json(savePost);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete_one = async (req, res) => {
  try {
    const character = await Character.deleteOne({
      _id: req.params.characterId,
    });
    res.status(200).json(character);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.set_occupation = async (req, res) => {
  try {
    const updateCharacter = await Character.updateOne(
      {
        _id: req.params.characterId,
      },
      { $set: { occupation: req.body.occupation } }
    );
    res.status(200).json(updateCharacter);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create_weapon = async (req, res) => {
  console.log("create weapon");
  try {
    if (req.params.weapon_option === "weapon_own") {
      const update = await Character.updateOne(
        { _id: req.params.characterId },
        { $push: { weapon_own: req.body } }
      );
    } else if (req.params.weapon_option === "weapon_suggest") {
      const update = await Character.updateOne(
        { _id: req.params.characterId },
        { $push: { weapon_suggest: req.body } }
      );
    }
    res.status(200).json("update success");
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete_weapon = async (req, res) => {
  try {
    if (req.params.weapon_option === "weapon_own") {
      await Character.updateOne(
        { _id: req.params.characterId },
        { $pull: { weapon_own: { $in: req.body } } }
      );
    } else if (req.params.weapon_option === "weapon_suggest") {
      await Character.updateOne(
        { _id: req.params.characterId },
        { $pull: { weapon_suggest: { $in: req.body } } }
      );
    }

    res.status(200).json("update success");
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.set_heroImage = async (req, res, next) => {
  console.log("update image");
  console.log(req.file);
  try {
    const updateImage = await Character.updateOne(
      {
        _id: req.params.characterId,
      },
      { $set: { heroImage: req.file.path } }
    );
    res.status(200).json(updateImage);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.test = async (req, res, next) => {
  console.log("get in ");
  console.log(req.file);
  const character = new Character({
    name: req.body.name,
    ename: req.body.ename,
    occupation: req.body.occupation,
    heroImage: req.file.path,
  });
  try {
    const check_exist = await Character.find({ name: req.body.name });
    if (check_exist.length > 0) {
      res.status(404).json({
        message: "Hero exists",
      });
    } else {
      const savePost = await character.save();
      res.status(201).json(savePost);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
