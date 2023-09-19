import axios from "axios";
import {
  CreateChat,
  FetchChat,
  GetChat,
  PassChange,
  UpdateChat,
} from "./interface";

// const bURL = "http://localhost:8080/api"
const bURL = "https://ec2-13-232-131-158.ap-south-1.compute.amazonaws.com/api";
const Axios = axios.create({
  baseURL: bURL,
});

export const CreateChatAPI = async (data: CreateChat) => {
  try {
    const res = await Axios.post("/chat/create", data);
    return res;
  } catch (err) {
    return err;
  }
};

export const FetchChatAPI = async (data: FetchChat) => {
  try {
    const res = await Axios.post("/chat/fetch", data);
    return res;
  } catch (err) {
    return err;
  }
};

export const GetChatAPI = async (data: GetChat) => {
  try {
    const res = await Axios.post("/chat/get", data);
    return res;
  } catch (err) {
    return err;
  }
};

export const ChangePass = async (data: PassChange) => {
  try {
    const res = await Axios.post("/password/submit", data);
    return res;
  } catch (err) {
    return err;
  }
};

export const forgotPass = async (data: { email: string }) => {
  try {
    const reponse = await Axios.post("/password/update", data);
    return reponse;
  } catch (err) {
    return err;
  }
};

export const UpdateChatAPI = async (data: UpdateChat) => {
  try {
    const res = await Axios.post("/chat/update", data);
    return res;
  } catch (err) {
    return err;
  }
};

export const GetAllFiles = async (data: { authId: string }) => {
  try {
    const res = await Axios.post("/pdf/getAll", data);
    return res;
  } catch (err) {
    return err;
  }
};

export const GetFile = async (data: { pId: string }) => {
  try {
    const res = await Axios.post("/pdf/fetch", data);
    return res;
  } catch (err) {
    return err;
  }
};

export const DeleteFiles = async (data: { pId: string }) => {
  try {
    const res = await Axios.post("/pdf/delete", data);
    return res;
  } catch (err) {
    return err;
  }
};
