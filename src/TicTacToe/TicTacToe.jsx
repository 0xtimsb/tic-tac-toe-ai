import React from "react";
import styled, { css } from "styled-components";
import { v4 as uuidv4 } from "uuid";

import color, { giveStrikeTrasform, popUpStroke } from "./styled";
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

const Strike = styled.div`
  animation: ${popUpStroke} 1s forwards;
  z-index: 3;
  height: 0px;
  width: 0px;
  background: white;
  position: absolute;
  border-radius: 5px;
  box-shadow: 0px 0px 4px 4px ${color.shadow};

  ${(props) =>
    props.transform.x === +1
      ? css`
          transform: translateX(150px);
          transform: rotate(90deg);
        `
      : props.transform.x === -1
      ? css`
          transform: translateX(-150px);
          transform: rotate(90deg);
        `
      : props.transform.r === +90
      ? css`
          transform: rotate(90deg);
        `
      : props.transform.r === 45
      ? css`
          transform: rotate(45deg);
        `
      : css`
          transform: rotate(-45deg);
        `}

  ${(props) =>
    props.transform.y === +1
      ? css`
          transform: translateY(150px);
        `
      : props.transform.y === -1
      ? css`
          transform: translateY(-150px);
        `
      : css``}
`;

const Board = styled.div`
  background-color: ${color.background};
  width: 460px;
  height: 460px;
  box-shadow: 0px 0px 50px 5px ${color.shadow};
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
      } else {
        status = status === "AI" ? "AI WON!" : "YOU WON!";
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
        {this.state.status !== "" ? (
          <Strike transform={giveStrikeTrasform(this.state.matrix)}></Strike>
        ) : null}
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
                  addTile={() =>
                    this.state.turn === "USER" ? this.addTile({ j, i }) : null
                  }
                ></BaseTile>
              ))
            )}
          </Grid>
        </Board>
      </Game>
    );
  }
}
