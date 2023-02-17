import { existsSync, mkdirSync, writeFile } from 'fs';

async function writeLocalFiles(results, id) {
  if (results.report) {
    // Get timestamp.
    const currentTime = new Date().toISOString().slice(0, 16).replace(/:/g, "-");
    // Create reports directory for the html version of reports.
    if (!existsSync(`../public/reports/`)) {
      mkdirSync(`../public/reports/`, { recursive: true }, error => {
        if (error) console.error(`Error creating reports directory.`, error);
      });
    }
    // Create directory for the json versions of reports.
    if (!existsSync(`../src/report-data/`)) {
      mkdirSync(`../src/report-data/`, { recursive: true }, error => {
        if (error) console.error(`Error creating report-data directory.`, error);
      });
    }
    // Create HTML report file.
    writeFile(`../public/reports/${id}_${currentTime}.html`, results.report[0], err => {
      if (err) throw err;
    });
    // Create JSON report file.
    writeFile(`../src/report-data/${id}_${currentTime}.json`, results.report[1], err => {
      if (err) throw err;
    });
  }
}

async function reportResults(results, id) {
  if (results.lhr.runtimeError) {
    console.error(results.lhr.runtimeError.message);
  }
  await writeLocalFiles(results, id);
}

export {
  reportResults
}
