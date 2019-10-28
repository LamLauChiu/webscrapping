
// import User from '/user.js'  // <---- absolute path
// import User from './user.js'  // <---- relative path

// const user = new User('Bob', 11);
// console.log(user)



import U,{ printName as printUserName, printAge } from './user.js'  // <---- relative path

const user = new U('Bob', 11)
console.log(user)
printUserName(user)
printAge(user)