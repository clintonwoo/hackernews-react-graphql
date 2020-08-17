import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { SUBMIT_NEWS_ITEM_MUTATION } from '../src/data/mutations/submit-news-item-mutation';
import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';
import { render } from 'enzyme';


interface ISubmitPageProps {
  router;
}

function SubmitPage(props: ISubmitPageProps): JSX.Element {
  const { router } = props;

  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [showText, setShowText] = useState<boolean>(false);

  const [submitNewsItem] = useMutation(SUBMIT_NEWS_ITEM_MUTATION, {
    variables: { title, subtitle, url },
    onCompleted(res) {
      if (res && res.data) {
        //Router.push(`/item?id=${res.data.submitNewsItem.id}`);
        Router.push(`/news`);
      }else if(res && res.submitNewsItem.id){
        //Router.push(`/item?id=${res.submitNewsItem.id}`);
        Router.push(`/?newRecord=${res.submitNewsItem.id}`);
      }
    },
    onError(err) {
      console.error(err);
    },
  });

  return (
    
    <MainLayout
      currentUrl={router.pathname}
      title="Submit"
      isNavVisible={true}
      isFooterVisible={false}
      isLoginVisible={false}
    >
      
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setTitle(e.target.value);
                      }}
                    />
                    <span style={{ marginLeft: '10px' }} />
                  </td>
                </tr>
                <tr>
                  <td>subtitle</td>
                  <td>
                    <input
                      type="text"
                      name="subtitle"
                      defaultValue=""
                      placeholder="(otional)"
                      size={50}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setSubtitle(e.target.value);
                      }}
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setUrl(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                {showText?
                <tr>
                  <td />
                  <td>
                    <b>or</b>
                  </td>
                </tr>:null}
                {showText?
                <tr>
                  <td>text</td>
                  <td>
                    <textarea
                      name="text"
                      rows={4}
                      cols={49}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
                        setText(e.target.value);
                      }}
                    />
                  </td>
                </tr>:null}
                
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
                      onClick={(): Promise<any> => submitNewsItem()}
                    />
                  </td>
                </tr>
                <tr style={{ height: '20px' }} />
                <tr>
                  <td />
                  <td>
                    
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

export default withDataAndRouter(SubmitPage);
