import run from "aocrunner"
import { Grid, Point } from "../utils/grid.js"

const parseInput = (rawInput: string) => {
  const grid = new Grid(rawInput.split("\n").map(line => line.split("")))
  const pts = grid
    .pointsList()
    .filter(pt => pt.val !== ".")
    .reduce<Record<string, Set<Point<string>>>>((acc, pt) => {
      if (!acc[pt.val]) acc[pt.val] = new Set([pt])
      else acc[pt.val].add(pt)
      return acc
    }, {})
  return { grid, pts }
}

function getAntinodes(nodeSet: Set<Point<string>>, grid: Grid<string>): Set<Point<string>> {
  const antiSet: Set<Point<string>> = new Set()
  const { height, width } = grid
  const nodeList = [...nodeSet]
  for (let i = 0; i < nodeList.length; i++) {
    for (let j = i + 1; j < nodeList.length; j++) {
      const first = nodeList[i]
      const second = nodeList[j]
      const dx = first.x - second.x
      const dy = first.y - second.y
      const pt1x = first.x + dx
      const pt1y = first.y + dy
      const pt2x = second.x - dx
      const pt2y = second.y - dy

      if (pt1x >= 0 && pt1x < width && pt1y >= 0 && pt1y < height) {
        const pt1 = grid.getPoint(pt1x, pt1y)
        antiSet.add(pt1)
        pt1.val = "~"
      }
      if (pt2x >= 0 && pt2x < width && pt2y >= 0 && pt2y < height) {
        const pt2 = grid.getPoint(pt2x, pt2y)
        antiSet.add(pt2)
        pt2.val = "~"
      }
    }
  }
  return antiSet
}

const part1 = (rawInput: string) => {
  const { grid, pts } = parseInput(rawInput)
  let set = new Set<Point<string>>()
  for (const points of Object.values(pts)) {
    set = set.union(getAntinodes(points, grid))
  }
  // console.log(set)
  // grid.draw()
  return set.size
}

function getLegalAntiNodes(first: Point<string>, second: Point<string>, grid: Grid<string>): Set<Point<string>> {
  const set: Set<Point<string>> = new Set()
  const { height, width } = grid
  let i = 1
  const dx = first.x - second.x
  const dy = first.y - second.y
  while (true) {
    const pt1x = first.x + dx * i
    const pt1y = first.y + dy * i
    if (pt1x < 0 || pt1x >= width || pt1y < 0 || pt1y >= height) break
    const pt1 = grid.getPoint(pt1x, pt1y)
    set.add(pt1)
    pt1.val = "~"
    i++
  }
  i = 1
  while (true) {
    const pt2x = second.x - dx * i
    const pt2y = second.y - dy * i
    if (pt2x < 0 || pt2x >= width || pt2y < 0 || pt2y >= height) break
    const pt2 = grid.getPoint(pt2x, pt2y)
    set.add(pt2)
    pt2.val = "~"
    i++
  }
  return set
}

function getRepeatingAntiNodes(nodeSet: Set<Point<string>>, grid: Grid<string>): Set<Point<string>> {
  let antiSet: Set<Point<string>> = new Set()
  const nodeList = [...nodeSet]
  for (let i = 0; i < nodeList.length; i++) {
    for (let j = i + 1; j < nodeList.length; j++) {
      const first = nodeList[i]
      const second = nodeList[j]
      antiSet = antiSet.union(getLegalAntiNodes(first, second, grid))
    }
  }
  return antiSet
}

const part2 = (rawInput: string) => {
  const { grid, pts } = parseInput(rawInput)
  let set = new Set<Point<string>>()
  for (const points of Object.values(pts)) {
    set = set.union(points)
    set = set.union(getRepeatingAntiNodes(points, grid))
  }
  // console.log(set)
  // grid.draw()
  return set.size
}

run({
  part1: {
    tests: [
      {
        input: `
        ............
        ........0...
        .....0......
        .......0....
        ....0.......
        ......A.....
        ............
        ............
        ........A...
        .........A..
        ............
        ............
        `,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        ............
        ........0...
        .....0......
        .......0....
        ....0.......
        ......A.....
        ............
        ............
        ........A...
        .........A..
        ............
        ............
        `,
        expected: 34,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
