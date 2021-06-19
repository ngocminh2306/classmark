let tableMark = document.getElementById('table');
let formMark = document.getElementById('formMark');

//Render Form rỗng mặc định
formMark.innerHTML = renderForm(null);

let database = new ClassMarkStoge();
//Load data từ localstoge
let lstClassMark =  database.getAll();
//render ttable
renderTable(lstClassMark)

function formSubmit() {
    let nameInput = document.getElementById('name');
    let mathScoresInput = document.getElementById('mark1');
    let chemistryScoresInput = document.getElementById('mark2');
    let physicsScoresInput = document.getElementById('mark3');
    //Thực hiện lưu lại data đẫ thêm
    getFormData(nameInput, mathScoresInput, chemistryScoresInput, physicsScoresInput);
}
//render form khi ấn nút SỬA
function formEditSubmit(index) {
    let nameInput = document.getElementById('name');
    let mathScoresInput = document.getElementById('mark1');
    let chemistryScoresInput = document.getElementById('mark2');
    let physicsScoresInput = document.getElementById('mark3');
    //Thực hiện lưu lại data đẫ sửa
    editFormData(index, nameInput, mathScoresInput, chemistryScoresInput, physicsScoresInput);
}
//Xử lý khi click tính điểm trung bình
function tinhDiemTB() {
    console.log(lstClassMark)
    lstClassMark.map(v=>{
        v.calcAvgScores();
    })
    database.save(lstClassMark);
    renderTable(lstClassMark)
}
//Xử lý khi click xác định học sinh giỏi
function xacDinhHocSinhGioi() {
    lstClassMark.map(v=>{
        v.calcAvgScores();
        v.setGoodRank();
    })
    database.save(lstClassMark);
    renderTable(lstClassMark)
}
//Action sửa 1 dòng
function handlerEditEvent(index) {
    //Render Form khi chọn sửa dòng
    lstClassMark[index].Id = index;
    formMark.innerHTML = renderForm({...lstClassMark[index]})
}
//Action xóa 1 dòng
function handlerDeleteEvent(index) {
    lstClassMark.splice(index, 1);
    database.save(lstClassMark);
    renderTable(lstClassMark)
}