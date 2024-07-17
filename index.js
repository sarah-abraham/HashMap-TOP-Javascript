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
  }

  add(key, value) {
    if (this.head === null) {
      this.head = new Node(key, value);
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
}
class HashMap{
  constructor(bucketSize){
    this.bucketSize = bucketSize;
    this.buckets = new Array(bucketSize).fill(null).map(() => new LinkedList());
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
}