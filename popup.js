// Initialize button with user's preferred color
let changeColor = document.getElementById("solveMine");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: simulateClick,
  });
});

function logging() {
  console.log("in logging");
}

function simulateClick() {
  document.title = 'working';
  startingTile = "1_1"
  squareID = document.getElementById(startingTile);

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

  console.log("in simulate click");

  logging();

  // face = document.getElementById("face");
  // height = 9;
  // width = 9;
  // blanks = 0;
  // flags = 0;
  // hopeless = 0; 
  // while (face.className !== 'facewin' && hopeless < 3) {

  //   cycle = true;
  //   for (let i = 1; i <= height && cycle; i++) { //iterate through each square until a change is made to the board
  //     for (let j = 1; j <= width && cycle; j++) {

  //       squareID = document.getElementById(i + "_" + j);

  //       if (squareID.className.startsWith('square open') && squareID.className !== 'square open0') {
  //         var squareNum = squareID.className[squareID.className.length - 1];
  //         blanks = 0; //reset the blank count for each square
  //         flags = 0; //reset the flags count for each square
  //         for (let m = -1; m <= 1; m++){ //count how many blank/flags are around the square
  //           for (let n = -1; n <= 1; n++) {
  //             x = m + i;
  //             y = n + j;
  //             surr = document.getElementById(x + "_" + y).className;
  //             if (y!= 0 && y <= width && x != 0 && x <= height && surr === 'square blank') {
  //               blanks++;
  //             }
  //             else if (y!= 0 && y <= width && x != 0 && x <= height && surr === 'square bombflagged') {
  //               flags++;
  //             }
  //             // if (i == 3 && j == 2) {
  //             //   alert(flags);
  //             // }

  //           }
  //         }


  //         if (blanks == 0) {//lol idk how to short circuit in js

  //         } else if (squareNum == flags) { //if the squareNum is equal to the flags, all blank squares surrounding are not bombs
  //           cycle = false;  
  //           hopeless = 0;            
  //           for (let m = -1; m <= 1; m++){ //click surrounding squares
  //             for (let n = -1; n <= 1; n++) {
  //               x = m + i;
  //               y = n + j;
  //               surr = document.getElementById(x + "_" + y);
  //               if (surr.className === 'square blank') { 
  //                 if (y!= 0 && y <= width && x != 0 && x <= height){ //don't change the out of bounds squares
  //                   surr.dispatchEvent(leftMouseDownEvent);
  //                   surr.dispatchEvent(leftMouseUpEvent);    
  //                 }
  //               }
  //             }
  //           }  
  //         } 
  //         else if (blanks + flags == squareNum) { //if the squareNum is equal to the num of blanks + flags, all surrounding squares are flags
  //           cycle = false;    
  //           hopeless = 0;             
  //           for (let m = -1; m <= 1; m++){ //flag surrounding squares
  //             for (let n = -1; n <= 1; n++) {

  //               x = m + i;
  //               y = n + j;
  //               surr = document.getElementById(x + "_" + y);
  //               if (surr.className === 'square blank') { 
  //                 if (y!= 0 && y <= width && x != 0 && x <= height){//don't change the out of bounds squares

  //                   surr.dispatchEvent(rightMouseDownEvent);
  //                   surr.dispatchEvent(rightMouseUpEvent);  
  //                 }
  //               }
  //             }
  //           }            
  //         }
  //         else {
  //           hopeless++;
  //         }
  //       }
  //     }
  //   }
  //   face = document.getElementById("face");
  // }
}

