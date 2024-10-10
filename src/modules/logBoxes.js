function playerLogBox() {
    const playerLogBox = document.createElement('div');
    playerLogBox.classList.add('playerLogBox');
    
    const playerLogTitle = document.createElement('h3');
    playerLogTitle.classList.add('playerLogTitle');
    playerLogTitle.textContent = 'Player Log';

    const playerMoveBoxLog = document.createElement('div');
    playerMoveBoxLog.classList.add('playerMoveBoxLog');

    const playerLog = document.createElement('p');
    playerLog.classList.add('playerLog');
    playerLog.textContent = 'Player log';

    playerLogBox.appendChild(playerLogTitle);
    playerLogBox.appendChild(playerMoveBoxLog);
    playerMoveBoxLog.appendChild(playerLog);

    return playerLogBox;

}

function computerLogBox() {
    const computerLogBox = document.createElement('div');
    computerLogBox.classList.add('computerLogBox');

    const computerLogTitle = document.createElement('h3');
    computerLogTitle.classList.add('computerLogTitle');
    computerLogTitle.textContent = 'Computer Log';

    const compMoveBoxLog = document.createElement('div');
    compMoveBoxLog.classList.add('compMoveBoxLog');

    const computerLog = document.createElement('p');
    computerLog.classList.add('computerLog');
    computerLog.textContent = 'Computer log';
    
    computerLogBox.appendChild(computerLogTitle);
    computerLogBox.appendChild(compMoveBoxLog);
    compMoveBoxLog.appendChild(computerLog);

    return computerLogBox;
}

export { playerLogBox, computerLogBox };