import run from "aocrunner"
import { Grid, Point } from "../utils/grid.js"

const parseInput = (rawInput: string) => new Grid(rawInput.split("\n").map(line => line.split("")))

const part1 = (rawInput: string) => {
  const grid = parseInput(rawInput)
  const groups: Set<Point<string>>[] = []
  for (const pt of grid.pointsList()) {
    if (!pt.wasVisited) {
      const set = new Set<Point<string>>()
      addPointToGroup(set, pt, grid)
      groups.push(set)
    }
  }
  return groups.reduce((sum, grp) => sum + grp.size * getGroupPerimeter(grp, grid), 0)
}
function addPointToGroup(set: Set<Point<string>>, pt: Point<string>, grid: Grid<string>) {
  if (pt.wasVisited) return
  pt.wasVisited = true
  set.add(pt)
  for (const neighbor of grid.getAdjacentNeighbors(pt)) {
    if (neighbor?.val === pt.val) {
      addPointToGroup(set, neighbor, grid)
    }
  }
}
function getGroupPerimeter(group: Set<Point<string>>, grid: Grid<string>): number {
  let perimeter = 0
  for (const pt of group) {
    for (const neighbor of grid.getAdjacentNeighbors(pt)) {
      if (neighbor && group.has(neighbor)) continue
      perimeter++
    }
  }
  return perimeter
}

function getGroupSides(group: Set<Point<string> | null>, grid: Grid<string>) {
  let sides = 0
  let min = Infinity
  let max = -1
  for (const pt of group) {
    min = Math.min(pt!.x, pt!.y, min)
    max = Math.max(pt!.x, pt!.y, max)
  }
  for (let y = Math.max(min - 1, 0); y < Math.min(max + 1, grid.height); y++) {
    for (let x = Math.max(min - 1, 0); x < Math.min(max + 1, grid.width); x++) {
      const horizontal = grid.getPoint(x, y)
      const vertical = grid.getPoint(y, x)

      for (const pt of [horizontal, vertical]) {
        const [above, topRight, right, bottomRight, below, bottomLeft, left, topLeft] = grid.getAllNeighbors(pt)

        const outsideTopLeftCorner = group.has(pt) && !group.has(left) && !group.has(above)
        const outsideBottomLeftCorner = group.has(pt) && !group.has(left) && !group.has(below)
        const insideTopLeftCorner = !group.has(pt) && group.has(left) && group.has(topLeft) && group.has(above)
        const insideBottomLeftCorner = !group.has(pt) && group.has(left) && group.has(bottomLeft) && group.has(below)

        sides += +outsideTopLeftCorner + +outsideBottomLeftCorner + +insideTopLeftCorner + +insideBottomLeftCorner
      }
    }
  }
  return sides
}

const part2 = (rawInput: string) => {
  const grid = parseInput(rawInput)
  const groups: Set<Point<string>>[] = []
  for (const pt of grid.pointsList()) {
    if (!pt.wasVisited) {
      const set = new Set<Point<string>>()
      addPointToGroup(set, pt, grid)
      groups.push(set)
    }
  }
  return groups.reduce((sum, grp) => sum + grp.size * getGroupSides(grp, grid), 0)
}

run({
  part1: {
    tests: [
      {
        input: `
        AAAA
        BBCD
        BBCC
        EEEC
        `,
        expected: 140,
      },
      // {
      //   input: `
      //     OOOOO
      //     OXOXO
      //     OOOOO
      //     OXOXO
      //     OOOOO
      //   `,
      //   expected: 772,
      // },
      // {
      //   input: `
      //     RRRRIICCFF
      //     RRRRIICCCF
      //     VVRRRCCFFF
      //     VVRCCCJFFF
      //     VVVVCJJCFE
      //     VVIVCCJJEE
      //     VVIIICJJEE
      //     MIIIIIJJEE
      //     MIIISIJEEE
      //     MMMISSJEEE
      //   `,
      //   expected: 1930,
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        AAAA
        BBCD
        BBCC
        EEEC
        `,
        expected: 80,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
