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
        <style>
          body { font-family: Arial, sans-serif; margin: 2rem; }
          h2 { margin-top: 2rem; }
          table { border-collapse: collapse; width: 100%; margin-top: 1rem; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
      <nav class="navbar" style="background-color: #134991;">
        <div class="container-fluid py-0">
          <a class="navbar-brand" href="#">
            <img src="dict-logo.png" alt="Logo" width="50" height="50" class="d-inline-block align-text-center">
            <span class="text-white"> Department of Information and Communications Technology Region IV-A Laguna </span>
          </a>
        </div>
      </nav>
      <div class="container-fluid m-3">
        <div class="row pb-4">
          <h1>Attendance Summary</h1>
          <p><strong>Seminar:</strong> ${seminarName}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Total Days of Training:</strong> ${totalDays}</p>
        </div>

        <div class="row pb-3">
          <h2>✅ Completed Attendance</h2>
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Days Attended</th></tr></thead>
            <tbody>
              ${completed.map(p => `<tr><td>${p.name}</td><td>${p.email}</td><td>${p.attended}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>

        <div class="row pb-3">
          <h2>⚠️ Incomplete Attendance</h2>
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Days Attended</th></tr></thead>
            <tbody>
              ${incomplete.map(p => `<tr><td>${p.name}</td><td>${p.email}</td><td>${p.attended}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>

        <div class="row pb-3 mt-4">
          <h2>📊 Totals</h2>
          <h3>Sex</h3>
          <div class="ps-4">
            <ul>${Object.entries(sexCount).map(([sex, count]) => `<li>${sex}: ${count}</li>`).join('')}</ul>
          </div>

          <h3>Sector</h3>
          <div class="ps-4">
            <ul>${Object.entries(sectorCount).map(([sector, count]) => `<li>${sector}: ${count}</li>`).join('')}</ul>
          </div>

          <h3>Sex Count per Sector</h3>
          <div class="ps-4">
            ${Object.entries(sexPerSectorCount).map(([sector, sexMap]) => `
              <p><strong>${sector}</strong></p>
              <ul>
                ${Object.entries(sexMap).map(([sex, count]) => `<li>${sex}: ${count}</li>`).join('')}
              </ul>
            `).join('')}
          </div>
        </div>

        <div class="row pb-2">
          <h2>⬇️ Download Files</h2>
          <div class="d-grid gap-2 d-md-block">
            <a href="/${completedFileName}" class="btn btn-success" download>Download Completed Attendance</a>
            <a href="/${incompleteFileName}" class="btn btn-success" download>Download Incomplete Attendance</a>
            <a href="/${totalsFileName}" class="btn btn-success" download>Download Totals (Sex and Sector)</a>
          </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  `);
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
