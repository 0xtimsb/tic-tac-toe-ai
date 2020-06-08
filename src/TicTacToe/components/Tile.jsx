import React from "react";
import ".Tile.css";

export default class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <div className="tile"></div>;
  }
}
