class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addLast(data) {
    const newNode = new Node(data);
    if (newNode === null)
      return false;

    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.length++;
    return true;
  }

  addFirst(data) {
    const newNode = new Node(data);
    if (newNode === null)
      return false;

    if (this.tail === null) {
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
    }
    this.head = newNode;
    this.length++;
    return true;
  }

  addAtIndex(index, data) {
    if (index <= 0)
      return this.addFirst(data);

    if (index >= this.length)
      return this.addLast(data);

    const newNode = new Node(data);
    let noAtual = this.head;
    let indexAtual = 0;
    while (indexAtual < index - 1) {
      noAtual = noAtual.next;
      indexAtual++;
    }
    newNode.prev = noAtual;
    newNode.next = noAtual.next;
    noAtual.next = newNode;
    newNode.next.prev = newNode;
    this.length++;
    return true;
  }

  deleteFirst() {
    const removedData = this.head.data;
    this.head = this.head.next;
    if (this.head !== null) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    this.length--;
    return removedData;
  }

  deleteLast() {
    const removedData = this.tail.data;
    this.tail = this.tail.prev;
    if (this.tail !== null) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    this.length--;
    return removedData;
  }

  deleteAtIndex(index) {
    let indexAtual = 0;
    let noAtual = this.head;

    if (this.isEmpty())
      return null;

    while (indexAtual < index) {
      noAtual = noAtual.next;
      indexAtual++;
    }

    if (noAtual.next == null)
      this.tail = noAtual.prev;
    else
      noAtual.next.prev = noAtual.prev;

    if (noAtual.prev == null)
      this.head = noAtual.next;
    else
      noAtual.prev.next = noAtual.next;

    this.length--;
    return noAtual.data;
  }

  isEmpty() {
    return this.head === null;
  }

  forEach(callback) {
    let noAtual = this.head;

    while (noAtual !== null) {
      callback(noAtual.data);
      noAtual = noAtual.next;
    }
  }

  getFirst() {
    if (this.isEmpty())
      return null;
    return this.head.data;
  }

  getLast() {
    if (this.isEmpty())
      return null;
    return this.tail.data;
  }
}
