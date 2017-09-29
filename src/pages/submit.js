import React from 'react';
import { graphql } from 'react-apollo';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';

import Main from '../layouts/Main';
import withData from '../helpers/withData';
import submitNewsItem from '../data/mutations/submitNewsItem';

// class Newest extends React.Component {
const Page = ({ submitNewsItem, currentURL }) => {
  let title;
  const onTitleChange = (e) => { title = e.target.value; };
  let url;
  const onUrlChange = (e) => { url = e.target.value; };
  let text;
  const onTextChange = (e) => { text = e.target.value; };

  return (
    <Main currentURL={currentURL} title={'Submit'} isNavVisible={false} isFooterVisible={false}>
      <tr>
        <td>
          <form onSubmit={e => e.preventDefault()} /*  method="post" action="/r" */>
            <input type="hidden" name="fnid" value="GvyHFpy11L26dCAIgGQ9rv" />
            <input type="hidden" name="fnop" value="submit-page" />
            <script type="text/javascript">{"function tlen(el) { var n = el.value.length - 80; el.nextSibling.innerText = n > 0 ? n + ' too long' : ''; }"}</script>
            <table style={{ border: '0' }} >
              <tbody>
                <tr>
                  <td>title</td>
                  <td>
                    <input type="text" name="title" defaultValue="" size="50" onChange={onTitleChange} />
                    <span style={{ marginLeft: '10px' }} />
                  </td>
                </tr>
                <tr>
                  <td>url</td>
                  <td>
                    <input type="text" name="url" defaultValue="" size="50" onChange={onUrlChange} />
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
                    <textarea name="text" rows="4" cols="49" onChange={onTextChange} />
                  </td>
                </tr>
                <tr>
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td>
                    <input type="submit" value="submit" onClick={() => submitNewsItem(title, url, text)} />
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
                    You can also submit via <Link prefetch href="/bookmarklet"><a rel="nofollow"><u>bookmarklet</u></a></Link>.
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </td>
      </tr>
    </Main>
  );
};
Page.propTypes = {
  submitNewsItem: PropTypes.func.isRequired,
  currentURL: PropTypes.string.isRequired,
};

const PageWithData = graphql(submitNewsItem, {
  props: ({ ownProps, mutate }) => ({
    submitNewsItem: (title, url, text) => mutate({
      variables: { title, url, text },
    })
      .then(({ data }) => Router.push(`/item?id=${data.submitNewsItem.id}`))
      .catch(reason => console.error(reason)),
  }),
})(Page);

export default withData(props => (
  <PageWithData currentURL={props.url.pathname} />
));
