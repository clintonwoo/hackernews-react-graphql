import gql from 'graphql-tag';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';
import { graphql } from 'react-apollo';

import {
  ISubmitNewsItemGraphQL,
  submitNewsItemMutation,
} from '../src/data/mutations/submit-news-item-mutation';
import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';

interface ISubmitPageProps extends ISubmitPageOwnProps {
  submitNewsItem: (title: string, url: string, text: string) => void;
}

interface ISubmitPageOwnProps {
  currentUrl: string;
}

function SubmitPageView(props: ISubmitPageProps): JSX.Element {
  const { currentUrl, submitNewsItem } = props;

  let title = '';
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    title = e.target.value;
  };

  let url = '';
  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    url = e.target.value;
  };

  let text = '';
  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    text = e.target.value;
  };

  return (
    <MainLayout currentUrl={currentUrl} title="Submit" isNavVisible={false} isFooterVisible={false}>
      <tr>
        <td>
          <form onSubmit={(e): void => e.preventDefault()}>
            <input type="hidden" name="fnid" value="GvyHFpy11L26dCAIgGQ9rv" />
            <input type="hidden" name="fnop" value="submit-page" />
            <script type="text/javascript">
              {
                "function tlen(el) { var n = el.value.length - 80; el.nextSibling.innerText = n > 0 ? n + ' too long' : ''; }"
              }
            </script>
            <table style={{ border: '0' }}>
              <tbody>
                <tr>
                  <td>title</td>
                  <td>
                    <input
                      type="text"
                      name="title"
                      defaultValue=""
                      size={50}
                      onChange={onTitleChange}
                    />
                    <span style={{ marginLeft: '10px' }} />
                  </td>
                </tr>
                <tr>
                  <td>url</td>
                  <td>
                    <input
                      type="text"
                      name="url"
                      defaultValue=""
                      size={50}
                      onChange={onUrlChange}
                    />
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
                    <textarea name="text" rows={4} cols={49} onChange={onTextChange} />
                  </td>
                </tr>
                <tr>
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td>
                    <input
                      type="submit"
                      value="submit"
                      onClick={(): void => submitNewsItem(title, url, text)}
                    />
                  </td>
                </tr>
                <tr style={{ height: '20px' }} />
                <tr>
                  <td />
                  <td>
                    Leave url blank to submit a question for discussion. If there is no url, the
                    text (if any) will appear at the top of the thread.
                    <br />
                    <br />
                    You can also submit via{' '}
                    <Link href="/bookmarklet">
                      <a rel="nofollow">
                        <u>bookmarklet</u>
                      </a>
                    </Link>
                    .
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </td>
      </tr>
    </MainLayout>
  );
}

const PageWithData = graphql<ISubmitPageOwnProps, ISubmitNewsItemGraphQL, {}, ISubmitPageProps>(
  gql(submitNewsItemMutation),
  {
    props: ({ ownProps, mutate }) => ({
      ...ownProps,
      submitNewsItem: (title: string, url: string, text: string): Promise<void> =>
        mutate!({
          variables: { title, url, text },
        })
          .then((res) => {
            if (res && res.data) {
              Router.push(`/item?id=${res.data.submitNewsItem.id}`);
            }
          })
          .catch((reason) => console.error(reason)),
    }),
  }
)(SubmitPageView);

export const SubmitPage = withDataAndRouter((props) => (
  <PageWithData currentUrl={props.router.pathname} />
));

export default SubmitPage;
