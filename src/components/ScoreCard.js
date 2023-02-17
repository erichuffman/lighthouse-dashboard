import { useEffect, useState } from 'react';
import './ScoreCard.css';

function scoreClasses(score) {
  if (score > 49) {
    return ['ds-u-fill--warn-lightest', 'ds-u-color--warn-darkest'];
  }
  if (score > 89) {
    return ['ds-u-fill--success-lightest', 'ds-u-color--success-darkest'];
  }
  return ['ds-u-fill--error-lightest','ds-u-color--error-darkest'];
}

function ScoreCard({file, title, date}) {
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetch(`./reports/data/${file}`)
    .then(response => {
      return response.json();
    }).then(data => {
      setScore(data.categories.performance.score * 100);
    }).catch((e) => {
      console.log(e.message);
    });
  }, [file]);

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
    <>
      {score && <div className={wrapperClasses.join(' ')}>
        <p className={`ds-u-margin--0 score-card__number-label ${scoreClasses(score)[1]}`}>Lighthouse Performance Score</p>
        <div className={`ds-u-margin-y--1 score-card__number-container ${scoreClasses(score)[0]}`}>
          <p className={`score-card__number ${scoreClasses(score)[1]}`}>{score}</p>
        </div>
        <p className={`ds-u-margin--0 score-card__report-link ${scoreClasses(score)[1]}`}>
          <a href={reportLink}>
            <span className="ds-u-visibility--screen-reader">Scored on: </span>
            {date}
            <span className="ds-u-visibility--screen-reader">. View the full Report for {title}</span>
          </a>
        </p>
      </div>}
    </>
  )
}

export default ScoreCard;
