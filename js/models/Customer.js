import Person from "./Person.js";
export default class Customer extends Person{
    company = '';
    bill = '';
    feedback = '';
    constructor(){
        super();
        this.type = 'customer'
    }
}