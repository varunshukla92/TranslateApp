import React from "react";

const InputField = props => {
  return (
    <div>
      <h5>Detected Language : {props.inputLanguage}</h5>
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">Enter For Translation </span>
        </div>
        <textarea
          className="form-control font-weight-light"
          rows="7"
          onChange={props.onTextChange}
          value={props.inputText}
          aria-label="With textarea"
        ></textarea>
      </div>
    </div>
  );
};

export default InputField;
