function myLoop(leftMouseDownEvent, leftMouseUpEvent, rightMouseDownEvent, rightMouseUpEvent) {         //  create a loop function
  face = document.getElementById("face");
  dims = getDiff();
  flags = 0;
  hopeless = 0; 
  setTimeout(function() {   //  call a 3s setTimeout when the loop is called

      cycle = true;
      for (let i = 1; i <= dims[0] && cycle; i++) { //iterate through each square until a change is made to the board
        for (let j = 1; j <= dims[1] && cycle; j++) {
  
          squareID = document.getElementById(i + "_" + j);

          if (squareID.className.startsWith('square open') && squareID.className !== 'square open0') {
            var squareNum = squareID.className[squareID.className.length - 1];
            blanks = 0; //reset the blank count for each square
            flags = 0; //reset the flags count for each square
            for (let m = -1; m <= 1; m++){ //count how many blank/flags are around the square
              for (let n = -1; n <= 1; n++) {
                x = m + i;
                y = n + j;
                surr = document.getElementById(x + "_" + y).className;
                if (y!= 0 && y <= dims[1] && x != 0 && x <= dims[0] && surr === 'square blank') {
                  blanks++;
                }
                else if (y!= 0 && y <= dims[1] && x != 0 && x <= dims[0] && surr === 'square bombflagged') {
                  flags++;
                }
  
              }
            }
  
  
            if (blanks == 0) {//lol idk how to short circuit in js
  
            } else if (squareNum == flags) { //if the squareNum is equal to the flags, all blank squares surrounding are not bombs
              cycle = false;  
              hopeless = 0;            
              for (let m = -1; m <= 1; m++){ //click surrounding squares
                for (let n = -1; n <= 1; n++) {
                  x = m + i;
                  y = n + j;
                  surr = document.getElementById(x + "_" + y);
                  if (surr.className === 'square blank') { 
                    if (y!= 0 && y <= dims[1] && x != 0 && x <= dims[0]){ //don't change the out of bounds squares

                      surr.dispatchEvent(leftMouseDownEvent);
                      surr.dispatchEvent(leftMouseUpEvent);    
                    }
                  }
                }
              }  
            } 
            else if (blanks + flags == squareNum) { //if the squareNum is equal to the num of blanks + flags, all surrounding squares are flags
              cycle = false;    
              hopeless = 0;             
              for (let m = -1; m <= 1; m++){ //flag surrounding squares
                for (let n = -1; n <= 1; n++) {
  
                  x = m + i;
                  y = n + j;
                  surr = document.getElementById(x + "_" + y);
                  if (surr.className === 'square blank') { 
                    if (y!= 0 && y <= dims[1] && x != 0 && x <= dims[0]){//don't change the out of bounds squares
                      surr.dispatchEvent(rightMouseDownEvent);
                      surr.dispatchEvent(rightMouseUpEvent);  
                    }
                  }
                }
              }            
            }
            else {
              hopeless++;
            }
          }
        }
      }
      face = document.getElementById("face");


      if (face.className !== 'facewin' && hopeless < 3) {           //  if the counter < 10, call the loop function
          myLoop(leftMouseDownEvent, leftMouseUpEvent, rightMouseDownEvent, rightMouseUpEvent);             //  ..  again which will trigger another 
      }                       //  ..  setTimeout()
  }, 200, leftMouseDownEvent, leftMouseUpEvent, rightMouseDownEvent, rightMouseUpEvent);
}

function getDiff() {
  if (document.getElementById("beginner").checked) {
    return [9,9];
  }
  else if (document.getElementById("intermediate").checked) {
    return [16,16];
  }
  else if (document.getElementById("expert").checked) {
    return [16,30];
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
  startingTile = (Math.floor(dims[0]/2)) + "_" + (Math.floor(dims[1]/2));

  //start in top left corner
  //startingTile = "1_1";

  squareID = document.getElementById(startingTile); //change starting tile to your desired starting tile or comment/uncomment

  const leftMouseDownEvent = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: true
  });

  const leftMouseUpEvent = new MouseEvent('mouseup', {
    bubbles: true,
    cancelable: true
  });

  const rightMouseDownEvent = new MouseEvent('mousedown', {
    button: 2,
    bubbles: true,
    cancelable: true
  });

  const rightMouseUpEvent = new MouseEvent('mouseup', {
    button: 2,
    bubbles: true,
    cancelable: true
  });

  squareID.dispatchEvent(leftMouseDownEvent);
  squareID.dispatchEvent(leftMouseUpEvent);

  myLoop(leftMouseDownEvent, leftMouseUpEvent, rightMouseDownEvent, rightMouseUpEvent);
}

simulateClick();                   //  start the loop