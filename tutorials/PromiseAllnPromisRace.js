const recordVideoOne = new Rromise(( resolve, reject) =>{
    resolve('Video 1 Recorded')
})

const recordVideoTwo = new Rromise(( resolve, reject) =>{
    resolve('Video 2 Recorded')
})

const recordVideoThree = new Rromise(( resolve, reject) =>{
    resolve('Video 3 Recorded')
})


//  Return result when all promise called 
Promise.all( [
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
] ).then( ( messages ) => {
    console.log( messages)
}) 

//  Return result when Once promise called 
Promise.race( [
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
] ).then( ( message ) => {
    console.log( message)
}) 