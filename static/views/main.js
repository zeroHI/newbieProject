console.log('start');

axios.get('/api/pad')
.then((res) => {
  console.log(res.data);
  res.data.forEach((e) => {
    addElement(e.tableNum);
  });
})
.catch((err) => {
  alert('DB error');
});

function submitForm() {
  const tableNum = document.getElementById('tableNum').value;
  axios.post('/api/pad', {tableNum: tableNum})
  .then((res) => {
    addElement(tableNum);
    document.getElementById('form').reset();
  })
  .catch((err) => {
    alert('DB error');
  })
}

function addElement(tableNum) {
  const newdiv = document.createElement('div');
  newdiv.className = 'card';
  newdiv.innerHTML=`
    <div class="card-body">
      <h5 class="pad-title">Table number</h5>
      <p class="card-text">${tableNum}</p>
      <ul id="checkboxes">
        <li style="text-align: right"><label>결제 완료<input type="checkbox" class="form-control counter"/></li>
        <li style="text-align: right"><label>서빙 완료<input type="checkbox" class="form-control counter"/></li>
      <ul>
    </div>
  `;
  document.getElementById('card-container').prepend(newdiv);
}