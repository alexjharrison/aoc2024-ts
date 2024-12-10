import run from "aocrunner"
import { Grid, Point } from "../utils/grid.js"

const parseInput = (rawInput: string) => new Grid(rawInput.split("\n").map(line => line.split("")))

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput)
  const startPts = grid.pointsList().filter(pt => pt.val === "0")
  let sum = 0
  for (const pt of startPts) {
    const endPts = getValidPaths(pt, grid)
    sum += endPts.size
  }
  return sum
}

const getValidPaths = (start: Point<string>, grid: Grid<string>): Set<Point<string>> => {
  const set = new Set<Point<string>>()
  walk(start, grid, set)
  return set
}
let ratingsSum = 0
const walk = (pt: Point<string>, grid: Grid<string>, set: Set<Point<string>>) => {
  const neighbors = grid.getAdjacentNeighbors(pt)
  for (const neighbor of neighbors) {
    if (neighbor && +pt.val + 1 === +neighbor?.val) {
      if (neighbor.val === "9") {
        set.add(neighbor)
        ratingsSum++
      } else walk(neighbor, grid, set)
    }
  }
}

const part2 = (rawInput: string) => {
  ratingsSum = 0
  const grid = parseInput(rawInput)
  const startPts = grid.pointsList().filter(pt => pt.val === "0")
  for (const pt of startPts) {
    getValidPaths(pt, grid)
  }
  return ratingsSum
}

run({
  part1: {
    tests: [
      {
        input: `
          89010123
          78121874
          87430965
          96549874
          45678903
          32019012
          01329801
          10456732
        `,
        expected: 36,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          89010123
          78121874
          87430965
          96549874
          45678903
          32019012
          01329801
          10456732
`,
        expected: 81,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
