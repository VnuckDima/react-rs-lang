import React from 'react';

function Main() {
  return (
  <div className="mainpage__container">
    <h2>RS Lang - лучшее приложение для изучения английского языка!</h2>
    <section className="main__features">
    <h2>Возможности приложения</h2>

    </section>
    <section className="main__video">
      <h2>Видео с пояснениями</h2>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/ENOXfNa4nt0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
    </section>
    <section className="main__developers">
      <h2>О команде</h2>
      <div className="developers__container">
        <div className="developers__card">
          <div className="developers__card-image">
            <a href="https://github.com/dino19981" className="github__link" target="_blank" rel="noreferrer">
              <img src="./assets/english1.jpg" alt="Artem Stepanov" />
            </a>
          </div>
          <div className="developers__card-info">
            <h3>Артем Степанов</h3>
            <div className="developers__card-details">
              Тимлид. Архитектура приложения, бэкенд, учебник, статистика, миниигра Аудиовызов
            </div>
          </div>
        </div>
        <div className="developers__card">
          <div className="developers__card-image">
            <a href="https://github.com/bvfromru" className="github__link" target="_blank" rel="noreferrer">
              <img src="./assets/english1.jpg" alt="Vitaliy Budkin" />
            </a>
          </div>
          <div className="developers__card-info">
            <h3>Виталий Будкин</h3>
            <div className="developers__card-details">
              Верстка, дизайн, мини-игры, костыли
            </div>
          </div>
        </div>
        <div className="developers__card">
          <div className="developers__card-image">
            <a href="https://github.com/dimavnuk" className="github__link" target="_blank" rel="noreferrer">
              <img src="./assets/english1.jpg" alt="Dima Vnuk" />
            </a>
          </div>
          <div className="developers__card-info">
            <h3>Дмитрий Внук</h3>
            <div className="developers__card-details">
              Создание репозитория, разбивка на компоненты, проблемы со сдачей в срок
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
}

export default Main;
