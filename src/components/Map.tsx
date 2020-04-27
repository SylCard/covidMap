import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";


import MapChart from "./MapChart";

export default function Map() {
  const [content, setContent] = useState("");
  return (
    <div>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}
