import React, { useState } from "react";
import Axios from "axios";

import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CancelPresentationOutlinedIcon from "@material-ui/icons/CancelPresentationOutlined";
import ImageIcon from "@material-ui/icons/Image";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import PublishIcon from "@material-ui/icons/Publish";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const Input = styled("input")({
  display: "none",
});

const stars = [{ star: 1 }, { star: 2 }, { star: 3 }, { star: 4 }, { star: 5 }];

const Sigil = () => {
  const [name, setName] = useState("");
  const [ename, setEname] = useState("");
  const [attribute, setAttribute] = useState("");
  const [star, setStar] = useState(1);
  const [file, setFile] = useState({});

  const send = () => {
    const data = new FormData();
    data.append("name", name);
    data.append("ename", ename);
    data.append("attribute", attribute);
    data.append("star", star);
    data.append("sigilImage", file);
    Axios.post("http://localhost:3001/sigil", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setName("");
    setEname("");
    setAttribute("");
    setFile({});
    setStar(1);
  };

  const handleImage = (event) => {
    const image = event.target.files[0];
    setFile(image);
  };

  return (
    <React.Fragment>
      <h1>新增刻印</h1>
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
              label="Attribute"
              id="Attribute"
              variant="filled"
              value={attribute}
              InputProps={{
                style: {
                  fontWeight: "bold",
                },
              }}
              onChange={(event) => {
                const { value } = event.target;
                setAttribute(value);
              }}
            />
            <Grid container justifyContent="flex-start" style={{ width: 237 }}>
              <Typography variant="h6" style={{ marginTop: 10 }}>
                Star
              </Typography>
              <TextField
                select
                value={star}
                onChange={(event) => {
                  setStar(event.target.value);
                }}
                variant="standard"
                style={{ marginTop: 10, marginLeft: 5 }}
              >
                {stars.map((n) => (
                  <MenuItem key={n.star} value={n.star}>
                    {n.star}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
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
              setAttribute("");
              setFile({});
              setStar(1);
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

// const Set = () => {
//   return (
//     <React.Fragment>
//       <h1>新增刻印套裝屬性</h1>
//       <CardContent></CardContent>
//     </React.Fragment>
//   );
// };

const AddSigil = () => {
  return (
    <React.Fragment>
      <Sigil />
      {/* <Set /> */}
    </React.Fragment>
  );
};

export default AddSigil;
