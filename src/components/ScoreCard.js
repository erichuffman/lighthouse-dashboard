import './ScoreCard.css';

function ScoreCard({file, title, date}) {
  // TODO - convert to useEffect and fetch from public/reports/data
  const data = require(`../report-data/${file}`);
  const score = data.categories.performance.score * 100;
  let scoreClass = 'ds-u-fill--error-lightest';
  let textClass = 'ds-u-color--error-darkest';
  if (score > 49) {
    scoreClass = 'ds-u-fill--warn-lightest';
    textClass = 'ds-u-color--warn-darkest';
  }
  if (score > 89) {
    scoreClass = 'ds-u-fill--success-lightest';
    textClass = 'ds-u-color--success-darkest';
  }
  const wrapperClasses = [
    'ds-u-display--flex',
    'ds-u-flex-direction--column',
    'ds-u-justify-content--center',
    'ds-u-align-items--center',
    'ds-u-margin-y--2',
    'score-card__wrapper',
  ]
  const reportLink = `reports/${file.replace('.json', '.html')}`;

  return (
    <div className={wrapperClasses.join(' ')}>
      <p className={`ds-u-margin--0 score-card__number-label ${textClass}`}>Lighthouse Performance Score</p>
      <div className={`ds-u-margin-y--1 score-card__number-container ${scoreClass}`}>
        <p className={`score-card__number ${textClass}`}>{score}</p>
      </div>
      <p className={`ds-u-margin--0 score-card__report-link ${textClass}`}>
        <a href={reportLink}>
          <span className="ds-u-visibility--screen-reader">Scored on: </span>
          {date}
          <span className="ds-u-visibility--screen-reader">. View the full Report for {title}</span>
        </a>
      </p>
    </div>
  )
}

export default ScoreCard;
