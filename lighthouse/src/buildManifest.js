import { urls } from './config.js';
import { readdir, writeFile } from 'fs';

function buildManifest() {
  const manifest = [];
  for (const item of urls) {
    manifest.push({id: item.id, title: item.title, reports: []});
  }
  readdir(`../src/report-data/`, (err, files) => {
    if (err) {
      return console.log(`Unable to read reports directory: ` + err);
    }
    files.forEach(file => {
      const fileType = file.split('.');
      const urlID = file.split('_');
      if (fileType[1] === 'json') {
        manifest.forEach(item => {
          if (item.id === urlID[0]) {
            item.reports.push(`${file}`);
          }
        })
      }
    });
    writeFile(`../src/report-data/manifest.json`, JSON.stringify(manifest), err => {
      if (err) throw err;
    });
    console.log('✅ Report manifest updated.', manifest);
  });
}

buildManifest();
