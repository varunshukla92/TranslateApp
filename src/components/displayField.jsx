import React from "react";

const DisplayField = props => {
  return (
    <div className="form-group">
      <h5 htmlFor="exampleFormControlTextarea1">
        Translated Text to : {props.translatedLanguage}
      </h5>
      <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows="7"
        readOnly
        value={props.translatedText}
      ></textarea>
    </div>
  );
};

export default DisplayField;
