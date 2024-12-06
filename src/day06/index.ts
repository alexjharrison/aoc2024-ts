import run from "aocrunner"
import { Grid, Point } from "../utils/grid.js"

const parseInput = (rawInput: string) => new Grid(rawInput.split("\n").map(line => line.split("")))

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput)
  let points = new Set<Point<string>>()
  let direction = "^"
  let currLocation: Point<string> | null = grid.pointsList().find(pt => pt.val === direction) || null
  if (!currLocation) throw new Error()
  points.add(currLocation)
  while (currLocation !== null) {
    if (direction === "^") {
      const nextLocation = grid.getAbove(currLocation)
      if (nextLocation?.val === "#") {
        direction = ">"
      } else {
        currLocation = nextLocation
      }
    } else if (direction === ">") {
      const nextLocation = grid.getRight(currLocation)
      if (nextLocation?.val === "#") {
        direction = "v"
      } else {
        currLocation = nextLocation
      }
    } else if (direction === "v") {
      const nextLocation = grid.getBelow(currLocation)
      if (nextLocation?.val === "#") {
        direction = "<"
      } else {
        currLocation = nextLocation
      }
    } else if (direction === "<") {
      const nextLocation = grid.getLeft(currLocation)
      if (nextLocation?.val === "#") {
        direction = "^"
      } else {
        currLocation = nextLocation
      }
    }
    if (currLocation) points.add(currLocation)
  }
  return points.size
}

const part2 = (rawInput: string) => {
  const grid = parseInput(rawInput)
  return 0
}

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   ....#.....
      //   .........#
      //   ..........
      //   ..#.......
      //   .......#..
      //   ..........
      //   .#..^.....
      //   ........#.
      //   #.........
      //   ......#...
      //   `,
      //   expected: 41,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        ....#.....
        .........#
        ..........
        ..#.......
        .......#..
        ..........
        .#..^.....
        ........#.
        #.........
        ......#...
        `,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
