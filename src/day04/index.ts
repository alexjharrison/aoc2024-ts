import run from "aocrunner"
import { Grid, Point } from "../utils/grid.js"

const parseInput = (rawInput: string) => rawInput.split("\n").map(line => line.split(""))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const grid = new Grid(input)
  let count = 0
  const xmas = "XMAS"
  function next(
    point: Point<string>,
    letterIdx: number,
    dx: number | null = null,
    dy: number | null,
    path: Point<string>[],
  ) {
    const currLetter = xmas[letterIdx]
    if (currLetter === "S") {
      // console.log(path.map(point => ({ x: point.x, y: point.y, val: point.val })))
      count++
      return
    }
    const neighbors = grid.getAllNeighbors(point)
    for (const neighbor of neighbors) {
      if (neighbor?.val === xmas[letterIdx + 1]) {
        const newDx = point.x - neighbor.x
        const newDy = point.y - neighbor.y
        if (dx === null || (dx === newDx && dy === newDy)) {
          next(neighbor, letterIdx + 1, newDx, newDy, [...path, neighbor])
        }
      }
    }
  }
  for (const letter of grid.pointsList()) {
    if (letter.val === "X") next(letter, 0, null, null, [letter])
  }
  grid.draw()
  return count
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const grid = new Grid(input)
  const allPaths: Point<string>[] = []
  const xmas = "MAS"
  function next(
    point: Point<string>,
    letterIdx: number,
    dx: number | null = null,
    dy: number | null,
    path: Point<string>[],
  ) {
    const currLetter = xmas[letterIdx]
    if (currLetter === "S" && dx !== 0 && dy !== 0) {
      allPaths.push(path[1])
      return
    }
    const neighbors = grid.getAllNeighbors(point)
    for (const neighbor of neighbors) {
      if (neighbor && neighbor.val === xmas[letterIdx + 1]) {
        const newDx = point.x - neighbor.x
        const newDy = point.y - neighbor.y
        if (dx === null || (dx === newDx && dy === newDy)) {
          next(neighbor, letterIdx + 1, newDx, newDy, [...path, neighbor])
        }
      }
    }
  }
  for (const letter of grid.pointsList()) {
    if (letter.val === "M") next(letter, 0, null, null, [letter])
  }
  const points = allPaths.map(point => `${point.y}-${point.x}`)
  let count = 0
  for (let i = 0; i < points.length; i++) {
    const newList = points.slice(i + 1)
    if (newList.includes(points[i])) count++
  }
  return count
}

run({
  part1: {
    tests: [
      {
        input: `
        MMMSXXMASM
        MSAMXMSMSA
        AMXSXMAAMM
        MSAMASMSMX
        XMASAMXAMM
        XXAMMXXAMA
        SMSMSASXSS
        SAXAMASAAA
        MAMMMXMMMM
        MXMXAXMASX
        `,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
      MMMSXXMASM
      MSAMXMSMSA
      AMXSXMAAMM
      MSAMASMSMX
      XMASAMXAMM
      XXAMMXXAMA
      SMSMSASXSS
      SAXAMASAAA
      MAMMMXMMMM
      MXMXAXMASX
      `,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
