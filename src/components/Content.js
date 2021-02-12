import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core/";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import copy from "clipboard-copy";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import clsx from "clsx";
import { green } from "@material-ui/core/colors";
const includeHTML = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    position: "relative",
    width: "80%",
    marginLeft: "8%",
    backgroundColor: "#EBEBEB",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: "2em",
  },
  button: {
    padding: theme.spacing(1, 2),
    float: "right",
    marginRight: "9%",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  menu: {
    width: 200,
  },
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: "flex",
    alignItems: "center",
  },
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles();
  const { className, message, onClose, ...other } = props;
  const Icon = CheckCircleIcon;

  return (
    <SnackbarContent
      className={clsx(classes["success"], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}
export default function Content() {
  const [params, setParams] = useState(4);
  const [html, setHtml] = useState("No");
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleChange = (event) => {
    setHtml(event.target.value);
  };
  const numberOfParagraphs = (e) => {
    setParams(e.target.value);
  };
  const copyData = (e) => {
    handleClick();
    copy(data);
  };
  async function getUser() {
    try {
      if (html === "Yes") {
        const response = await axios.get(
          "https://litipsum.com/api/pride-and-prejudice/" + params + "/p"
        );

        setData(response.data);
      } else {
        const response = await axios.get(
          "https://litipsum.com/api/pride-and-prejudice/" + params
        );

        setData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUser();
  }, [params, html]);
  return (
    <div>
      <Typography
        variant="h4"
        component="h3"
        style={{ padding: "1.5rem", textAlign: "center" }}
      >
        Your Random Generated Text
        <br />
        <br />
        <div>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            helperText="Paragraphs"
            margin="normal"
            variant="outlined"
            type="number"
            InputProps={{
              inputProps: {
                max: 15,
                min: 1,
              },
            }}
            onChange={numberOfParagraphs}
            style={{ alignItems: "center" }}
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Include HTML"
            className={classes.textField}
            value={html}
            onChange={handleChange}
            helperText="Want to include HTML?"
            margin="normal"
            variant="outlined"
          >
            {includeHTML.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>{" "}
        </div>
        <div>
          <Button
            variant="outlined"
            color="inherit"
            className={classes.button}
            onClick={copyData}
          >
            Copy Text
          </Button>{" "}
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <MySnackbarContentWrapper
              onClose={handleClose}
              message="Text Copied Successfully !!"
            />
          </Snackbar>
          <br />
        </div>
      </Typography>
      <div>
        <Paper className={classes.root} square={false}>
          <pre>{data}</pre>
        </Paper>
      </div>
    </div>
  );
}
