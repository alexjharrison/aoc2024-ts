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

type Block = {
  id: number
  length: number
  padding: number
}

const stringifyDebug = (blocks: Block[]) => {
  let list: string[] = []
  for (const block of blocks) {
    list = list.concat(...new Array(block.length).fill(block.id))
    list = list.concat(...new Array(block.padding).fill("."))
  }
  console.log(list.join(""))
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)
  const blocks: Block[] = []
  let lastId = 0
  for (let i = 0; i < input.length; i += 2) {
    blocks.push({
      id: i / 2,
      length: +input[i],
      padding: +input[i + 1] || 0,
    })
    lastId = i / 2
  }
  const get = (id: number) => {
    const idx = blocks.findIndex(bl => bl.id === id)
    return { idx, block: blocks[idx] }
  }
  for (let i = lastId; i > 0; i--) {
    const movingBlock = get(i)
    for (let j = 0; j < movingBlock.idx; j++) {
      const current = blocks[j]
      if (current.padding >= movingBlock.block.length) {
        blocks[movingBlock.idx - 1].padding += movingBlock.block.length + movingBlock.block.padding
        current.padding -= movingBlock.block.length
        movingBlock.block.padding = current.padding
        current.padding = 0
        const removedBlock = blocks.splice(movingBlock.idx, 1)
        blocks.splice(j + 1, 0, removedBlock[0])
        stringifyDebug(blocks)
        break
      }
    }
  }
  let sum = 0
  let currI = 0
  for (const block of blocks) {
    for (let i = currI; i < block.length + currI; i++) {
      sum += i * block.id
    }
    currI += block.length + block.padding
  }
  return sum
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
      {
        input: `2333133121414131402`,
        expected: 2858,
      },
      {
        input: "23331331651141341231402",
        expected: 3257,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
