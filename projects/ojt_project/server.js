const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Endpoint to upload attendance files
app.post('/upload', upload.fields([{ name: 'attendanceFiles', maxCount: 31 }]), (req, res) => {
  const attendanceFiles = req.files['attendanceFiles'] || [];
  const seminarName = req.body.seminarName || 'Seminar';
  const seminarCode = req.body.seminarCode || 'Code';
  const date = req.body.date || 'Date';

  if (attendanceFiles.length === 0) return res.status(400).send('No attendance files uploaded.');

  const totalDays = attendanceFiles.length;
  const attendanceData = [];

  attendanceFiles.forEach(file => {
    const workbook = xlsx.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    attendanceData.push(...data);
  });

  // Save raw data (optional)
  fs.writeFileSync('attendanceData.json', JSON.stringify(attendanceData, null, 2));

  const attendanceMap = {};
  const sexCount = {};
  const sectorCount = {};
  const sexPerSectorCount = {};


  attendanceData.forEach(attendee => {
    const name = attendee["Full Name"] || attendee["Name"] || "Unknown";
    const email = attendee["Email"] || "No Email";
    const sex = attendee["Sex"] || "Unknown";
    const sector = attendee["Sector"] || "Unknown";

    const key = `${name.toLowerCase()}_${email.toLowerCase()}`;
    if (!attendanceMap[key]) {
      attendanceMap[key] = {
        name,
        email,
        sex,
        sector,
        attended: 0
      };

      sexCount[sex] = (sexCount[sex] || 0) + 1;
      sectorCount[sector] = (sectorCount[sector] || 0) + 1;
    }
    if (!sexPerSectorCount[sector]) {
      sexPerSectorCount[sector] = {};
    }
    sexPerSectorCount[sector][sex] = (sexPerSectorCount[sector][sex] || 0) + 1;

    attendanceMap[key].attended += 1;
  });

  const completed = [];
  const incomplete = [];

  for (const key in attendanceMap) {
    const person = attendanceMap[key];
    if (person.attended === totalDays) {
      completed.push(person);
    } else {
      incomplete.push(person);
    }
  }

  // Create Excel workbooks
  const completedWorkbook = xlsx.utils.book_new();
  const incompleteWorkbook = xlsx.utils.book_new();

  const completedSheet = xlsx.utils.json_to_sheet(completed);
  const incompleteSheet = xlsx.utils.json_to_sheet(incomplete);

  xlsx.utils.book_append_sheet(completedWorkbook, completedSheet, "Completed");
  xlsx.utils.book_append_sheet(incompleteWorkbook, incompleteSheet, "Incomplete");

  // Sanitize filename parts
  const safeSeminarName = seminarName.replace(/[^a-z0-9]/gi, '_');
  const safeDate = date.replace(/[^a-z0-9]/gi, '_');

  const completedFileName = `Completed_Attendance_${safeSeminarName}_${safeDate}.xlsx`;
  const incompleteFileName = `Incomplete_Attendance_${safeSeminarName}_${safeDate}.xlsx`;

  const completedFilePath = path.join(__dirname, 'public', completedFileName);
  const incompleteFilePath = path.join(__dirname, 'public', incompleteFileName);

  xlsx.writeFile(completedWorkbook, completedFilePath);
  xlsx.writeFile(incompleteWorkbook, incompleteFilePath);

  // Prepare totals.txt content
  let totalsText = `Seminar: ${seminarName}\nDate: ${date}\n\nTotal Days of Training: ${totalDays}\n\n`;

  totalsText += `--- Sex Count ---\n`;
  for (const sex in sexCount) {
    totalsText += `${sex}: ${sexCount[sex]}\n`;
  }

  totalsText += `\n--- Sector Count ---\n`;
  for (const sector in sectorCount) {
    totalsText += `${sector}: ${sectorCount[sector]}\n`;
  }

  totalsText += `\n--- Sex Count per Sector ---\n`;
  for (const sector in sexPerSectorCount) {
    totalsText += `\n${sector}:\n`;
    for (const sex in sexPerSectorCount[sector]) {
      totalsText += `  ${sex}: ${sexPerSectorCount[sector][sex]}\n`;
    }
  }

  // Save to a .txt file
  const totalsFileName = `Attendance_Totals_${safeSeminarName}_${safeDate}.txt`;
  const totalsFilePath = path.join(__dirname, 'public', totalsFileName);
  fs.writeFileSync(totalsFilePath, totalsText);

  // Render result page with correct download links
  res.send(`
<html>

<head>
  <title>Attendance Summary</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    h2 {
      margin-top: 2rem;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin-top: 1rem;
    }

    th,
    td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }

    .chart-container {
      width: 100%;
      height: 100%;
      margin-bottom: 2rem;
    }

    .nav-button {
      color: #333;
      text-decoration: none;
      font-size: 18px;
    }

    .nav-button:hover {
      text-decoration: underline;
    }

  </style>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" />
  <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
</head>

<body>
    <nav class="navbar" style="background-color: #134991">
      <div class="container-fluid py-0">
        <span class="navbar-brand" href="#">
          <img src="dict-logo.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-center" />
          <span class="text-white">
            Department of Information and Communications Technology Region IV-A
            Laguna
          </span>
        </span>
      </div>
    </nav>

    <div class="container-fluid p-4">
      <div class="row w-100 pb-2">
        <h1 class="text-center fw-bold">Attendee Information Summary</h1>
      </div>
      <div class="sticky-top bg-white shadow-sm rounded">
        <hr>
        <div class="row w-100">
          <div class="col-3 text-center">
            <a class="nav-button" href="#attendance">Attendance</a>
          </div>
          <div class="col-3 text-center">
            <a class="nav-button" href="#sexAndSector">Sex and Sector</a>
          </div>
          <div class="col-3 text-center">
            <a class="nav-button" href="#charts">Charts</a>
          </div>
          <div class="col-3 text-center">
            <a class="nav-button" href="#downloads">Downloads</a>
          </div>
        </div>
        <hr>
      </div>

      <div class="row w-100 py-3">
        <h3 class="pb-2">Seminar Information:</h3>
        <p><strong>Seminar Name:</strong> ${seminarName}</p>
        <p><strong>Seminar Code:</strong> ${seminarCode}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Total Days of Training:</strong> ${totalDays}</p>
      </div>

      <div class="row mb-4 p-2 border-top border-bottom border-black" id="attendance">
        <h2 class="text-center">Attendance Summary</h2>
      </div>

      <div class="row mb-4">
        <div class="col-12">
          <h3>Completed Attendance</h3>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead class="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Days Attended</th>
                </tr>
              </thead>
              <tbody>
                ${completed.map(p => `<tr>
                  <td>${p.name}</td>
                  <td>${p.email}</td>
                  <td>${p.attended}</td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-12">
          <h3>Incomplete Attendance</h3>
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead class="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Days Attended</th>
                </tr>
              </thead>
              <tbody>
                ${incomplete.map(p => `<tr>
                  <td>${p.name}</td>
                  <td>${p.email}</td>
                  <td>${p.attended}</td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="row mb-4 p-2 border-top border-bottom border-black" id="sexAndSector">
        <h2 class="text-center">Sex and Sector</h2>
      </div>

      <div class="row mb-4">
        <div class="col-12">
          <h3>Sex</h3>
          <ul>
            ${Object.entries(sexCount).map(([sex, count]) => `<li>${sex}: ${count}</li>`).join('')}
          </ul>
          
          <h3>Sex and Sector Distribution</h3>
          <table class="table table-bordered">
            <thead class="table-light">
              <tr>
                <th>Sector</th>
                <th>Male</th>
                <th>Female</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(sexPerSectorCount).map(([sector, sexMap]) => {
              const maleCount = sexMap['Male'] || 0;
              const femaleCount = sexMap['Female'] || 0;
              const totalCount = Object.values(sexMap).reduce((a, b) => a + b, 0);
              return `<tr>
                <td>${sector}</td>
                <td>${maleCount}</td>
                <td>${femaleCount}</td>
                <td>${totalCount}</td>
              </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="row mb-4 p-2 border-top border-bottom border-black" id="charts">
        <h2 class="text-center">Charts</h2>
      </div>

      <div class="row mb-4">
        <div class="col-md-12 col-lg-6">
          <div id="sexCountChart" class="chart-container"></div>
        </div>
        <div class="col-md-12 col-lg-6">
          <div id="sectorCountChart" class="chart-container"></div>
        </div>
        <div class="col-12">
          <div id="sexPerSectorChart" class="chart-container"></div>
        </div>
      </div>

      <div class="row mb-4 p-2 border-top border-bottom border-black" id="downloads">
        <h2 class="text-center">Download Files</h2>
      </div>

      <div class="row mb-4" id="downloads">
        <div class="col-12">
          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12 mb-1">
              <a href="/${completedFileName}" class="btn btn-success w-100" download>Download Completed Attendance</a>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 mb-1">
              <a href="/${incompleteFileName}" class="btn btn-success w-100" download>Download Incomplete Attendance</a>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 mb-1">
              <a href="/${totalsFileName}" class="btn btn-success w-100" download>Download Totals (Sex and Sector)</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script>
      google.charts.load('current', { 'packages': ['corechart', 'bar'] });
      google.charts.setOnLoadCallback(drawCharts);

      function drawCharts() {
        const sexCount = ${ JSON.stringify(sexCount)
      };
      const sectorCount = ${ JSON.stringify(sectorCount)};
      const sexPerSectorCount = ${ JSON.stringify(sexPerSectorCount)};

      const sexDataArray = [['Sex', 'Count']];
      for (const sex in sexCount) {
        sexDataArray.push([sex, sexCount[sex]]);
      }
      const sexData = google.visualization.arrayToDataTable(sexDataArray);
      const sexOptions = {
        title: 'Attendees by Sex',
        titleTextStyle: {
          fontSize: 20,
          bold: true,
          color: '#333'
        },
        width: '100%',
        height: 400,
      };
      const sexChart = new google.visualization.PieChart(document.getElementById('sexCountChart'));
      sexChart.draw(sexData, sexOptions);

      const sectorDataArray = [['Sector', 'Count']];
      for (const sector in sectorCount) {
        sectorDataArray.push([sector, sectorCount[sector]]);
      }
      const sectorData = google.visualization.arrayToDataTable(sectorDataArray);
      const sectorOptions = {
        title: 'Attendees by Sector',
        titleTextStyle: {
          fontSize: 20,
          bold: true,
          color: '#333'
        },
        width: '90%',
        height: 400,
        legend: { position: 'none' },
        bars: 'horizontal',
        chartArea: {
          left: 200,
          top: 100,
          right: 20,
          bottom: 50
        },
        hAxis: {
          minValue: 0,
          format: 0
        },
        vAxis: {
          textStyle: { fontSize: 11 }
        },
      };
      const sectorChart = new google.visualization.BarChart(document.getElementById('sectorCountChart'));
      sectorChart.draw(sectorData, sectorOptions);

      const allSexes = new Set();
      for (const sector in sexPerSectorCount) {
        for (const sex in sexPerSectorCount[sector]) {
          allSexes.add(sex);
        }
      }
      const sexesArray = Array.from(allSexes);
      const stackedDataArray = [['Sector', ...sexesArray]];
      for (const sector in sexPerSectorCount) {
        const row = [sector];
        sexesArray.forEach(sex => {
          row.push(sexPerSectorCount[sector][sex] || 0);
        });
        stackedDataArray.push(row);
      }
      const stackedData = google.visualization.arrayToDataTable(stackedDataArray);
      const stackedOptions = {
        title: 'Sex Count per Sector',
        titleTextStyle: {
          fontSize: 20,
          bold: true,
          color: '#333'
        },
        isStacked: true,
        width: '90%',
        height: 400,
        bars: 'horizontal',
        chartArea: {
          left: 200,
          top: 100,
          right: 20,
          bottom: 50
        },
        hAxis: {
          minValue: 0,
          format: 0
        },
        vAxis: {
          textStyle: { fontSize: 11 }
        },
      };
      const stackedChart = new google.visualization.BarChart(document.getElementById('sexPerSectorChart'));
      stackedChart.draw(stackedData, stackedOptions);
      }
    </script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
  </body>

</html>
  `);
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
