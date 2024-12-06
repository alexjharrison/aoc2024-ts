import run from "aocrunner"

type Rules = Record<string, { before: Set<number>; after: Set<number> }>

const parseInput = (rawInput: string) => {
  const [rules, testsRaw] = rawInput.split("\n\n")
  const tests = testsRaw.split("\n").map(line => line.split(",").map(Number))
  const rulesHash = rules.split("\n").reduce<Rules>((acc, line) => {
    const [first, second] = line.split("|")
    if (acc[first]) acc[first].after.add(+second)
    if (acc[second]) acc[second].before.add(+first)
    if (!acc[first])
      acc[first] = {
        before: new Set(),
        after: new Set([+second]),
      }
    if (!acc[second])
      acc[second] = {
        before: new Set([+first]),
        after: new Set(),
      }
    return acc
  }, {})
  return { tests, rulesHash }
}

const part1 = (rawInput: string) => {
  const { tests, rulesHash } = parseInput(rawInput)
  let sum = 0
  for (const testNums of tests) {
    const middle = testNums[Math.floor(testNums.length / 2)]
    let good = true
    for (let i = 0; i < testNums.length; i++) {
      const current = testNums[i]
      const others = new Set(testNums.slice(i + 1))
      const baddies = others.intersection(rulesHash[current].before)
      if (baddies.size > 0) {
        good = false
        break
      }
    }

    if (good) sum += middle
  }
  return sum
}

const part2 = (rawInput: string) => {
  const { tests, rulesHash } = parseInput(rawInput)
  console.log(rulesHash)
  let sum = 0
  const badNums = tests.filter(test => !isValid(test))
  for (const original of badNums) {
    const nums = original.toSorted((a, b) => (rulesHash[a].before.has(b) ? 1 : -1))
    sum += nums[Math.floor(nums.length / 2)]
  }
  return sum

  function isValid(nums: number[]) {
    for (let i = 0; i < nums.length; i++) {
      const current = nums[i]
      const others = new Set(nums.slice(i + 1))
      const baddies = others.intersection(rulesHash[current].before)
      if (baddies.size > 0) {
        return false
      }
    }
    return true
  }
}

run({
  part1: {
    tests: [
      //       {
      //         input: `
      // 47|53
      // 97|13
      // 97|61
      // 97|47
      // 75|29
      // 61|13
      // 75|53
      // 29|13
      // 97|29
      // 53|29
      // 61|53
      // 97|53
      // 61|29
      // 47|13
      // 75|47
      // 97|75
      // 47|61
      // 75|61
      // 47|29
      // 75|13
      // 53|13
      // 75,47,61,53,29
      // 97,61,53,29,13
      // 75,29,13
      // 75,97,47,61,53
      // 61,13,29
      // 97,13,75,29,47
      //         `,
      //         expected: 143,
      //       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
        `,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
