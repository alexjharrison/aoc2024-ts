import run from "aocrunner"

const part1 = (rawInput: string) =>
  rawInput
    .match(/mul\(\d{1,3},\d{1,3}\)/g) // ['mul(1,2)', 'mul(23,999)', ...]
    ?.map(line => line.split(",")) // [['mul(1', '2)'], ['mul(23', '999)'], ...]
    .map(([first, second]) => [Number(first.split("(")[1]), Number(second.split(")")[0])]) // [[1,2],[23,999]...]
    .reduce((sum, [left, right]) => sum + left * right, 0) // (1 * 2) + (23 * 999)

const part2 = (rawInput: string) =>
  rawInput
    .split("do()")
    .flatMap(line => line.split("don't()")[0])
    .join("")
    .match(/mul\(\d{1,3},\d{1,3}\)/g)
    ?.map(line => line.split(","))
    .map(([first, second]) => [Number(first.split("(")[1]), Number(second.split(")")[0])])
    .reduce((sum, [left, right]) => sum + left * right, 0)

run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
        expected: 48,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
