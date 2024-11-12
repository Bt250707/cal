let message:string

message = 'Hello World'

console.log(message)

function add(a:number, b:number):number {
    return a + b
}

console.log(add(1, 2));

interface employees{
    name:string,
    age:number|string,
}

const newbie:employees = {name:'John', age:25}

