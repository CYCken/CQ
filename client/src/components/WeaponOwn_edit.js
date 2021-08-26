import { useState } from "react";
import Axios from "axios";

import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import PublishIcon from "@material-ui/icons/Publish";

import SuitSelect from "./Suit_select";

const WeaponOwnEdit = ({ weapon, edit, setEdit, setWeapon }) => {
  const [attribute1, setAttribute1] = useState({
    upgrade: weapon.attribute1,
    detail: weapon.attribute1_detail,
  });
  const [attribute2, setAttribute2] = useState({
    upgrade: weapon.attribute2,
    detail: weapon.attribute2_detail,
  });
  const [sigil1, setSigil1] = useState(weapon.sigil1);
  const [sigil2, setSigil2] = useState(weapon.sigil2);
  const [sigil_set, setSigilSet] = useState(weapon.sigil_set);

  async function handleSubmit(event) {
    event.preventDefault();

    const reqBody = [
      {
        propName: "attribute1",
        value: attribute1.upgrade,
      },
      {
        propName: "attribute1_detail",
        value: attribute1.detail,
      },
      {
        propName: "attribute2",
        value: attribute2.upgrade,
      },
      {
        propName: "attribute2_detail",
        value: attribute2.detail,
      },
      {
        propName: "sigil1",
        value: sigil1._id,
      },
      {
        propName: "sigil2",
        value: sigil2._id,
      },
      {
        propName: "sigil_set",
        value: sigil_set,
      },
    ];
    await Axios.patch(`http://localhost:3001/weaponOwn/${weapon._id}`, reqBody);

    Axios.get(`http://localhost:3001/weaponOwn/${weapon._id}`).then(
      (response) => {
        setWeapon(function (prev) {
          const index = prev.findIndex((item) => item._id === weapon._id);
          prev[index] = response.data.Weapon;
          return [...prev];
        });
      }
    );
    setEdit(!edit);
    //window.location.href = `http://localhost:3000/character/${occupation}`;
  }

  return (
    <CardContent aria-label="Weapon_Edit">
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
          aria-label="Edit_Submit"
        >
          <PublishIcon />
        </Button>
        <Button
          onClick={() => setEdit(!edit)}
          variant="contained"
          color="secondary"
          style={{ marginLeft: 10 }}
          aria-label="Edit_Cancel"
        >
          <CancelPresentationOutlinedIcon />
        </Button>
      </form>
    </CardContent>
  );
};

export default WeaponOwnEdit;
