import { useState } from "react";
import Axios from "axios";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import Grid from "@material-ui/core/Grid";
import PublishIcon from "@material-ui/icons/Publish";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import SuitSelect from "./Suit_select";

const useRowStyles = makeStyles({
  root: {
    borderBottom: "unset",
  },
  suitTitle: {
    height: 31,
    borderLeft: 3,
    borderLeftStyle: "solid",
    borderColor: "#696666",
    marginBottom: 5,
  },
  suitUpgrade: {
    backgroundColor: "#bbbbbb",
    marginBottom: 3,
    padding: 10,
    height: 42,
  },
  suitNote: {
    marginTop: 5,
    fontSize: 10,
    borderTop: 3,
    borderTopStyle: "solid",
    borderColor: "#9c9b98",
  },
});

const WeaponSugEdit = ({ weapon, edit, setEdit, setWeapon }) => {
  const [description, setDescription] = useState(weapon.description);
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
  const [note, setNote] = useState(weapon.note);

  const classes = useRowStyles();

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleChangeNote = (event) => {
    setNote(event.target.value);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const reqBody = [
      {
        propName: "description",
        value: description,
      },
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
      {
        propName: "note",
        value: note,
      },
    ];
    await Axios.patch(`http://localhost:3001/weaponSug/${weapon._id}`, reqBody);

    Axios.get(`http://localhost:3001/weaponSug/${weapon._id}`).then(
      (response) => {
        setWeapon(function (prev) {
          const index = prev.findIndex((item) => item._id === weapon._id);
          prev[index] = response.data.Weapon;
          return [...prev];
        });
      }
    );
    setEdit(!edit);
  }

  return (
    <CardContent aria-label="Weapon_Edit">
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="standard-required"
          defaultValue={description}
          className={classes.suitTitle}
          inputProps={{
            style: {
              fontSize: 20,
              paddingTop: 3,
              paddingLeft: 6,
              fontWeight: "bold",
            },
          }}
          onChange={handleChangeDescription}
        />
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

        <Box margin={1} aria-label="Set_Sigil">
          <Grid className={classes.suitNote} aria-label="Set_Note">
            <TextField
              value={note}
              onChange={handleChangeNote}
              variant="standard"
              fullWidth
              multiline
              maxRows={4}
              inputProps={{ maxLength: 150 }}
            />
          </Grid>
        </Box>
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

export default WeaponSugEdit;
