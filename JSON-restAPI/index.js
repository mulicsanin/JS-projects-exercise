//download JSON in a file
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  );
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

//getting API data
function getAPI() {
  let City = document.getElementById('CityName').value;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${City}&appid=b1ae615b731a98a586905a201b7f75af`;

  fetch(url)
    .then((r) => {
      if (r.status !== 200) {
        alert('Greska u sistemu. ' + r.status);
        return;
      }

      r.json().then((x) => {
        var noviRed =
          '<tr><td>' +
          x.name +
          '</td><td>' +
          x.dt +
          '</td><td>' +
          x.main.temp +
          '°K' +
          '</td><td>' +
          x.weather[0].description +
          '</td><td>' +
          x.main.humidity +
          '</td><td>' +
          x.wind.speed +
          '</td><td>' +
          x.wind.deg +
          '</td><td>' +
          x.main.pressure +
          '</td></tr>';

        document.getElementById('tabelaID').innerHTML += noviRed;
      });
    })
    .catch((err) => {
      alert('Greska u sistemu: ' + err);
    });
}

function WindDirectionIcon(d) {
  var r = d - 90;
  return (
    '<img src="https://ssl.gstatic.com/m/images/weather/wind_unselected.svg"' +
    ' style="transform:rotate(' +
    r +
    'deg)">'
  );
}
var dir = 0;
function Change() {
  let City = document.getElementById('CityName').value;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${City}&appid=b1ae615b731a98a586905a201b7f75af`;

  fetch(url)
    .then((r) => {
      if (r.status !== 200) {
        alert('Greska u sistemu. ' + r.status);
        return;
      }

      r.json().then((x) => {
        document.getElementById('tabelaID').innerHTML = '';
        document.getElementById('tabelaID').innerHTML = `   <tr>
        <th>City</th>
        <th>Time</th>
        <th>Temp</th>
        <th>Description</th>
        <th>Humidity</th>
        <th>Wind speed</th>
        <th>Wind direction</th>
        <th>Pressure</th>
      </tr>`;
        var Time = new Date(x.dt * 1000);
        var cityname = x.name;
        var Temp = x.main.temp - 272.15;
        var Description = x.weather[0].main + ' ' + x.weather[0].description;
        var Humidity = x.main.humidity;
        var WindSpeed = x.wind.speed;
        var WindDirection = x.wind.deg;
        dir = WindDirection;
        var Pressure = x.main.pressure;
        var noviRed =
          '<tr><td>' +
          cityname +
          '</td><td>' +
          Time +
          '</td><td>' +
          Temp.toFixed(2) +
          '°C' +
          '</td><td>' +
          Description +
          '</td><td>' +
          Humidity.toFixed(2) +
          '</td><td>' +
          WindSpeed.toFixed(2) +
          '</td><td id="clsReadOnly">' +
          WindDirectionIcon(WindDirection) +
          WindDirection +
          ' °' +
          '</td><td>' +
          Pressure.toFixed(2) +
          '</td></tr>';

        document.getElementById('tabelaID').innerHTML += noviRed;
      });
    })
    .catch((err) => {
      alert('Greska u sistemu: ' + err);
    });
}

//convert Table into JSON
function tableToJson(table) {
  var data = [];

  var headers = [];
  for (let i = 0; i < table.rows[0].cells.length; i++) {
    headers[i] = table.rows[0].cells[i].innerHTML
      .toLowerCase()
      .replace(/ /gi, '');
  }

  for (let i = 1; i < table.rows.length; i++) {
    var tableRow = table.rows[i];
    var rowData = {};
    for (let j = 0; j < tableRow.cells.length; j++) {
      rowData[headers[j]] = tableRow.cells[j].innerHTML;
    }
    data.push(rowData);
  }
  return data;
}

const Download = () => {
  const tabela = document.getElementById('tabelaID');
  var cell = document.getElementById('clsReadOnly');
  cell.innerHTML = dir;
  const jsonTabela = tableToJson(tabela);
  const data = JSON.stringify(jsonTabela);
  download('data.txt', data);
};
