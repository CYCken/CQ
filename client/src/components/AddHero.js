import React, { useState } from "react";
import Axios from "axios";

import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import ImageIcon from "@material-ui/icons/Image";
import IconButton from "@material-ui/core/IconButton";
import PublishIcon from "@material-ui/icons/Publish";
import TextField from "@material-ui/core/TextField";
import { styled } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const Input = styled("input")({
  display: "none",
});

const AddHero = () => {
  const [name, setName] = useState("");
  const [ename, setEname] = useState("");
  const [occupation, setOccupation] = useState("");
  const [file, setFile] = useState({});

  const send = (event) => {
    const data = new FormData();
    data.append("name", name);
    data.append("ename", ename);
    data.append("occupation", occupation);
    data.append("heroImage", file);
    Axios.post("http://localhost:3001/character", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setName("");
    setEname("");
    setOccupation("");
    setFile({});
  };

  const handleImage = (event) => {
    const image = event.target.files[0];
    setFile(image);
  };

  return (
    <React.Fragment>
      <h1>新增英雄</h1>
      <CardContent>
        <Grid container spacing={1} style={{ marginBottom: 10 }}>
          <Grid
            container
            justifyContent="space-between"
            item
            xs
            style={{ backgroundColor: "white" }}
          >
            <TextField
              label="Name"
              id="name"
              variant="filled"
              value={name}
              InputProps={{
                style: {
                  fontWeight: "bold",
                },
              }}
              onChange={(event) => {
                const { value } = event.target;
                setName(value);
              }}
            />
            <TextField
              label="eName"
              id="eName"
              variant="filled"
              value={ename}
              InputProps={{
                style: {
                  fontWeight: "bold",
                },
              }}
              onChange={(event) => {
                const { value } = event.target;
                setEname(value);
              }}
            />
            <TextField
              label="Occupation"
              id="Occupation"
              variant="filled"
              value={occupation}
              InputProps={{
                style: {
                  fontWeight: "bold",
                },
              }}
              onChange={(event) => {
                const { value } = event.target;
                setOccupation(value);
              }}
            />
          </Grid>
          <Grid item xs>
            {Object.keys(file).length === 0 && file.constructor === Object ? (
              <label htmlFor="icon-button-file">
                <Input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  onChange={handleImage}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <ImageIcon style={{ width: 300, height: 120 }} />
                </IconButton>
              </label>
            ) : (
              <img
                src={URL.createObjectURL(file)}
                alt="Not found"
                style={{ maxHeight: 152, maxWidth: 600 }}
              />
            )}
          </Grid>
        </Grid>
        <div style={{ textAlign: "left" }}>
          <Button
            onClick={send}
            variant="contained"
            color="primary"
            style={{ width: 64, marginRight: 10 }}
            aria-label="Create_Submit"
          >
            <PublishIcon />
          </Button>
          <Button
            onClick={() => {
              setName("");
              setEname("");
              setOccupation("");
              setFile({});
            }}
            variant="contained"
            color="secondary"
            aria-label="Create_Cancel"
          >
            <CancelPresentationOutlinedIcon />
          </Button>

          {Object.keys(file).length === 0 && file.constructor === Object ? (
            <div></div>
          ) : (
            <Button
              onClick={() => {
                setFile({});
              }}
              variant="contained"
              color="secondary"
              aria-label="Image_Cancel"
              style={{ float: "right" }}
            >
              <CancelPresentationOutlinedIcon />
            </Button>
          )}
        </div>
      </CardContent>
    </React.Fragment>
  );
};

export default AddHero;
