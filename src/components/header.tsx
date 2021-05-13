import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import { HeaderNav } from './header-nav';

import { store } from 'react-notifications-component';

export interface IHeaderProps {
  me: { id: string; karma: number } | undefined;
  currentUrl: string;
  isNavVisible: boolean;
  title: string;
}

export function Header(props: IHeaderProps): JSX.Element {
  const { currentUrl, isNavVisible, me, title } = props;
  const router = useRouter();

  const validateLogin = (e): void => {

    e.preventDefault();

    console.log(currentUrl);

    var tempUrl = `/logout?auth=d78ccc2c6120ffe08f32451519c2ff46d34c51ab&amp;goto=${currentUrl}`;

    console.log(tempUrl);
    //Router.push(`/logout?auth=d78ccc2c6120ffe08f32451519c2ff46d34c51ab&amp;goto=${currentUrl}`);

    /*   router.push({
        pathname: "/logout",
        query: { logout: true }
      }); */

    router.push(`/logout?auth=d78ccc2c6120ffe08f32451519c2ff46d34c51ab&amp;goto=${currentUrl};logout=true`, undefined, { shallow: true })

    /* Router.push({
      pathname: tempUrl,
      query: { logout: true }
    }); */

  };

  return (
    <tr>
      <td style={{ backgroundColor: '#ff6600', padding: '0px' }}>
        <table style={{ border: '0px', padding: '2px', borderSpacing: '0px', width: '100%' }}>
          <tbody>
            <tr>
              <td style={{ width: '18px', padding: '0px', paddingRight: '4px' }}>
                <Link href="/" >
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
                <HeaderNav currentUrl={currentUrl} isNavVisible={isNavVisible} title={title} />
              </td>
              <td style={{ textAlign: 'right', padding: '0px', paddingRight: '4px' }}>
                { me?
                  <span className="pagetop">
                    <Link href={`/user?id=${me.id}`}>
                      <a>{me.id}</a>
                    </Link>
                    {` (${me.karma}) | `}
                    <a
                      // href={`/logout?auth=d78ccc2c6120ffe08f32451519c2ff46d34c51ab&amp;goto=${currentUrl}`}
                      onClick={validateLogin}
                    >
                      logout
                    </a>
                  </span>
                  : [
                      (currentUrl=='login'
                        ? null
                        : (
                          <span className="pagetop">
                            <Link href={`/login?goto=${currentUrl}`}>
                              <a>login</a>
                            </Link>
                          </span>
                        )
                      )
                    ]
                }
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}
