import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  ListItemText,
  ListItemAvatar,
  Paper,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  ListItem,
  Popper,
  Divider,
  Popover,
  Avatar,
  List,
  Chip,
} from "@material-ui/core";
import profile from "../assets/profile.png";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import reminder from "../assets/reminder.svg";
import personAdd from "../assets/person_add.png";
import color from "../assets/color.png";
import download from "../assets/download.png";
import galary from "../assets/galary.png";
import pin from "../assets/pin.svg";
import { searchUserList } from "../services/notesService";
import { getNotes, setNotes } from "../services/notesService";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import { blue } from "@material-ui/core/colors";
import setting from "../assets/setting.png";
import Color from "./color";
import EditNotes from "./editNotes";
import DateTimePicker from "./dateTimePicker";
import Collaborator from "./collaborator";
import FaceIcon from "@material-ui/icons/Face";
import list_black from "../assets/list_black.png";
import ListItemchecklist from "./listItemchecklist";
import LabelNotes from "./labelNotes";
import schedule from "../assets/schedule.png";

require("dotenv").config();

class NewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      next: true,
      value: "",
      show: [],
      data: [],
      description: "",
      title: "",
      open: false,
      anchorEl: null,
      setAnchorEl: null,
      date: "",
      dateshow: false,
      date_timeshow: false,
      startdate: new Date(),
      collabshow: false,
      collabatorName: "",
      details: [],
      collabatorArray: [],
      collabatorValue: "",
      originalArray: [],
      tomorrow: "",
      pined: false,
      color: "",
      archived: false,
      timeTodayTommorow: "08:00:00",
      timepicker: "",
      dialogBoxOpen: false,
      listitem: true,
      labelIdList: [],
      labelNotes: [],
      capitialInitial: "",
    };
  }
  handleDateChange = (date) => {
    this.setState({ date: date });
  };
  componentDidMount = () => {
    var d = new Date();
    d.setDate(new Date().getDate() + 1);
    this.setState({
      tomorrow: d,
      time: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
    });
  };
  takeNote = (event) => {
    event.preventDefault();
    this.setState({ next: false, listitem: true });
  };

  onchangeText = (event) => {
    this.setState({ description: event.target.value });
  };
  onChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  };

  _onMouseMove = (event) => {
    this.setState({ show: true });
  };
  _onMouseOut = (event) => {
    this.setState({ show: false });
  };
  close = (event) => {
    event.preventDefault();
    for (let i = 0; i < this.state.labelNotes.length; i++) {
      this.state.labelIdList.push(this.state.labelNotes[i].id);
    }
    this.setState({ labelIdList: this.state.labelIdList });
    if (this.state.title != "") {
      const datetostring = this.state.date.toString();
      const form_data = new FormData();
      form_data.append("title", this.state.title);
      form_data.append("description", this.state.description);
      form_data.append("reminder", datetostring);
      form_data.append("isPined", this.state.pined);
      form_data.append("isArchived", this.state.archived);
      form_data.append("color", this.state.color);
      form_data.append("labelIdList", JSON.stringify(this.state.labelIdList));
      form_data.append(
        "collaberators",
        JSON.stringify(this.state.originalArray)
      );

      setNotes(form_data).then((response) => {
        if (response.status === 200) {
          document.getElementById("NoteExpand").style.background = "white";
          this.props.sendNewData();
          this.setState({
            originalArray: [],
            title: "",
            description: "",
            next: true,
            color: "",
            date_timeshow: false,
            date: "",
            labelNotes: [],
            labelIdList: [],
          });
        } else {
          document.getElementById("NoteExpand").style.background = "white";
          this.setState({
            snackbarmsg: "Netwrork is slow",
            snackbaropen: true,
          });
        }
      });
    } else {
      document.getElementById("NoteExpand").style.background = "white";
      this.setState({
        originalArray: [],
        title: "",
        description: "",
        next: true,
        color: "",
        date_timeshow: false,
        date: "",
        labelIdList: [],
        labelNotes: [],
      });
    }
  };
  timepicker = (event) => {
    this.setState({ timepicker: event.target.value });
  };

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open,
    });
  };
  dateshow = () => {
    this.setState({ dateshow: !this.state.dateshow });
  };
  back = () => {};
  todaydate = () => {
    this.setState({
      date: new Date().toDateString() + " " + this.state.timeTodayTommorow,
      date_timeshow: true,
    });
  };
  tomorrowdate = () => {
    this.setState({
      date:
        this.state.tomorrow.toDateString() + " " + this.state.timeTodayTommorow,
      date_timeshow: true,
    });
  };
  datesave = () => {
    this.setState({
      date: this.state.startdate + " " + this.state.timepicker,
      date_timeshow: true,
      dateshow: false,
    });
  };

  handleDateChange = (date) => {
    this.setState({
      startdate: date.toDateString(),
    });
  };
  collabshow = () => {
    this.setState({ collabshow: true });
  };

  onchangecollabator = (event) => {
    this.setState({
      collabatorName: event.target.value,
    });
    let data = {
      searchWord: event.target.value,
    };
    searchUserList(data).then((response) => {
      if (response.status === 200) {
        this.setState({ details: response.data.data.details });
      } else {
      }
    });
  };

  collabsave = () => {
    this.setState({
      collabshow: false,
      originalArray: this.state.collabatorArray,
    });
  };
  time = () => {
    this.setState({ timeShow: true });
  };
  archivebutton = (event) => {
    this.setState({ archived: true });
    event.preventDefault();
    if (this.state.title != "") {
      const datetostring = this.state.date.toString();
      let data = {
        title: this.state.title,
        description: this.state.description,
        isPined: this.state.pined,
        color: this.state.color,
        isArchived: true,
        labelIdList: this.state.labelIdList,
        reminder: datetostring,
        collaberator: this.state.originalArray,
      };
      setNotes(data).then((response) => {
        if (response.status === 200) {
          document.getElementById("NoteExpand").style.background = "white";
          this.props.sendNewData();
          this.setState({ title: "", description: "", next: true, color: "" });
        } else {
          this.setState({
            snackbarmsg: "Netwrork is slow",
            snackbaropen: true,
          });
        }
      });
    } else {
      this.setState({ title: "", description: "", next: true });
    }
  };

  getData = (val) => {
    this.setState({ color: val });
    document.getElementById("NoteExpand").style.background = val;
  };
  sendtimeDate = (date) => {
    this.setState({ date: date, date_timeshow: true, dateshow: false });
  };

  handleDelete = () => {
    this.setState({ date: "", date_timeshow: false });
  };

  listitem = () => {
    this.setState({ listitem: false, next: false });
  };
  sendlist = () => {
    this.setState({ next: true });
    this.props.sendNewData();
  };
  labelNotes = (value) => {
    this.setState({ labelNotes: value });
  };
  handleDeletelabel = (id, index) => {
    if (index > -1) {
      this.state.labelNotes.splice(index, 1);
    }
    this.setState({ labelNotes: this.state.labelNotes });
  };
  collaboratorsave = (value, capitialInitial) => {
    this.setState({
      originalArray: value,
      collabshow: false,
      capitialInitial: capitialInitial,
    });
  };
  render() {
    return (
      <div className="containerdash">
        {this.state.next ? (
          <div className="paper">
            <div className="paper">
              <Typography onClick={(e) => this.takeNote(e)} className="Typo">
                Take a Notes
              </Typography>
              <div className="listItem" onClick={this.listitem}>
                <img src={list_black} className="ImageSize" />
              </div>
            </div>
          </div>
        ) : this.state.collabshow ? (
          <Collaborator collbasave={this.collaboratorsave} />
        ) : this.state.listitem ? (
          <div className="paper2">
            <div id="NoteExpand">
              <div className="showicon padding2">
                <TextField
                  value={this.state.title}
                  id="standard-multiline-flexible"
                  placeholder="Title"
                  multiline
                  rowsMax="4"
                  size="small"
                  className="widthStyle"
                  onChange={this.onChangeTitle}
                  InputProps={{ disableUnderline: true }}
                />
                <div className="padding">
                  <img src={pin} id="imgdashnotes" />
                </div>
              </div>
              <div className="paddingTop">
                <TextField
                  value={this.state.description}
                  id="standard-multiline-flexible"
                  placeholder="Take a Note"
                  multiline
                  rowsMax="4"
                  size="small"
                  className="widthStyle"
                  onChange={this.onchangeText}
                  InputProps={{ disableUnderline: true }}
                />
              </div>
              {this.state.date_timeshow ? (
                <Chip
                  className="chipWidth"
                  icon={<img src={schedule} />}
                  label={this.state.date}
                  onDelete={this.handleDelete}
                  color="white"
                  value={this.state.date}
                />
              ) : null}
              <div className="labelStyle">
                {this.state.originalArray.map((originalArray, index) => (
                  <div className="padding">
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <div className="collaboratorStyle">
                          <div>{this.state.capitialInitial}</div>
                        </div>
                      </ListItemAvatar>
                      <ListItemText primary={originalArray.firstName} />
                    </ListItem>
                  </div>
                ))}
              </div>
              <div className="labelStyle">
                {this.state.labelNotes.map((labelNotes, index) => (
                  <div className="padding">
                    <Chip
                      key={index}
                      className="chipStyle"
                      label={labelNotes.label}
                      onDelete={() =>
                        this.handleDeletelabel(labelNotes.id, index)
                      }
                      color="white"
                    />
                  </div>
                ))}
              </div>
              <div className="mybutton2">
                <DateTimePicker sendtimeDate={this.sendtimeDate} />
                <div onClick={this.collabshow}>
                  <img src={personAdd} id="imgdashnotes" />
                </div>
                <div>
                  <Color sendColor={this.getData} />
                </div>
                <div>
                  <img src={galary} id="imgdashnotes" />
                </div>
                <div onClick={this.archivebutton}>
                  <img src={download} id="imgdashnotes" />
                </div>
                <LabelNotes labelNotes={this.labelNotes} />
                <div className="centerStyle">
                  <Button size="small" onClick={(e) => this.close(e)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <ListItemchecklist sendlist={this.sendlist} />
          </div>
        )}
      </div>
    );
  }
}

export default NewNote;
