const userLeft = false
const userWatchingCatName = false

function watchTutorialsCallback( callback, errorCallback ){
    if( userLeft ){
        errorCallback({
            name:'User Left',
            message: ':C'
        })
    }else if( userWatchingCatName ){
        errorCallback({
            name: 'User Watching Cat Name',
            message: 'WebDevSimplified < Cat'
        })
    }else{
        callback('Thumbs up and Subscibe')
    }
}

watchTutorialsCallback( (message ) => {
    console.log( 'Success: ' + message )
},( error ) => {
    console.log( error.name + ' ' + error.message )
})