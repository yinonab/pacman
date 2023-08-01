'use strict'

var PACMAN = '😀'
var gPacman
var gFoodEatenCount


function createPacman(board) {
    // DONE: initialize gPacman...
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }

    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    console.log('gFoodEatenCount:', gFoodEatenCount)
    // DONE: use getNextLocation(), nextCell
    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // DONE: return if cannot move
    if (nextCell === WALL) return

    // DONE: hitting a ghost? call gameOver
    if (nextCell === GHOST && !gPacman.isSuper) {
        const elh2 = document.querySelector('.title')
        elh2.innerText = '💢💥 GAME OVER 💥💢'
        gameOver()
        return
    }
    if (nextCell === GHOST && gPacman.isSuper) {
        //here pacman over on ghost
        removeGhost(nextLocation)
        playSound('5.wav')
        renderGhosts()
    }

    if (nextCell === FOOD) {
        playSound('1.wav')
        updateScore(1)
        gFoodEatenCount--
        if (!gFoodEatenCount){
            const elh2 = document.querySelector('.title')
            elh2.innerText = 'VICTORY !!!'
            gameOver()
        }
    }
    if (nextCell === SUPER_FOOD && gPacman.isSuper)return
    if (nextCell === CHERRY){
        updateScore(10)
        playSound('2.wav')
    }
    if (nextCell === SUPER_FOOD) {
        playSound('3.wav')
        gPacman.isSuper = true
        renderGhosts()
        setTimeout(() => {
            gPacman.isSuper = false
            resetGhost()
        }, 5000)
        updateScore(1)
        gFoodEatenCount--
        if (!gFoodEatenCount) {
            const elh2 = document.querySelector('.title')
            elh2.innerText = 'VICTORY !!!'
            gameOver()
        }
    }



    // DONE: moving from current location:
    // DONE: update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // DONE: update the DOM
    renderCell(gPacman.location, EMPTY)

    // DONE: Move the pacman to new location:
    // DONE: update the model
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    gPacman.location = nextLocation
    // DONE: update the DOM
    renderCell(nextLocation, PACMAN)
}


function getNextLocation(eventKeyboard) {

    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            PACMAN='👆'
            break;
        case 'ArrowRight':
            nextLocation.j++
            PACMAN='👉'
            break;
        case 'ArrowDown':
            nextLocation.i++
            PACMAN='👇'
            break;
        case 'ArrowLeft':
            nextLocation.j--
            PACMAN='👈'
            break;
    }
    return nextLocation
}