import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { urls, lhOpts } from './config.js';
import { reportResults } from "./buildReports.js";

function launchLighthouse(url, id, opts = lhOpts) {
  return launch({ chromeFlags: ['--no-sandbox', '--headless'] })
    .then(async chrome => {
      opts.port = chrome.port;
      let results;
      try {
        results = await lighthouse(url, opts);
      } catch (e) {
        console.error('Lighthouse error: ', e);
      }
      await chrome.kill().then(() => {
        if (results) {
          reportResults(results, id);
        }
        return;
      });
    });
}

async function runLighthouseAnalysis() {
  for (const item of urls) {
    console.log(`🔄 Starting Lighthouse analysis for: ${item.title}.`);
    await launchLighthouse(item.path, item.id).then(() => {
      console.log(`✅ Lighthouse analysis completed for: ${item.title}.`);
      return;
    });
  }
}

runLighthouseAnalysis();
