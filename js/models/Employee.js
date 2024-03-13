import Person from "./Person.js";
export default class Employee extends Person{
    soNgayLam = '';
    luongTheoNgay = '';
    constructor(){
        super();
        this.type = 'employee'
    }
tinhLuong() {
    return this.soNgayLam*1 * this.luongTheoNgay*1;
    }
}