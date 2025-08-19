//primitive data types
//7 types: 
//1. string
//2. number
//3. boolean
//4. null
//5. undefined
//6. symbol
//7. bigint 

const k =10;
const scoreValue = 100.4;
const outsideTemp = null;
let userEmail;

const id = Symbol('id');
const anotherId = Symbol('id');
console.log(id === anotherId);

let box = {
  name : 'box1',
  age : 5,
  isOpen : true,
}
for (let i = 0; i < Object.keys(box).length; i++) {
  const key = Object.keys(box)[i];
  const value = box[key];
  console.log(key, value);
}



//reference (non primitive)

//Array, Object, Function