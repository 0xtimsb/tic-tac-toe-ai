export default function bestMove(matrix) {
  let bestScore = -Infinity;
  let move;
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      if (matrix[j][i].player === "") {
        matrix[j][i].player = "AI";
        let score = minimax(matrix, 0, false, -Infinity, Infinity);
        matrix[j][i].player = "";
        if (score > bestScore) {
          bestScore = score;
          move = { j, i };
        }
      }
    }
  }
  return move;
}

function minimax(matrix, depth, isMaximizing, alpha, beta) {
  let result = checkWinner(matrix);
  if (result !== null) {
    if (result === "AI") return 10;
    else if (result === "USER") return -10;
    else return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        if (matrix[j][i].player === "") {
          matrix[j][i].player = "AI";
          let score = minimax(matrix, depth + 1, false, alpha, beta);
          matrix[j][i].player = "";
          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, bestScore);
          if (beta <= alpha) {
            break;
          }
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 3; i++) {
        if (matrix[j][i].player === "") {
          matrix[j][i].player = "USER";
          let score = minimax(matrix, depth + 1, true, alpha, beta);
          matrix[j][i].player = "";
          bestScore = Math.min(score, bestScore);
          beta = Math.max(beta, bestScore);
          if (beta <= alpha) {
            break;
          }
        }
      }
    }
    return bestScore;
  }
}

export function checkWinner(matrix) {
  // Checking columns
  for (let i = 0; i < 3; i++) {
    if (
      matrix[0][i].player === matrix[1][i].player &&
      matrix[1][i].player === matrix[2][i].player &&
      matrix[0][i].player !== ""
    ) {
      return matrix[0][i].player;
    }
  }
  // Checking rows
  for (let j = 0; j < 3; j++) {
    if (
      matrix[j][0].player === matrix[j][1].player &&
      matrix[j][1].player === matrix[j][2].player &&
      matrix[j][0].player !== ""
    ) {
      return matrix[j][0].player;
    }
  }
  // Checking diagonals
  if (
    matrix[0][0].player === matrix[1][1].player &&
    matrix[1][1].player === matrix[2][2].player &&
    matrix[0][0].player !== ""
  ) {
    return matrix[1][1].player;
  }
  if (
    matrix[0][2].player === matrix[1][1].player &&
    matrix[1][1].player === matrix[2][0].player &&
    matrix[0][2].player !== ""
  ) {
    return matrix[1][1].player;
  }

  let openSpots = 0;
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      if (matrix[j][i].player === "") {
        openSpots++;
      }
    }
  }

  if (openSpots === 0) {
    return "TIE";
  } else {
    return null;
  }
}

