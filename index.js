let tableMark = document.getElementById('table');
let formMark = document.getElementById('formMark');
formMark.innerHTML = renderForm(null);

let database = new ClassMarkStoge();

let lstClassMark =  database.getAll();
renderTable(lstClassMark)

function formSubmit() {
    let nameInput = document.getElementById('name');
    let mathScoresInput = document.getElementById('mark1');
    let chemistryScoresInput = document.getElementById('mark2');
    let physicsScoresInput = document.getElementById('mark3');

    getFormData(nameInput, mathScoresInput, chemistryScoresInput, physicsScoresInput);
}
function formEditSubmit(index) {
    let nameInput = document.getElementById('name');
    let mathScoresInput = document.getElementById('mark1');
    let chemistryScoresInput = document.getElementById('mark2');
    let physicsScoresInput = document.getElementById('mark3');

    editFormData(index, nameInput, mathScoresInput, chemistryScoresInput, physicsScoresInput);
}

function getFormData(nameInput, mathScoresInput, chemistryScoresInput, physicsScoresInput) {
    let classMark = new ClassMark();
    classMark.Name = nameInput.value;
    classMark.MathScores = mathScoresInput.value;
    classMark.PhysicsScores = physicsScoresInput.value;
    classMark.ChemistryScores = chemistryScoresInput.value;
    lstClassMark.push(classMark);

    database.save(lstClassMark);

    renderTable(lstClassMark)
    formMark.innerHTML = renderForm(null)
}
function editFormData(index, nameInput, mathScoresInput, chemistryScoresInput, physicsScoresInput) {
    let classMark = new ClassMark();
    classMark.Name = nameInput.value;
    classMark.MathScores = mathScoresInput.value;
    classMark.PhysicsScores = physicsScoresInput.value;
    classMark.ChemistryScores = chemistryScoresInput.value;

    lstClassMark[index] = classMark;

    database.save(lstClassMark);

    renderTable(lstClassMark)
    formMark.innerHTML = renderForm(null)
}


function tinhDiemTB() {
    console.log(lstClassMark)
    lstClassMark.map(v=>{
        v.calcAvgScores();
    })
    database.save(lstClassMark);
    renderTable(lstClassMark)
}
function xacDinhHocSinhGioi() {
    lstClassMark.map(v=>{
        v.calcAvgScores();
        v.setGoodRank();
    })
    database.save(lstClassMark);
    renderTable(lstClassMark)
}
function renderTable(lstClassMark) {
    addRecord(lstClassMark);
}
function addRecord(_lstClassMark) {
    let tbody = document.getElementById('tbody');
    tbody.innerHTML = '';
    _lstClassMark.map((classMark, index) => {
        tbody.appendChild(renderRecord(classMark, index));
    })
}

function handlerEditEvent(index) {
    lstClassMark[index].Id = index;
    formMark.innerHTML = renderForm({...lstClassMark[index]})
}
function handlerDeleteEvent(index) {
    lstClassMark.splice(index, 1);
    database.save(lstClassMark);
    renderTable(lstClassMark)
}