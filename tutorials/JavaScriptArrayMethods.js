8 Must Know JavaScript Array Methods


const items = [
	{ name: ‘A’, price: 80 },
	{ name: ‘B, price: 90 },
	{ name: ‘C’, price: 100 },
]

Filter:
const filterredItems = items.filter( ( item ) => { 
	return item.price <= 100
})
console.log( items )
console.log( filterredItems )
// return the array list which match with condition only

Map:
const itemNames = items.map( ( item) => {
	return item.name
})
// return the array list with name only


Foreach:

items.forEach( ( item) => {
	console.log( item.name )
})
// return all the name one by one


Find:
const itemNames = items.find( ( item) => {
	return item.name === ‘A’
})
// return the array list with name array only


Some:

const hasexpensiveItems =  items.some( ( item) => {
	return item.price <= 100
})
console.log(hasexpensiveItems)
// return true  / false

Every:
const hasexpensiveItems =  items.every( ( item) => {
	return item.price <= 100
})
// return true 

Reduce:
const total =  items.reduce( ( currentTotal, item) => {
	return item.price +  currentTotal
}, 0 )
console.log(total)
// return the sum of the price of all items

Includes:

const  items = [ 1, 2, 3, 4, 5 ]
const includesWith = items.include(7)
console.log(includesWith)
// return false
