import React from "react";
import styled, { css } from "styled-components";
import color, { popUpTile } from "../styled";

import cross from "../media/cross.png";
import circle from "../media/circle.png";

const TileStyled = styled.div`
  background-color: ${color.background};
  border-radius: 10px;
  border: 1px solid
    ${(props) => (props.player === "USER" ? css`#99ccff` : css`#ffaaff`)};
  z-index: 1;
  align-self: center;
  justify-self: center;
  box-shadow: 1px 1px 5px 2px ${color.shadow};
  width: 0%;
  height: 0%;
  animation: ${popUpTile} 150ms forwards;
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
    return (
      <TileStyled player={this.props.player}>
        <Icon src={this.props.player === "USER" ? cross : circle}></Icon>
      </TileStyled>
    );
  }
}
