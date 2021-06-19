


renderForm(null);

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
    classMark.Id = lstClassMark.length> 0 ?lstClassMark.length - 1: 0;
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
function renderForm(initData) {
    let html =` <form action='#' id="myform" onsubmit="${initData?`formEditSubmit(${initData.Id})`:'formSubmit()'}; return false">
        <div class="my-form-group">
            <label>Họ tên: </label>
            <input class="myInput" required type="text" value='${initData?initData.Name:''}' id="name" />
        </div>
        <div class="my-form-group">
            <label>Điểm toán: </label>
            <input class="myInput" required type="number" value=${initData?initData.MathScores:null}  id="mark1" />
        </div>
        <div class="my-form-group">
            <label>Điểm lý: </label>
            <input class="myInput" required type="number" value=${initData?initData.PhysicsScores:null} id="mark2" />
        </div>
        <div class="my-form-group">
            <label>Điểm hóa: </label>
            <input class="myInput" required type="number" value=${initData?initData.ChemistryScores:null} id="mark3" />
        </div>
        <div>
            <button type="submit">${initData?'Lưu lại':'Nhập'}</button>
        </div>
    </form>`
    return html;
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
function renderRecord(classMark, i) {
    let calcAvgScores = '?';
    if(classMark.AvgScores) {
        calcAvgScores = classMark.AvgScores;
    }
    let row = document.createElement('tr');
    if(classMark.GoodRank) {
        row.style = 'color: red';
    }
    let td_index = document.createElement('td');
    td_index.innerText= i + 1;
    row.appendChild(td_index);

    let td_Name = document.createElement('td');
    td_Name.innerText= classMark.Name;
    row.appendChild(td_Name);

    let td_MathScores = document.createElement('td');
    td_MathScores.innerText= classMark.MathScores;
    row.appendChild(td_MathScores);

    let td_chemistryScores = document.createElement('td');
    td_chemistryScores.innerText= classMark.ChemistryScores;
    row.appendChild(td_chemistryScores);
    
    let td_PhysicsScores = document.createElement('td');
    td_PhysicsScores.innerText= classMark.PhysicsScores;
    row.appendChild(td_PhysicsScores);

    let td_calcAvgScores = document.createElement('td');
    td_calcAvgScores.innerText= calcAvgScores;
    row.appendChild(td_calcAvgScores);

    let td_action = document.createElement('td');
    let btnDelete = document.createElement('button');
    btnDelete.innerText = "Xóa"
    btnDelete.onclick = (i, (e)=> {
        handlerDeleteEvent(i)
    });

    let btnEdit = document.createElement('button');
    btnEdit.innerText = "Sửa";
    btnEdit.onclick = (i,(e)=> {
        handlerEditEvent(i)
    });

    td_action.appendChild(btnDelete);
    td_action.appendChild(btnEdit);
    row.appendChild(td_action);
    return row;
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