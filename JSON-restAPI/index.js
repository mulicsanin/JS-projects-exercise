//Getting the name of the city from input
let City = document.getElementById('CityName').value;
//Getting url from OpenWeatherMap api, with forwarded city
let url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=b1ae615b731a98a586905a201b7f75af`;
const tableData = document.getElementById('tableID');
//Getting API data
function getAPI() {
  fetch(url)
    .then((r) => {
      if (r.status !== 200) {
        alert('System error. ' + r.status);
        return;
      }

      r.json().then((x) => {
        var newRow =
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

        tableData.innerHTML += newRow;
      });
    })
    .catch((err) => {
      alert('System error: ' + err);
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

//variable that saves wind direction data, for JSON file
var dir = 0;
//Changing the collection data (Time, Temp, Description and adding direction icon to WindDirection)
function Change() {
  fetch(url)
    .then((r) => {
      if (r.status !== 200) {
        alert('System error. ' + r.status);
        return;
      }

      r.json().then((x) => {
        tableData.innerHTML = '';
        tableData.innerHTML = `   <tr>
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
        var CityName = x.name;
        var Temp = x.main.temp - 272.15;
        var Description = x.weather[0].main + ' ' + x.weather[0].description;
        var Humidity = x.main.humidity;
        var WindSpeed = x.wind.speed;
        var WindDirection = x.wind.deg;
        //variable used
        dir = WindDirection;
        var Pressure = x.main.pressure;
        var newRow =
          '<tr><td>' +
          CityName +
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

        tableData.innerHTML += newRow;
      });
    })
    .catch((err) => {
      alert('System error: ' + err);
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
const Download = () => {
  var cell = document.getElementById('clsReadOnly');
  //variable used
  cell.innerHTML = dir;
  const jsonTable = tableToJson(tableData);
  const data = JSON.stringify(jsonTable);
  download('data.txt', data);
};
