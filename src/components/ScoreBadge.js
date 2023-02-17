import { useEffect, useState } from 'react';
import { Badge } from '@cmsgov/ds-medicare-gov';

function badgeVariation(score) {
  if (score > 49) {
    return 'warn';
  }
  if (score > 89) {
    return 'success';
  }
  return 'alert';
}

function ScoreBadge({file}) {
  const [score, setScore] = useState(null);

  useEffect(() => {
    console.log(file);
    fetch(`./${file}`)
    .then(response => {
      return response.json();
    }).then(data => {
      setScore(Math.round(data.categories.performance.score * 100));
    }).catch((e) => {
      console.log(e.message);
    });
  }, [file]);

  return (
    <>
      {score && <Badge variation={badgeVariation(score)}>
        {score}
      </Badge>}
    </>
  )
}

export default ScoreBadge;
