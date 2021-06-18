function renderForm(initData) {
    let formMark = document.getElementById('formMark');
    let html =` <form action='#' id="myform" onsubmit="formSubmit(); return false">
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
            <button type="submit">Nhập</button>
        </div>
    </form>`
    formMark.innerHTML = html;
}