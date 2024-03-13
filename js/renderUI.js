import Student from "./models/Student.js";
import Customer from "./models/Customer.js";
import Employee from "./models/Employee.js";
import Person from "./models/Person.js";
export function renderTableBody(arrUser, userType) {
    let content = ``;
    let student = new Student(),
        person = new Person(),
        customer = new Customer(),
        employee = new Employee();
    switch (userType) {
        case "student":
            arrUser.forEach((userObj) => {
                Object.assign(student, userObj);
                const { id, name, email, address, diemToan, diemHoa, diemLy, type } = {
                    ...student,
                };
                if (type != userType) { return }
                content += `
        <tr class="">
            <td scope="row">${id}</td>
            <td>${type}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>${address}</td>
            <td>${diemToan}</td>
            <td>${diemHoa}</td>
            <td>${diemLy}</td>
            <td>${student.tinhDiemTB()}</td>
            <td class="d-flex"><button class="btn btn-danger me-3" data-id=${id}>Xoá</button><button data-bs-toggle="modal" data-bs-target="#modalId" data-id=${id} class="btn btn-warning">Cập nhật </button></td>
        </tr>
   `;
                
            });

            break;
        case "customer": {
            arrUser.forEach((userObj) => {
                Object.assign(customer, userObj);
                const { id, name, email, address, type, company, bill, feedback } = {
                    ...customer,
                };

                if (type != userType) { return }
                content += `
            <tr class="">
                <td scope="row">${id}</td>
                <td>${type}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${address}</td>
                <td>${company}</td>
                <td>${bill}</td>
                <td>${feedback}</td>
                <td class="d-flex"><button class="btn btn-danger me-3" data-id=${id}>Xoá</button><button data-id="${id}" data-bs-toggle="modal" data-bs-target="#modalId" class="btn btn-warning">Cập nhật </button></td>
            </tr>
       `;
            });
            break;
        }
        case "employee": {
            arrUser.forEach((userObj) => {
                Object.assign(employee, userObj);
                const { id, type, name, email, address, soNgayLam, luongTheoNgay} = {
                    ...employee,
                };
                if (type != userType) { return }
                content += `
            <tr class="">
                <td scope="row">${id}</td>
                <td>${type}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${address}</td>
                <td>${soNgayLam}</td>
                <td>${luongTheoNgay}</td>
                <td>${employee.tinhLuong()}</td>
                <td class="d-flex"><button class="btn btn-danger me-3" data-id=${id}>Xoá</button><button data-id="${id}" data-bs-toggle="modal" data-bs-target="#modalId" class="btn btn-warning">Cập nhật </button></td>
            </tr>
       `;
            });
            break;
        }
        default:{
            arrUser.forEach((userObj) => {
                Object.assign(person, userObj);
                const { id, type, name, email, address } = {
                    ...person,
                };

                content += `
            <tr class="">
                <td scope="row">${id}</td>
                <td>${type}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${address}</td>
                <td class="d-flex"><button class="btn btn-danger me-3" data-id=${id}>Xoá</button><button data-id="${id}" data-bs-toggle="modal" data-bs-target="#modalId" class="btn btn-warning">Cập nhật </button></td>
            </tr>
       `;
            });
            break; 
        }
    }

    document.getElementById("tableBody").innerHTML = content;
}
export function renderTableHead(type) {
    let content = `
    <th scope="col">id </th>
    <th scope = 'col'>loại</th>
    <th scope="col">tên</th>
    <th scope="col">email</th>
    <th scope="col">địa chỉ</th>
    
    `;
    switch (type) {
        case "student":
            content += `
                <th scope="col">điểm toán </th>
                <th scope="col">điểm hoá</th>
                <th scope="col">điểm lý</th>
                <th scope="col">điểm trung bình</th>
                <th scope="col">chức năng</th>
            `;
            break;

        case "customer":
            content += `
            <th scope="col">tên công ty</th>
            <th scope="col">hoá đơn</th>
            <th scope="col">phản hồi</th>
            <th scope="col">chức năng</th>
           `;
            break;
        case "employee":
            content += `
            <th scope="col">số ngày làm</th>
            <th scope="col">lương theo ngày</th>
            <th scope="col">tổng lương</th>
            <th scope="col">chức năng</th>
           `;
            break;
        default:{
            content+= `
                <th scope="col">Chức năng</th>
            `
        }
    }
    document.querySelector("#tableHead tr").innerHTML = content;
}

export function renderStudentUI() {
    const diemObjArr = [
        { type: "diemLy", text: "Điểm lý" },
        { type: "diemToan", text: "Điểm toán" },
        { type: "diemHoa", text: "Điểm hoá" },
    ];

    let content = "";
    diemObjArr.forEach((diem) => {
        const { type, text } = diem;
        content += `
        <div class="mb-3">
        <label for="${type}" class="form-label">${text}</label>
        <input
            type="text"
            name="${type}"
            id="${type}"
            class="form-control"
            placeholder="Nhập ${text}"
            aria-describedby="${type}Help"
        />
        <small id="${type}Help" class="text-danger"></small>
    </div>
        `;
    });
    document.querySelector('.user-wrapper').innerHTML = content;

}
export function renderCustomerUI(clone = true) {
    const customerObjArr = [
        { type: "company", text: "Tên công ty" },
        { type: "bill", text: "Hoá đơn" },
        { type: "feedback", text: "Phản hồi", input: "textarea" },
    ];

    let content = "";
    customerObjArr.forEach((obj) => {
        const { type, text, input } = obj;
        if (input == "textarea") {
            content += `
            <div class="mb-3">
            <label for="${type}" class="form-label">${text}</label>
            <textarea class="form-control" name="${type}" id="${type}" placeholder="Nhập ${type}" rows="3"></textarea>
        </div>
        
            `

        }
        else {
            content += `
            <div class="mb-3">
            <label for="${type}" class="form-label">${text}</label>
            <input
                type="text"
                name="${type}"
                id="${type}"
                class="form-control"
                placeholder="Nhập ${text}"
                aria-describedby="${type}Help"
            />
            <small id="${type}Help" class="text-danger"></small>
        </div>
            `;
        }

    });
    document.querySelector('.user-wrapper').innerHTML = content;

}
export function renderEmployeeUI() {
    const employeeObjArr = [
        { type: "luongTheoNgay", text: "Lương theo ngày" },
        { type: "soNgayLam", text: "Số ngày làm" },
    ];

    let content = "";
    employeeObjArr.forEach((obj) => {
        const { type, text } = obj;
        content += `
            <div class="mb-3">
            <label for="${type}" class="form-label">${text}</label>
            <input
                type="text"
                name="${type}"
                id="${type}"
                class="form-control"
                placeholder="Nhập ${text}"
                aria-describedby="${type}Help"
            />
            <small id="${type}Help" class="text-danger"></small>
        </div>
            `;

    });
    let employeeUI = document.querySelector("#userForm");
    employeeUI.querySelector('.user-wrapper').innerHTML = content;

}
