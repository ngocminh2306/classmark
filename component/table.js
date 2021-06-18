
 function renderTable(tableTaget) {
    let tableMark = document.getElementById(tableTaget);
    tableMark.innerHTML = getTableTemplate(lstClassMark);
}
function renderRecord(classMark, i) {
    let html = `<tr>
    <td>${i + 1}</td>
    <td>${classMark.Name}</td>
    <td>${classMark.MathScores}</td>
    <td>${classMark.PhysicsScores}</td>
    <td>${classMark.PhysicsScores}</td>
    <td>${classMark.calcAvgScores()}</td>
    <td>
    <button type="button" id='btnDelete'>Xóa</button>
    <button type="button" id='btnEdit'>Sửa</button>
    </td>
</tr>
`;
    return html;
}
function getTableTemplate(_lstClassMark) {
    let records = _lstClassMark.map((classMark, index) => {
        return renderRecord(classMark, index);
    })
    return `<table style="margin-top: 0.75rem;">
    <tr>
        <th>STT</th>
        <th>Họ tên</th>
        <th>Toán</th>
        <th>Lý</th>
        <th>Hóa</th>
        <th>Trung bình</th>
        <th>Thao tác</th>
    </tr>
    ${records}
</table>`
}