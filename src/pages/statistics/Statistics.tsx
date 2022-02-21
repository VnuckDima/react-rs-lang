import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Preloader from '../../components/Preloader/Preloader';
import StatisticGame from '../../components/StatisticGame/StatisticGame';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { IStatistic } from '../../types/types';
import { getInitialStatistic, getUserStatistics } from '../../utils/API';
import { percentCorrectAnswers } from '../../utils/utils';

function Statistics() {
  const { user } = useTypedSelector((state) => state.user);
  const [statisticInfo, setStatisticInfo] = useState<IStatistic>();
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const games = statisticInfo?.optional.oneDayStats.games;
  const oneDayStats = statisticInfo?.optional.oneDayStats;
  useEffect(() => {
    (async () => {
      try {
        const stats = await getUserStatistics(user.userId);
        setStatisticInfo(stats);
      } catch {
        await getInitialStatistic(user.userId);
        const stats = await getUserStatistics(user.userId);
        setStatisticInfo(stats);
      }
      setLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (user.message !== 'Authenticated') {
      navigate('/');
    }
  }, [user]);

  if (!loaded) {
    return <Preloader />;
  }

  return (
    <div className="main__container">
      <div className="wrapper">
          <h2 className="statistic__header">Статистика по играм</h2>
        <div className="statistic__left">
          <div className="statistic_common">
            <h4>
              Новых слов за день -
              <span>{` ${statisticInfo?.optional.oneDayStats.newWords}`}</span>
            </h4>
            <h4>
              Изученных слов за день -
              <span>{` ${statisticInfo?.optional.oneDayStats.learned}`}</span>
            </h4>
            <h4>
              Правильные ответы -
              <span>{` ${percentCorrectAnswers(statisticInfo?.optional.oneDayStats.games!)}%`}</span>
            </h4>
          </div>
          <div className="statistic__details">
            {statisticInfo?.optional.oneDayStats.games.map((game, ind) => (
              <StatisticGame
              key={game.index}
              data={statisticInfo.optional.oneDayStats.games[ind]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
