import * as React from 'react';
import { connect } from 'react-redux';
import Phaser from 'phaser';
import io from 'socket.io-client';

import { fetchInitialData } from '../../redux/modules/game/game';

import Game from './scenes/Game';
import Topbar from '../../components/Game/Topbar';
import Map from '../../components/Game/Map';
import Chat from '../../components/Game/Chat';
import Profile from '../../components/Game/Profile';
import s from './styles.css';
import { getToken } from '../../utils/auth';

class GameContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: []
    };
  }

  componentDidMount() {
    this.socket = io('https://game-api.secrettech.io/race', { query: `token=${getToken()}` });
    // window.game = new Phaser.Game({
    //   type: Phaser.AUTO,
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    //   physics: {
    //     default: 'arcade',
    //     arcade: {
    //       gravity: { y: 0 },
    //       debug: true
    //     }
    //   },
    //   parent: 'content',
    //   scene: [
    //     // Game
    //   ]
    // });

    this.socket.on('connect', () => {
      this.socket.on('init', (data) => {
        console.log(data);
        this.props.fetchInitialData(data);
      });

      // this.socket.on('update', (player) => {
      //   window.game.scene.keys.game.enemies.getChildren().forEach((otherPlayer) => {
      //     if (otherPlayer.id === player.id) {
      //       const percHeight = (window.innerHeight - 256 - 130) / 100;
      //       const percWidth = (window.innerWidth - 130) / 100;
      //       const y = (player.progress * percHeight) + 256 + 65;
      //       const x = (player.x * percWidth) - 65;
      //       otherPlayer.setPosition(x, y);
      //     }
      //   });
      // });
    });
  }

  componentWillUnmount() {
    if (window.game) window.game.destroy();
  }

  render() {
    const {
      start,
      end,
      player
    } = this.props;

    return (
      <div>
        <div className={s.topbar}><Topbar startTS={start} endTS={end}/></div>
        <div className={s.chat}><Chat/></div>
        <div className={s.map}><Map startTS={start} endTS={end}/></div>
        <div className={s.profile}><Profile player={player}/></div>
        <div className={s.backdrop}/>
        <div className={s.container} id="content"></div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    ...state.game.game
  }),
  {
    fetchInitialData
  }
)(GameContainer);
