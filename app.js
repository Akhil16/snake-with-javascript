document.addEventListener('DOMContentLoaded', () => {

    let blocks = document.querySelectorAll('.grid-box div')
    let scoreSpan = document.querySelector('#score')
    // let timerSpan = document.querySelector('#timer')

    const width = 20;
    let appleIndex = 70
    let currentIndex = 0
    let snake = [2, 1, 0] // 2being head, 0 being the tail
    let direction = 1
    let keyCode = 77777
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
    let play = true
    // assign func to keys
    function checkBreath() {
        if (
            (snake[0] + width >= width * width && direction === width) ||
            (snake[0] - width < 0 && direction === -width) ||
            (snake[0] % width === width - 1 && direction === 1) ||
            (snake[0] % width === 0 && direction === -1) ||
            blocks[snake[0] + direction].classList.contains('snake')
        ) {
            alert("ouch! Enter to restart");
            return clearInterval(interval)
        }
    }

    function checkBitingApple(tail) {
        //getting apple 
        if (blocks[snake[0]] != undefined && blocks[snake[0]].classList.contains('apple')) {
            blocks[snake[0]].classList.remove('apple')
            snake.push(tail)
            randomApple()
            score++
            scoreSpan.textContent = score
            // clearInterval(interval)
            // intervalTime = intervalTime * speed
            // interval = setInterval(gameLoop, intervalTime)
        }
    }

    function moveSnake() {
        const tail = snake.pop() // popping tail
        blocks[tail].classList.remove('snake')
        blocks[tail].style = ''
        snake.unshift(snake[0] + direction) // moving head
        return tail;
    }

    function manageSkin() {
        if (!!blocks[snake[0]]) {
            blocks[snake[0]].classList.add('snake')
            blocks[snake[0]].classList.add('head')
            blocks[snake[1]].classList.remove('head')
            snake.forEach((item, i) => {
                if (i != 0 && i != snake.length - 1)
                    blocks[item].style.scale = '0.' + Math.floor(Math.random() * 10)
            })
        }
    }

    function gameLoop() {
        checkBreath()
        const tail = moveSnake()
        checkBitingApple(tail)
        manageSkin()
    }

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * blocks.length)
        } while (blocks[appleIndex].classList.contains('snake')) // maleing sure apple is not on snake
        blocks[appleIndex].classList.add('apple')
    }
    function start() {
        reset()
        interval = setInterval(gameLoop, intervalTime)
    }
    function reset() {
        snake.forEach(index => {
            if (!blocks[index]) return
            blocks[index].classList.remove('snake')
            blocks[index].classList.remove('head')
        })
        blocks.forEach(item => item.style = '')
        blocks[appleIndex].classList.remove('apple')
        clearInterval(interval)
        direction = 1
        score = 0
        scoreSpan.textContent = score
        intervalTime = 150
        snake = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
        currentIndex = 0
        snake.forEach(index => blocks[index].classList.add('snake'))
        randomApple()
    }
    function controls(e) {
        if (keyCode === 37 && e.keyCode === 39 || keyCode === 38 && e.keyCode === 40 || keyCode === 39 && e.keyCode === 37 || keyCode === 40 && e.keyCode === 38) {
            return;
        }
        if (keyCode === 65 && e.keyCode === 68 || keyCode === 87 && e.keyCode === 83 || keyCode === 68 && e.keyCode === 65 || keyCode === 83 && e.keyCode === 87) {
            return;
        }
        switch (e.keyCode) {
            case 37:
                keyCode = e.keyCode
                direction = -1
                break
            case 38:
                keyCode = e.keyCode
                direction = - width
                break
            case 39:
                keyCode = e.keyCode
                direction = 1
                break
            case 40:
                keyCode = e.keyCode
                direction = width
                break
            case 65:
                keyCode = e.keyCode
                direction = -1
                break
            case 87:
                keyCode = e.keyCode
                direction = - width
                break
            case 68:
                keyCode = e.keyCode
                direction = 1
                break
            case 83:
                keyCode = e.keyCode
                direction = width
                break
            case 13:
                if (play) {
                    start()
                    play = false

                } else {
                    play = true
                    reset()
                    clearInterval(interval)
                }
                break

        }

    }



    document.addEventListener('keyup', controls)
})

