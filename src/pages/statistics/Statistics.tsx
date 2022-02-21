import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Preloader from '../../components/Preloader/Preloader';
import StatisticGame from '../../components/StatisticGame/StatisticGame';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { IStatistic } from '../../types/types';

import { getInitialStatistic, getUserStatistics, resetUserStatistics } from '../../utils/API';

import { percentCorrectAnswers } from '../../utils/utils';

function Statistics() {
  const { user } = useTypedSelector((state) => state.user);
  const [statisticInfo, setStatisticInfo] = useState<IStatistic>();
  const [loaded, setLoaded] = useState(false);
  const [isHaveStatistics, setIsHaveStatistics] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const stats = await getUserStatistics(user.userId);
        setStatisticInfo(stats);
        if (stats.optional.oneDayStats.games.length) {
          setIsHaveStatistics(true);
        }
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

  if (!isHaveStatistics) {
    return (
      <div className="statistic">
        <div className="statistic__clear">
          <h3>Пока что у вас нет данных в статистике, доиграйте хотябы одну игру до конца!</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="statistic">
      <div className="statistic__left">
        <h2>Статистика по играм</h2>
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
        {statisticInfo?.optional.oneDayStats.games.map((game, ind) => (
          <StatisticGame key={game.index} data={statisticInfo.optional.oneDayStats.games[ind]} />
        ))}
      </div>
    </div>
  );
}

export default Statistics;
