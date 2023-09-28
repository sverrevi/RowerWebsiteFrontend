import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function NavigationBar() {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="navbar">
      <Link to="/rowers" className="nav-link" onClick={() => handleNavigation('/rowers')}>
        Rowers
      </Link>
      <Link to="/rowingclubs" className="nav-link" onClick={() => handleNavigation('/rowingclubs')}>
        Rowing Clubs
      </Link>
    </div>
  );
}

export default NavigationBar;
