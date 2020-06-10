import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import color from "./color";
import bestMove, { checkWinner } from "./algorithm";

import Tile from "./components/Tile";
import BaseTile from "./components/BaseTile";

const Game = styled.div`
  background-color: ${color.background};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Turn = styled.div`
  position: absolute;
  transform: translateY(290px);
  font-size: 30px;
  font-weight: 600;
  color: #000000;
`;

const Board = styled.div`
  background-color: ${color.background};
  width: 460px;
  height: 460px;
  box-shadow: 10px 10px 10px ${color.shadow}, -10px -10px 10px ${color.light};
  border-radius: 10px;
`;

const Grid = styled.div`
  position: absolute;
  width: 460px;
  height: 460px;
  box-sizing: border-box;

  display: grid;
  grid-template-columns: 140px 140px 140px;
  grid-template-rows: 140px 140px 140px;
  grid-gap: 10px;
  padding: 10px;
`;

export default class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [],
      turn: "USER",
      status: "",
    };
  }

  componentDidMount() {
    this.setState(
      () => {
        const matrix = [];
        for (let j = 0; j < 3; j++) {
          matrix.push([]);
          for (let i = 0; i < 3; i++) {
            matrix[j].push({ key: uuidv4(), player: "" });
          }
        }
        return { matrix };
      },
      () => {
        if (this.state.turn === "AI") {
          const move = bestMove(JSON.parse(JSON.stringify(this.state.matrix)));
          this.addTileAI(move, 300);
        }
      }
    );
  }

  addTile = (currentMove) => {
    this.setState(
      (prev, props) => {
        const newMatrix = JSON.parse(JSON.stringify(prev.matrix));
        newMatrix[currentMove.j][currentMove.i].player = prev.turn;
        return {
          matrix: newMatrix,
          turn: prev.turn === "USER" ? "AI" : "USER",
        };
      },
      () => {
        if (this.checkStatus(this.state.matrix)) {
          if (this.state.turn === "AI") {
            const move = bestMove(
              JSON.parse(JSON.stringify(this.state.matrix))
            );
            this.addTileAI(move, 300);
          }
        }
      }
    );
  };

  addTileAI = (move, time) => {
    setTimeout(() => this.addTile(move), time);
  };

  checkStatus = (matrix) => {
    let status = checkWinner(matrix);
    if (status === null) {
      return true;
    } else {
      if (status === "TIE") {
        status = "IT'S A TIE";
      } else if (status === "AI") {
        status = "AI WON!";
      } else {
        status = "YOU WON!";
      }
      this.setState({ status }, () => {
        return false;
      });
    }
  };

  render() {
    return (
      <Game>
        <Turn>{`${
          this.state.status === ""
            ? `${this.state.turn === "USER" ? "YOUR" : "AI"} TURN`
            : this.state.status
        }`}</Turn>
        <Board>
          <Grid>
            {this.state.matrix.map((rows) =>
              rows.map((tile) => {
                if (tile.player !== "") {
                  return <Tile key={tile.key} player={tile.player}></Tile>;
                } else {
                  return <div key={tile.key}></div>;
                }
              })
            )}
          </Grid>
          <Grid>
            {this.state.matrix.map((rows, j) =>
              rows.map((tile, i) => (
                <BaseTile
                  key={tile.key}
                  addTile={() => this.addTile({ j, i })}
                ></BaseTile>
              ))
            )}
          </Grid>
        </Board>
      </Game>
    );
  }
}
