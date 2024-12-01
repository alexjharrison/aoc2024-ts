import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("\n").map(line=>line.split('  ').map(Number))

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const list1 = input.map(val=>val[0]).sort()
  const list2 = input.map(val=>val[1]).sort()
  let sum  = 0
  for(let i = 0;i<list1.length;i++){
    sum += Math.abs(list1[i] - list2[i]) 
  }
  return sum
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const left = input.map(val=>val[0])
  
  const right = input.map(val=>val[1])
  let sum = 0

  for(const val of left){
    let localSum = 0
    for(const valr of right){
      if(val === valr){
        localSum+=val
      }
    }
    sum += localSum
  }

  return sum
}

run({
  part1: {
    tests: [
//       {
//         input: `
// 3   4
// 4   3
// 2   5
// 1   3
// 3   9
// 3   3
//         `,
//         expected: 11,
//       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
3   4
4   3
2   5
1   3
3   9
3   3
        `,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
