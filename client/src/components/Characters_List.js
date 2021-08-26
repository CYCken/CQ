import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router";

import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import "../App.css";
import Occupation from "./Occupation";
import Character from "./Character";

async function fetchData(occupation, setHeros) {
  const api = Axios.create({
    baseURL: "https://example.com/api",
    params: {
      t: new Date().getTime(),
    },
  });

  const response = await api.get(
    `http://localhost:3001/character/${occupation}`
  );
  const data = response.data;
  setHeros(data);
}

const Characters_List = () => {
  const { occupation } = useParams();
  const [Heros, setHeros] = useState([]);
  const [order, setOrder] = useState(false);

  useEffect(() => {
    fetchData(occupation, setHeros);
    setOrder(false);
  }, [occupation]);

  const handleSort = () => {
    setOrder(!order);
    setHeros((prev) => {
      const reverse = prev.reverse();
      return [...reverse];
    });
  };

  return (
    <div>
      <Occupation />
      <TableContainer componet={Paper}>
        <Table aria-label="Character_List" style={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <button
                  onClick={handleSort}
                  style={{ border: "none", background: "none" }}
                >
                  {order ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                </button>
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">eName</TableCell>
              <TableCell align="right">Id</TableCell>
              <TableCell align="right">Occupation</TableCell>
              <TableCell align="right">Weapon Own Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Heros.map((hero) => (
              <Character
                key={hero.name}
                heroProps={hero}
                aria-label="Character"
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Characters_List;
