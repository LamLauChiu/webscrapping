const aplhabot = ['A','B','C','D','E','F']
const numbers = ['1','2','3','4','5'.'6']



const a = aplhabot[0]
const b = aplhabot[1]
console.log(a)  // A
console.log(b)  // B


const [a, b] = aplhabot
console.log(a)  // A
console.log(b)  // B


const [a,,c] = aplhabot
console.log(a)  // A
console.log(c)  // C


const [a,,c, ...rest ] = aplhabot
console.log(a)  // A
console.log(c)  // C
console.log(rest) // [ 'D', 'E', 'F']


const newArray = [ ...aplhabot , ...numbers ]
console.log(newArray) // ['A','B','C','D','E','F', '1','2','3','4','5'.'6']

const newArray = aplhabot.concat(numbers)
console.log(newArray) // ['A','B','C','D','E','F', '1','2','3','4','5'.'6']