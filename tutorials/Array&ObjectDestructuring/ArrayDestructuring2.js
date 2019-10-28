function sumAndMultiply( a,b ){
    return [ a+b , a * b]
}

const [ sum, multiply ] = sumAndMultiply(2,3)
console.log(sum);   // 5
console.log(multiply); // 6


function sumAndMultiply( a,b ){
    return [ a+b , a * b]
}

const [ sum, multiply, division='No devision' ] = sumAndMultiply(2,3)
console.log(sum);   // 5
console.log(multiply); // 6
console.log(division) // No devision

function sumAndMultiply( a,b ){
    return [ a+b , a * b , a/b]
}

const [ sum, multiply, division='No devision' ] = sumAndMultiply(2,3)
console.log(sum);   // 5
console.log(multiply); // 6
console.log(division) // 0.666666666666