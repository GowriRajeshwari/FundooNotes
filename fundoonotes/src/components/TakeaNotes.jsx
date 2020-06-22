import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
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
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import { blue } from "@material-ui/core/colors";
import setting from "../assets/setting.png";
import Color from "./Color";
import EditNotes from "./EditNotes";
import NewNote from "./NewNote";
import DeleteIcon from "./DeleteIcon";
import DateTimePicker from "./DateTimePicker";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import schedule from "../assets/schedule.png";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import AskQuestion from "./AskQuestion";
import Divider from "@material-ui/core/Divider";
import ClipLoader from "react-spinners/ClipLoader";
import checkboxoutline from "../assets/checkboxoutline.png";
import checkboxtick from "../assets/checkboxtick.png";

require("dotenv").config();

function searchigFor(query) {
  return function (x) {
    return (
      x.title.toLowerCase().includes(query.toLowerCase()) ||
      x.description.toLowerCase().includes(query.toLowerCase()) ||
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
  // UNSAFE_componentWillReceiveProps=async(nextProps)=>{
  //   if(nextProps.labelNoteShow){
  //     await this.setState({ labelNoteShow : nextProps.labelNoteShow ,label :nextProps.label})
  //   }
  //   console.log(nextProps.labelNoteShow)
  //   this.getCalled(nextProps.labelNoteShow,nextProps.label);
  // }
  // componentWillMount=()=>{
  //   this.setState({ labelNoteShow : this.props.labelNoteShow})
  // }
  componentDidMount = () => {
    console.log("archive", this.props.choice);

    var d = new Date();
    d.setDate(new Date().getDate() + 1);
    console.log(d.getTime());
    this.setState({
      tomorrow: d,
      time: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
    });
    console.log("labelNoet");

    if (this.props.choice === "Archive") {
      //       archiveNoteList().then(response => {
      //      console.log(response);
      //     if (response.status === 200) {
      //       this.setState({data : response.data.data.data,loading:false});
      //       // console.log(this.state.data[0].id)
      //     } else {
      //         this.setState({  snackbarmsg: "Netwrork is slow", snackbaropen: true });
      //     }
      //  });
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
        console.log(this.state.data);
        // for(let i=0;i<response.data.data.data.length;i++){
        //     this.state.noteLabels.push(response.data.data.data[i].noteLabels);
        // }
        // this.setState({noteLabels : this.state.noteLabels})
        // console.log(this.state.noteLabels);
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };

  getCalled = (labelNoteShow, label) => {
    //  this.setState({ labelNoteShow : this.props.labelNoteShow})
    console.log("show", labelNoteShow);
    //  this.setState({gridView : this.props.gridView})
    var d = new Date();
    d.setDate(new Date().getDate() + 1);
    console.log(d.getTime());
    this.setState({
      tomorrow: d,
      time: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
    });
    if (labelNoteShow === "true") {
      getNotesListByLabel(label).then((response) => {
        console.log(response);
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
          console.log(this.state.data);
        } else {
          this.setState({
            snackbarmsg: "Netwrork is slow",
            snackbaropen: true,
          });
        }
      });
    } else if (labelNoteShow === "false") {
      console.log("labelNoet");
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
          console.log(this.state.data);
          // for(let i=0;i<response.data.data.data.length;i++){
          //     this.state.noteLabels.push(response.data.data.data[i].noteLabels);
          // }
          // this.setState({noteLabels : this.state.noteLabels})
          // console.log(this.state.noteLabels);
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
      console.log(this.state.date);
      console.log(data);

      setNotes(data).then((response) => {
        console.log(response);
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
    // console.log("entered")
    this.setState({
      anchorEl: event.currentTarget,
      open: !this.state.open,
    });
  };
  dateshow = () => {
    this.setState({ dateshow: !this.state.datashow });
  };
  back = () => {
    console.log("back");
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
      // console.log(response.data.data.details[0]);
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
    console.log(data.title);
    if (data.title != "") {
      // {"isArchived":true,"noteIdList":["5e981759ad53b700227c5cb5"]}
      let data1 = {
        isArchived: true,
        noteIdList: [data.id],
      };
      console.log(data1);
      archiveNote(data1).then((response) => {
        console.log(response);
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

  colorboxbutton = () => {
    //  return <Color/>
  };
  getData = (val, index, id) => {
    console.log(val, index, id);
    this.setState({ color: val });
    document.getElementsByClassName("mydivouter")[
      index
    ].style.backgroundColor = val;

    let data = {
      color: val,
      noteIdList: [id],
    };
    console.log(data);
    changeColor(data).then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.componentDidMount();
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  dialogboxOpen = (data, choice) => {
    console.log(data);
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
    console.log(data);
    removeRemainderNotes(data).then((response) => {
      console.log(response);
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
        <div
          className="typoText"
          style={{ paddingTop: "10px", width: "150px" }}
        >
          <Chip
            style={{ width: "240px" }}
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
    console.log(date);
    let data = {
      reminder: date,
      noteIdList: [id],
    };
    console.log(data);

    updateReminderNotes(data).then((response) => {
      console.log(response);
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
    console.log(labelId, id);
    deletelabelNotes(id, labelId).then((response) => {
      console.log(response);
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
    // this.setState({ msg : content })
    return content;
  };
  msg = (content) => {
    if (content.length > 0) {
      this.setState({ msg: "SHOW QUESTION" });
    } else {
      this.setState({ msg: "ASK A QUESTION" });
    }
    // this.setState({ msg : content })
  };
  checkbox = (id, checklistId, itemName) => {
    let data = {
      itemName: itemName,
      status: "close",
    };
    updateChecklist(data, id, checklistId).then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.componentDidMount();
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
    console.log(id, checklistId, data);
  };
  checkboxoutline = (id, checklistId, itemName) => {
    let data = {
      itemName: itemName,
      status: "open",
    };
    updateChecklist(data, id, checklistId).then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.componentDidMount();
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
    console.log(id, checklistId, data);
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
                // css={override}
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
                    // if(data.isDeleted != true && data.isArchived !=true)
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
                          <div style={{ padding: "10px" }}>
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
                              <div
                                className="mybuttonoverlap"
                                style={{ padding: "5px" }}
                              >
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
                              //  console.log(noteCheckLists)

                              <List>
                                {notelist.status === "close" ? (
                                  <div className="textdash12">
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
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
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
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
                                    <Typography style={{ width: "100%" }}>
                                      {notelist.itemName}
                                    </Typography>
                                  </div>
                                )}
                              </List>
                            ))}
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                flexDirection: "row",
                                width: "240px",
                                paddingTop: "5px",
                              }}
                            >
                              {data.noteLabels.map((labelNotes, index) => (
                                <div style={{ padding: "3px" }}>
                                  <Chip
                                    key={index}
                                    style={{ width: "auto" }}
                                    label={labelNotes.label}
                                    onDelete={() =>
                                      this.handleDeletelabel(
                                        labelNotes.id,
                                        data.id
                                      )
                                    }
                                    color="white"
                                    // value={this.state.date}
                                  />
                                </div>
                              ))}
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  flexDirection: "row",
                                  width: "200px",
                                  paddingTop: "5px",
                                }}
                              >
                                {data.collaborators.map(
                                  (collabatorArray, index) => (
                                    <div style={{ padding: "5px" }}>
                                      <div
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          backgroundColor: "white",
                                          borderRadius: "50px",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          display: "flex",
                                          border: "0.1px solid grey",
                                          boxShadow:
                                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                                        }}
                                      >
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
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  paddingTop: "5px",
                                  justifyContent: "space-around",
                                }}
                              >
                                <div
                                  style={{ padding: "5px" }}
                                  onClick={(e) => this.handleClick(e)}
                                >
                                  <DateTimePicker
                                    sendtimeDate={(date) =>
                                      this.sendtimeDate(date, data.id)
                                    }
                                  />
                                </div>
                                <div
                                  style={{ padding: "5px" }}
                                  onClick={() =>
                                    this.dialogboxOpen(data, "editcollaborator")
                                  }
                                >
                                  <img src={personAdd} id="imgdashnotes" />
                                </div>
                                <div style={{ padding: "5px" }}>
                                  <Color
                                    index={index}
                                    sendColor={(val, index) =>
                                      this.getData(val, index, data.id)
                                    }
                                  />
                                </div>
                                <div style={{ padding: "5px" }}>
                                  <img src={galary} id="imgdashnotes" />
                                </div>
                                <div
                                  style={{ padding: "5px" }}
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
            {/* <Edit dialogBoxOpen="true" labeldata={this.labeldata} /> */}
          </div>
        )}
      </div>
    );
  }
}
export default TakeaNotes;
