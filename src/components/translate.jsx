import React from "react";

const Translate = props => {
  return (
    <button
      onClick={props.onTranslate}
      className="border border-dark rounded-pill p-2 pl-3 pr-3"
    >
      <i className="fa fa-exchange" aria-hidden="true"></i>
    </button>
  );
};

export default Translate;
