import { useMemo, useState, useEffect } from 'react';
import logo from '../../logo.svg';
import './style.css';

function Header({ loading }) {
  // thay đổi dựa prop loading truyền từ thằng APP
  // loading = false , showTile = true
  // loading = true, showTitle = false
  const showTitle = useMemo(() => {
    return !loading;
  }, [loading]);

  // const [showTitle, setShowTitle] = useState(loading);

  // useEffect(() => {
  //   setShowTitle(!loading);
  // }, [loading]);

  return (
    <div className="Header
        d-flex
        flex-column
        align-items-center
        justify-content-center
        mt-4"
    >
      <img src={logo} alt="logo" />
      {showTitle && <h3>Let's search HOOK</h3>}
    </div>
  )
}

export default Header;
