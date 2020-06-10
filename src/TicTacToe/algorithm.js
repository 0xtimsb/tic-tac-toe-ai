export default function minMax(matrix, depth, maximizingPlayer) {
  if ((depth = 0 || isWon(matrix) !== -1)) {
    return [isWon(matrix) + depth, 0]; // Heurestic function
  }
  if (maximizingPlayer) {
    let value = -Infinity;
    let pos;
    getChildren(matrix, false).forEach((child) => {
      const nextData = minMax(child[0], depth - 1, false);
      if (nextData[0] > value) {
        value = nextData[0];
        pos = child[1];
      }
    });
    return [value, pos];
  } else {
    let value = Infinity;
    let pos;
    getChildren(matrix, true).forEach((child) => {
      const nextData = minMax(child[0], depth - 1, true);
      if (nextData[0] < value) {
        value = nextData[0];
        pos = child[1];
      }
    });
    return [value, pos];
  }
}

function isEnd(matrix) {
  if (matrix.length === 0) {
    return false;
  } else {
    return matrix.every((rows) => rows.every((tile) => tile.isActive));
  }
}

function isWon(matrix) {
  // Checking columns
  for (let i = 0; i < 3; i++) {
    if (
      matrix[0][i].symbol === matrix[1][i].symbol &&
      matrix[1][i].symbol === matrix[2][i].symbol &&
      matrix[0][i].symbol != null
    ) {
      return matrix[0][i].symbol;
    }
  }
  // Checking rows
  for (let j = 0; j < 3; j++) {
    if (
      matrix[j][0].symbol === matrix[j][1].symbol &&
      matrix[j][1].symbol === matrix[j][2].symbol &&
      matrix[j][0].symbol != null
    ) {
      return matrix[j][0].symbol;
    }
  }
  // Checking diagonals
  if (
    matrix[0][0].symbol === matrix[1][1].symbol &&
    matrix[1][1].symbol === matrix[2][2].symbol &&
    matrix[0][0].symbol != null
  ) {
    return matrix[0][0].symbol;
  }
  if (
    matrix[0][2].symbol === matrix[1][1].symbol &&
    matrix[1][1].symbol === matrix[2][0].symbol &&
    matrix[0][2].symbol != null
  ) {
    return matrix[0][2].symbol;
  }
  // Else if no match found
  return -1;
}

function getChildren(matrix, nextPlayer) {
  const children = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!matrix[j][i].isActive) {
        const newMatrix = JSON.parse(JSON.stringify(matrix));
        newMatrix[j][i].isActive = true;
        newMatrix[j][i].symbol = nextPlayer;
        children.push([newMatrix, [i, j]]);
      }
    }
  }
  return children;
}
