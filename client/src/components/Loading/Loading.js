import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

function Loading() {
  return (
    <div className={"loader"}>
      <CircularProgress size="100px" />
      <CircularProgress color="secondary" size="100px" />
    </div>
  );
}

export default Loading;
