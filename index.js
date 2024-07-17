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

  getKeys(){
    let arrKeys = []
    if (this.head === null) {
      return null;
    }
    else{
      let temp = this.head;
      while(temp!=null){
        arrKeys.push(temp.key);
        temp = temp.next;
      }
    }
    return arrKeys;
  }

  getValues(){
    let arrValues = []
    if (this.head === null) {
      return null;
    }
    else{
      let temp = this.head;
      while(temp!=null){
        arrValues.push(temp.value);
        temp = temp.next;
      }
    }
    return arrValues;
  }

  getAll(){
    let arrValues = []
    if (this.head === null) {
      return null;
    }
    else{
      let temp = this.head;
      while(temp!=null){
        arrValues.push([temp.key, temp.value]);
        temp = temp.next;
      }
    }
    return arrValues;
  }
}
class HashMap{
  constructor(initialCapacity, loadFactor){
    this.capacity = initialCapacity; 
    this.loadFactor = loadFactor;  
    this.buckets = new Array(initialCapacity).fill().map(() => new LinkedList());
    this.size = 0;                  
    this.threshold = Math.floor(initialCapacity * loadFactor); 
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    let current = bucket.head;
    while (current !== null) {
      if (current.key === key) {
        current.value = value;
        return;
      }
      current = current.next;
    }

    bucket.add(key, value);
    this.size++;

    if (this.size > this.threshold) {
      this.resize();
    }
  }

  resize() {
    const newCapacity = this.capacity * 2;
    const newBuckets = new Array(newCapacity).fill().map(() => new LinkedList());

    for (let i = 0; i < this.capacity; i++) {
      const bucket = this.buckets[i];
      let current = bucket.head;
      while (current !== null) {
        const newIndex = this.hash(current.key) % newCapacity;
        newBuckets[newIndex].add(current.key, current.value);
        current = current.next;
      }
    }

    this.capacity = newCapacity;
    this.buckets = newBuckets;

    this.threshold = Math.floor(this.capacity * this.loadFactor);
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

  remove(key) {
    const index = this.hash(key);
    const removed = this.buckets[index].remove(key);

    if (removed) {
      this.size--;

      if (this.capacity > 1 && this.size < this.threshold / 4) {
        this.resize();
      }
    }

    return removed; 
  }

  length(){
    return this.size;
  }

  clear(){
    this.buckets = new Array(this.capacity).fill().map(() => new LinkedList());
    this.size = 0;
  }

  keys(){
    let arrAllKeys = []
    for(let i = 0; i< this.capacity; i++){
      let responseKey = this.buckets[i].getKeys();
      if( responseKey!= false){
        arrAllKeys = arrAllKeys.concat(responseKey);;
      }
    }
    return arrAllKeys;
  }

  values(){
    let arrAllValues = []
    for(let i = 0; i< this.capacity; i++){
      let responseValue = this.buckets[i].getValues();
      if( responseValue!= false){
        arrAllValues = arrAllValues.concat(responseValue);;
      }
    }
    return arrAllValues;
  }

  entries(){
    let arrAllKeysAndValues = []
    for(let i = 0; i< this.capacity; i++){
      let responseAll = this.buckets[i].getAll();
      if( responseAll!= false){
        arrAllKeysAndValues = arrAllKeysAndValues.concat(responseAll);;
      }
    }
    return arrAllKeysAndValues;
  }

}

const test = new HashMap(16, 0.75); 

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')