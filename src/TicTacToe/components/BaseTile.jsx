import React from "react";
import styled from "styled-components";
import color from "../styled";

const BaseTileStyled = styled.div`
  background-color: ${color.base};
  border-radius: 10px;
  box-shadow: inset 0px 0px 15px 1px ${color.shadow};
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
