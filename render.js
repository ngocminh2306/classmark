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