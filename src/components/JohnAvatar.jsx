import React from 'react';
import './JohnAvatar.css';

export default function JohnAvatar({ state = 'idle', size = 'md' }) {
  return (
    <div className={`jav jav--${size} jav--${state}`}>
      <div className="jav__inner">
        {size === 'md' && (
          <div className="jav__antenna">
            <div className="jav__ant-ball" />
            <div className="jav__ant-stick" />
          </div>
        )}
        <div className="jav__head">
          <div className="jav__shine" />
          <div className="jav__visor">
            <div className="jav__eyes">
              <div className="jav__eye jav__eye--l" />
              <div className="jav__eye jav__eye--r" />
            </div>
            <div className="jav__mouth" />
            <div className="jav__think-dots">
              <span /><span /><span />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
