class Person {
    constructor(name){
        this.name = name
    }

    printNameArrow(){
        setTimeout( () =>{
            console.log( 'Arrow:' + this.name )
        }, 100 )
    }
    printNameStandardFunction(){
        setTimeout( function (){
            console.log( 'Arrow:' + this.name )
        }, 100 )
    }
}

let person = new Person('Bob')
person.printNameArrow()
person.printNameStandardFunction()
console.log( this.name )
/*
Result:
                    <------
Arrow: Bob             <------ gobal scope doesn't refined in arrow function
Standard Function:     <----- but refined in standard funciton 
*/