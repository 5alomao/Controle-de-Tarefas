class Node {
    constructor(data) {
      this.data = data;
      this.prev = null;
      this.next = null;
    }
  } // fim classe Node
//------------------------------------------------------------  
  class LinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length=0;
    }
//------------------------------------------------------------  
    addLast(data) {
      console.log("addLast");
      const newNode = new Node(data);
      if(newNode===null)
        return false;

      if (this.head === null){
        // Se a lista estiver vazia, o novo nó se torna a cabeça e a cauda
        this.head = newNode;
      } else {
        // Caso contrário, adiciona o novo nó à cauda e atualiza a cauda
        newNode.prev = this.tail; // anterior do nó = cauda
        this.tail.next = newNode; // próx da cauda = novo nó
      }
      this.tail = newNode; // cauda recebe novo nó
      this.length++;
      return true;
    }
//------------------------------------------------------------  
    addFirst(data) {
      console.log("addFirst");
      const newNode = new Node(data);
      if(newNode===null)
        return false;

      if (this.tail === null){
        // Se a lista estiver vazia, o novo nó se torna a cabeça e a cauda
        this.tail = newNode;
      } else {
        // Caso contrário, adiciona o novo nó à cabeça e atualiza a cabeça
        newNode.next = this.head; // próx do nó = inicio
        this.head.prev = newNode; // anterior do inicio = novo nó
      }
      this.head = newNode; // inicio recebe novo nó
      this.length++;
      return true;
    }
//------------------------------------------------------------  
    addAtIndex(index, data) {
        // implementar
        if(index <= 0)
          return this.addFirst(data);
        
        if(index >= this.length)
          return this.addLast(data);

        const newNode = new Node(data);
        let noAtual = this.head;
        let indexAtual = 0;
        while(indexAtual<index-1){
          noAtual = noAtual.next;
          indexAtual++;
        }//
        newNode.prev = noAtual;
        newNode.next = noAtual.next;
        noAtual.next = newNode;
        newNode.next.prev = newNode;
        this.length++;
        return true;
      }
//------------------------------------------------------------  
deleteFirst() {
      const removedData = this.head.data; // Salva o valor do elemento removido
      this.head = this.head.next;
      if (this.head !== null) {
        this.head.prev = null;
      }
      else
        this.tail = null;
      this.length--;  
      return removedData; // Retorna o valor do elemento removido
  }
//------------------------------------------------------------ 
deleteLast() {
  const removedData = this.tail.data; // Salva o valor do elemento removido
  this.tail = this.tail.prev;
  if (this.tail !== null) {
    this.tail.next = null;
  }
  else
    this.head = null;
  this.length--;  
  return removedData; // Retorna o valor do elemento removido
}
//------------------------------------------------------------
    isEmpty() {
        return this.head === null; 
      }

//------------------------------------------------------------
    forEach(callback) {
        let noAtual = this.head;
    
        while (noAtual !== null) {
          callback(noAtual.data);
          noAtual = noAtual.next;
        }
      }

  }// fim classe LinkedList
  
  