function myLoop(myMouseEvent) {         //  create a loop function
    let face = document.getElementById("face");
    let dims = getDiff();
    let hopeless = false;
    let delay = 300;
    setTimeout(function () {   //  call a 200ms setTimeout when the loop is called

        let cycle = true;
        for (let i = 1; i <= dims[0] && cycle; i++) { //iterate through each square until a change is made to the board
            for (let j = 1; j <= dims[1] && cycle; j++) {

                let squareID = document.getElementById(i + "_" + j);

                if (squareID.className.startsWith('square open') && squareID.className !== 'square open0') {
                    let squareNum = squareID.className[squareID.className.length - 1];
                    let blanks = 0; //reset the blank count for each square
                    let flags = 0; //reset the flags count for each square
                    for (let m = -1; m <= 1; m++) { //count how many blank/flags are around the square
                        for (let n = -1; n <= 1; n++) {
                            let x = m + i;
                            let y = n + j;
                            let surr = document.getElementById(x + "_" + y).className;
                            if (y != 0 && y <= dims[1] && x != 0 && x <= dims[0] && surr === 'square blank') {
                                blanks++;
                            }
                            else if (y != 0 && y <= dims[1] && x != 0 && x <= dims[0] && surr === 'square bombflagged') {
                                flags++;
                            }

                        }
                    }


                    if (blanks == 0) {//lol idk how to short circuit in js

                    }
                    else if (squareNum == flags) { //if the squareNum is equal to the flags, all blank squares surrounding are not bombs
                        cycle = false;
                        hopeless = false;
                        for (let m = -1; m <= 1; m++) { //click surrounding squares
                            for (let n = -1; n <= 1; n++) {
                                let x = m + i;
                                let y = n + j;
                                let surr = document.getElementById(x + "_" + y);
                                if (surr.className === 'square blank') {
                                    if (y != 0 && y <= dims[1] && x != 0 && x <= dims[0]) { //don't change the out of bounds squares

                                        surr.dispatchEvent(myMouseEvent[0]);
                                        surr.dispatchEvent(myMouseEvent[1]);
                                    }
                                }
                            }
                        }
                    }
                    else if (blanks + flags == squareNum) { //if the squareNum is equal to the num of blanks + flags, all surrounding squares are flags
                        cycle = false;
                        hopeless = false;
                        for (let m = -1; m <= 1; m++) { //flag surrounding squares
                            for (let n = -1; n <= 1; n++) {

                                x = m + i;
                                y = n + j;
                                surr = document.getElementById(x + "_" + y);
                                if (surr.className === 'square blank') {
                                    if (y != 0 && y <= dims[1] && x != 0 && x <= dims[0]) {//don't change the out of bounds squares
                                        surr.dispatchEvent(myMouseEvent[2]);
                                        surr.dispatchEvent(myMouseEvent[3]);
                                    }
                                }
                            }
                        }
                    }
                    else {
                        hopeless = true;
                    }
                }
            }
        }

        if (hopeless) {
            tank(myMouseEvent, delay, dims);
        }

        face = document.getElementById("face");


        if (face.className !== 'facewin' && !hopeless) {           //  if the counter < 10, call the loop function
            myLoop(myMouseEvent);             //  ..  again which will trigger another 
        }                       //  ..  setTimeout()
    }, delay, myMouseEvent);
}

function tank(myMouseEvent, delay, dims) {
    let borderSquares = [];
    let edgeSquares = [];
    let flagTot = [];
    let hopeless = true;

    for (let i = 1; i <= dims[0]; i++) { //iterate through each square and make matrices
        for (let j = 1; j <= dims[1]; j++) {

            let squareID = document.getElementById(i + "_" + j);

            if (squareID.className.startsWith('square open') && squareID.className !== 'square open0') { //if the square is on the edge, make matrix
                let blanks = 0;
                let flags = 0; //reset the flags count for each square
                let squareID = document.getElementById(i + "_" + j);

                for (let m = -1; m <= 1; m++) { //count how many blank/flags are around the square
                    for (let n = -1; n <= 1; n++) {

                        let x = m + i;
                        let y = n + j;
                        let surr = document.getElementById(x + "_" + y).className;
                        if (y != 0 && y <= dims[1] && x != 0 && x <= dims[0] && surr === 'square blank') {
                            blanks++;
                            if (edgeSquares.indexOf(x + "_" + y) === -1) { //store unique blank square coords around the border
                                edgeSquares.push(x + "_" + y);
                            }
                        }
                        else if (y != 0 && y <= dims[1] && x != 0 && x <= dims[0] && surr === 'square bombflagged') {
                            flags++;
                        }

                    }
                }
                if (blanks + flags > squareID.className[squareID.className.length - 1]) {
                    borderSquares.push(i + "_" + j); //save number square coords on the border
                    flagTot.push(squareID.className[squareID.className.length - 1] - flags); //also save amount of flags left unknown around that number square
                }

            }
        }
    }
    let bigMatrix = [];
    for (let i = 0; i < borderSquares.length; i++) { //create 2d array that represents linear system filled with 0 initially
        bigMatrix[i] = [];
        for (let j = 0; j < edgeSquares.length; j++) {
            bigMatrix[i][j] = 0;
        }

    }

    for (let i = 1; i <= dims[0]; i++) { //make system of linear equations
        for (let j = 1; j <= dims[1]; j++) {

            let squareID = document.getElementById(i + "_" + j);

            if (squareID.className.startsWith('square open') && squareID.className !== 'square open0') { //make new matrix row for each exposed
                for (let m = -1; m <= 1; m++) { //now fill the bigMatrix with 1 in the row of the border square and the column of the edge square
                    for (let n = -1; n <= 1; n++) {

                        let x = m + i;
                        let y = n + j;
                        let surr = document.getElementById(x + "_" + y).className;
                        if (y != 0 && y <= dims[1] && x != 0 && x <= dims[0] && surr === 'square blank') {
                            let edgeInd = edgeSquares.indexOf(x + "_" + y);
                            let borderInd = borderSquares.indexOf(i + "_" + j);
                            bigMatrix[borderInd][edgeInd] = 1; //set 1 for blank squares that surround certain border square
                        }

                    }
                }
            }
        }
    }

    console.log(bigMatrix);
    console.log(flagTot);



}

function getDiff() { //get dimensions based off radio box check in game settings.  the player is able to tick a different box than the game they are currently playing, but hopefully they don't do that lol
    if (document.getElementById("beginner").checked) {
        return [9, 9];
    }
    else if (document.getElementById("intermediate").checked) {
        return [16, 16];
    }
    else if (document.getElementById("expert").checked) {
        return [16, 30];
    }
    else {
        let dim = [];
        dim.push(document.getElementById("custom").parentElement.parentElement.parentElement.children[1].children[0].value);
        dim.push(document.getElementById("custom").parentElement.parentElement.parentElement.children[2].children[0].value);
        return dim;
    }
}

function simulateClick() {
    document.title = 'working';

    //start in middle
    dims = getDiff();
    startingTile = (Math.floor(dims[0] / 2)) + "_" + (Math.floor(dims[1] / 2));

    //start in top left corner
    //startingTile = "1_1";

    squareID = document.getElementById(startingTile); //change starting tile to your desired starting tile or comment/uncomment

    let myMouseEvent = [];

    myMouseEvent[0] = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true
    });

    myMouseEvent[1] = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true
    });

    myMouseEvent[2] = new MouseEvent('mousedown', {
        button: 2,
        bubbles: true,
        cancelable: true
    });

    myMouseEvent[3] = new MouseEvent('mouseup', {
        button: 2,
        bubbles: true,
        cancelable: true
    });

    squareID.dispatchEvent(myMouseEvent[0]);
    squareID.dispatchEvent(myMouseEvent[1]);

    myLoop(myMouseEvent);
}

simulateClick();                   //  start the loop