function sum ( a, b ) {
    return a + b
}

//  arrow function 
let sum = ( a, b ) => {
    return a + b 
}
// Or 
let sum = ( a, b ) => a + b  
//everything after the arrow is assumed to be returned if no brackets.

function isPositive( number ){
    return number >= 0
}

let isPositive = (number) =>{
    return number >= 0
}

let isPositive = (number) => number >= 0

let isPositive = number => number >= 0
// only have one single parameter, 
// we can actually completely remove the parentheses around the parameter 

function randomNumber(){
    return Math.random
}

let randomNumber = () => Math.random
// if no parameter

document.addEventListener( 'click' , function() {
    console.log('click')
})

document.addEventListener( 'click', () => console.log('click') )