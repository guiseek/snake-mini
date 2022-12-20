/// <reference types="vite/client" />

interface Vector {
  x: number;
  y: number;
}

interface Snake extends Vector {
  dx: number
  dy: number
  cells: Vector[]
  maxCells: number
}
