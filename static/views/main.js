console.log('start');

/* constants for toBeServed */
let SamgyeopsalTBS = 0;
let BuchujeonTBS = 0;
let KimchijeonTBS = 0;
let SpamKimchiTBS = 0;
let RedRamyeonTBS = 0;
let WhiteRamyeonTBS = 0;
let SotteoksotteokTBS = 0;
let RiceballsTBS = 0;

axios.get('/api/pad')
.then((res) => {
  console.log(res.data);
  res.data.forEach((e) => {
    addElement(e.tableNum, e.menu);
    addGogi(e.tableNum, e.menu);
    addYori(e.tableNum, e.menu);
    updateTBS(e.menu);
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
  console.log("tableNum: " + tableNum);
  if (tableNum === undefined || tableNum === "") {
    alert("You should input table number.")
  }
  else if (tableNum < 0) {
    alert("Table number should be positive.")
  }
  else if (menu == undefined) {
    alert("menu error");
  }
  else if (menu.length <= 0) {
    alert("You should check at least one of the menu.");
  }
  else {
    axios.post('/api/pad', {tableNum: tableNum, menu: menu})
    .then((res) => {
      alert("Submitted!");
      addElement(tableNum, menu);
      addGogi(tableNum, menu);
      addYori(tableNum, menu);
      updateTBS();
      document.getElementById('form').reset();
    })
    .catch((err) => {
      alert('DB error');
    })
  }
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
        <label>결제 완료<input type="checkbox" class="form-control counter" onclick="change(this)"/></label>
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
        // console.log("start : " + tableNum + " / " + menu);
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

function addGogi(tableNum, menu) {

  let gogi = new Array();
  if (menu != undefined) {
    for (j = 0; j < menu.length; j++) {
      if (menu[j] === "Samgyeopsal" || menu[j] === "Buchujeon" || menu[j] === "Kimchijeon" || menu[j] === "Spam&Kimchi") {
        gogi.push(menu[j]);
      }
    }
  }

  if (gogi != undefined && gogi.length > 0) {
    const newdiv = document.createElement('div');
    newdiv.className = 'card tab';
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
          <tbody class="${tableNum}order_gogi list">
          </tbody>
          </table>
        </div>
        <div class="right">
          <label>완료<input type="checkbox" class="form-control counter" onclick="decrement(this)"/></lable>
        </div>
      </div>
    `;
    document.getElementById('gogi-container').prepend(newdiv);

    addMenuList = function(n, callback) {   
      if (n < 0) {
        callback();
      }
      else {
        console.log("start : " + tableNum + " / " + gogi);
        let tr = document.createElement('tr');
        let th_menu = document.createElement('th');
        let th_quantity = document.createElement('th');
        th_menu.innerHTML = gogi[n];
        th_quantity.className = 'quantity';
        th_quantity.innerHTML = 1;
        tr.append(th_menu);
        tr.append(th_quantity);
        document.getElementsByClassName(`${tableNum}order_gogi`)[0].append(tr);

        addMenuList(n-1, callback);
      }
    
    }
    
    addMenuList(gogi.length - 1, function() {
      // console.log(newdiv.innerHTML);
      // console.log('done');
    });
  }
}

function addYori(tableNum, menu) {

  let yori = new Array();
  if (menu != undefined) {
    for (j = 0; j < menu.length; j++) {
      if (menu[j] === "RedRamyeon" || menu[j] === "WhiteRamyeon" || menu[j] === "Sotteoksotteok" || menu[j] === "Riceballs") {
        yori.push(menu[j]);
      }
    }
  }

  if (yori != undefined && yori.length > 0) {
    const newdiv = document.createElement('div');
    newdiv.className = 'card tab';
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
          <tbody class="${tableNum}order_yori list">
          </tbody>
          </table>
        </div>
        <div class="right">
          <label>완료<input type="checkbox" class="form-control counter" onclick="decrement(this)"/></lable>
        </div>
      </div>
    `;
    document.getElementById('yori-container').prepend(newdiv);

    addMenuList = function(n, callback) {   
      if (n < 0) {
        callback();
      }
      else {
        let tr = document.createElement('tr');
        let th_menu = document.createElement('th');
        let th_quantity = document.createElement('th');
        th_menu.innerHTML = yori[n];
        th_quantity.className = 'quantity';
        th_quantity.innerHTML = 1;
        tr.append(th_menu);
        tr.append(th_quantity);
        document.getElementsByClassName(`${tableNum}order_yori`)[0].append(tr);

        addMenuList(n-1, callback);
      }
    
    }
    
    addMenuList(yori.length - 1, function() {
      // console.log(newdiv.innerHTML);
      // console.log('done');
    });
  }
}

function updateTBS(menu) {
  if (menu != undefined) {
    update = function(n, callback) {
      if (n < 0)  callback;
      else {
        if (menu[n] === "Samgyeopsal")  SamgyeopsalTBS++;
        else if (menu[n] === "Buchujeon")  BuchujeonTBS++;
        else if (menu[n] === "Kimchijeon") KimchijeonTBS ++;
        else if (menu[n] === "Spam&Kimchi") SpamKimchiTBS ++;
        else if (menu[n] === "RedRamyeon") RedRamyeonTBS ++;
        else if (menu[n] === "WhiteRamyeon") WhiteRamyeonTBS ++;
        else if (menu[n] === "Sotteoksotteok") SotteoksotteokTBS ++;
        else if (menu[n] === "Riceballs") RiceballsTBS ++;
        update(n-1, callback);
      }
    }
    update(menu.length - 1, function() {
      console.log("update success!");
    })

    document.getElementById('SamgyeopsalTBS').innerHTML = SamgyeopsalTBS;
    document.getElementById('BuchujeonTBS').innerHTML = BuchujeonTBS;
    document.getElementById('KimchijeonTBS').innerHTML = KimchijeonTBS;
    document.getElementById('SpamKimchiTBS').innerHTML = SpamKimchiTBS;
    document.getElementById('RedRamyeonTBS').innerHTML = RedRamyeonTBS;
    document.getElementById('WhiteRamyeonTBS').innerHTML = WhiteRamyeonTBS;
    document.getElementById('SotteoksotteokTBS').innerHTML = SotteoksotteokTBS;
    document.getElementById('RiceballsTBS').innerHTML = RiceballsTBS;
  }
}

function decrement(container) {
  const ischecked = container.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].checked;
  const incr = ischecked ? -1 : 1;
  // console.log(ischecked);
  let table = container.parentNode.parentNode.parentNode.childNodes[1].childNodes[3].childNodes[3];
  let rows = table.rows;
  for (i = 0; i < rows.length; i++) {
    // console.log(rows[i].childNodes[0].innerHTML);
    if (rows[i].childNodes[0].innerHTML === "Samgyeopsal") {
      SamgyeopsalTBS += incr;
      document.getElementById('SamgyeopsalTBS').innerHTML = SamgyeopsalTBS;
    }
    else if (rows[i].childNodes[0].innerHTML === "Buchujeon") {
      BuchujeonTBS += incr;
      document.getElementById('BuchujeonTBS').innerHTML = BuchujeonTBS;
    }
    else if (rows[i].childNodes[0].innerHTML === "Kimchijeon") {
      KimchijeonTBS += incr;
      document.getElementById('KimchijeonTBS').innerHTML = KimchijeonTBS;
    }
    else if (rows[i].childNodes[0].innerHTML === "SpamKimchi") {
      SpamKimchiTBS += incr;
      document.getElementById('SpamKimchiTBS').innerHTML = SpamKimchiTBS;
    }
    else if (rows[i].childNodes[0].innerHTML === "RedRamyeon") {
      RedRamyeonTBS += incr;
      document.getElementById('RedRamyeonTBS').innerHTML = RedRamyeonTBS;
    }
    else if (rows[i].childNodes[0].innerHTML === "WhiteRamyeon") {
      WhiteRamyeonTBS += incr;
      document.getElementById('WhiteRamyeonTBS').innerHTML = WhiteRamyeonTBS;
    }
    else if (rows[i].childNodes[0].innerHTML === "Sotteoksotteok") {
      SotteoksotteokTBS += incr;
      document.getElementById('Sotteoksotteok').innerHTML = SotteoksotteokTBS;
    }
    else if (rows[i].childNodes[0].innerHTML === "Riceballs") {
      RiceballsTBS += incr;
      document.getElementById('RiceballsTBS').innerHTML = RiceballsTBS;
    }
  }

  // console.log(container.parentNode.parentNode.parentNode.parentNode.classList);
  if (ischecked) container.parentNode.parentNode.parentNode.parentNode.classList.add('hidden');
  else container.parentNode.parentNode.parentNode.parentNode.classList.remove('hidden');
}

function change(chk) {
  const ischecked = chk.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].childNodes[1].checked;
  if (ischecked) chk.parentNode.parentNode.parentNode.parentNode.classList.add('hidden');
  else chk.parentNode.parentNode.parentNode.parentNode.classList.remove('hidden');
}