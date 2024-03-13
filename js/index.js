import Student from './models/Student.js'
import ListPerson from './models/ListPerson.js';
import { soNgayLamValidation, luongTheoNgayValidation, billValidation, companyValidation, typeValidation, emailValidation, nameValidation, idValidation, diemValidation, addressValidation } from "./validation.js";
import { renderTableHead, renderTableBody, renderStudentUI, renderCustomerUI, renderEmployeeUI } from "./renderUI.js";
import Employee from './models/Employee.js';
import Customer from './models/Customer.js';

let listPerson = new ListPerson;
if (getLocalStorage()) {
    listPerson.listPerson = getLocalStorage();
}
let student = new Student;
let employee = new Employee;
let customer = new Customer;

function renderModal() {
    let userType = document.querySelector('#modalUserType select').value;
    switch (userType) {
        case "student":
            renderStudentUI();
            break;
        case "customer": {
            renderCustomerUI();
            break;
        }
        default: "employee"
            renderEmployeeUI();
            break;
    }
}

function getInfo(userType, isUpdate=false) {
    let arrInfoEle = document.querySelectorAll('#userForm input, #userForm select');
    switch (userType) {
        case "student":
            arrInfoEle.forEach(ele => {
                student[ele.id] = ele.value;
            })
            let isValid = validation(student, isUpdate);
            // let isValid = true;
            if (isValid) {
                return { ...student }
            }
            break;

        case "customer": {
            arrInfoEle.forEach(ele => {
                customer[ele.id] = ele.value;
            })
            let isValid = validation(customer, isUpdate);
            // let isValid = true;
            if (isValid) {
                return { ...customer }
            }
            break;

        }
        case "employee": {
            arrInfoEle.forEach(ele => {
                employee[ele.id] = ele.value;
            })
            let isValid = validation(employee, isUpdate);
            // let isValid = true;
            if (isValid) {
                return { ...employee }
            }
            break;
        }
    }



}
function addUser() {
    let userType = document.querySelector('#modalUserType select').value;
    let user = getInfo(userType)
    if (user) {
        listPerson.addUser(user);
        setLocalStorage(listPerson.listPerson);
        let selectEle = document.querySelector('#tableUserType select');
        selectEle.value = 'default';
        selectEle.dispatchEvent(new Event('change'));
        clearForm();
    }
}




function setLocalStorage(arr = listPerson.listPerson) {
    localStorage.setItem("listPerson",
        JSON.stringify(arr)
    )
}
function getLocalStorage() {
    if (localStorage.getItem("listPerson") != null) {
        return JSON.parse(localStorage.getItem("listPerson"));
    }

}
function validation(user, isUpdate= false) {

    let arrEmail = listPerson.listPerson.map(person => {

        return person?.email;
    });

    let arrID = listPerson.listPerson.map(person => {
        return person?.id;
    });
    const { type, id, name, address, email, diemToan, diemHoa, diemLy, luongTheoNgay, soNgayLam, bill, company, feedback } = user;
    let idMessage = idValidation(id, arrID, isUpdate),
        emailMessage = emailValidation(email, arrEmail, isUpdate),
        addressMessage = addressValidation(address),
        nameMessage = nameValidation(name),
        typeMessage = typeValidation(type),
        diemToanMessage, diemLyMessage, diemHoaMessage, soNgayLamMessage, luongTheoNgayMessage, billMessage, companyMessage;
    let isValid = true;
    isValid &= Boolean(user);
    isValid &= !Boolean(typeMessage);
    isValid &= !Boolean(idMessage);
    isValid &= !Boolean(emailMessage);
    isValid &= !Boolean(nameMessage);
    isValid &= !Boolean(addressMessage);

    const arrEleRender = ['id', 'email', 'address', 'name', 'type', 'diemToan', 'diemHoa', 'diemLy', 'luongTheoNgay', 'bill', 'company', 'soNgayLam'];
    switch (type) {
        case "student":
            diemToanMessage = diemValidation(diemToan);
            diemHoaMessage = diemValidation(diemHoa);
            diemLyMessage = diemValidation(diemLy);
            isValid &= !Boolean(diemToanMessage);
            isValid &= !Boolean(diemHoaMessage);
            isValid &= !Boolean(diemLyMessage);
            break;
        case "customer": {
            companyMessage = companyValidation(company);
            billMessage = billValidation(bill);
            isValid &= !Boolean(billMessage);
            isValid &= !Boolean(companyMessage);

            break;
        }
        case "employee": {
            soNgayLamMessage = soNgayLamValidation(soNgayLam)
            luongTheoNgayMessage = luongTheoNgayValidation(luongTheoNgay);
            isValid &= !Boolean(soNgayLamMessage);
            isValid &= !Boolean(luongTheoNgayMessage);
            break;
        }
    }


    for (const key in user) {
        if (arrEleRender.includes(key)) {
            document.getElementById(`${key}Help`).innerHTML = eval(`${key}Message`)
        }
    }
    return isValid;
}
function deleteUser(id) {
    let index = listPerson.findUserIndex(id)
    listPerson.deleteUser(index);
    let selectEle = document.querySelector('#tableUserType select');
    selectEle.dispatchEvent(new Event('change'));
    setLocalStorage();
}
function updateUser(id, userType) {
    let index = listPerson.findUserIndex(id);
    let user = getInfo(userType);
    listPerson.updateUser(index, user);
    let selectEle = document.querySelector('#tableUserType select');
    selectEle.dispatchEvent(new Event('change'));
    setLocalStorage();
}
function showInfo(userId) {
    clearHelp();
    clearForm();
    console.log('Day la', userId);
    
    let index = listPerson.findUserIndex(userId);
    let user = listPerson.listPerson[index];
    document.getElementById('updateBtn').removeAttribute('disabled');
    document.getElementById('addUserBtn').setAttribute('disabled', true);
    let selectEle = document.querySelector('#modalUserType select');
    selectEle.value = user.type;
    selectEle.dispatchEvent(new Event('change'));
    const { id, name, type, address, email, diemToan, diemHoa, diemLy, soNgayLam, luongTheoNgay, company, bill, feedback } = user
    let arrInfoEle = document.querySelectorAll('#userForm input, #userForm select');
    arrInfoEle.forEach(ele => {
        if (ele.id == "id") {
            ele.setAttribute('disabled', true)
        }
        ele.value = user[ele.id]
    })

    document.querySelector('.btn-success').onclick = () => {
        updateUser(id, type);
        clearForm();
        document.getElementById('addUserBtn').removeAttribute('disabled');
        document.getElementById('updateBtn').setAttribute('disabled', true);
        document.getElementById('id').removeAttribute('disabled');
    }

}
function eventBtnAction() {

    document.querySelectorAll('.btn-danger[data-id]').forEach(btn => {
        btn.addEventListener('click', e => {
            let id = e.target.dataset.id;

            deleteUser(id)
            e.preventDefault();
        })
    })
    document.querySelectorAll('.btn-warning').forEach(btn => {
        btn.addEventListener('click', e => {
            let id = e.target.dataset.id;
            showInfo(id);
            e.preventDefault();
        })
    })
    document.querySelector("#modalUserType select").addEventListener('change', e => {
        let userType = e.target.value;

        switch (userType) {
            case "student":
                renderStudentUI()
                break;

            case "employee":
                renderEmployeeUI()
                break;

            case "customer":
                renderCustomerUI();
                break;
        }
    })
}
function clearForm() {
    document.getElementById('userForm').reset();
    document.querySelector('#modalUserType select').dispatchEvent(new Event('change'));
}
function clearHelp(){
    document.querySelectorAll('small').forEach(ele=>{
        ele.innerHTML = '';
    })
}
renderModal();
let type = document.querySelector('#tableUserType select').value;
renderTableHead(type);
renderTableBody(listPerson.listPerson, type)
document.getElementById("addUserBtn").onclick = addUser;

document.querySelector("#tableUserType select").addEventListener('change', (e) => {
    const type = e.target.value;
    renderTableHead(type);
    renderTableBody(listPerson.listPerson, type);
    eventBtnAction();
})
eventBtnAction();
