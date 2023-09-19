// NavigationBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/rowingclubs">Rowing Clubs</Link>
        </li>
        <li>
          <Link to="/rowers">Rowers</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
