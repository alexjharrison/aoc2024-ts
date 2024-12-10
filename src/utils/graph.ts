export class Node<T> {
  constructor(
    public readonly name: string,
    public val?: T,
    public edges: Map<Node<T>, Edge<T>> = new Map(),
    public visited = false,
  ) {}
}

export class Edge<T> {
  constructor(public from: Node<T>, public to: Node<T>, public weight = 1) {}
}

export class Graph<T> {
  private nodes: Map<string, Node<T>> = new Map()
  private edges: Set<Edge<T>> = new Set()
  constructor(nodesRaw: { name: string; val?: T }[]) {
    for (const { name, val } of nodesRaw) {
      this.nodes.set(name, new Node(name, val))
    }
  }
  getNode = (node: string | Node<T>) => {
    if (typeof node === "string") {
      const nodeFromGraph = this.nodes.get(node)
      if (nodeFromGraph) return nodeFromGraph

      const newNode = new Node<T>(node)
      this.nodes.set(node, newNode)
      return newNode
    }
    return node
  }
  getEdge = (from: string | Node<T>, to: string | Node<T>) => {
    const node1 = this.getNode(from)
    const node2 = this.getNode(to)
    if (!node1 || !node2) throw new Error("Node Missing")
    return node1.edges.get(node2)
  }

  connect = (from: string | Node<T>, to: string | Node<T>, weight?: number) => {
    this.connectDirectional(from, to, weight)
    this.connectDirectional(to, from, weight)
  }
  connectDirectional = (from: string | Node<T>, to: string | Node<T>, weight?: number) => {
    const node1 = this.getNode(from)
    const node2 = this.getNode(to)
    if (!node1 || !node2) throw new Error("Node Missing")
    const edge = new Edge(node1, node2, weight)
    node1.edges.set(node2, edge)
    this.edges.add(edge)
  }
  draw = () => {
    for (const edge of this.edges) {
      console.log(
        `${edge.from.name}${new Array(8 - edge.from.name.length).fill("-").join("")}${edge.weight}${new Array(
          6 - ("" + edge.weight).length,
        )
          .fill("-")
          .join("")}>${edge.to.name}`,
      )
    }
  }
}
