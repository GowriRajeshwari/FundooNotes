import axios from "axios";
const access_token = localStorage.getItem("id");
//get user notes
export async function getNotes() {
    try {
      const response = await axios.get(process.env.REACT_APP_GETNOTES , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
//set user notes
export async function setNotes(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_SETNOTES ,data, {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function searchUserList(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_SEARCHURLLIST,data , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function archiveNoteList() {
    try {
      const response = await axios.get(process.env.REACT_APP_ARCHIVENOTELIST, {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  export async function archiveNote(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_ARCHIVENOTES,data , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  
  export async function updateNotes(data) {
    try {
      const response = await axios.post(process.env.REACT_APP_UPDATESNOTES,data , {params : { access_token }},
      );
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
