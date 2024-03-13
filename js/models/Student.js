import Person from './Person.js'
export default class Student extends Person{
    constructor(){
        super();
        this.type = 'student';
    }
    diemToan = '';
    diemLy = '';
    diemHoa = '';
    tinhDiemTB() {
        return (this.diemToan*1+this.diemHoa*1+this.diemLy*1)/3;
    }
}