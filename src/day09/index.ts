import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

type Block = {
  id: number
  fileSize: number
  paddingSize: number
}
const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const blocks: Block[] = []
  for (let i = 0; i < input.length; i += 2) {
    blocks.push({
      id: i / 2,
      fileSize: +input[i],
      paddingSize: +(input[i + 1] || 0),
    })
  }
  for (let i = 0; i < blocks.length; i++) {
    for (let j = 0; j < blocks[i].paddingSize; j++) {
      const thisBlock = blocks[i]
      const lastBlock = blocks.at(-1)
    }
  }
  console.log(blocks)
  return
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
