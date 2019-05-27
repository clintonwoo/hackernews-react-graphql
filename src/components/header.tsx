import Link from 'next/link';
import * as React from 'react';

import { HeaderNav } from './header-nav';

interface IHeaderProps {
  me: {
    id?: string;
    karma?: number;
  };
  currentUrl: string;
  isNavVisible: boolean;
  title: string;
}

export class Header extends React.Component<IHeaderProps> {
  static defaultProps = {
    me: null,
  };

  render(): JSX.Element {
    const props = this.props;

    return (
      <tr>
        <td style={{ backgroundColor: '#ff6600', padding: '0px' }}>
          <table style={{ border: '0px', padding: '2px', borderSpacing: '0px', width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ width: '18px', padding: '0px', paddingRight: '4px' }}>
                  <Link prefetch href="/">
                    <a>
                      <img
                        src="/static/y18.gif"
                        style={{
                          border: '1px',
                          borderColor: 'white',
                          borderStyle: 'solid',
                          height: '18px',
                          width: '18px',
                        }}
                      />
                    </a>
                  </Link>
                </td>
                <td style={{ lineHeight: '12px', height: '10px', padding: '0px' }}>
                  <HeaderNav currentUrl={props.currentUrl} isNavVisible={props.isNavVisible} title={props.title} />
                </td>
                <td style={{ textAlign: 'right', padding: '0px', paddingRight: '4px' }}>
                  {props.me ? (
                    <span className="pagetop">
                      <Link prefetch href={`/user?id=${props.me.id}`}>
                        <a>{props.me.id}</a>
                      </Link>
                      {` (${props.me.karma}) | `}
                      <a href={`/logout?auth=d78ccc2c6120ffe08f32451519c2ff46d34c51ab&amp;goto=${props.currentUrl}`}>
                        logout
                      </a>
                    </span>
                  ) : (
                    <span className="pagetop">
                      <Link prefetch href={`/login?goto=${props.currentUrl}`}>
                        <a>login</a>
                      </Link>
                    </span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    );
  }
}
