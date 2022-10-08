document.addEventListener('DOMContentLoaded', () => {


    let blocks = document.querySelectorAll('.grid-box div')
    let scoreSpan = document.querySelector('#score')
    // let timerSpan = document.querySelector('#timer')

    const width = 20;
    let appleIndex = 70
    let currentIndex = 0
    let snake = [2, 1, 0] // 2being head, 0 being the tail
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
    let play = true
    // assign func to keys

    function moveOutcome() {
        // losing lives
        if (
            (snake[0] + width >= width * width && direction === width) ||
            (snake[0] - width < 0 && direction === -width) ||
            (snake[0] % width === width - 1 && direction === 1) ||
            (snake[0] % width === 0 && direction === -1) ||
            blocks[snake[0] + direction].classList.contains('snake')
        ) {
            alert("ouch! Space bar to restart");
            console.log(score);

            return clearInterval(interval)
        }

        // popping tail
        const tail = snake.pop()
        blocks[tail].classList.c
        blocks[tail].classList.remove('tail')
        snake.unshift(snake[0] + direction) // moving head

        //getting apple 
        if (blocks[snake[0]].classList.contains('apple')) {
            blocks[snake[0]].classList.remove('apple')
            blocks[tail].classList.add('snake')
            blocks[tail].classList.add('tail')
            snake.push(tail)
            randomApple()
            score++
            scoreSpan.textContent = score
            // clearInterval(interval)
            // intervalTime = intervalTime * speed
            // interval = setInterval(moveOutcome, intervalTime)
        }
        blocks[snake[0]].classList.add('snake')
        blocks[snake[0]].classList.add('head')
        blocks[snake[snake.length - 1]].classList.add('tail')
        blocks[snake[1]].classList.remove('head')
        switch (direction) {
            case 1:
                blocks[snake[0]].classList.add('rh')
                blocks[snake[1]].classList.remove('rh')

                break;
            case -1:
                blocks[snake[0]].classList.add('lh')
                blocks[snake[1]].classList.remove('lh')

                break;
            case width:
                blocks[snake[0]].classList.add('dh')
                blocks[snake[1]].classList.remove('dh')

                break;
            case -width:
                blocks[snake[0]].classList.add('uh')
                blocks[snake[1]].classList.remove('uh')

                break;

            default:
                break;
        }
    }

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * blocks.length)
        } while (blocks[appleIndex].classList.contains('snake')) // maleing sure apple is not on snake
        blocks[appleIndex].classList.add('apple')
    }
    function start() {
        reset()
        interval = setInterval(moveOutcome, intervalTime)
    }
    function reset() {
        snake.forEach(index => {
            blocks[index].classList.remove('snake')
            blocks[index].classList.remove('rh')
            blocks[index].classList.remove('lh')
            blocks[index].classList.remove('uh')
            blocks[index].classList.remove('dh')
            blocks[index].classList.remove('head')
            blocks[index].classList.remove('tail')
        })
        blocks[appleIndex].classList.remove('apple')
        clearInterval(interval)
        direction = 1
        score = 0
        scoreSpan.textContent = score
        intervalTime = 200
        snake = [2, 1, 0]
        currentIndex = 0
        snake.forEach(index => blocks[index].classList.add('snake'))
        randomApple()
    }
    function controls(e) {
        blocks[currentIndex].classList.remove('snake')
        blocks[currentIndex].classList.remove('head')
        blocks[currentIndex].classList.remove('tail')
        switch (e.keyCode) {
            case 37:
                direction = -1
                break
            case 38:
                direction = - width
                break
            case 39:
                direction = 1
                break
            case 40:
                direction = width
                break
            case 32:
                if (play) {
                    start()
                    play = false
                    // console.log(1);

                } else {
                    play = true
                    // console.log(2);
                    // reset()
                    clearInterval(interval)
                }
                break
        }
    }
    document.addEventListener('keyup', controls)
})