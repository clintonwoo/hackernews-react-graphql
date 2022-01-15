import * as React from 'react';
import { useRouter } from 'next/router';

import { MainLayout } from '../src/layouts/main-layout';
import { withData } from '../src/helpers/with-data';

/** Password recovery email sent page after submitting forgot password */
function PasswordRecoveryPage(): JSX.Element {
  const router = useRouter();

  return (
    <MainLayout
      currentUrl={router?.pathname}
      isFooterVisible={false}
      isNavVisible={false}
      isUserVisible={false}
      title="Message"
    >
      <>
        <tr style={{ height: 10 }} />
        <tr>
          <td>
            <span className="admin">
              <table style={{ width: 500 }}>
                <tbody>
                  <tr>
                    <td>
                      Password recovery message sent. If you don&apos;t see it, you might want to
                      check your spam folder.
                    </td>
                  </tr>
                </tbody>
              </table>
            </span>
            <br />
            <br />
          </td>
        </tr>
      </>
    </MainLayout>
  );
}

export default withData(PasswordRecoveryPage);
