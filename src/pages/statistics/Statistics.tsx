import React, { useEffect, useState } from 'react';
import Preloader from '../../components/Preloader/Preloader';
import { useTypedSelector } from '../../hooks/useTypeSelector';
import { IStatistic } from '../../types/types';
import { getUserStatistics } from '../../utils/API';

function Statistics() {
  const { user } = useTypedSelector((state) => state.user);
  const [statisticInfo, setStatisticInfo] = useState<IStatistic>();
  const [loaded, setLoaded] = useState(false);
  const games = statisticInfo?.optional.oneDayStats.games;
  const oneDayStats = statisticInfo?.optional.oneDayStats;
  useEffect(() => {
    (async () => {
      const stats = await getUserStatistics(user.userId);
      setStatisticInfo(stats);
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return <Preloader />;
  }

  return (
    <div>
      <div className="statistic__left">
        <h2>Статистика по играм</h2>
        <ul>
          <li>{`Новых слов за день - ${statisticInfo?.optional.oneDayStats.newWords}`}</li>
          <ul>
            Статистика по каждой игре
            {statisticInfo?.optional.oneDayStats.games.map((game, ind) => (
              <div>
                <li>{`Игра № ${ind + 1}`}</li>
                <li>{`Правильных ответов - ${statisticInfo?.optional.oneDayStats.games[ind].corrected}, неправильных - ${statisticInfo?.optional.oneDayStats.games[ind].incorrected}, кол-во правильных подрят - ${statisticInfo?.optional.oneDayStats.games[ind].correctOnTheRow}`}</li>
              </div>
            ))}
          </ul>
        </ul>
      </div>
    </div>
  );
}

export default Statistics;
