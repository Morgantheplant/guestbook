import axios from "axios";
import { API_BASE_URL } from "./constants";

export const uploadImageFile = (acceptedFiles) => {
  const formData = new FormData();
  const file = new Blob(acceptedFiles, { type: "image/png" });
  formData.append("file", file);
  return axios.post(`${API_BASE_URL}/image_upload`, formData);
};

export const uploadPicture = (dataUrl) =>
  axios.get(dataUrl, { responseType: "blob" }).then((response) => {
    const formData = new FormData();
    formData.append("file", response.data);
    return axios.post(`${API_BASE_URL}/image_upload`, formData);
  });
