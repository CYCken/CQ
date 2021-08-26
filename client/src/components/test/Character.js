import React, { useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";

import WeaponSug from "../WeaponSug";
import WeaponOwn from "../WeaponOwn";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  tableTitile: {
    width: "44%",
    backgroundColor: "#604700",
    color: "#FFA500",
    fontWeight: "bolid",
  },
});

const Character2 = (props) => {
  const { heroProps } = props;
  const [open, setOpen] = useState(false);
  const [hero, setHero] = useState(heroProps);
  const [occupation, setOccupation] = useState("");
  const classes = useRowStyles();

  useEffect(() => {
    if (hero.occupation === "warriors") {
      setOccupation("劍士");
    } else if (hero.occupation === "paladins") {
      setOccupation("騎士");
    } else if (hero.occupation === "archers") {
      setOccupation("弓手");
    } else if (hero.occupation === "hunters") {
      setOccupation("獵人");
    } else if (hero.occupation === "wizards") {
      setOccupation("法師");
    } else if (hero.occupation === "priests") {
      setOccupation("祭司");
    }
  }, [hero]);

  return (
    <React.Fragment>
      <TableRow className={classes.root} aria-label="Hero_Detail">
        <TableCell>
          <IconButton
            aria-label="Expand_Weapons"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Grid
            container
            justifyContent="flex-start"
            aria-label="Sigils"
            alignItems="center"
          >
            <Typography>
              <img
                src={`http://localhost:3001/${hero.heroImage}`}
                alt={hero.ename}
                style={{ width: 50, height: 50 }}
              />
            </Typography>
            <Typography variant="body1" style={{ paddingLeft: 5 }}>
              {hero.name}
            </Typography>
          </Grid>
        </TableCell>
        <TableCell align="right">{hero.ename}</TableCell>
        <TableCell align="right">{hero._id}</TableCell>
        <TableCell align="right">{occupation}</TableCell>
        <TableCell align="right">{hero["weapon_own"].length}</TableCell>
      </TableRow>
      <TableRow aria-label="All_Weapon">
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.tableTitile}>建議</TableCell>
                    <TableCell
                      style={{
                        width: "1%",
                      }}
                    />
                    <TableCell className={classes.tableTitile}>持有</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ backgroundColor: "#a8a8a8" }}>
                      <WeaponSug hero={hero} setHero={setHero} />
                    </TableCell>
                    <TableCell
                      style={{
                        width: "1%",
                      }}
                    />
                    <TableCell style={{ backgroundColor: "#a8a8a8" }}>
                      <WeaponOwn hero={hero} setHero={setHero} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Character2;
