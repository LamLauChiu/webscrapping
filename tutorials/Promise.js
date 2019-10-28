let p = new Promise( ( resolve,  reject ) => {
    let a = 1 + 2
    if( a == 2 ){
        resolve('success')
    }else{
        reject('Failed')
    }
})


p.then( (message) => {
    console.log( 'This is in the then ' + message )
}).catch( ( message ) => {
    console.log( 'This is in the catch ' + message )
})