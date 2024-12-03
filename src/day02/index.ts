import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").map(line => line.split(" ").map(Number))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let count = 0
  for (const line of input) {
    const increasing = Math.sign(line[1] - line[0])
    let passed = true
    for (let i = 1; i < line.length; i++) {
      const prev = line[i - 1]
      const curr = line[i]
      const diff = Math.abs(curr - prev)
      if (diff < 1 || diff > 3 || Math.sign(curr - prev) !== increasing) {
        passed = false
        break
      }
    }
    count += +passed
  }
  return count
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let count = 0
  for (const line of input) {
    if (checkLine(line)) {
      count++
      continue
    }
    for (let i = 0; i < line.length; i++) {
      const newLine = line.toSpliced(i, 1)
      if (checkLine(newLine)) {
        count++
        break
      }
    }
  }

  function checkLine(line: number[]): boolean {
    const increasing = Math.sign(line[1] - line[0])
    for (let i = 1; i < line.length; i++) {
      const prev = line[i - 1]
      const curr = line[i]
      const diff = Math.abs(curr - prev)
      if (diff < 1 || diff > 3 || Math.sign(curr - prev) !== increasing) {
        return false
      }
    }
    return true
  }
  return count
}

run({
  part1: {
    tests: [
      //       {
      //         input: `
      // 7 6 4 2 1
      // 1 2 7 8 9
      // 9 7 6 2 1
      // 1 3 2 4 5
      // 8 6 4 4 1
      // 1 3 6 7 9
      //         `,
      //         expected: 2,
      //       },
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
