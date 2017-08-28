import React from 'react';
import PropTypes from 'prop-types';

import HeaderNav from './HeaderNav';


const Header = props => (
  <tr>
    <td style={{ backgroundColor: '#ff6600', padding: '0px' }} >
      <table style={{ border: '0px', padding: '2px', /*borderCollapse: 'collapse',*/ borderSpacing: '0px', width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ width: '18px', padding: '0px', paddingRight: '4px' }}>
              <a href="/">
                <img src="/static/y18.gif" style={{ width: '18px', height: '18px', border: '1px', borderColor: 'white', borderStyle: 'solid' }} />
              </a>
            </td>
            <td style={{ lineHeight: '12px', height: '10px', padding: '0px' }}>
              <HeaderNav {...props} />
            </td>
            {
              props.isUserVisible &&
              <td style={{ textAlign: 'right', padding: '0px', paddingRight: '4px' }}>
                <span className="pagetop">
                  <a href="/user?id=clintonwoo">clintonwoo</a>
                  {' (1) | '}
                  <a href="/logout?auth=d78ccc2c6120ffe08f32451519c2ff46d34c51ab&amp;goto=news">logout</a>
                </span>
              </td>
            }
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
);
Header.defaultProps = {
  userId: null,
};
Header.propTypes = {
  userId: PropTypes.string,
  isNavVisible: PropTypes.bool.isRequired,
  isUserVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
