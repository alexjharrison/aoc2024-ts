type LLItem<T> = {
  next: LLItem<T> | null
  prev: LLItem<T> | null
  val: T
}

export class LinkedList<T> {
  length = 0
  list = new Map<LLItem<T>>()
  first: LLItem<T> | null
  last: LLItem<T> | null
  constructor(vals?: T[]) {
    this.first = null
    this.last = null
    if (!vals) return

    this.addMany(vals)
  }
  addMany(val: T[]) {
    for (let i = 0; i < val.length; i++) {
      this.add(val[i])
    }
  }
  add(val: T) {
    const prevItem = this.list[this.length]
    const newItem: LLItem<T> = { val, next: null, prev: prevItem }
    if (this.length > 0) {
      prevItem.next = newItem
    }
    this.list[++this.length] = newItem
  }
  prepend(val: T) {}
}
