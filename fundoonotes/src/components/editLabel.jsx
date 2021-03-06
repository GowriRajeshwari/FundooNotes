import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Typography, Modal } from "@material-ui/core";
import delete1 from "../assets/delete.png";
import add from "../assets/add.png";
import {
  getNoteLabelList,
  addLabels,
  deleteNoteLabel,
} from "../services/notesService";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import TakeaNotes from "./takeaNotes";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

class EditLabel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      setOpen: true,
      dialogBoxOpen: true,
      dialogBoxClose: false,
      data: [],
      label: "",
    };
  }
  componentDidMount = () => {
    this.setState({ dialogBoxOpen: true });
    getNoteLabelList().then((response) => {
      if (response.status === 200) {
        this.setState({ data: response.data.data.details });
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  handelNoteDialogBox = () => {
    this.setState({
      dialogBoxOpen: !this.state.dialogBoxOpen,
    });
    this.componentDidMount();
    this.props.labeldata();
  };
  handleOpen = () => {
    this.setState({ setOpen: true });
  };

  handleClose = () => {
    this.setState({ setOpen: false });
  };
  Done = () => {
    this.props.labeldata();
  };
  addlabel = () => {
    const userId = localStorage.getItem("userId");
    let data = {
      label: this.state.label,
      isDeleted: false,
      userId: userId,
    };
    addLabels(data).then((response) => {
      if (response.status === 200) {
        this.componentDidMount();
        this.setState({ label: "" });
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  onchangelabel = (event) => {
    this.setState({ label: event.target.value });
  };
  deletelabel = (id) => {
    deleteNoteLabel(id).then((response) => {
      if (response.status === 200) {
        this.componentDidMount();
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  render() {
    return (
      <div>
        <div className="classespaper12">
          <Typography>Edit Label</Typography>
          <div className="textdashEdit">
            <div onClick={this.addlabel}>
              <AddIcon />
            </div>
            <div>
              <TextField
                id="btndash"
                variant="filled"
                placeholder="Create"
                size="small"
                InputProps={{ disableUnderline: true }}
                onChange={this.onchangelabel}
              />
            </div>
            <div>
              <DeleteIcon />
            </div>
          </div>
          <div className="buttondone" onClick={(e) => this.Done(e)}>
            <Button>Done</Button>
          </div>
          <div>
            {this.state.data.map((data, index) => (
              <div className="textdashEdit">
                <div onClick={this.addlabel}>
                  <AddIcon />
                </div>
                <div>
                  <TextField
                    helperText={this.state.helperTextEmail}
                    id="btndash"
                    variant="filled"
                    value={data.label}
                    size="small"
                    InputProps={{ disableUnderline: true }}
                    onChange={this.onchangelabel}
                  />
                </div>
                <div onClick={() => this.deletelabel(data.id)}>
                  <DeleteIcon />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default EditLabel;
