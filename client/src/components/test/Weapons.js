import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import CreateIcon from "@material-ui/icons/Create";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import WeaponSugEdit from "./WeaponSug_edit";
import WeaponSugCreate from "./WeaponSug_create";

const useRowStyles = makeStyles({
  weaponBox: {
    margin: 1,
    paddingBottom: 3,
  },
  weaponTitle: {
    borderLeft: 3,
    borderLeftStyle: "solid",
    borderColor: "#696666",
  },
  suitTitle: {
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
    fontSize: 16,
    borderTop: 3,
    borderTopStyle: "solid",
    borderColor: "#9c9b98",
    paddingTop: 5,
  },
});

function WeaponSug(props) {
  const { weapon, characterId, occupation } = props;
  const [edit, setEdit] = useState(false);
  const classes = useRowStyles();

  async function handleClickDelete(event) {
    event.preventDefault();
    await Axios.patch(
      `http://localhost:3001/character/${characterId}/weapon_suggest/delete`,
      [`${weapon._id}`]
    );
    await Axios.delete(`http://localhost:3001/weaponSug/${weapon._id}`);
    window.location.href = `http://localhost:3000/character/${occupation}`;
  }

  return (
    <Box margin={1} whiteSpace="pre" key={uuidv4()} aria-label="Suit">
      <Card style={{ backgroundColor: "#d2d2d2" }} aria-label="Suit_Detail">
        {edit === false ? (
          <CardContent>
            <Typography variant="subtitle2" className={classes.suitTitle}>
              &nbsp;{weapon.description}
            </Typography>

            <Box aria-label="Suit_Upgrade">
              <Upgrade
                attribute={weapon.attribute1}
                detail={weapon.attribute1_detail}
              />
              <Upgrade
                attribute={weapon.attribute2}
                detail={weapon.attribute2_detail}
              />
            </Box>

            <Box margin={1} aria-label="Suit_Sigil">
              <Sigil sigil={weapon.sigil1} />
              <Sigil sigil={weapon.sigil2} />
              <Typography variant="body1" style={{ color: "green" }}>
                {weapon.sigil_set}
              </Typography>
            </Box>
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
            occupation={occupation}
          />
        )}
      </Card>
    </Box>
  );
}

function WeaponOwn(props) {
  const { weapon } = props;

  return (
    <Box margin={1} whiteSpace="pre" key={uuidv4()} aria-label="Suit">
      <Card style={{ backgroundColor: "#d2d2d2" }} aria-label="Suit_Detail">
        <CardContent>
          <Box>
            <Upgrade
              attribute={weapon.attribute1}
              detail={weapon.attribute1_detail}
            />
            <Upgrade
              attribute={weapon.attribute2}
              detail={weapon.attribute2_detail}
            />
          </Box>

          <Box margin={1}>
            <Typography variant="body1">{weapon.sigil1}</Typography>
            <Typography variant="body1">{weapon.sigil2}</Typography>
            <Typography variant="body1">{weapon.sigil_set}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

function Upgrade(props) {
  const { attribute, detail } = props;
  const classes = useRowStyles();

  return (
    <Grid
      container
      justifyContent="space-between"
      className={classes.suitUpgrade}
      aria-label="Upgrade"
    >
      <Typography
        variant="body1"
        align="left"
        style={{
          fontSize: 15,
        }}
      >
        {attribute}
      </Typography>
      <Typography
        variant="body1"
        align="right"
        style={{
          fontSize: 15,
        }}
      >
        {detail}
      </Typography>
    </Grid>
  );
}

function Sigil(props) {
  const { sigil } = props;
  return (
    <Grid container justifyContent="flex-start" aria-label="Sigils">
      <Typography>
        <img
          src={require(`./images/sigils/${sigil}.png`).default}
          alt={sigil}
        />
      </Typography>
      <Typography variant="body1" style={{ paddingTop: 4 }}>
        &nbsp;{sigil}
      </Typography>
    </Grid>
  );
}

const Weapons = (props) => {
  const { hero, open, add, setAdd } = props;
  const classes = useRowStyles();

  return (
    <TableRow aria-label="All_Weapon">
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box className={classes.weaponBox} aria-label="Weapon_Suggest">
            <Typography variant="h6" gutterBottom component="div">
              Weapon_suggest
            </Typography>

            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              className={classes.weaponTitle}
            >
              &nbsp;词条符文推荐
            </Typography>
            {hero.weapon_suggest.map((weapon) => (
              <WeaponSug
                key={uuidv4()}
                weapon={weapon}
                characterId={hero._id}
                occupation={hero.occupation}
              />
            ))}

            {add === false ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => setAdd(!add)}
                style={{ marginBottom: 10 }}
                aria-label="Create_Button"
              >
                <CreateIcon />
              </Button>
            ) : (
              <WeaponSugCreate add={add} setAdd={setAdd} hero={hero} />
            )}

            <Box>
              <Typography
                variant="subtitle1"
                gutterBottom
                component="div"
                className={classes.weaponTitle}
              >
                &nbsp;陣容
              </Typography>
            </Box>
          </Box>

          <Box margin={1} aria-label="Weapon_Own">
            <Typography variant="h6" gutterBottom component="div">
              Weapon_own
            </Typography>

            {hero.weapon_own.map((weapon) => (
              <WeaponOwn key={uuidv4()} weapon={weapon} />
            ))}
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default Weapons;
