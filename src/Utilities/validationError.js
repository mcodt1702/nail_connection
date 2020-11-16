import React from "react";

function ValidationError(props) {
  if (props.message) {
    return <div className="errorMessage">{props.message}</div>;
  }

  return <> </>;
}

export default ValidationError;
