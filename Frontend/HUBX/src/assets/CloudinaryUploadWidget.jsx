import React, { Component } from "react";
import axios from 'axios';
// const {CLOUD_NAME,UPLOAD_PRESET} = process.env;


class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    
    const cloudName = "dhztbzkap"; 
    const uploadPreset = "ltce3xlz"; 
    const REACT_APP_CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    console.log(REACT_APP_CLOUD_NAME);

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        cropping: true, //add a cropping step
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);

          document
            .getElementById("uploadedimage")
            .setAttribute("src", result.info.secure_url);

          document
            .getElementById("urlimg")
            .setAttribute("value", result.info.secure_url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Upload
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
