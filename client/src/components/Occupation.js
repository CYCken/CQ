import React from "react";
import { NavLink } from "react-router-dom";

import "../App.css";

const Occupation = () => {
  return (
    <div>
      <br />
      <div className="Occupation_List">
        <NavLink
          to={{
            pathname: "/character/warriors",
            state: { occupation: "warriors" },
          }}
          style={{ color: "black", textDecoration: "none" }}
          activeStyle={{
            backgroundColor: "#424242",
            color: "white",
          }}
        >
          <img
            src="https://patchwiki.biligame.com/images/cq/b/b6/i918j124cq4pfpyqfcdeieu6s0evcmg.png"
            alt=""
          />
          &nbsp;劍士
        </NavLink>
        <NavLink
          to={{
            pathname: "/character/paladins",
            state: { occupation: "paladins" },
          }}
          style={{ color: "black", textDecoration: "none" }}
          activeStyle={{
            backgroundColor: "#424242",
            color: "white",
          }}
        >
          <img
            src="https://patchwiki.biligame.com/images/cq/2/25/31qhbls0u0tlioevx4e1pd99ug4q3rj.png"
            alt=""
          />
          &nbsp;騎士
        </NavLink>
        <NavLink
          to={{
            pathname: "/character/archers",
            state: { occupation: "archers" },
          }}
          style={{ color: "black", textDecoration: "none" }}
          activeStyle={{
            backgroundColor: "#424242",
            color: "white",
          }}
        >
          <img
            src="https://patchwiki.biligame.com/images/cq/5/5e/9bmv4pubawj4b8kqdemg7y8dq3q0rrh.png"
            alt=""
          />
          &nbsp;弓手
        </NavLink>
        <NavLink
          to={{
            pathname: "/character/hunters",
            state: { occupation: "hunters" },
          }}
          style={{ color: "black", textDecoration: "none" }}
          activeStyle={{
            backgroundColor: "#424242",
            color: "white",
          }}
        >
          <img
            src="https://patchwiki.biligame.com/images/cq/4/4a/9x6hyeq3t6iyllq89cyx6ff8xpn47ui.png"
            alt=""
          />
          &nbsp;獵人
        </NavLink>
        <NavLink
          to={{
            pathname: "/character/wizards",
            state: { occupation: "wizards" },
          }}
          style={{ color: "black", textDecoration: "none" }}
          activeStyle={{
            backgroundColor: "#424242",
            color: "white",
          }}
        >
          <img
            src="https://patchwiki.biligame.com/images/cq/a/a4/4ppk96n7abwz5hex4k74w43uo2aeat8.png"
            alt=""
          />
          &nbsp;法師
        </NavLink>
        <NavLink
          to={{
            pathname: "/character/priests",
            state: { occupation: "priests" },
          }}
          style={{ color: "black", textDecoration: "none" }}
          activeStyle={{
            backgroundColor: "#424242",
            color: "white",
          }}
        >
          <img
            src="https://patchwiki.biligame.com/images/cq/7/73/nj2axmstgqvzchluw1vjcb1s4z1uwy6.png"
            alt=""
          />
          &nbsp;祭司
        </NavLink>
      </div>
    </div>
  );
};

export default Occupation;
