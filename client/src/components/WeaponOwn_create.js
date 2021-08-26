import { useState } from "react";
import Axios from "axios";

import Button from "@material-ui/core/Button";
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import PublishIcon from "@material-ui/icons/Publish";

import SuitSelect from "./Suit_select";

const WeaponOwnCreate = ({ add, setAdd, hero, setWeapon }) => {
  const defaultSigil = {
    attribute: "Not_set",
    sigilImage: "images\\sigils\\Not_set.png",
    _id: "60ff0394f7c1784e54862290",
    name: "Not_set",
    ename: "Not_set",
    star: 0,
  };
  const [attribute1, setAttribute1] = useState({
    upgrade: "Not_set",
    detail: "Not_set",
  });
  const [attribute2, setAttribute2] = useState({
    upgrade: "Not_set",
    detail: "Not_set",
  });
  const [sigil1, setSigil1] = useState(defaultSigil);
  const [sigil2, setSigil2] = useState(defaultSigil);
  const [sigil_set, setSigilSet] = useState("非套裝");

  //without preventDefault, the sceond axios maybe doesn't do.
  //and if ues preventDefault, the render will stuck in 'not submit'
  //so use location.href to redirect the uri to rerender
  async function handleSubmit(event) {
    event.preventDefault();
    const reqBody = {
      attribute1: attribute1.upgrade,
      attribute2: attribute2.upgrade,
      attribute1_detail: attribute1.detail,
      attribute2_detail: attribute2.detail,
      sigil1_id: sigil1._id,
      sigil2_id: sigil2._id,
      sigil_set: sigil_set,
      character_id: hero._id,
    };
    const res = await Axios.post("http://localhost:3001/weaponOwn", reqBody);
    await Axios.patch(
      `http://localhost:3001/character/${hero._id}/weapon_own`,
      [`${res.data._id}`]
    );
    Axios.get(`http://localhost:3001/weaponOwn/${res.data._id}`).then(
      (response) => {
        setWeapon(function (prev) {
          return [...prev, response.data.Weapon];
        });
      }
    );
    setAdd(!add);
  }

  return (
    <Card style={{ backgroundColor: "#d2d2d2" }}>
      <CardContent aria-label="WeaponOwn_Create">
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <SuitSelect
            attribute1={attribute1}
            attribute2={attribute2}
            setAttribute1={setAttribute1}
            setAttribute2={setAttribute2}
            sigil1={sigil1}
            sigil2={sigil2}
            sigil_set={sigil_set}
            setSigil1={setSigil1}
            setSigil2={setSigil2}
            setSigilSet={setSigilSet}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ width: 64, marginRight: 10 }}
            aria-label="Create_Submit"
          >
            <PublishIcon />
          </Button>
          <Button
            onClick={() => setAdd(!add)}
            variant="contained"
            color="secondary"
            aria-label="Create_Cancel"
          >
            <CancelPresentationOutlinedIcon />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WeaponOwnCreate;
