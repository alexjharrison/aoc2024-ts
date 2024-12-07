import run from "aocrunner"

const parseInput = (rawInput: string) => {
  return rawInput.split("\n").map(line => {
    const [test, operators] = line.split(": ")
    return { test: +test, operators: operators.split(" ").map(Number) }
  })
}

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput)
  let sum = 0
  for (const { test, operators } of lines) {
    sum += check(test, operators.slice(1), operators[0])
  }
  return sum

  function check(target: number, list: number[], current: number): number {
    const [next, ...rest] = list
    const sum = current + next
    const mult = current * next
    if (rest.length === 0) {
      if (sum === target) return sum
      if (mult === target) return mult
      return 0
    }
    const sumBranch = check(target, rest, sum)
    if (sumBranch) return sumBranch
    const multBranch = check(target, rest, mult)
    if (multBranch) return multBranch
    return 0
  }
}

const part2 = (rawInput: string) => {
  const lines = parseInput(rawInput)
  let sum = 0
  for (const { test, operators } of lines) {
    sum += check(test, operators.slice(1), operators[0])
  }
  return sum

  function check(target: number, list: number[], current: number): number {
    const [next, ...rest] = list
    const sum = current + next
    const mult = current * next
    const fuze = Number(current + "" + next)
    if (rest.length === 0) {
      if (sum === target) return sum
      if (mult === target) return mult
      if (fuze === target) return fuze
      return 0
    }
    const sumBranch = check(target, rest, sum)
    if (sumBranch) return sumBranch
    const multBranch = check(target, rest, mult)
    if (multBranch) return multBranch
    const fuzeBranch = check(target, rest, fuze)
    if (fuzeBranch) return fuzeBranch
    return 0
  }
}

run({
  part1: {
    tests: [
      // {
      //   input: `
      //   190: 10 19
      //   3267: 81 40 27
      //   83: 17 5
      //   156: 15 6
      //   7290: 6 8 6 15
      //   161011: 16 10 13
      //   192: 17 8 14
      //   21037: 9 7 18 13
      //   292: 11 6 16 20
      //   `,
      //   expected: 3749,
      // },
    ],
    solution: part1,
  },
  part2: {
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
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
