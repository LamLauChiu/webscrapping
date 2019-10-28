const userLeft = false
const userWatchingCatName = false

function watchTutorialsCallback(){
    return new Promise( ( resolve, reject ) => {
        if( userLeft ){
            reject({
                name:'User Left',
                message: ':C'
            })
        }else if( userWatchingCatName ){
            reject({
                name: 'User Watching Cat Name',
                message: 'WebDevSimplified < Cat'
            })
        }else{
            resolve('Thumbs up and Subscibe')
        }
    })
}

watchTutorialsPromise.then( (message ) => {
    console.log( 'Success: ' + message )
}).catch( error ) => {
    console.log( error.name + ' ' + error.message )
})

////  Call back Hell

watchTutorialsPromise.then( (message ) => {
    console.log( 'Success: ' + message )
}).then( (message ) => {
    console.log( 'Success: ' + message )
}).catch( error ) => {
    console.log( error.name + ' ' + error.message )
})
