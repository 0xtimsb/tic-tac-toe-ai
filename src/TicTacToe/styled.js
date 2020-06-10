import { keyframes } from "styled-components";

const color = {
  background: "#ffffff",
  base: "#f7f7f7",
  shadow: "#d1d9e6",
};

export const popUpStroke = keyframes`
  to {
    width: 500px;
    height: 10px;
  }
`;

export const popUpTile = keyframes`
  to {
    width: 100%;
    height: 100%;
  }
`;

export function giveStrikeTrasform(matrix) {
  // -y
  if (
    matrix[0][0].player === matrix[0][1].player &&
    matrix[0][1].player === matrix[0][2].player
  ) {
    return "up";
  }
  // y = 0, default
  // +y
  if (
    matrix[2][0].player === matrix[2][1].player &&
    matrix[2][1].player === matrix[2][2].player
  ) {
    return "down";
  }
  // -x
  if (
    matrix[0][0].player === matrix[1][0].player &&
    matrix[1][0].player === matrix[2][0].player
  ) {
    return "left";
  }
  // x = 0
  if (
    matrix[0][1].player === matrix[1][1].player &&
    matrix[1][1].player === matrix[2][1].player
  ) {
    return "middle";
  }
  // +x
  if (
    matrix[0][2].player === matrix[1][2].player &&
    matrix[1][2].player === matrix[2][2].player
  ) {
    return "right";
  }
  // +d
  if (
    matrix[0][0].player === matrix[1][1].player &&
    matrix[1][1].player === matrix[2][2].player
  ) {
    return "clock";
  }
  // -d
  if (
    matrix[0][2].player === matrix[1][1].player &&
    matrix[1][1].player === matrix[2][0].player
  ) {
    return "anticlock";
  }

  return null;
}

export default color;
