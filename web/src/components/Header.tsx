import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { abuseEmail, title } from '../config';

const Header: React.FC = () => {
  const [toggled, setToggled] = useState(false);

  const toggle = () => setToggled(toggled => !toggled);
  const close = () => setToggled(false);

  return (
    <header>
      <button
        className={'toggle ' + (toggled ? 'toggled' : '')}
        onClick={toggle}
        aria-label={toggled ? 'Close menu' : 'Open menu'}
      >
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </button>
      <nav className="menu">
        <h1>
          <Link to="/" className="logo" onClick={close}>
            {title}
          </Link>
        </h1>
        <ul className={toggled ? '' : 'hidden'}>
          {abuseEmail ? (
            <li>
              <Link to="/abuse" onClick={close}>
                report abuse / dmca
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
