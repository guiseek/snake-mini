import './style.css'

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

const canvas = document.querySelector<HTMLCanvasElement>('#game')
const context = canvas && canvas.getContext('2d')

if (canvas && context) {
  const grid = 16
  let count = 0

  const snake: Snake = {
    x: 160,
    y: 160,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4,
  }

  const apple: Vector = {
    x: 320,
    y: 320,
  }

  const gulp = new Audio('./gulp.mp3')

  const loop = () => {
    requestAnimationFrame(loop)

    if (++count < 4) {
      return
    }

    count = 0
    context.clearRect(0, 0, canvas.width, canvas.height)

    snake.x += snake.dx
    snake.y += snake.dy

    if (snake.x < 0) {
      snake.x = canvas.width - grid
    } else if (snake.x >= canvas.width) {
      snake.x = 0
    }

    if (snake.y < 0) {
      snake.y = canvas.height - grid
    } else if (snake.y >= canvas.height) {
      snake.y = 0
    }

    snake.cells.unshift({ x: snake.x, y: snake.y })

    if (snake.cells.length > snake.maxCells) {
      snake.cells.pop()
    }

    context.fillStyle = 'darkred'
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1)

    context.fillStyle = 'lime'

    snake.cells.forEach((cell, index) => {
      context.fillRect(cell.x, cell.y, grid - 1, grid - 1)

      if (cell.x === apple.x && cell.y === apple.y) {
        snake.maxCells++
        apple.x = getRandomInt(0, 25) * grid
        apple.y = getRandomInt(0, 25) * grid
        gulp.play()
      }

      for (let i = index + 1; i < snake.cells.length; i++) {
        const { x, y } = snake.cells[i]
        if (cell.x === x && cell.y === y) {
          snake.x = 160
          snake.y = 160
          snake.dy = 0
          snake.dx = grid
          snake.cells = []
          snake.maxCells = 4

          apple.x = getRandomInt(0, 25) * grid
          apple.y = getRandomInt(0, 25) * grid
        }
      }
    })
  }

  document.onkeydown = (e) => {
    if (e.key === 'ArrowLeft' && snake.dx === 0) {
      snake.dx = -grid
      snake.dy = 0
    } else if (e.key === 'ArrowUp' && snake.dy === 0) {
      snake.dy = -grid
      snake.dx = 0
    } else if (e.key === 'ArrowRight' && snake.dx === 0) {
      snake.dx = grid
      snake.dy = 0
    } else if (e.key === 'ArrowDown' && snake.dy === 0) {
      snake.dy = grid
      snake.dx = 0
    }
  }

  loop()
}
