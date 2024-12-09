import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  let arr: string[] = []
  let idx = 0
  for (let i = 0; i < input.length; i += 2) {
    arr = arr.concat(new Array(+input[i]).fill(idx++))
    if (input[i + 1] !== undefined) {
      arr = arr.concat(new Array(+input[i + 1]).fill("."))
    }
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ".") {
      for (let j = arr.length - 1; j > i; j--) {
        if (arr[j] !== ".") {
          arr[i] = arr[j]
          arr[j] = "."
          break
        }
      }
    }
  }
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ".") break
    sum += i * +arr[i]
  }
  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 1928,
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
  onlyTests: true,
})
