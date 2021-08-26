import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";

import Suit from "./Suit";
import WeaponOwnEdit from "./WeaponOwn_edit";
import WeaponOwnCreate from "./WeaponOwn_create";

function Weapon(props) {
  const { weapon, characterId, setWeapon } = props;
  const [edit, setEdit] = useState(false);

  async function handleClickDelete(event) {
    event.preventDefault();
    await Axios.patch(
      `http://localhost:3001/character/${characterId}/weapon_own/delete`,
      [`${weapon._id}`]
    );
    await Axios.delete(`http://localhost:3001/weaponOwn/${weapon._id}`);
    setWeapon((prev) => {
      return prev.filter((item) => item._id !== weapon._id);
    });
  }

  return (
    <Box margin={1} whiteSpace="pre" aria-label="Suit">
      <Card style={{ backgroundColor: "#d2d2d2" }} aria-label="Suit_Detail">
        {edit === false ? (
          <CardContent>
            <Suit weapon={weapon} />
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
          <WeaponOwnEdit
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

const WeaponOwn = ({ hero, weapons, setWeapon }) => {
  const [isZero, setIsZero] = useState(true);
  const [addOwn, setAddOwn] = useState(false);

  useEffect(() => {
    if (weapons.length !== 0) setIsZero(false);
  }, [weapons]);

  return (
    <Box aria-label="Weapon_Own" style={{ paddingTop: 28 }}>
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
            height={310}
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
      {addOwn === false ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setAddOwn(!addOwn)}
          style={{ marginBottom: 10 }}
          aria-label="Create_Button"
        >
          <CreateIcon />
        </Button>
      ) : (
        <WeaponOwnCreate
          setWeapon={setWeapon}
          add={addOwn}
          setAdd={setAddOwn}
          hero={hero}
        />
      )}
    </Box>
  );
};

export default WeaponOwn;
