import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CreateIcon from "@material-ui/icons/Create";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import WeaponSugEdit from "./WeaponSug_edit";
import WeaponSugCreate from "./WeaponSug_create";
import Suit from "./Suit";

const useRowStyles = makeStyles({
  weaponBox: {
    paddingBottom: 3,
  },
  weaponTitle: {
    fontWeight: "bold",
    borderLeft: 3,
    borderLeftStyle: "solid",
    borderColor: "#696666",
  },
  suitTitle: {
    fontWeight: "bold",
    borderLeft: 3,
    borderLeftStyle: "solid",
    borderColor: "#696666",
    marginBottom: 5,
    fontSize: 20,
  },
  suitUpgrade: {
    backgroundColor: "#bbbbbb",
    marginBottom: 3,
    padding: 10,
  },
  suitNote: {
    whiteSpace: "normal",
    wordBreak: "break-word",
    fontSize: 16,
    borderTop: 3,
    borderTopStyle: "solid",
    borderColor: "#9c9b98",
    paddingTop: 5,
  },
});

function Weapon(props) {
  const { weapon, characterId, setWeapon } = props;
  const [edit, setEdit] = useState(false);
  const classes = useRowStyles();

  async function handleClickDelete(event) {
    event.preventDefault();
    await Axios.patch(
      `http://localhost:3001/character/${characterId}/weapon_suggest/delete`,
      [`${weapon._id}`]
    );
    await Axios.delete(`http://localhost:3001/weaponSug/${weapon._id}`);
    setWeapon((prev) => {
      return prev.filter((item) => item._id !== weapon._id);
    });
  }

  return (
    <Box margin={1} whiteSpace="pre" aria-label="Suit">
      <Card style={{ backgroundColor: "#d2d2d2" }} aria-label="Suit_Detail">
        {edit === false ? (
          <CardContent>
            <Typography variant="subtitle2" className={classes.suitTitle}>
              &nbsp;{weapon.description}
            </Typography>

            <Suit weapon={weapon} />
            <Typography
              variant="body1"
              className={classes.suitNote}
              aria-label="Suit_Note"
            >
              {weapon.note}
            </Typography>

            <Grid container justifyContent="flex-start">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setEdit(!edit)}
                style={{ marginRight: 10 }}
                aria-label="Edit_Button"
              >
                <EditIcon />
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={(e) => {
                  if (window.confirm("Delete?")) handleClickDelete(e);
                }}
                aria-label="Delete_Button"
              >
                <DeleteIcon />
              </Button>
            </Grid>
          </CardContent>
        ) : (
          <WeaponSugEdit
            weapon={weapon}
            edit={edit}
            setEdit={setEdit}
            setWeapon={setWeapon}
          />
        )}
      </Card>
    </Box>
  );
}

const WeaponSug = ({ hero, weapons, setWeapon }) => {
  const [isZero, setIsZero] = useState(true);
  const [addSug, setAddSug] = useState(false);
  const classes = useRowStyles();

  useEffect(() => {
    if (weapons.length !== 0) setIsZero(false);
  }, [weapons]);

  return (
    <Box className={classes.weaponBox} aria-label="Weapon_Suggest">
      <Typography
        variant="subtitle1"
        gutterBottom
        component="div"
        className={classes.weaponTitle}
      >
        &nbsp;词条符文推荐
      </Typography>
      {isZero ? (
        <div></div>
      ) : (
        <Box
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            paddingBottom: 10,
          }}
        >
          <Box
            height={400}
            style={{ flexGrow: 1, overflow: "auto", overflowY: "scroll" }}
          >
            {weapons.map((weapon) => (
              <Weapon
                key={uuidv4()}
                weapon={weapon}
                characterId={hero._id}
                setWeapon={setWeapon}
              />
            ))}
          </Box>
        </Box>
      )}
      {addSug === false ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddSug(!addSug)}
          style={{ marginBottom: 10 }}
          aria-label="Create_Button"
        >
          <CreateIcon />
        </Button>
      ) : (
        <WeaponSugCreate
          add={addSug}
          setAdd={setAddSug}
          hero={hero}
          setWeapon={setWeapon}
        />
      )}
    </Box>
  );
};

export default WeaponSug;
