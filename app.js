document.addEventListener('DOMContentLoaded', () => {


    let blocks = document.querySelectorAll('.grid div')
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
            blocks[snake[0] + direction].classList.contains('snake', 'snake-head')
        ) {
            alert("ouch! Space bar to restart");
            console.log(score);
            
            return clearInterval(interval)
        }

        // popping tail
        const tail = snake.pop()
        blocks[tail].classList.remove('snake', 'snake-head')
        blocks[snake[0]].classList.add('snake')
        blocks[snake[0]].classList.remove('snake-head')
        snake.unshift(snake[0] + direction) // moving head

        //getting apple 
        if (blocks[snake[0]].classList.contains('apple')) {
            blocks[snake[0]].classList.remove('apple')
            blocks[tail].classList.add('snake')
            snake.push(tail)
            randomApple()
            score++
            scoreSpan.textContent = score
            // clearInterval(interval)
            // intervalTime = intervalTime * speed
            // interval = setInterval(moveOutcome, intervalTime)
        }
        blocks[snake[0]].classList.add('snake-head')
    }

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * blocks.length)
        } while(blocks[appleIndex].classList.contains('snake', 'snake-head')) // maleing sure apple is not on snake
        blocks[appleIndex].classList.add('apple')
    }
    function start() {
        reset()
        interval = setInterval(moveOutcome, intervalTime)
    }
    function reset() {
        snake.forEach(index => blocks[index].classList.remove('snake', 'snake-head'))
        blocks[appleIndex].classList.remove('apple')
        clearInterval(interval)
        direction = 1
        score = 0
        scoreSpan.textContent = score
        intervalTime = 200
        snake = [2, 1, 0]
        currentIndex = 0
        snake.forEach(index => blocks[index].classList.add('snake'))
        blocks[snake[0]].classList.add('snake-head')
        randomApple()
    }
    function controls(e) {
        blocks[currentIndex].classList.remove('snake', 'snake-head')
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