import React from 'react';
import { Link } from 'react-router-dom';
import s from './styles.css';

const GameOverPopup = (props) => {
  const renderPlayer = (player) => (
    <div className={s.player} key={player.position}>
      #{player.position} {player.name} | {(player.score - 100).toFixed(2)} pts | {player.prize} ETH
    </div>
  );

  return (
    <div className={s.popup}>
      <div className={s.title}>GAME OVER</div>

      <div className={s.players}>
        {props.players.map(renderPlayer)}
      </div>

      {/* <div className="fb-share-button" data-href="https://jincortech.github.io/garage/" data-layout="button_count" data-size="small" data-mobile-iframe="true"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fjincortech.github.io%2Fgarage%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Поделиться</a></div> */}

      <div className={s.linkWrap}>
        <Link className={s.link} to="/garage">
          BACK TO GARAGE
        </Link>
      </div>
    </div>
  );
};

export default GameOverPopup;
