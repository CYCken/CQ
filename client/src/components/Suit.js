import React from "react";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useRowStyles = makeStyles({
  suitUpgrade: {
    backgroundColor: "#bbbbbb",
    marginBottom: 3,
    padding: 10,
  },
  suitSigil: {
    marginBottom: 3,
  },
  攻击改造: {
    fontWeight: "bold",
    color: "#b94040",
  },
  防御改造: {
    fontWeight: "bold",
    color: "#4064b9",
  },
  能力改造: {
    fontWeight: "bold",
    color: "#fff4a7",
  },
  Not_set: {
    fontWeight: "bold",
    color: "unset",
  },
});

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
      <Typography className={classes[attribute]} variant="body1" align="left">
        {attribute}
      </Typography>
      <Typography className={classes[attribute]} variant="body1" align="right">
        {detail}
      </Typography>
    </Grid>
  );
}

function Sigil(props) {
  const { sigil } = props;
  const classes = useRowStyles();
  return (
    <Grid
      className={classes.suitSigil}
      container
      justifyContent="flex-start"
      aria-label="Sigils"
    >
      <Typography style={{ paddingTop: 3 }}>
        <img
          src={`http://localhost:3001/${sigil.sigilImage}`}
          alt={sigil.name}
        />
      </Typography>
      <Typography variant="body1" style={{ paddingTop: 5, paddingLeft: 3 }}>
        &nbsp;{sigil.name}
      </Typography>
      <Typography
        variant="body1"
        style={{ paddingTop: 5, paddingLeft: 3, color: "green" }}
      >
        ({sigil.attribute})
      </Typography>
    </Grid>
  );
}

const Suit = ({ weapon }) => {
  return (
    <div>
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
        <Sigil sigil={weapon.sigil1} />
        <Sigil sigil={weapon.sigil2} />
        <Typography variant="body1" style={{ color: "green" }}>
          {weapon.sigil_set}
        </Typography>
      </Box>
    </div>
  );
};

export default Suit;
