import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import HeaderNav from './HeaderNav';

const Header = props => (
  <tr>
    <td style={{ backgroundColor: '#ff6600', padding: '0px' }} >
      <table style={{ border: '0px', padding: '2px', borderSpacing: '0px', width: '100%' }}>
        <tbody>
          <tr>
            <td style={{ width: '18px', padding: '0px', paddingRight: '4px' }}>
              <Link prefetch href="/">
                <a>
                  <img src="/static/y18.gif" style={{ width: '18px', height: '18px', border: '1px', borderColor: 'white', borderStyle: 'solid' }} />
                </a>
              </Link>
            </td>
            <td style={{ lineHeight: '12px', height: '10px', padding: '0px' }}>
              <HeaderNav {...props} />
            </td>
            
            <td style={{ textAlign: 'right', padding: '0px', paddingRight: '4px' }}>
              {
                props.me ?
                  <span className="pagetop">
                    <Link prefetch href={`/user?id=${props.me.id}`}>
                      <a>
                        {props.me.id}
                      </a>
                    </Link>
                    {` (${props.me.karma}) | `}
                    <a href={`/logout?auth=d78ccc2c6120ffe08f32451519c2ff46d34c51ab&amp;goto=${props.currentURL}`}>logout</a>
                  </span>
                  :
                  <span className="pagetop">
                    <Link prefetch href={`/login?goto=${props.currentURL}`}>
                      <a>
                        login
                      </a>
                    </Link>
                  </span>
              }
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
);
Header.defaultProps = {
  me: null,
};
Header.propTypes = {
  me: PropTypes.shape({
    id: PropTypes.string,
    karma: PropTypes.number,
  }),
  currentURL: PropTypes.string.isRequired,
  isNavVisible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
