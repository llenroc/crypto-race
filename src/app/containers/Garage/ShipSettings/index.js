import * as React from 'react';
import s from './styles.css';

import Indicator from 'components/Indicator';

export default class ShipSettings extends React.Component {
  render() {
    return (
      <div className={s.container}>
        <div className={s.column}>
          <div className={s.caption}>TUNING</div>
          <Indicator />
        </div>
        <div className={s.column}>
          <div className={s.caption}>YOUR SHIP</div>
        </div>
        <div className={s.column}>
          <div className={s.caption}>SHOP</div>
        </div>
      </div>
    )
  }
}