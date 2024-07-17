class Node{
  constructor(key, value){
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class LinkedList{
  constructor(){
    this.head = null;
    this.size = 0;
  }

  add(key, value) {
    if (this.head === null) {
      this.head = new Node(key, value);
      this.size++;
      return;
    }

    let current = this.head;
    while (current !== null) {
      if (current.key === key) {
        current.value = value; 
        return;
      }
      if (current.next === null) {
        break;
      }
      current = current.next;
    }

    current.next = new Node(key, value);
    this.size++;
  }

  get(key) {
    let current = this.head;
    while (current !== null) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }

    return null; 
  }

  
  remove(key) {
    if (this.head === null) {
      return false;
    }

    if (this.head.key === key) {
      this.head = this.head.next;
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next !== null) {
      if (current.next.key === key) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }

    return false;
  }
}
class HashMap{
  constructor(bucketSize){
    this.bucketSize = bucketSize;
    this.buckets = new Array(bucketSize).map(() => new LinkedList());
  }

  hash(key) {
      let hashCode = 0;
           
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i))%this.bucketSize;
      }
     
      return hashCode;
    } 

  set(key,value){
    const index = this.hash(key);
    this.buckets[index].add(key, value);
  }

  get(key) {
    const index = this.hash(key);
    return this.buckets[index].get(key);
  }

  has(key){
    const index = this.hash(key);
    let current = this.buckets[index].head;

    while (current !== null) {
      if (current.key === key) {
        return true;
      }
      current = current.next;
    }

    return false;
  }

  remove(key){
    const index = this.hash(key);
    this.buckets[index].remove(key);
    
  }

  length(){
    let count = 0;
    for(let i = 0; i<this.bucketSize; i++){
      count += this.buckets[i].size;
    }
    return count;
  }

  clear(){
    this.buckets = new Array(this.bucketSize).map(() => new LinkedList());
  }
}