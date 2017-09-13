import React from 'react';

import Main from '../layouts/Main';
import NewsFeed from '../components/NewsFeed';

import data from '../data/SampleData';

class Newest extends React.Component {
  onInput() {
    this;
    return "tlen(this)";
  }
  onFocus() {
    this;
    return "tlen(this)";
  }
  submit() {
    this;
  }
  render() {
    return (
      <Main title={'Submit'} isNavVisible={false} isFooterVisible={false}>
        <tr>
          <td>
            <form method="post" action="/r">
              <input type="hidden" name="fnid" value="GvyHFpy11L26dCAIgGQ9rv" />
              <input type="hidden" name="fnop" value="submit-page" />
              <script type="text/javascript">{"function tlen(el) { var n = el.value.length - 80; el.nextSibling.innerText = n > 0 ? n + ' too long' : ''; }"}</script>
              <table style={{ border: '0' }} >
                <tbody>
                  <tr>
                    <td>title</td>
                    <td>
                      <input type="text" name="title" value="" size="50" onInput={this.onInput} onFocus={this.onFocus} />
                      <span style={{ marginLeft: '10px' }} />
                    </td>
                  </tr>
                  <tr>
                    <td>url</td>
                    <td>
                      <input type="text" name="url" value="" size="50" />
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <b>or</b>
                    </td>
                  </tr>
                  <tr>
                    <td>text</td>
                    <td>
                      <textarea name="text" rows="4" cols="49" />
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <input type="submit" value="submit" />
                    </td>
                  </tr>
                  <tr style={{ height: '20px' }} />
                  <tr>
                    <td />
                    <td>
                      Leave url blank to submit a question for discussion. If there
                      is no url, the text (if any) will appear at the top of the
                      thread.
                      <br />
                      <br />
                      You can also submit via <a href="bookmarklet.html" rel="nofollow"><u>bookmarklet</u></a>.
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </td>
        </tr>
      </Main>
    )
  }
}

export default Newest;
