import React, { Component } from "react";
import clsx from "clsx";
import axios, { post } from "axios";
import {
  Avatar,
  Popover,
  ListItemIcon,
  ListItemText,
  ListItem,
  IconButton,
  Divider,
  Typography,
  List,
  Toolbar,
  AppBar,
  CssBaseline,
  Drawer,
  Dialog,
} from "@material-ui/core";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import search_black from "../assets/search_black.png";
import clear from "../assets/clear.png";
import MenuIcon from "@material-ui/icons/Menu";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import TakeaNotes from "./takeaNotes";
import Edit from "./editLabel";
import Trash from "./trash";
import LabelIcon from "@material-ui/icons/Label";
import keepBulb from "../assets/keepBulb.png";
import list from "../assets/list.png";
import shopping_cart from "../assets/shopping_cart.png";
import lightbulb_black from "../assets/lightbulb_black.png";
import reminder from "../assets/reminder.svg";
import delete_black from "../assets/delete_black.png";
import download from "../assets/download.png";
import label from "../assets/label.png";
import listview from "../assets/listview.png";
import Collaborator from "./collaborator";
import LabelShow from "./labelShow";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Cart from "./cart";
import Archive from "./archived";
import Reminder from "./reminder";
import AppsIcon from "@material-ui/icons/Apps";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import ViewAgendaIcon from "@material-ui/icons/ViewAgenda";
import {
  getNoteLabelList,
  addLabels,
  logout,
  fileUpload,
  getNotesListByLabel,
} from "../services/notesService";

const drawerWidth = 300;

const useStyles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    height: "70px",
    backgroundColor: "white",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {},
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    border: "none",
    marginTop: "70px",
    width: drawerWidth,
    height: "90%",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  drawerHeader1: {
    display: "flex",
    marginTop: "10px",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ["@media (min-width:414px)"]: {
      marginLeft: 0,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  funnDooName: {
    color: "black",
    marginRight: theme.spacing(19),
  },
  bulbImg: {
    display: "flex",
    justifyContent: "center",
    marginRight: theme.spacing(1),
  },
  searchDiv: {
    height: "50px",
    width: "800px",
    maxWidth: "720px",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    borderRadius: "3px",
    justifyContent: "center",
    backgroundColor: "#f1f3f4",
    borderRadius: "8px",
    position: "relative",
  },
});
window.onLoad = function () {
  if (!window.location.hash) {
    window.location = window.location + "#loaded";
    window.location.reload();
  }
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      setOpen: false,
      choice: "Notes",
      query: "",
      labelData: [],
      gridView: false,
      profile: false,
      anchorEl: false,
      open1: false,
      email: "",
      firstName: "",
      file: "",
      open12: true,
      imageFromUrl: "",
      profileImage: "",
      profileImageFromRes: "",
      heading: "FunDoo",
      editlabel: false,
      dialogBoxOpen: false,
    };
  }
  componentDidMount = () => {
    const profileImage = localStorage.getItem("userProfile");
    const email = localStorage.getItem("email");
    const firstName = localStorage.getItem("firstName");
    this.setState({
      email: email,
      firstName: firstName,
      profileImageFromRes: profileImage,
    });
    getNoteLabelList().then((response) => {
      if (response.status === 200) {
        this.setState({ labelData: response.data.data.details });
      } else {
        this.setState({ snackbarmsg: "Netwrork is slow", snackbaropen: true });
      }
    });
  };
  handleDrawerOpen = () => {
    if (this.state.open == false) {
      this.setState({ setOpen: true, open: true });
    } else {
      this.setState({ setOpen: false, open: false });
    }
  };

  handleDrawerClose = () => {
    this.setState({ setOpen: false, open: false });
  };

  choice = (event, text) => {
    event.preventDefault();
    if (text == "Edit labels") {
      this.setState({ heading: "Editlabels", dialogBoxOpen: true });
    } else if (text == "Notes") {
      this.setState({ choice: "Notes", heading: "Notes" });
    } else if (text == "Archive") {
      this.setState({ choice: "Archive", heading: "Archive" });
    } else if (text == "Trash") {
      this.setState({ choice: "Trash", heading: "Trash" });
    } else if (text == "Reminder") {
      this.setState({ choice: "Reminder", heading: "Reminder" });
    } else if (text == "shopping_cart") {
      this.setState({ choice: "shopping_cart", heading: "shopping_cart" });
    } else {
      this.setState({ choice: text.label, heading: text.label });
    }
  };
  labeldata = (dialoxBoxfalse) => {
    this.handelNoteDialogBox();
    this.componentDidMount();
  };
  getcomponents = () => {
    if (this.state.choice == "Notes") {
      return (
        <TakeaNotes
          query={this.state.query}
          gridView={this.state.gridView}
          gridfunction={this.gridview.bind(this)}
          choice="Notes"
        />
      );
    } else if (this.state.choice == "Archive") {
      return (
        <Archive
          gridView={this.state.gridView}
          query={this.state.query}
          choice="Archive"
        />
      );
    } else if (this.state.choice == "Trash") {
      return (
        <Trash
          gridView={this.state.gridView}
          query={this.state.query}
          choice="Trash"
        />
      );
    } else if (this.state.choice == "Reminder") {
      return (
        <Reminder
          gridView={this.state.gridView}
          query={this.state.query}
          choice="Reminder"
        />
      );
    } else if (this.state.choice == "shopping_cart") {
      return <Cart gridView={this.state.gridView} />;
    } else {
      return (
        <LabelShow
          query={this.state.query}
          label={this.state.choice}
          gridView={this.state.gridView}
          gridfunction={this.gridview.bind(this)}
        />
      );
    }
  };
  queryfunction = (event) => {
    this.setState({ query: event.target.value });
  };
  gridview = () => {
    this.setState({ gridView: !this.state.gridView });
  };
  profile = () => {
    this.setState({ profile: !this.state.profile });
  };
  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open1: !this.state.open1,
    });
  };
  logout = () => {
    let data = {};
    logout(data).then((response) => {
      if (response.status === 204) {
        localStorage.setItem("email", "");
        localStorage.setItem("firstName", "");
        localStorage.setItem("userProfile", "");
        localStorage.setItem("id", null);
        this.props.history.push({
          pathname: "/",
        });
      } else {
      }
    });
  };
  profileImagePick = () => {};

  onFormSubmit = (e) => {
    e.preventDefault();
    let form_data = new FormData();
    form_data.append("file", this.state.file);
    fileUpload(form_data).then((response) => {
      this.setState({
        profileImageFromRes: response.data.status.imageUrl,
        open12: true,
        fileshow: false,
        profileImage: "",
        file: "",
      });
      localStorage.setItem("userProfile", response.data.status.imageUrl);
    });
  };
  onChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileshow: true,
      profileImage: URL.createObjectURL(e.target.files[0]),
      open12: true,
    });
  };

  handleClick12 = (event) => {
    this.setState({
      open12: !this.state.open12,
      file: "",
    });
  };
  handelNoteDialogBox = () => {
    this.setState({
      dialogBoxOpen: !this.state.dialogBoxOpen,
    });
    this.componentDidMount();
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar>
            <div className="ToolbarContainer1">
              <div className="ToolbarContainer2">
                <IconButton
                  size="medium"
                  color="black"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, this.state.open)}
                >
                  <MenuIcon className="menudiv" />
                </IconButton>
                <div className={classes.bulbImg} className="bulbicon">
                  <img src={keepBulb} className="bulbImg" />
                </div>

                <Typography variant="h6" className="funnDooName">
                  {this.state.heading}
                </Typography>
              </div>
              <div className="searchDiv">
                <div className="searchdiv1">
                  <SearchIcon className="searchIcon" />
                  <input
                    placeholder="Search"
                    InputProps={{ disableUnderline: true }}
                    className="inputsearch"
                    style={{
                      disableUnderline: true,
                      outline: "none",
                      border: "none",
                    }}
                    onChange={this.queryfunction}
                  />
                  <CloseIcon className="blackColor" />
                </div>
              </div>
              <div className="icondash">
                <IconButton
                  size="medium"
                  color="black"
                  aria-label="open drawer"
                  onClick={(event) => this.choice(event, "shopping_cart")}
                  edge="start"
                  className="bulbicon"
                >
                  <ShoppingCartIcon className="cartIcon" />
                </IconButton>
                <IconButton
                  size="medium"
                  color="black"
                  aria-label="open drawer"
                  onClick={this.gridview}
                  edge="start"
                  className="bulbicon"
                >
                  {this.state.gridView ? (
                    <ViewAgendaIcon className="blackColor" />
                  ) : (
                    <AppsIcon className="cartIcon" />
                  )}
                </IconButton>

                <IconButton
                  size="medium"
                  color="black"
                  aria-label="open drawer"
                  onClick={this.handleClick}
                  edge="start"
                  className="bulbicon"
                >
                  <Avatar>
                    <img
                      src={
                        this.state.profileImageFromRes == ""
                          ? null
                          : "http://fundoonotes.incubation.bridgelabz.com/" +
                            this.state.profileImageFromRes
                      }
                      className="profileImg"
                    />
                  </Avatar>
                </IconButton>
                <Popover
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  open={this.state.open1}
                  anchorEl={this.state.anchorEl}
                  onClose={this.handleClick}
                  className="pointer"
                >
                  <div className="formUpperDiv">
                    <form className="formStyle">
                      <label for="file-input">
                        <img
                          src={
                            this.state.profileImageFromRes == ""
                              ? null
                              : "http://fundoonotes.incubation.bridgelabz.com/" +
                                this.state.profileImageFromRes
                          }
                          className="profileImg"
                        />
                      </label>
                      <input
                        type="file"
                        onChange={this.onChange}
                        id="file-input"
                        className="disaplyNone"
                      />

                      <div className="messageDiv">
                        <Typography>{this.state.email}</Typography>
                        <Typography>{this.state.firstName}</Typography>
                      </div>
                      {this.state.fileshow ? (
                        <div className="fileDiv">
                          <Dialog
                            open={this.state.open12}
                            onClose={this.handleClick12}
                          >
                            <div classNAme="profileDiv">
                              <img
                                src={this.state.profileImage}
                                className="profileStyle"
                              />
                              <div className="padding2 center">
                                <button
                                  type="submit"
                                  onClick={this.onFormSubmit}
                                >
                                  Upload
                                </button>
                              </div>
                            </div>
                          </Dialog>
                        </div>
                      ) : null}
                    </form>

                    <Divider />
                    <div className="logoutBtn" onClick={this.logout}>
                      LOGOUT
                    </div>
                  </div>
                </Popover>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={this.state.open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Divider />
          <List>
            {["Notes", "Reminder"].map((text, index) => (
              <ListItem button key={text} onClick={(e) => this.choice(e, text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <div>
                      <img src={lightbulb_black} id="imgdash1" />
                    </div>
                  ) : (
                    <div>
                      <img src={reminder} id="imgdash1" className="opacity" />{" "}
                    </div>
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <div className="paddingDash">LABELS</div>
          <List>
            {this.state.labelData.map((text, index) => (
              <ListItem button key={text} onClick={(e) => this.choice(e, text)}>
                <ListItemIcon>
                  {<LabelIcon className="labelIcon" />}
                </ListItemIcon>
                <ListItemText primary={text.label} />
              </ListItem>
            ))}
          </List>
          <List>
            {["Edit labels"].map((text, index) => (
              <ListItem button key={text} onClick={(e) => this.choice(e, text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <AddIcon className="blackColor" />
                  ) : (
                    <MailIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />

          <List>
            {["Archive", "Trash"].map((text, index) => (
              <ListItem button key={text} onClick={(e) => this.choice(e, text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <img src={download} id="imgdash1" />
                  ) : (
                    <img src={delete_black} id="imgdash1" />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.open,
          })}
        >
          <div className={classes.drawerHeader} />

          {this.getcomponents()}
        </main>
        <Dialog
          open={this.state.dialogBoxOpen}
          onClose={this.handelNoteDialogBox}
        >
          <Edit labeldata={this.labeldata} />
        </Dialog>
      </div>
    );
  }
}

export default withStyles(useStyles)(Dashboard);
