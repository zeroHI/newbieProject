console.log('start');

$('#myTab').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

axios.get('/api/pad')
.then((res) => {
  console.log(res.data);
  res.data.forEach((e) => {
    addElement(e.tableNum, e.menu);
  });
})
.catch((err) => {
  alert('DB error');
});

function submitForm() {
  const tableNum = document.getElementById('tableNum').value;
  const chks = document.getElementsByName('menu');
  const menu = new Array();

  for (let i = 0; i < chks.length; i++) {
    if (chks[i].checked)
      menu.push(chks[i].value);
  }
  
  axios.post('/api/pad', {tableNum: tableNum, menu: menu})
  .then((res) => {
    addElement(tableNum, menu);
    document.getElementById('form').reset();
  })
  .catch((err) => {
    alert('DB error');
  })
}

function addElement(tableNum, menu) {
  const newdiv = document.createElement('div');
  newdiv.className = 'card';
  newdiv.innerHTML=`
    <div class="card-body">
      <div class="left">
        <h5 class="card-title">#Table: ${tableNum}</h5>
        <table class="table">
        <thead>
          <tr>
            <th style="width: 70%">Ordered</th>
            <th style="width: 30%; text-align: center">quantity</th>
          </tr>
        </thead>
        <tbody class="${tableNum}order">
        </tbody>
        </table>
      </div>
      <div class="right">
        <label>결제 완료<input type="checkbox" class="form-control counter"/></label>
        <label>서빙 완료<input type="checkbox" class="form-control counter"/></lable>
      </div>
    </div>
  `;
  document.getElementById('card-container').prepend(newdiv);

  if (menu != undefined) {

    addMenuList = function(n, callback) {   
      if (n < 0) {
        callback();
      }
      else {
        console.log("start : " + tableNum + " / " + menu);
        let tr = document.createElement('tr');
        let th_menu = document.createElement('th');
        let th_quantity = document.createElement('th');
        th_menu.innerHTML = menu[n];
        th_quantity.className = 'quantity';
        th_quantity.innerHTML = 1;
        tr.append(th_menu);
        tr.append(th_quantity);
        document.getElementsByClassName(`${tableNum}order`)[0].append(tr);

        addMenuList(n-1, callback);
      }
     
    }
    
    addMenuList(menu.length - 1, function() {
      // console.log(newdiv.innerHTML);
      // console.log('done');
    });
  }
}