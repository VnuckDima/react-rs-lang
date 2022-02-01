import React from 'react';
import './modal.scss';

type IPopUp = {
  state: {modalActive: boolean, setModalActive: (newState: boolean) => void}
  children: any
}

function Modal({ state, children }:IPopUp) {
  const { modalActive, setModalActive } = state;

  return (
    <div
      role="textbox"
      tabIndex={0}
      className={modalActive ? 'modal active' : 'modal'}
      onClick={() => setModalActive(false)}
      onKeyPress={(e) => e.stopPropagation()}
    >
      <div
        role="textbox"
        tabIndex={0}
        className={modalActive ? 'modal__content active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
        onKeyPress={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
