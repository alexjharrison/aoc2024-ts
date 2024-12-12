import run from "aocrunner"
import { range } from "../utils/utils.js"

const parseInput = (rawInput: string) => rawInput.split(" ").map(Number)

const part1 = (rawInput: string) => {
  let input = parseInput(rawInput)
  const blinks = 25
  for (const _ of range(blinks)) {
    const inputCopy = [...input]
    input = []
    for (const val of inputCopy) {
      const stringedVal = val + ""
      if (val === 0) input.push(1)
      else if (stringedVal.length % 2 === 0) {
        const half = Math.floor(stringedVal.length / 2)
        const front = +stringedVal.slice(0, half)
        const back = +stringedVal.slice(half)
        input.push(front)
        input.push(back)
      } else {
        input.push(val * 2024)
      }
    }
  }

  return input.length
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const blinks = 75
  let count = 0
  let hash: Record<string, number> = {}
  for (const num of input) {
    let numCount = memoizedGetCount(blinks - 1, num)
    count += numCount
  }
  return count

  function memoizedGetCount(iteration: number, num?: number) {
    if (num === undefined) return 0
    const key = `${num}-${iteration}`
    if (hash[key]) return hash[key]
    const count = getCount(iteration, num)
    hash[key] = count
    return count
  }

  function getCount(iteration: number, num: number) {
    const nums = getNewNums(num)
    if (iteration === 0) {
      return nums.length
    }
    let sum = 0
    sum += memoizedGetCount(iteration - 1, nums[0])
    sum += memoizedGetCount(iteration - 1, nums[1])
    return sum
  }

  function getNewNums(num: number) {
    const stringedNum = num + ""
    if (num === 0) return [1]
    if (stringedNum.length % 2 === 0) {
      const half = Math.floor(stringedNum.length / 2)
      const front = +stringedNum.slice(0, half)
      const back = +stringedNum.slice(half)
      return [front, back]
    }
    return [num * 2024]
  }
}

run({
  part1: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
