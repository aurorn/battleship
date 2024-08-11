import Player from "./player";
import Ship from "./ship";
import GameBoard from "./gameBoard";
import Computer from "./computer";

export default class Controller {
    #players = {};

    static createGameBoard() {
        const board = new GameBoard();
        board.createBoard();
        return board;
    }

    getGameBoard(player) {
        return this.#players[player].GameBoard.board;
    }

    static createShip(length, id = null) {
        const ship = new Ship(length, id);
        return ship;
    }

    createPlayerAndComputer() {
        this.#players[1] = new Player(Controller.createGameBoard());
        this.#players[2] = new Computer(Controller.createGameBoard());
    }
    
    get Players() {
        return this.#players;
    }

    getPlayerScore(player) {
        return this.#players[player].score;
    }

    placeShip(player, options) {
        const ship = Controller.createShip(options.length, options.id);
        this.#players[player].GameBoard.placeShip(ship, options);
    }

    hasEnoughShips(player) {
        return this.#players[player].GameBoard.ships.length === 5;
    }

    hasShip(player, id) {
        return this.#players[player].GameBoard.hasShip(id);
    }

    removeShip(player, id) {
        this.#players[player].GameBoard.removeShip(id);
    }

    isValidPlacement(player, coordinates) {
        return this.#players[player].gameBoard.isValidPlacement(coordinates);
    }

    placeComputerShips() {
        if (Object.getPrototypeOf(this.#players[2]) !== Computer.prototype) {
            throw new TypeError("Second Player isn't a computer, only comp's can randomly place their ships");
        }

        const ships = [new Ship(2, "destroyer"), new Ship(3, "submarine"), new Ship(3, "cruiser"), new Ship (4, "battleship"), new Ship(5, "carrier")];
        this.#players[2].placeShips(ships);
    }

    sendAttack(player, coordinates) {
        return this.#players[player].gameBoard.receiveAttack(coordinates);
    }

    generateComputerAttack(enemyBoard) {
        return this.#players[2].generateAtkCoords(enemyBoard);
    }
    
    isGameOver() {
        if(this.#players[1].gameBoard.isGameOver() || this.#players[2].gameBoard.isGameOver()) {
            return true;
        }
        return false;
    }

    increaseScore(player) {
        this.#players[player].increaseScore();
    }

    playPlayerRound(coordinates) {
        if (this.isGameOver()) {
            throw new Error("You can't play a round when the game is over");
        }
        return { ...this.sendAttack(2, coordinates), isGameOver: this.isGameOver()};

    }
    
    playComputerRound() {
        if (this.isGameOver()) {
            throw new Error("Trying to play a round when the game is over.");
        }
        
        const computerAttack = this.generateComputerAttack(this.getGameBoard(1));
        this.sendAttack(1, computerAttack);

        return {
            hitShip: !!this.getGameBoard(1)[computerAttack.x][computerAttack.y].ship,
            isGameOver: this.isGameOver(),
        };
    }

    newGameVsComputer() {
        this.createPlayerAndComputer();
        this.placeComputerShips();
    }

    resetBoard(player) {
        this.#players[player].gameBoard.resetBoard();
    }

    deleteShips(player) {
        this.players[player].gameBoard.deleteShips();
    }

    restartGame(){
        this.resetBoard(1);
        this.resetBoard(2);
        this.deleteShips(1);
        this.deleteShips(2);
    }

    restartGameVsComputer() {
        this.restartGame();
        this.placeComputerShips();
    }

    resetScore() {
        this.players[1].resetScore();
        this.players[2].resetScore();
    }
}