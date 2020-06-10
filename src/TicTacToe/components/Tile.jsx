import React from "react";
import styled, { css, keyframes } from "styled-components";
import color from "../color";

import cross from "../media/cross.png";
import circle from "../media/circle.png";

const popUpAnimation = keyframes`
  to {
    width: 100%;
    height: 100%;
  }
`;

const TileStyled = styled.div`
  background-color: ${color.background};
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.symbol === 0 ? css`#ccffff` : css`#ffccff`)};
  z-index: 1;
  align-self: center;
  justify-self: center;
  box-shadow: 2px 2px 4px ${color.shadow}, -2px -2px 4px ${color.light};
  width: 0%;
  height: 0%;
  animation: ${popUpAnimation} 150ms forwards;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 50%;
  height: 50%;
`;

export default class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const symbol = this.props.symbol === 0 ? cross : circle;
    return (
      <TileStyled symbol={this.props.symbol}>
        <Icon src={symbol}></Icon>
      </TileStyled>
    );
  }
}
