const color = {
  background: "#ecf0f3",
  light: "#f9f9f9",
  shadow: "#d1d9e6",
};

export function giveStrikeTrasform(matrix) {
  // -y
  if (
    matrix[0][0].player === matrix[0][1].player &&
    matrix[0][1].player === matrix[0][2].player
  ) {
    return { x: 0, y: -1, r: 0 };
  }
  // y = 0, default
  // +y
  if (
    matrix[2][0].player === matrix[2][1].player &&
    matrix[2][1].player === matrix[2][2].player
  ) {
    return { x: 0, y: +1, r: 0 };
  }
  // -x
  if (
    matrix[0][0].player === matrix[1][0].player &&
    matrix[1][0].player === matrix[2][0].player
  ) {
    return { x: -1, y: 0, r: 90 };
  }
  // x = 0
  if (
    matrix[0][1].player === matrix[1][1].player &&
    matrix[1][1].player === matrix[2][1].player
  ) {
    return { x: 0, y: 0, r: 90 };
  }
  // +x
  if (
    matrix[0][2].player === matrix[1][2].player &&
    matrix[1][2].player === matrix[2][2].player
  ) {
    return { x: +1, y: 0, r: 90 };
  }
  // +d
  if (
    matrix[0][0].player === matrix[1][1].player &&
    matrix[1][1].player === matrix[2][2].player
  ) {
    return { x: 0, y: 0, r: 45 };
  }
  // -d
  if (
    matrix[0][2].player === matrix[1][1].player &&
    matrix[1][1].player === matrix[2][0].player
  ) {
    return { x: 0, y: 0, r: -45 };
  }
}

export default color;
