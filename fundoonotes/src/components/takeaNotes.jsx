import React, { Component } from "react";
import {
  Card,
  CardContent,
  Grid,
  Dialog,
  Chip,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Divider,
} from "@material-ui/core";
import personAdd from "../assets/person_add.png";
import color from "../assets/color.png";
import download from "../assets/download.png";
import galary from "../assets/galary.png";
import pin from "../assets/pin.svg";
import { searchUserList } from "../services/notesService";
import {
  updateChecklist,
  getNotesListByLabel,
  getNotes,
  setNotes,
  deleteNotes,
  removeRemainderNotes,
  updateReminderNotes,
  changeColor,
  archiveNote,
  deletelabelNotes,
} from "../services/notesService";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import { blue } from "@material-ui/core/colors";
import setting from "../assets/setting.png";
import Color from "./color";
import EditNotes from "./editNotes";
import NewNote from "./newNote";
import DeleteIcon from "./deleteIcon";
import DateTimePicker from "./dateTimePicker";
import FaceIcon from "@material-ui/icons/Face";
import schedule from "../assets/schedule.png";
import AskQuestion from "./askQuestion";
import ClipLoader from "react-spinners/ClipLoader";
import checkboxoutline from "../assets/checkboxoutline.png";
import checkboxtick from "../assets/checkboxtick.png";

require("dotenv").config();

function searchigFor(query) {
  return function (search) {
    return (
      search.title.toLowerCase().includes(query.toLowerCase()) ||
      search.description.toLowerCase().includes(query.toLowerCase()) ||
      !query
    );
  };
}
class TakeaNotes extends Component {
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
      date: new Date(),
      datashow: false,
      date_timeshow: true,
      startdate: new Date(),
      collabshow: true,
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
      noteIdList: [],
      nonDeleteData: [],
      query: this.props.query,
      editdata: [],
      noteLabels: [],
      choice: "",
      askQuestion: false,
      questionId: "",
      showQuestion: false,
      nmsg: "",
      labelNoteShow: "",
      label: "",
      loading: true,
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
    if (this.props.choice === "Archive") {
    }
    getNotes().then((response) => {
      if (response.status === 200) {
        this.setState({ data: [] });

        for (let i = 0; i < response.data.data.data.length; i++) {
          if (
            response.data.data.data[i].isDeleted != true &&
            response.data.data.data[i].isArchived != true
          ) {
            this.state.data.push(response.data.data.data[i]);
          } else {
            continue;
          }
        }
        this.setState({ data: this.state.data, loading: false });
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };

  getCalled = (labelNoteShow, label) => {
    var d = new Date();
    d.setDate(new Date().getDate() + 1);
    this.setState({
      tomorrow: d,
      time: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
    });
    if (labelNoteShow === "true") {
      getNotesListByLabel(label).then((response) => {
        if (response.status === 200) {
          this.setState({ data: [] });

          for (let i = 0; i < response.data.data.data.length; i++) {
            if (
              response.data.data.data[i].isDeleted != true &&
              response.data.data.data[i].isArchived != true
            ) {
              this.state.data.push(response.data.data.data[i]);
            } else {
              continue;
            }
          }
          this.setState({ data: this.state.data });
        } else {
          this.setState({
            snackbarmsg: "Netwrork is slow",
            snackbaropen: true,
          });
        }
      });
    } else if (labelNoteShow === "false") {
      getNotes().then((response) => {
        if (response.status === 200) {
          this.setState({ data: [] });

          for (let i = 0; i < response.data.data.data.length; i++) {
            if (
              response.data.data.data[i].isDeleted != true &&
              response.data.data.data[i].isArchived != true
            ) {
              this.state.data.push(response.data.data.data[i]);
            } else {
              continue;
            }
          }
          this.setState({ data: this.state.data });
        } else {
          this.setState({
            snackbarmsg: "Netwrork is slow",
            snackbaropen: true,
          });
        }
      });
    }
  };

  takeNote = (event) => {
    event.preventDefault();
    this.setState({ next: false });
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
    if (this.state.title != "") {
      const datetostring = this.state.date.toString();
      let data = {
        title: this.state.title,
        description: this.state.description,
        isPined: this.state.pined,
        color: this.state.color,
        isArchived: this.state.archived,
        labelIdList: [],
        reminder: datetostring,
        collaberator: this.state.originalArray,
      };
      setNotes(data).then((response) => {
        if (response.status === 200) {
          this.componentDidMount();
          this.setState({ title: "", description: "", next: true });
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
    this.setState({ dateshow: !this.state.datashow });
  };
  back = () => {
    this.setState({ dateshow: false });
  };
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
    });
  };

  handleDateChange = (date) => {
    this.setState({
      startdate: date.toDateString(),
    });
  };
  collabshow = () => {
    this.setState({ collabshow: false });
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
  showingCollabator = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: true,
    });
  };
  collabatorClick = (dat) => {
    this.setState({
      open: false,
      collabatorValue: dat,
    });
    this.state.collabatorArray.push(dat);
  };
  collabsave = () => {
    this.setState({
      collabshow: true,
      originalArray: this.state.collabatorArray,
    });
  };
  time = () => {
    this.setState({ timeShow: true });
  };
  archivebutton = (data) => {
    if (data.title != "") {
      let data1 = {
        isArchived: true,
        noteIdList: [data.id],
      };
      archiveNote(data1).then((response) => {
        if (response.status === 200) {
          this.componentDidMount();
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

  colorboxbutton = () => {};
  getData = (val, index, id) => {
    console.log(val);
    this.setState({ color: val });
    document.getElementsByClassName("mydivouter")[
      index
    ].style.backgroundColor = val;

    let data = {
      color: val,
      noteIdList: [id],
    };
    changeColor(data).then((response) => {
      if (response.status === 200) {
        this.componentDidMount();
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  dialogboxOpen = (data, choice) => {
    this.setState({
      dialogBoxOpen: !this.state.dialogBoxOpen,
      editdata: data,
      choice: choice,
    });
  };
  handelNoteDialogBox = () => {
    this.setState({
      dialogBoxOpen: !this.state.dialogBoxOpen,
    });
    this.componentDidMount();
  };
  getdataupdate = () => {
    this.handelNoteDialogBox();
    this.componentDidMount();
  };
  sendNewData = () => {
    this.componentDidMount();
  };

  sendtimeDate = (date) => {
    this.setState({ date: date, date_timeshow: true, dateshow: false });
  };
  sendtrash = (val, id) => {
    if (val == true) {
      this.componentDidMount();
    } else {
      this.setState({ askQuestion: true, questionId: id });
    }
  };
  handleDelete = (id) => {
    this.setState({ date: "", date_timeshow: true });
    let data = {
      noteIdList: [id],
    };
    removeRemainderNotes(data).then((response) => {
      if (response.status === 200) {
        this.componentDidMount();
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  reminder = (reminder, id) => {
    if (reminder != 0) {
      return (
        <div className="typoTextStyle">
          <Chip
            className="reminderChip"
            icon={<img src={schedule} />}
            label={reminder}
            onDelete={() => this.handleDelete(id)}
            color="white"
            value={this.state.date}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  sendtimeDate = (date, id) => {
    let data = {
      reminder: date,
      noteIdList: [id],
    };
    updateReminderNotes(data).then((response) => {
      if (response.status === 200) {
        this.componentDidMount();
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  archived = () => {
    this.componentDidMount();
  };
  handleDeletelabel = (labelId, id) => {
    deletelabelNotes(id, labelId).then((response) => {
      if (response.status === 200) {
        this.componentDidMount();
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  close = (val) => {
    if (val == true) {
      this.setState({ askQuestion: false });
      this.componentDidMount();
    }
  };
  removetag = (message) => {
    var content = message.replace(/<[^>]*>/g, "");
    return content;
  };
  msg = (content) => {
    if (content.length > 0) {
      this.setState({ msg: "SHOW QUESTION" });
    } else {
      this.setState({ msg: "ASK A QUESTION" });
    }
  };
  checkbox = (id, checklistId, itemName) => {
    let data = {
      itemName: itemName,
      status: "close",
    };
    updateChecklist(data, id, checklistId).then((response) => {
      if (response.status === 200) {
        this.componentDidMount();
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  checkboxoutline = (id, checklistId, itemName) => {
    let data = {
      itemName: itemName,
      status: "open",
    };
    updateChecklist(data, id, checklistId).then((response) => {
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
        {this.state.askQuestion ? (
          <AskQuestion
            close={this.close}
            questionId={this.state.questionId}
            msg={this.state.msg}
          />
        ) : (
          <div>
            <div className="maincontainer">
              <NewNote sendNewData={this.sendNewData} />
            </div>
            <div className="maincontainer">
              <ClipLoader
                css={{ width: "50px", height: "50px", marginTop: "45px" }}
                size={150}
                color={"#123abc"}
                loading={this.state.loading}
              />
              <div
                className={
                  this.props.gridView ? "notescontainer1" : "notescontainer"
                }
              >
                {this.state.data
                  .filter(searchigFor(this.props.query))
                  .map((data, index) => {
                    return (
                      <div
                        key={index}
                        onMouseMove={this._onMouseMove}
                        onMouseLeave={this._onMouseOut}
                        className="paddingChnage"
                      >
                        <Card
                          className={
                            this.props.gridView
                              ? "mydivoutergrid"
                              : "mydivouter"
                          }
                          style={{
                            backgroundColor: data.color,
                            boxShadow:
                              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          }}
                        >
                          <div className="padding2">
                            <div className="showicon">
                              <div
                                className={
                                  this.props.gridView ? "typoText1" : "typoText"
                                }
                                onClick={() =>
                                  this.dialogboxOpen(data, "editNotes")
                                }
                              >
                                {data.title}
                              </div>
                              <div className="mybuttonoverlap padding">
                                <img src={pin} id="imgdashnotes" />
                              </div>
                            </div>
                            <div
                              className="typoText"
                              onClick={() =>
                                this.dialogboxOpen(data, "editNotes")
                              }
                            >
                              {data.description}
                            </div>

                            <div>
                              {this.state.date_timeshow
                                ? this.reminder(data.reminder, data.id)
                                : null}
                            </div>
                            {data.noteCheckLists.map((notelist, index) => (
                              <List>
                                {notelist.status === "close" ? (
                                  <div className="textdash12">
                                    <div
                                      className="ImageDiv"
                                      onClick={() =>
                                        this.checkboxoutline(
                                          data.id,
                                          notelist.id,
                                          notelist.itemName
                                        )
                                      }
                                    >
                                      <img
                                        src={checkboxtick}
                                        id="imgdashnotes"
                                      />
                                    </div>
                                    <Typography
                                      style={{
                                        width: "100%",
                                        textDecoration: "line-through",
                                      }}
                                    >
                                      {notelist.itemName}
                                    </Typography>
                                  </div>
                                ) : (
                                  <div className="textdash12">
                                    <div
                                      className="ImageDiv"
                                      onClick={() =>
                                        this.checkbox(
                                          data.id,
                                          notelist.id,
                                          notelist.itemName
                                        )
                                      }
                                    >
                                      <img
                                        src={checkboxoutline}
                                        id="imgdashnotes"
                                      />
                                    </div>
                                    <Typography className="widthStyle">
                                      {notelist.itemName}
                                    </Typography>
                                  </div>
                                )}
                              </List>
                            ))}
                            <div className="labelcontainer">
                              {data.noteLabels.map((labelNotes, index) => (
                                <div className="padding3">
                                  <Chip
                                    key={index}
                                    className="chipStyle"
                                    label={labelNotes.label}
                                    onDelete={() =>
                                      this.handleDeletelabel(
                                        labelNotes.id,
                                        data.id
                                      )
                                    }
                                    color="white"
                                  />
                                </div>
                              ))}
                              <div className="collabstyle">
                                {data.collaborators.map(
                                  (collabatorArray, index) => (
                                    <div className="padding">
                                      <div className="collaboratorStyle">
                                        <div>
                                          {collabatorArray.firstName
                                            .charAt(0)
                                            .toUpperCase()}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            <div className="mybuttonoverlap">
                              <div className="mybutton2">
                                <div
                                  className="padding"
                                  onClick={(e) => this.handleClick(e)}
                                >
                                  <DateTimePicker
                                    sendtimeDate={(date) =>
                                      this.sendtimeDate(date, data.id)
                                    }
                                  />
                                </div>
                                <div
                                  className="padding"
                                  onClick={() =>
                                    this.dialogboxOpen(data, "editcollaborator")
                                  }
                                >
                                  <img src={personAdd} id="imgdashnotes" />
                                </div>
                                <div className="padding">
                                  <Color
                                    index={index}
                                    sendColor={(val, index) =>
                                      this.getData(val, index, data.id)
                                    }
                                  />
                                </div>
                                <div className="padding">
                                  <img src={galary} id="imgdashnotes" />
                                </div>
                                <div
                                  className="padding"
                                  onClick={() => this.archivebutton(data)}
                                >
                                  <img src={download} id="imgdashnotes" />
                                </div>
                                <DeleteIcon
                                  msg={() =>
                                    this.msg(data.questionAndAnswerNotes)
                                  }
                                  message={this.state.msg}
                                  id={data.id}
                                  ashShow={data.questionAndAnswerNotes.length}
                                  sendtrash={this.sendtrash}
                                  noteLabel={data.noteLabels}
                                />
                              </div>
                            </div>
                            {data.questionAndAnswerNotes.length > 0 ? (
                              <div>
                                <Divider />

                                <div className="typoText">Question Asked</div>
                                <div className="typoText">
                                  {this.removetag(
                                    data.questionAndAnswerNotes[0].message
                                  )}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </Card>
                      </div>
                    );
                  })}
              </div>
            </div>
            <Dialog
              open={this.state.dialogBoxOpen}
              onClose={this.handelNoteDialogBox}
            >
              <EditNotes
                data={this.state.editdata}
                choice={this.state.choice}
                sendupdate={this.getdataupdate}
              />
            </Dialog>
          </div>
        )}
      </div>
    );
  }
}
export default TakeaNotes;
