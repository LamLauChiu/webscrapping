const personOne = {
    name :'Sally',
    age: 32,
    favoriteFood: 'Watermelon'
    address:{ 
        city:'Somewhere else',
        state:'Another one of them'
    }    
}


function printUser(user){
    console.log(user)
}

printUser(personOne)
/*
{
    name :'Sally',
    age: 32,
    favoriteFood: 'Watermelon'
    address:{ 
        city:'Somewhere else',
        state:'Another one of them'
    }    
}
*/


function printUser(user){
    console.log(`Name is: ${user.name}. Age is ${user.age}`)
}

printUser(personOne)// Name is: Sally. Age is 32



function printUser( { name, age,  } ){
    console.log(`Name is: ${name}. Age is ${age}`)
}

printUser(personOne)// Name is: Sally. Age is 32



function printUser( { name, age, favoriteFood } ){
    console.log(`Name is: ${name}. Age is ${age}. Food is ${favoriteFood}`)
}

printUser(personOne)// Name is: Sally. Age is 32. Food is Watermelon


const personOne = {
    name :'Sally',
    age: 32,
    favoriteFood: 'Rice'
    address:{ 
        city:'Somewhere else',
        state:'Another one of them'
    }    
}

function printUser( { name, age, favoriteFood } ){
    console.log(`Name is: ${name}. Age is ${age}. Food is ${favoriteFood}`)
}

printUser(personOne)// Name is: Sally. Age is 32. Food is Rice
