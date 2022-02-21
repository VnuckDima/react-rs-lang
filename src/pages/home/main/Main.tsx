import React from 'react';
import Footer from '../../../components/footer/Footer';

function Main() {
  return (
  <>
    <div className="main__container">
      <div className="wrapper">
        <div className="mainpage__container">
          <h2 className="mainpage__container-header">RS Lang - лучшее приложение для изучения английского языка!</h2>
          <section className="main__features">
          <h2>Возможности приложения</h2>
            <ul>
              <li>
                <h3>
                  Электронный учебник,
                  содержащий коллекцию из 3600 наиболее употребляемых английских слов.
                </h3>
                <p>
                  С таким богатым словарным запасом вы сможете понять хоть черта лысого,
                  если он говорит по английски!
                  Все слова в учебнике отсортированы по категориям сложности.
                  У каждого слова есть транскрипция, перевод, озвученное произношение,
                    примеры использования и озвученные произношения примеров использования!
                </p>
              </li>
              <li>
                <h3>
                  Три, целых три мини-игры!
                </h3>
                <p>
                  Три интереснейших мини-игры, которые вы можете использовать для закрепления
                  словарного запаса и контроля своего обучения. В мини-играх доступно
                  управление с клавиатуры для тех кому лень шевелить мышкой. У каждой
                  игры есть два режима запуска, вы можете сыграть по конкретным
                  неизученным словам из учебника, либо пройтись по всем словам
                    выбранной категории.
                </p>
              </li>
              <li>
                <h3>
                  Для авторизованных пользователей доступен дополнительный функционал.
                </h3>
                <p>
                  Зарегистрируйтесь, чтобы использовать все возможности приложения по
                  максимуму! Зарегистрированным пользователям доступны раздел статистики
                  и ручное управление прогрессом изучения слов.
                </p>
              </li>
              <li>
                <h3>
                  Интеллектуальная система контроля изучения слов.
                </h3>
                <p>
                  Авторизуйтесь, активно пользуйтесь приложением, играйте в мини-игры и наши
                  алгоритмы будут автоматически отслеживать ваш прогресс, отмечать
                  изученные слова, а также те слова, которые даются вам тяжелее всего.
                </p>
              </li>
            </ul>
          </section>
          <section className="main__video">
            <h2>Краткий курс по работе с приложением</h2>
            <div className="video-wrapper">
              <div className="embed-container"><iframe src="https://www.youtube.com/embed/zwG4mQah58k" frameBorder="0" allowFullScreen title="RS Lang video" /></div>
            </div>
          </section>
          <section className="main__developers">
            <h2>О команде</h2>
            <div className="developers__container">
              <div className="developers__wrapper">
                <div className="developers__card">
                  <div className="developers__card-image">
                    <a href="https://github.com/dino19981" className="github__link" target="_blank" rel="noreferrer">
                      <img src="./assets/artem.jpg" alt="Artem Stepanov" />
                    </a>
                  </div>
                  <div className="developers__card-info">
                    <h3>Артем Степанов</h3>
                    <div className="developers__card-details">
                      Тимлид. Архитектура приложения, бэкенд, учебник,
                      статистика, миниигра &laquo;Аудиовызов&raquo;.
                    </div>
                  </div>
                </div>
                <div className="developers__card">
                  <div className="developers__card-image">
                    <a href="https://github.com/bvfromru" className="github__link" target="_blank" rel="noreferrer">
                      <img src="./assets/vitaliy.jpg" alt="Vitaliy Budkin" />
                    </a>
                  </div>
                  <div className="developers__card-info">
                    <h3>Виталий Будкин</h3>
                    <div className="developers__card-details">
                      Верстка, дизайн, мини-игры &laquo;Спринт&raquo; и &laquo;Саванна&raquo;.
                    </div>
                  </div>
                </div>
                <div className="developers__card">
                  <div className="developers__card-image">
                    <a href="https://github.com/dimavnuk" className="github__link" target="_blank" rel="noreferrer">
                      <img src="./assets/dmitry.jpg" alt="Dima Vnuk" />
                    </a>
                  </div>
                  <div className="developers__card-info">
                    <h3>Дмитрий Внук</h3>
                    <div className="developers__card-details">
                      Создание репозитория, разбивка на компоненты. Выбыл из участия в проекте
                      в связи с началом стажировки.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
}

export default Main;
