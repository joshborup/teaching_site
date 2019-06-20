import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
const base_url = "https://api.cloudinary.com/v1_1/saturnslist/image/upload";

export default function CloudinaryHook(url) {
  const [uploadedImage, setUploadedImage] = useState("");
  const dispatch = useDispatch();
  function handleImageUpload(file) {
    axios.get(url).then(response => {
      console.log(response.data.signature);

      //form data for signed uploads

      let formData = new FormData();
      formData.append("signature", response.data.signature);
      formData.append("api_key", "635226183275142");
      formData.append("timestamp", response.data.timestamp);
      formData.append("file", file[0]);

      // for(var pair of formData.entries()) {
      //     console.log(pair);
      //  }

      axios
        .post(base_url, formData)
        .then(res => {
          console.log(res.data);

          // Setting state with the secure_url

          setUploadedImage();
          axios
            .put("/api/imageupdate", { uploadedImage: res.data.secure_url })
            .then(res => {
              dispatch({ type: "SET_USER", payload: res.data });
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  return [uploadedImage, handleImageUpload];
}
