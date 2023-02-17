import { useEffect, useState } from 'react';
import { Accordion, AccordionItem, ArrowIcon } from '@cmsgov/ds-medicare-gov';
import ScoreCard from './components/ScoreCard';
import ScoreBadge from './components/ScoreBadge';

function buildReportURL(file, ext = 'html') {
  const fileName = file.split('.');
  if (ext === 'json') {
    return `reports/data/${fileName[0]}.${ext}`;
  }
  return `reports/${fileName[0]}.${ext}`;

}

function buildReportDate(file) {
  const reportFileChunk = file.split('_');
  const reportDateChunk = reportFileChunk[1].split('T');
  const reportTime = `${reportDateChunk[1].replace('-', ':')}:00`;
  const reportDate = new Date(`${reportDateChunk[0]}T${reportTime}`);
  const reportDateString = reportDate.toLocaleString();
  return reportDateString;
}

function ReportListItem({file}) {
  return (
    <li className="ds-u-padding-y--1 ds-u-display--flex ds-u-align-items--center">
      <a href={buildReportURL(file)}>{buildReportDate(file)}</a>
      <ArrowIcon />
      <ScoreBadge file={buildReportURL(file, 'json')} /> 
    </li>
  )
}

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('./reports/data/manifest.json')
    .then(response => {
      return response.json();
    }).then(data => {
      setData(data);
    }).catch((e) => {
      console.log(e.message);
    });
  }, []);

  return (
    <>
      <h1 className="ds-text-heading--3xl ds-u-text-align--center ds-u-margin-y--3">Performance Reports: <a href="https://www.medicare.gov">Medicare.gov</a></h1>
      {data && data.map((item) => (
        <article key={item.id} className="ds-u-border--2 ds-u-border--dark ds-u-padding--4 ds-u-margin-bottom--2">
          <h2 className="ds-text-heading--2xl ds-u-margin-top--0">{item.title}</h2>
          <ScoreCard
            file={item.reports[item.reports.length - 1]}
            title={item.title}
            date={buildReportDate(item.reports[item.reports.length - 1].replace('.json', ''))}
          />
          {item.reports.length > 1 && <Accordion className="ds-u-margin-top--4" bordered openItems={[0]}>
            <AccordionItem contentClassName="reports-list" heading="Past Reports">
              <ul className="ds-c-list--bare">
                {item.reports.slice(0).reverse().map((report, index) => (
                  index > 0 && <ReportListItem key={report} file={report.replace('.json', '')} />
                ))}
              </ul>
            </AccordionItem>
          </Accordion>}
        </article>
      ))}
      {!data && <h2 className="ds-u-text-align--center"><em>No reports generated. See README for how to generage reports.</em></h2>}
    </>
  );
}

export default App;
