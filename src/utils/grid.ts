export class Point<T> {
  constructor(public x: number, public y: number, public val: T, public wasVisited = false) {}
  public coords = () => [this.y, this.x]
  public isNumber = () => {
    switch (typeof this.val) {
      case "number":
        return true
      case "string":
        return /^-?\d+$/.test(this.val)
      default:
        return false
    }
  }
  public isEmpty = () => this.val === "."
  public endcodeId = (payload: string = "") => `${this.x}-${this.y}-${payload}`
}

export class Grid<TVal> {
  public points: Point<TVal>[][]
  public height: number
  public width: number
  public map: Map<TVal | string, Point<TVal>[]>
  constructor(public lines: TVal[][]) {
    this.map = new Map()
    this.points = lines.map((line, y) =>
      line.map((val, x) => {
        const pt = new Point(x, y, val)
        const pts = this.map.get(val)
        const payload = typeof val === "object" ? JSON.stringify(val) : val
        if (pts) pts.push(pt)
        else this.map.set(payload, [pt])
        return pt
      }),
    )

    // self.points = [[Point(x, y, int(val) if val.isdigit() else val) for x, val in enumerate(line)]
    //for y, line in enumerate(lines)]

    this.height = lines.length
    this.width = lines[0].length
  }
  public draw = () => {
    for (const row of this.points) {
      let line = ""
      for (const col of row) {
        line += col.val
        // process.stdout.write((col.val === " " ? "." : col.val) + "")
      }
      console.log(line)
    }
  }
  public decodeId = (id: string) => {
    const [x, y, payload] = id.split("-")
    return { point: this.getPoint(+x, +y), payload }
  }
  public pointsList = () => this.points.flatMap(row => row)
  public getPoint = (x: number, y: number) => this.points[y][x]
  public getLeft = (pt: Point<TVal>) => (pt.x === 0 ? null : this.getPoint(pt.x - 1, pt.y))
  public getRight = (pt: Point<TVal>) => (pt.x === this.width - 1 ? null : this.getPoint(pt.x + 1, pt.y))
  public getAbove = (pt: Point<TVal>) => (pt.y === 0 ? null : this.getPoint(pt.x, pt.y - 1))
  public getBelow = (pt: Point<TVal>) => (pt.y === this.height - 1 ? null : this.getPoint(pt.x, pt.y + 1))
  public getTopLeft = (pt: Point<TVal>) => {
    const above = this.getAbove(pt)
    const left = this.getLeft(pt)
    if (!above || !left) return null
    return this.getPoint(left.x, above.y)
  }
  public getTopRight = (pt: Point<TVal>) => {
    const above = this.getAbove(pt)
    const right = this.getRight(pt)
    if (!above || !right) return null
    return this.getPoint(right.x, above.y)
  }
  public getBottomLeft = (pt: Point<TVal>) => {
    const below = this.getBelow(pt)
    const left = this.getLeft(pt)
    if (!below || !left) return null
    return this.getPoint(left.x, below.y)
  }
  public getBottomRight = (pt: Point<TVal>) => {
    const below = this.getBelow(pt)
    const right = this.getRight(pt)
    if (!below || !right) return null
    return this.getPoint(right.x, below.y)
  }
  public getAdjacentNeighbors = (pt: Point<TVal>) => [
    this.getAbove(pt),
    this.getRight(pt),
    this.getBelow(pt),
    this.getLeft(pt),
  ]
  public getAllNeighbors = (pt: Point<TVal>) => [
    this.getAbove(pt),
    this.getTopRight(pt),
    this.getRight(pt),
    this.getBottomRight(pt),
    this.getBelow(pt),
    this.getBottomLeft(pt),
    this.getLeft(pt),
    this.getTopLeft(pt),
  ]
  public getNumber = (pt: Point<TVal>) => {
    let here = this.getPoint(pt.x, pt.y)
    if (!here.isNumber()) return { number: null, points: [here] }
    while (true) {
      const left = this.getLeft(here)
      if (!left || left.isEmpty() || !left.isNumber()) break
      here = left
    }
    const points = [here]
    let num = String(here.val)
    while (true) {
      const right = this.getRight(here)
      if (!right || right.isEmpty() || !right.isNumber()) break
      num += String(right.val)
      here = right
      points.push(here)
    }
    return { number: Number(num), points }
  }
}

// const grid = new Grid(["OXX".split(""), "XOX".split(""), "XXX".split("")])
// grid.draw()
