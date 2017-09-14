import React from 'react';

import Main from '../layouts/Main';
import withData from '../helpers/withData';

export default withData(props => (
  <Main
    isFooterVisible={false}
    isNavVisible={false}
    isUserVisible={false}
    title="Formatting Options"
  >
    <tr>
      <td>
        <span className="admin">
          <center>
            <table width="500">
              <tbody>
                <tr>
                  <td>
                    Blank lines separate paragraphs.
                    <p>
                      Text after a blank line that is indented by two or more spaces is
                      reproduced verbatim.  (This is intended for code.)
                    </p>
                    <p>
                      Text surrounded by asterisks is italicized, if the character after the
                      first asterisk isn&#39;t whitespace.
                    </p>
                    <p>
                      Urls become links, except in the text field of a submission.
                      <br />
                      <br />
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </center>
        </span>
        <br />
        <br />
      </td>
    </tr>
  </Main>
));
