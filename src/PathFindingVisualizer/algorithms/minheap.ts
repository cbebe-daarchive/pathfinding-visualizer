interface HeapItem<T, K> {
  item: T;
  key: K;
}

export default class BinaryHeap<T, K> {
  // stores key-value pairs
  private heap: Array<HeapItem<T, K>>;

  constructor(array: Array<HeapItem<T, K>> = []) {
    this.heap = [];
    array.forEach((node) => this.insert(node.item, node.key));
  }

  public min(): HeapItem<T, K> {
    return this.heap[0];
  }

  public popMin() {
    const min = this.min();
    this.heap[0] = this.heap[this.size() - 1];
    this.heap.pop();

    if (!!this.size()) this.fixHeapDown(0);
    return min;
  }

  public size(): number {
    return this.heap.length;
  }

  public insert(item: T, key: K) {
    const node: HeapItem<T, K> = { item, key };

    this.heap.push(node);
    this.fixHeapUp(this.size() - 1);
  }

  private fixHeapUp(idx: number) {
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);

      if (this.heap[idx].key < this.heap[parentIdx].key)
        // swap values by destructuring
        [this.heap[idx], this.heap[parentIdx], idx] = [
          this.heap[parentIdx],
          this.heap[idx],
          parentIdx,
        ];
      else return; // nothing needs to be done
    }
  }

  private fixHeapDown(idx: number) {
    while (true) {
      // calculate indices of the two children
      const leftChild = idx * 2 + 1;
      const rightChild = (idx + 1) * 2;

      // no children no problem
      if (leftChild > this.size()) return;

      // find the minimum child, considering the case where there is no right child
      const minChild =
        rightChild >= this.size() ||
        this.heap[leftChild].key <= this.heap[rightChild].key
          ? leftChild
          : rightChild;

      // if there is a violation of the heap property for idx,
      // swap its node with the node held by the minimum child and repeat with this child
      if (this.heap[minChild].key < this.heap[idx].key)
        [this.heap[leftChild], this.heap[minChild], idx] = [
          this.heap[minChild],
          this.heap[leftChild],
          minChild,
        ];
      else return;
    }
  }
}
