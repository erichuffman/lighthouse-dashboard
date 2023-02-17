import data from './report-data/manifest.json'
import { Accordion, AccordionItem } from '@cmsgov/ds-medicare-gov';
import ScoreCard from './components/ScoreCard';

function buildHTMLreportURL(file, ext = 'html') {
  const fileName = file.split('.');
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
    <li>
      <a href={buildHTMLreportURL(file)}>{buildReportDate(file)}</a>
    </li>
  )
}

function reportWrapperClass(index, length) {
  if (index < length) {
    return 'ds-u-border--2 ds-u-border--dark ds-u-padding--4 ds-u-margin-bottom--2';
  }
  else {
    return 'ds-u-border--2 ds-u-border--dark ds-u-padding--4';
  }
}

function App() {
  return (
    <>
      <h1 className="ds-text-heading--3xl">Performance Reports: <a href="https://www.medicare.gov">Medicare.gov</a></h1>
      {data.map((item, index) => (
        <article key={item.id} className={reportWrapperClass(index, data.length - 1)}>
          <h2 className="ds-text-heading--2xl ds-u-margin-top--0">{item.title}</h2>
          <ScoreCard
            file={item.reports[item.reports.length - 1]}
            title={item.title}
            date={buildReportDate(item.reports[item.reports.length - 1].replace('.json', ''))}
          />
          <Accordion className="ds-u-margin-top--4" bordered openItems={[0]}>
            <AccordionItem contentClassName="reports-list" heading="Past Reports">
              <ul>
                {item.reports.slice(0).reverse().map((report, index) => (
                  index > 0 && <ReportListItem key={report} file={report.replace('.json', '')} />
                ))}
              </ul>
            </AccordionItem>
          </Accordion>
        </article>
      ))}
    </>
  );
}

export default App;
