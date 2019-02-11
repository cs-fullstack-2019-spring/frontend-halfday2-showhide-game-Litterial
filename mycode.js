var newbackground=document.getElementById('water');  /*background*/
var grassbackground = document.getElementsByTagName("table");   /*gets table tag*/
newbackground.addEventListener('click',oceanTheme); /*listens for click*/
var victoryMessage=document.getElementsByTagName('h2');
function oceanTheme()
{
    console.log('hi');
    grassbackground[0].classList.toggle("newOcean");
}


var music= document.getElementsByTagName('audio');
function letsRock() {
    let theGo = document.getElementById("goGetIt");
    theGo.onclick = function () {
        // Get random number of targets and do setup
        const targetKount = document.getElementById("numberOfTargets").value;
        // Don't allow more than 50 targets as that's all the TDs we have
        if (targetKount > 50)
        {
            alert("Maximum number of targets is 50!");
            return;
        }
        const targetTime = document.getElementById("displayTime").value;
        // Now start the game!
        setUpTargetsAndPlay(parseInt(targetKount), parseInt(targetTime));
    };
}
// Utility function to get a random table cell number
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// This function gets called if player hits a target
function clickedTarget(e) {
    console.log(e.target);
    // Let's get the hit item and store in a variable
    let hit = e.target.querySelector("img");

    /*  Do some sanity checks making sure there is an image and it has the 'display' style
        before we try to change the display property.
    */
    if (hit != null && hit.style.display != null) {
        // Make hit target image visible again
        e.target.querySelector("img").style.display = 'block';
    }
    console.log("Got a Hit!");
    // Update their hit score
    hits += 1;

}

function testThis(el) {
    console.log(el);
}
// The main function that sets up targets and starts a game
function setUpTargetsAndPlay(numberOfTargets, displayTimeMs) {
    victoryMessage[0].innerText="";
    /*stops all ending music when the new game is started*/
    music[2].pause();
    music[0].pause();
    music[1].currentTime=0;  /*sets music at 0;*/
    music[1].play(); /*plays music*/
    clicks = 0;
    targets = numberOfTargets;
    hits = 0;
    // Clear any target images from prior game (FIXME: Sometimes doesn't remove them all :-(
    $(".targetImg").remove();
    // Setup click detection for the entire table
    $("table").on("click", function () {
        clicks += 1;
        console.log("clicked = " + clicks + " Max = " + targets);
        if (clicks === targets) {  // Player out of clicks!
            // FIXME: Sometime at end of game hits are more than 5 for some reason which should be impossible
            alert("No more clicks! You got " + hits + " out of " + targets);
            if ((hits/targets)*100<70)  /*loser theme*/
            {
                music[1].pause(); /*stops music*/
                music[0].currentTime=0;
                music[0].play(); /*plays loser theme*/
                victoryMessage[0].innerText="Defeat"  /*changes to Defeat*/

            }

            else
            {
                music[1].pause();
                music[2].currentTime=0;
                music[2].play();
                victoryMessage[0].innerText="Victory" /*changes inner text to Victory*/
            }

            // Turn off click detection
            $("td").off("click");
            $("table").off("click");
            $(".targetImg").show(); // Show where all the targets were hidden
        }
    });

    console.log("setting up " + targets + " targets");
    // Get the number of targets specified and randomly picks cells to display them in for the target table
    for (let x = 0; x < targets; x++) {
        let targetNum = getRandomInt(1, 50); // Pick a random table cell
        console.log("Table cell selected for target = " + targetNum);
        let tdID = "td" + targetNum;
        let imgID = "img" + targetNum;

        // Set an IMG for each randomly selected cell along with 'click' event handler
        $('#' + tdID).append("<img id = " + imgID + " class= 'targetImg' src='bird.png'>");
        $('#' + imgID).delay(2000).show(0); // Wait 2 seconds then show the targets
        $('#' + imgID).delay(displayTimeMs).hide(0); // Setup a callback that will hide the images after the specified time
        $('#' + tdID).on("click", clickedTarget);
    }

}



