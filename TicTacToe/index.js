
window.addEventListener('DOMContentLoaded', () => {
    // TODO : get each HTML element that you will need to manipulate ( 
    //     tiles(make sure that you get all tiles and store them in array), current-player-text, announcer-text, resetButton
    // )
    let x_score =0 ;
    let o_score = 0;
    let isSoundPlayed = false ;
    const divBoard = document.getElementsByClassName('tile');
    const currentPlayerText = document.querySelector('.wrapper .current-player-text');
    const announcerText = document.querySelector('div.announcer-text');
    const resetButton = document.querySelector('#reset');
    const displayDiv = document.getElementsByClassName('announcer-text');
    const scoreX = document.querySelector('.x .score');
    const scoreO = document.querySelector('.o .score');
    const play_btn = document.getElementById('play');
    const sound = new Audio("m.mp3");

    play_btn.addEventListener('click',()=>{
            if(!isSoundPlayed){
                sound.play();
                sound.autoplay = true;
                sound.loop = true ;
                isSoundPlayed = true;
                play_btn.innerHTML = '<span class="material-symbols-outlined">pause</span>';
            }
            else{
                sound.pause();
                isSoundPlayed = false ;
                play_btn.innerHTML = '<span class="material-symbols-outlined">play_arrow</span>';
            }
    });
    let board = ['', '', '', '', '', '', '', '', '']; 
    // This is the board representation, you will need to update this board whenever the user makes a move (just for 
    // illustration purposes)

    let currentPlayer = 'X';
    let isGameActive = true; // This variable will be used to stop the game once one of the players wins or the game is a tie

    // Possible results of the game (win, lose, tie)
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2], // When the first row is filled with either X or O
        [3, 4, 5], // When the second row is filled with either X or O
        [6, 7, 8], // When the third row is filled with either X or O
        [0, 3, 6], // When the first column is filled with either X or O
        [1, 4, 7], // When the second column is filled with either X or O
        [2, 5, 8], // When the third column is filled with either X or O
        [0, 4, 8], // When the first diagonal is filled with either X or O
        [2, 4, 6] // When the second diagonal is filled with either X or O
    ];

    const announce = (type) => {
        // the function should take the type of the result as an argument (PLAYERX_WON, PLAYERO_WON, TIE)


        // TODO : make sure that you display the correct message for each case by making the innerHTML of the announcer-text element
        // For one of these 'Player <span class="playerO">O</span> Won' or 'Player <span class="playerX">X</span> Won' or 'Tie' 
        
        if(type === 'TIE'){
            displayDiv[0].innerText = 'Tie';
        }
        else if(type === 'PLAYERX_WON'){
            displayDiv[0].innerHTML = 'Player <span class = "playerX">X</span> Won';
            x_score++;
            scoreX.innerText = `${x_score}`;
        }
        else{
            displayDiv[0].innerHTML = 'Player <span class = "playerO">O</span> Won';
            o_score++;
            scoreO.innerText = `${o_score}`;
        }

        // TODO : make sure that you remove the 'hide' class from the announcer-text element so that the message is displayed
        displayDiv[0].classList.remove('hide');
    };

    function handleResultValidation() {
        // this function will be called after each move to check if the game is over or not and if there is a winner or not 
        // this can be done by checking if one of the winning conditions is met or if the board is full and there is no winner

        let isFinished = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];

            // a, b, c will be X or O at the positions corresponding to the winning condition 

            
            // if one of them is empty then the game is not over yet
            if (a === '' || b === '' || c === '') {
                continue;
            }

            // if they are all X or all O then the game is over and we need to announce the result
            if (a === b && b === c) {
                isFinished = true;
                break;
            }
        }

    if (isFinished) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    // if the board is full and there is no winner(isFinished is false) then the game is a tie
    if (!board.includes(''))
        announce(TIE); 
    }


    // check that the user is not clicking on an already filled tile
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    };

    const changePlayer = () => {

        // TODO : update the current player class (change playerX to playerO or vice versa) from the current-player-text element 
        // to the next player by changing the text of the element 
        if(currentPlayerText.classList.contains('playerX')){
            currentPlayerText.classList.remove('playerX');
            currentPlayerText.classList.add('playerO');
            currentPlayer = 'O';
        }
        else{
            currentPlayerText.classList.remove('playerO');
            currentPlayerText.classList.add('playerX');
            currentPlayer = 'X';
        }
        currentPlayerText.innerHTML = currentPlayer ;
        // TODO : make sure that you change the currentPlayer variable to the next player by changing the value of the variable 

        // TODO : change the innerHTML of the current-player-text element to currentPlayer variable

    }

    // this function will be called whenever the user clicks on a tile
    const userAction = (tile, index) => {
        // check if the action is valid and the game is still active
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer; // update the tile text to the current player
            tile.classList.add(`player${currentPlayer}`); // add the class of the current player to the tile
            board[index] = currentPlayer; // update the board representation with the current player
            handleResultValidation(); // check if the game is over or not
            changePlayer(); // change the player after each move
        }
    }

    // this function will be called when the user clicks on the reset button
    const resetBoard = () => {
        // TODO : make sure that you reset the board representation to empty strings
        for(let i = 0 ; i < 9 ; i++)
            board[i] = "";
        // TODO : make sure that you add 'hide' class to the announcer-text element
        displayDiv[0].classList.add('hide');
        // TODO : make sure that you change the currentPlayer variable to X
        currentPlayer = 'X';
        if(currentPlayerText.classList.contains('playerO'));
            currentPlayerText.classList.remove('playerO');
        currentPlayerText.classList.add('playerX');
        currentPlayerText.innerText = 'X';
        // TODO : make sure that you loop over the tile elements and remove the text from each tile 
        for(let tile of divBoard){
            if(tile.classList.contains('playerX'))
                tile.classList.remove('playerX');
            if(tile.classList.contains('playerO'))
                tile.classList.remove('playerO');
            tile.innerText = '';
        }
        isGameActive = true;
        // and remove playerX and playerO classes from each tile
    }

    // TODO : make sure that you loop over the tiles and add a click event listener to each tile
    // the event listener should call the userAction function and pass the tile and the index of the tile as arguments
    for(let i = 0 ; i < 9 ; i++){
        divBoard[i].addEventListener("click",() => userAction(divBoard[i],i));
    }
    // TODO : make sure that you add a click event listener to the resetButton element
    // the event listener should call the resetBoard function
    resetButton.addEventListener("click",resetBoard);
});