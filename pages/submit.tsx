import { useQuery } from '@apollo/client';
import { IMeQuery, ME_QUERY } from '../src/data/queries/me-query';
import Link from 'next/link';
import Router from 'next/router';
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { validateTitle, validateUrlorText } from '../src/data/validation/submit';

import { SUBMIT_NEWS_ITEM_MUTATION } from '../src/data/mutations/submit-news-item-mutation';
import { withDataAndRouter } from '../src/helpers/with-data';
import { MainLayout } from '../src/layouts/main-layout';

import { ErrorAction } from '../src/components/error-action';

interface ISubmitPageProps {
  router;
}

function SubmitPage(props: ISubmitPageProps): JSX.Element {
  const { data } = useQuery<IMeQuery>(ME_QUERY);
  const { router } = props;

  const [title, setTitle] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [submitValidationMessage, setSubmitValidationMessage] = useState<string>('');
  const [notLoggedIn, setNotLoggedIn] = React.useState(false);

  const onCancel = () => {
    setNotLoggedIn(false);
  }

  const validateSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    if (!(data?.me)) {
      e.preventDefault();
      setNotLoggedIn(true);
    } else {
      try {
        validateTitle({title});
        validateUrlorText({url, text});
      } catch (err) {
        console.log(err.message);
        setSubmitValidationMessage(err.message);
        e.preventDefault();
      }
    }
  };

  const [submitNewsItem] = useMutation(SUBMIT_NEWS_ITEM_MUTATION, {
    variables: { title, url, text },
    onCompleted(res) {
      if (res && res.data) {
        Router.push(`/item?id=${res.data.submitNewsItem.id}`);
      }
    },
    onError(err) {

      console.error(err);
    },
  });

  return (
    <MainLayout
      currentUrl={router.pathname}
      title="Hacker News"
      isNavVisible={true}
      isFooterVisible={true}
    >
    <React.Fragment>
    <div><ErrorAction onNotLoggedIn={notLoggedIn} onCancel={onCancel} /></div>
      <tr>
        <td>
          <form onSubmit={(e): void => {
              validateSubmit(e);
            }}>
            <input type="hidden" name="fnid" value="GvyHFpy11L26dCAIgGQ9rv" />
            <input type="hidden" name="fnop" value="submit-page" />
            <script type="text/javascript">
              {
                "function tlen(el) { var n = el.value.length - 80; el.nextSibling.innerText = n > 0 ? n + ' too long' : ''; }"
              }
            </script><br></br>
            <table style={{ display: 'flex',  justifyContent:'center', alignItems:'center', border: '0px' }}>
              <tbody>
                <tr style={{ display: 'flex',  justifyContent:'center', alignItems:'center', border: '0px' }}>
                  
                  <td style ={{width: '30px'}}>title</td>
                  <td>
                    <input
                      style ={{width: '400px'}}
                      type="text"
                      name="title"
                      defaultValue=""
                      size={50}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                        setTitle(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <br></br>
                <tr style={{ display: 'flex',  justifyContent:'center', alignItems:'center', border: '0px' }}>
                  <td style ={{width: '30px'}}>url</td>
                  <td>
                    <input
                      style ={{width: '400px'}}
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
                <br></br>
                <tr style={{ display: 'flex',  justifyContent:'center', alignItems:'center', border: '0px' }}>
                  <td />
                  <td>
                    <b>or</b>
                  </td>
                </tr>
                <br></br>
                <tr style={{ display: 'flex',  justifyContent:'center', alignItems:'center', border: '0px' }}>
                  <td style ={{width: '30px'}}>text</td>
                  <td>
                    <textarea
                      name="text"
                      style ={{width: '400px'}}
                      rows={4}
                      cols={49}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
                        setText(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <br></br>
                <tr>
                  <td />
                  <td />
                </tr>
                <tr>
                  <td />
                  <td>
                    {submitValidationMessage && <p style={{ display: 'flex',  justifyContent:'center', alignItems:'center', color: '#f1080e' }}>{submitValidationMessage}</p>}
                    <div style={{display: 'flex',  justifyContent:'center'}}>
                      <input
                        type="submit"
                        value="submit"
                        onClick={(): Promise<any> => submitNewsItem()}
                      />
                    </div>
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
      </React.Fragment>
    </MainLayout>
  );
}

export default withDataAndRouter(SubmitPage);
