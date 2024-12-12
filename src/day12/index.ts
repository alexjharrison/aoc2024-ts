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

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
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
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
