import React from 'react';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { IStatisticOneDay } from '../../types/types';

type TStatisticGame = {
  data: IStatisticOneDay
}

export default function StatisticGame({ data }: TStatisticGame) {
  function procentOfCorrect(game: IStatisticOneDay) {
    if (game.corrected === 0 && game.incorrected === 0) {
      return 0;
    }
    return Math.round(((game.corrected * 100) / (game.corrected + game.incorrected)));
  }
  return (
    <div className="statistic__game">
      <div className="statistic__info">
        <div className="statistic__text">
          <h4 className="statistic__game-number">
            {`Игра #${data.index} - `}
            <span>{data.gameName}</span>
          </h4>
          <p>
            Правильных ответов -
            <span>{` ${data.corrected}`}</span>
          </p>
          <p>
            Неправильных ответов -
            <span>{` ${data.incorrected}`}</span>
          </p>
          <p>
            Правильных ответов -
            <span>{` ${procentOfCorrect(data)}%`}</span>
          </p>
          <p>
            Самая длинная серия правильных ответов -
            <span>{` ${data.correctOnTheRow}`}</span>
          </p>
        </div>
        <div className="statistic__chart">
          <Chart
            type="pie"
            data={{
              labels: ['Правильные', 'Неправильные'],
              datasets: [{
                label: 'qweq',
                data: [data.corrected, data.incorrected],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
              }],
            }}
            options={{
              responsive: false,
            }}
          />
        </div>
      </div>
    </div>
  );
}
