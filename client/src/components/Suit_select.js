import { useEffect, useState } from "react";
import Axios from "axios";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { sigilSet } from "./menuItem/sigil";
import { upgrades, upgrade_detail } from "./menuItem/upgrade";
import { Typography } from "@material-ui/core";

const useRowStyles = makeStyles({
  suitUpgrade: {
    backgroundColor: "#bbbbbb",
    marginBottom: 3,
    padding: 5,
    height: 42,
  },
  sigilset: {
    color: "black",
  },
  atk: {
    fontWeight: "bold",
    color: "#b94040",
  },
  def: {
    fontWeight: "bold",
    color: "#4064b9",
  },
  abi: {
    fontWeight: "bold",
    color: "#fff4a7",
  },
  unset: {
    fontWeight: "bold",
    color: "unset",
  },
});

function Upgrade(props) {
  const { attribute, setAtb } = props;
  const [color, setColor] = useState("unset");
  const classes = useRowStyles();

  useEffect(() => {
    if (attribute.upgrade === "攻击改造") {
      setColor("atk");
    } else if (attribute.upgrade === "防御改造") {
      setColor("def");
    } else if (attribute.upgrade === "能力改造") {
      setColor("abi");
    } else {
      setColor("unset");
    }
  }, [attribute]);

  const handleChangeAttribute = (e) => {
    const change = e.target.value;
    if (
      change === "攻击改造" ||
      change === "防御改造" ||
      change === "能力改造" ||
      change === "Not_set"
    ) {
      setAtb({
        upgrade: change,
        detail: "Not_set",
      });
    } else {
      setAtb({
        upgrade: attribute.upgrade,
        detail: change,
      });
    }
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      className={classes.suitUpgrade}
    >
      <TextField
        select
        value={attribute.upgrade}
        onChange={handleChangeAttribute}
        variant="standard"
        align="left"
        InputProps={{
          className: classes[color],
        }}
      >
        <MenuItem key={upgrades[0].value} value={upgrades[0].value} style={{}}>
          {upgrades[0].label}
        </MenuItem>
        <MenuItem key={upgrades[1].value} value={upgrades[1].value}>
          {upgrades[1].label}
        </MenuItem>
        <MenuItem key={upgrades[2].value} value={upgrades[2].value}>
          {upgrades[2].label}
        </MenuItem>
        <MenuItem key={upgrades[3].value} value={upgrades[3].value}>
          {upgrades[3].label}
        </MenuItem>
      </TextField>
      <TextField
        select
        value={attribute.detail}
        onChange={handleChangeAttribute}
        variant="standard"
        align="right"
        InputProps={{
          className: classes[color],
        }}
      >
        {upgrade_detail[attribute.upgrade].map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );
}

function SigilsMenu(props) {
  const { option } = props;
  return (
    <Grid container justifyContent="flex-start">
      <img
        src={`http://localhost:3001/${option.sigilImage}`}
        alt={option.name}
      />
      <Typography style={{ paddingTop: 4 }}>
        &nbsp;{option.name}&nbsp;{option.attribute}
      </Typography>
    </Grid>
  );
}

function Sigil(props) {
  const { sigil, setSigil } = props;
  const [sigils, setSigils] = useState([sigil]);

  useEffect(() => {
    Axios.get("http://localhost:3001/sigil").then((res) => {
      setSigils(res.data);
    });
  }, []);

  const handleChangSigil = (event) => {
    setSigil(event.target.value);
  };

  const getSigilIndex = (_id) => {
    for (let i = 0; i < sigils.length; i++) {
      if (sigils[i]._id === _id) {
        return i;
      }
    }
    return "";
  };

  return (
    <Grid>
      <TextField
        select
        value={sigils[getSigilIndex(sigil._id)]}
        onChange={handleChangSigil}
        variant="standard"
      >
        {sigils
          .filter((obj) => obj.star === 0)
          .map((option) => (
            <MenuItem key={option.name} value={option}>
              <SigilsMenu option={option} />
            </MenuItem>
          ))}
        <MenuItem
          disabled
          style={{ opacity: 1, fontSize: 20, backgroundColor: "#ff8400" }}
        >
          4 *
        </MenuItem>
        {sigils
          .filter((obj) => obj.star === 4)
          .map((option) => (
            <MenuItem
              key={option.name}
              value={option}
              style={{ backgroundColor: "#ffead8" }}
            >
              <SigilsMenu option={option} />
            </MenuItem>
          ))}
        <MenuItem
          disabled
          style={{ opacity: 1, fontSize: 20, backgroundColor: "#ff0ba7" }}
        >
          5 *
        </MenuItem>
        {sigils
          .filter((obj) => obj.star === 5)
          .map((option) => (
            <MenuItem
              key={option.name}
              value={option}
              style={{ backgroundColor: "#ffb5e4" }}
            >
              <SigilsMenu option={option} />
            </MenuItem>
          ))}
        <MenuItem
          disabled
          style={{ opacity: 1, fontSize: 20, backgroundColor: "#2cb3d4" }}
        >
          3 *
        </MenuItem>
        {sigils
          .filter((obj) => obj.star === 3)
          .map((option) => (
            <MenuItem
              key={option.name}
              value={option}
              style={{ backgroundColor: "#bfe8f2" }}
            >
              <SigilsMenu option={option} />
            </MenuItem>
          ))}
        <MenuItem
          disabled
          style={{ opacity: 1, fontSize: 20, backgroundColor: "#35ad71" }}
        >
          2 *
        </MenuItem>
        {sigils
          .filter((obj) => obj.star === 2)
          .map((option) => (
            <MenuItem
              key={option.name}
              value={option}
              style={{ backgroundColor: "#aedec6" }}
            >
              <SigilsMenu option={option} />
            </MenuItem>
          ))}
        <MenuItem
          disabled
          style={{ opacity: 1, fontSize: 20 }}
        >
          1 *
        </MenuItem>
        {sigils
          .filter((obj) => obj.star === 1)
          .map((option) => (
            <MenuItem
              key={option.name}
              value={option}
              style={{ backgroundColor: "#cccccc" }}
            >
              <SigilsMenu option={option} />
            </MenuItem>
          ))}
      </TextField>
    </Grid>
  );
}

const SigilSet = ({ sigil1, sigil2, sigil_set, setSigilSet }) => {
  const classes = useRowStyles();
  useEffect(() => {
    if (
      (sigil1.name === "凶神的形象" && sigil2.name === "PMK - NERA") ||
      (sigil2.name === "凶神的形象" && sigil1.name === "PMK - NERA")
    ) {
      setSigilSet("每3秒恢复10能量");
    } else if (
      (sigil1.name === "被遗忘的古神触角" &&
        sigil2.name === "新人的脊柱 - LEPRICA") ||
      (sigil2.name === "被遗忘的古神触角" &&
        sigil1.name === "新人的脊柱 - LEPRICA")
    ) {
      setSigilSet("魔法穿透+1000，攻击力+1250");
    } else if (
      (sigil1.name === "薛伯粒子" && sigil2.name === "IC粒子") ||
      (sigil2.name === "薛伯粒子" && sigil1.name === "IC粒子")
    ) {
      setSigilSet("物理穿透+1300，攻击力+250");
    } else if (
      (sigil1.name === "否定型暗黑碎片" && sigil2.name === "FMPBS") ||
      (sigil2.name === "否定型暗黑碎片" && sigil1.name === "FMPBS")
    ) {
      setSigilSet("魔法穿透+1300，攻击力+250");
    } else if (
      (sigil1.name === "利莫里亚的护身符" && sigil2.name === "恶魔的头骨") ||
      (sigil2.name === "利莫里亚的护身符" && sigil1.name === "恶魔的头骨")
    ) {
      setSigilSet("物理防御+1000，暴击抵抗力+20%");
    } else if (
      (sigil1.name === "尸食教典仪" && sigil2.name === "VV核心") ||
      (sigil2.name === "尸食教典仪" && sigil1.name === "VV核心")
    ) {
      setSigilSet("魔法防御+1000，暴击抵抗力+20%");
    } else if (
      (sigil1.name === "透视异界之眼" && sigil2.name === "PMK - IFCS") ||
      (sigil2.name === "透视异界之眼" && sigil1.name === "PMK - IFCS")
    ) {
      setSigilSet("每3秒恢复10能量");
    } else if (
      (sigil1.name === "破碎的不规则多面体" && sigil2.name === "彩虹的羽毛") ||
      (sigil2.name === "破碎的不规则多面体" && sigil1.name === "彩虹的羽毛")
    ) {
      setSigilSet("物理穿透+1000，攻击力+1250");
    } else if (
      (sigil1.name === "ST055 - 反重力装置" && sigil2.name === "闪电结晶") ||
      (sigil2.name === "ST055 - 反重力装置" && sigil1.name === "闪电结晶")
    ) {
      setSigilSet("自身3消时，使所有敌人浮空。（冷却时间：7秒）");
    } else if (
      (sigil1.name === "ST006 - 变向装置" && sigil2.name === "盾女") ||
      (sigil2.name === "ST006 - 变向装置" && sigil1.name === "盾女")
    ) {
      setSigilSet("自身3消时，使所有敌人浮空。（冷却时间：7秒）");
    } else if (
      (sigil1.name === "修基的记忆" && sigil2.name === "三王的信物") ||
      (sigil2.name === "修基的记忆" && sigil1.name === "三王的信物")
    ) {
      setSigilSet(
        "使用1消时，1秒间命中率增加30%，使用3消时，1秒间魔法穿透增加2000"
      );
    } else if (
      (sigil1.name === "修基的风" && sigil2.name === "胡狼的陨铁剑") ||
      (sigil2.name === "修基的风" && sigil1.name === "胡狼的陨铁剑")
    ) {
      setSigilSet(
        "使用1消时，1秒间命中率增加30%，使用3消时，1秒间物理穿透增加2000"
      );
    } else if (
      (sigil1.name === "瓦奴芙的意志" && sigil2.name === "粗劣的戒指") ||
      (sigil2.name === "瓦奴芙的意志" && sigil1.name === "粗劣的戒指")
    ) {
      setSigilSet("每1秒恢复我方队友2000的体力（该效果无法叠加）");
    } else if (
      (sigil1.name === "哲尔的外壳" && sigil2.name === "流速控制器") ||
      (sigil2.name === "哲尔的外壳" && sigil1.name === "流速控制器")
    ) {
      setSigilSet("我方队友的物理防御与魔法防御 +300（该效果无法叠加）");
    } else {
      setSigilSet("非套裝");
    }
  }, [sigil1, sigil2, setSigilSet]);

  return (
    <TextField
      disabled
      select
      value={sigil_set}
      variant="standard"
      inputProps={{
        className: classes.sigilset,
      }}
    >
      {sigilSet.map((set) => (
        <MenuItem key={set.value} value={set.value}>
          {set.value}
        </MenuItem>
      ))}
    </TextField>
  );
};

const SuitSelect = ({
  attribute1,
  setAttribute1,
  attribute2,
  setAttribute2,
  sigil1,
  sigil2,
  sigil_set,
  setSigil1,
  setSigil2,
  setSigilSet,
}) => {
  return (
    <div>
      <Box aria-label="Set_Upgrade">
        <Upgrade attribute={attribute1} setAtb={setAttribute1} />
        <Upgrade attribute={attribute2} setAtb={setAttribute2} />
      </Box>

      <Box margin={1} aria-label="Set_Sigil">
        <Sigil sigil={sigil1} setSigil={setSigil1} />
        <Sigil sigil={sigil2} setSigil={setSigil2} />
        <Grid>
          <SigilSet
            sigil1={sigil1}
            sigil2={sigil2}
            sigil_set={sigil_set}
            setSigilSet={setSigilSet}
          />
        </Grid>
      </Box>
    </div>
  );
};

export default SuitSelect;
