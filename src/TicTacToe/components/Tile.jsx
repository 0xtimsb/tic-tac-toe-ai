import React from "react";
import "./Tile.css";

export default class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const type = this.props.type;
    return <div className={`tile ${type}`}></div>;
  }
}
