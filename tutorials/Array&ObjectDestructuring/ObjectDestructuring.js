const personOne = {
    name :'Kyle',
    age: 24,
    address:{ 
        city:'Somewhere',
        state:'One of them'
    }
}

const personTwo = {
    name :'Sally',
    age: 32,
    address:{ 
        city:'Somewhere else',
        state:'Another one of them'
    }
}

const { name , age } = personTwo
console.log(name)   // Sally
console.log(age)    // 32


// taking the name value and map it to FirstName
const { name: FirstName , age } = personTwo
console.log(FirstName)   // Sally
console.log(age)    // 32


const { name: FirstName , age, favoriteFood = 'Rice' } = personTwo
console.log(FirstName)   // Sally
console.log(age)    // 32
console.log(favoriteFood)    // Rice


const personTwo = {
    name :'Sally',
    age: 32,
    favoriteFood: 'Watermelon'
    address:{ 
        city:'Somewhere else',
        state:'Another one of them'
    }
}

const { name: FirstName , age, favoriteFood = 'Rice' } = personTwo
console.log(FirstName)   // Sally
console.log(age)    // 32
console.log(favoriteFood)    // Watermelon



const { name: FirstName , ...rest } = personTwo
console.log(rest)    /*
{
    age: 32,
    favoriteFood: 'Watermelon'
    address:{ 
        city:'Somewhere else',
        state:'Another one of them'
    }
}
*/



const { name: FirstName , address :{ city } } = personTwo
console.log(city)  // Somewhere else






const personOne = {
    name :'Kyle',
    age: 24,
    
}

const personTwo = {
    name :'Sally',
    age: 32,
    favoriteFood: 'Watermelon'
    address:{ 
        city:'Somewhere else',
        state:'Another one of them'
    }    
}


// personTwo will overwrite personOne values
const personThree = { ...personOne, ...personTwo}
console.log(personThree)

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