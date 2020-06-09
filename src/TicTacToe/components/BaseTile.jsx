import React from "react";
import styled from "styled-components";
import color from "../color";

const BaseTileStyled = styled.div`
  background-color: ${color.background};
  border-radius: 10px;
  box-shadow: inset 1px 1px 2px ${color.shadow},
    inset -1px -1px 2px ${color.light};
  cursor: pointer;
`;

export default class BaseTile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <BaseTileStyled onClick={this.props.addTile}></BaseTileStyled>;
  }
}
