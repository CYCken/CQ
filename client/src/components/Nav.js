import React from "react";
import "../App.css";
import Logo from "./images/Logo.jpg";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { Link } from "react-router-dom";

function Nav() {
  const navStyle = {
    color: "white",
  };
  const LogoStyle = {
    color: "black",
  };

  return (
    <nav>
      <Link style={LogoStyle} to="/">
        <img className="Logo" src={Logo} alt="" />
      </Link>
      <ul className="nav-Links">
        <div className="dropdown">
          <button
            className="dropbtn"
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            勇士
            <KeyboardArrowDownIcon />
          </button>
          <div className="dropdown-content">
            <Link
              style={navStyle}
              to={{
                pathname: "/character/warriors",
                state: { occupation: "warriors" },
              }}
            >
              劍士
            </Link>
            <Link
              style={navStyle}
              to={{
                pathname: "/character/paladins",
                state: { occupation: "paladins" },
              }}
            >
              騎士
            </Link>
            <Link
              style={navStyle}
              to={{
                pathname: "/character/archers",
                state: { occupation: "archers" },
              }}
            >
              弓手
            </Link>
            <Link
              style={navStyle}
              to={{
                pathname: "/character/hunters",
                state: { occupation: "hunters" },
              }}
            >
              獵人
            </Link>
            <Link
              style={navStyle}
              to={{
                pathname: "/character/wizards",
                state: { occupation: "wizards" },
              }}
            >
              法師
            </Link>
            <Link
              style={navStyle}
              to={{
                pathname: "/character/priests",
                state: { occupation: "priests" },
              }}
            >
              祭司
            </Link>
          </div>
        </div>
        <div>
          <Link
            className="addStyle"
            to={{
              pathname: "/addHero",
            }}
          >
            新增英雄
          </Link>
        </div>
        <div>
          <Link
            className="addStyle"
            to={{
              pathname: "/addSigil",
            }}
          >
            新增刻印
          </Link>
        </div>
      </ul>
    </nav>
  );
}

export default Nav;
