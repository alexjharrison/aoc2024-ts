import run from "aocrunner"

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map(line => {
    const [test, operators] = line.split(": ")
    return { test: +test, operators: operators.split(" ").map(Number) }
  })
}

const combinate = (target: number, vals: number[]): Set<number> => {
  let set = new Set<number>([vals[0]])
  for (let i = 1; i < vals.length; i++) {
    for (const val of set) {
      if (val > target) continue
      set = set.union(combos(val, vals[i]))
    }
  }
  return set
}

const combos = (a: number, b: number): Set<number> => {
  return new Set([a + b, a * b])
}

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput)
  let count = 0
  for (const { test, operators } of lines) {
    const set = combinate(test, operators)
    if (set.has(test)) count += test
  }
  return count
}

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput)

  return
}

run({
  part1: {
    tests: [
      {
        input: `
        190: 10 19
        3267: 81 40 27
        83: 17 5
        156: 15 6
        7290: 6 8 6 15
        161011: 16 10 13
        192: 17 8 14
        21037: 9 7 18 13
        292: 11 6 16 20
        `,
        expected: 3749,
      },
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
