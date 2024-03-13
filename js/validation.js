 const isEmptyValue = (value)=>{
    return !Boolean(value);
    
 }
 const isUniqueEmail = (email, arrEmail) => { 
    return !arrEmail.includes(email);
}
 const isEmailFormat = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    return regex.test(email);
}
const isUniqueID = (id, arrID)=>{
    return !arrID.includes(id);
}
const isNumberFormat = (number)=>{
    return !isNaN(number);
}
const isNumberInRange = (value, max, min)=>{
    return value >= min && value <= max;
}
export const emailValidation = (email, arrEmail, isUpdate)=>{
    let message = '';
    
    if (!isEmailFormat(email)) {

        message+='Sai định dạng email, ';
    }
    if (!isUniqueEmail(email, arrEmail)&& !isUpdate){        
        message+= 'Email đã được sử dụng';
    }
    return message;
}
export const idValidation = (id, arrID, isUpdate)=>{
    let message = '';
    if (isEmptyValue(id)) {
        message+=`Không được bỏ trống trường này, `
    } 
    if (!isUniqueID(id, arrID) && !isUpdate) {
        message+='ID đã được sử dụng'
    }
    return message;
}
export const diemValidation = (diem)=>{
    let message = '';
    if (isEmptyValue(diem)) {
        
        message+=`Không bỏ trống trường này, `
    }
    if (!isNumberFormat(diem)) {
        message+='Nhập sai định dạng, ';
    }
    if (!isNumberInRange(diem, 10, 0)) {
        message+= "Nhập điểm trong khoảng từ 0-10"
    }
    
    return message;
}
export const nameValidation = (name)=>{
    
    let message = ''
    if (isEmptyValue(name)) {
        message+=`Không bỏ trống trường này, `
    }
    return message
}
export const addressValidation = (address)=>{
    let message = ''
    if (isEmptyValue(address)) {
        message+=`Không bỏ trống trường này, `
    }
    return message
}
export const typeValidation = (type)=>{
    let message = '';
    if (isEmptyValue(type)) {
        message+=`Không bỏ trống trường này, `
    }
    return message
}

export const companyValidation = company=>{
    let message = '';
    if(isEmptyValue(company)){
        message += 'Không bỏ trống phần này, '
    };
    return message;
}
export const billValidation = bill=>{
    let message = '';
    if(!isNumberInRange(bill, 1000000000000, 0)){
        message += 'Nhập bill từ 0 trở lên, '
    };
    if (!isNumberFormat(bill)) {
        message+='Nhập sai định dạng' 
    }
    return message;
}
export const soNgayLamValidation  = soNgayLam=>{
    let message = '';
    if (isEmptyValue(soNgayLam)) {
        message += 'Không bỏ trống phần này'
    }
    if(!isNumberInRange(soNgayLam, 10000, 0)){
        message += 'Số ngày phải từ 0 trở lên, '
    };
    if(!isNumberFormat(soNgayLam)){
        message += `Nhập sai định dạng` 
    }
    return message;
}
export const luongTheoNgayValidation  = luongTheoNgay=>{
    let message = '';
    if (isEmptyValue(luongTheoNgay)) {
        message += 'Không bỏ trống phần này, '
    }
    if(!isNumberInRange(luongTheoNgay, 100000000, 10000)){
        message+= 'Nhập lương theo ngày hợp lệ từ 10k trở lên, '
    };
    if (!isNumberFormat(luongTheoNgay)) {
       message+=   `Nhập sai định dạng` 
    }
    return message;
}
