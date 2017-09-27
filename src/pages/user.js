import React from 'react';
import Link from 'next/link';
import {
  graphql,
  gql,
} from 'react-apollo';
import PropTypes from 'prop-types';
import renderHTML from 'react-render-html';

import Main from '../layouts/Main';
import Blank from '../layouts/Blank';
import withData from '../helpers/withData';
import timeAgo from '../helpers/convertNumberToTimeAgo';

const Page = ({ loading, error, user, me, options: { currentURL } }) => {
  if (error) return <Blank>Error loading news items.</Blank>;
  if (!user) return <Blank>No such user.</Blank>;

  let about = user.about || '';
  let email = user.email || '';
  const onAboutChange = (e) => { about = e.target.value; };
  const onEmailChange = (e) => { email = e.target.value; };

  if (me && user.id === me.id) return (
    <Main currentURL={currentURL} isFooterVisible={false} >
      <tr>
        <td>
          <form className="profileform" method="post" action="/xuser">
            <input type="hidden" name="id" value="clintonwoo" />
            <input type="hidden" name="hmac" value="71104445c3c41b4167c38db67a656e610d5fbad9" />
            <table style={{ border: '0px' }}>
              <tbody>
                <tr className="athing">
                  <td style={{ verticalAlign: 'top' }}>user:</td>
                  <td>
                    <Link prefetch href="/user?id=clintonwoo">
                      <a className="hnuser">
                        <font color="#3c963c">{user.id}</font>
                      </a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>created:</td><td>{timeAgo(user.creationTime)}</td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>karma:</td>
                  <td>{user.karma}</td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>about:</td>
                  <td>
                    <textarea defaultValue={renderHTML(about)} onChange={onAboutChange} cols="60" rows="5" wrap="virtual" name="about" />
                    <font size="-2">
                      <Link prefetch href="/formatdoc">
                        <a tabIndex="-1">
                          <font color="#afafaf">help</font>
                        </a>
                      </Link>
                    </font>
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>email:</td>
                  <td>
                    <input type="text" name="uemail" defaultValue={email} onChange={onEmailChange} size="60" />
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>showdead:</td>
                  <td>
                    <select defaultValue="no" name="showd">
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>noprocrast:</td>
                  <td>
                    <select defaultValue="no" name="nopro">
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>maxvisit:</td>
                  <td>
                    <input type="text" name="maxv" defaultValue="20" size="16" />
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>minaway:</td>
                  <td>
                    <input type="text" name="mina" defaultValue="180" size="16" />
                  </td>
                </tr>
                <tr>
                  <td style={{ verticalAlign: 'top' }}>delay:</td>
                  <td>
                    <input type="text" name="delay" defaultValue="0" size="16" />
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <Link prefetch href="/changepw">
                      <a><u>change password</u></a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <Link prefetch href="/submitted?id=clintonwoo">
                      <a><u>submissions</u></a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <Link prefetch href="/threads?id=clintonwoo">
                      <a><u>comments</u></a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <Link prefetch href="/hidden">
                      <a><u>hidden</u></a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <Link prefetch href="/upvoted?id=clintonwoo">
                      <a>
                        <u>upvoted submissions</u>
                      </a>
                    </Link>
                    {' / '}
                    <Link prefetch href="/upvoted?id=clintonwoo&amp;comments=t">
                      <a>
                        <u>comments</u>
                      </a>
                    </Link>
                    &nbsp;&nbsp;
                    <span style={{ fontStyle: 'italic' }}>(private)</span>
                  </td>
                </tr>
                <tr>
                  <td />
                  <td>
                    <Link prefetch href="/favorites?id=clintonwoo">
                      <a>
                        <u>favorite submissions</u>
                      </a>
                    </Link>
                    {' / '}
                    <Link prefetch href="/favorites?id=clintonwoo&amp;comments=t">
                      <a>
                        <u>comments</u>
                      </a>
                    </Link>
                    &nbsp;&nbsp;
                    <span style={{ fontStyle: 'italic' }}>(shared)</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <input type="submit" value="update" />
          </form>
          <br />
          <br />
        </td>
      </tr>
    </Main>
  );
  return (
    <Main currentURL={currentURL} isFooterVisible={false} >
      <tr>
        <td>
          <table style={{ border: '0' }} >
            <tbody>
              <tr className="athing">
                <td style={{ verticalAlign: 'top' }}>user:</td>
                <td>
                  <a href={`user?id=${user.id}`} className="hnuser">{user.id}</a>
                </td>
              </tr>
              <tr>
                <td style={{ verticalAlign: 'top' }}>created:</td>
                <td>{timeAgo(user.creationTime)}</td>
              </tr>
              <tr>
                <td style={{ verticalAlign: 'top' }}>karma:</td>
                <td>{user.karma}</td>
              </tr>
              <tr>
                <td style={{ verticalAlign: 'top' }} >about:</td>
                <td>{user.about && renderHTML(user.about)}</td>
              </tr>
              <tr>
                <td />
                <td>
                  <a href={`submitted?id=${user.id}`}><u>submissions</u></a>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <a href={`threads?id=${user.id}`}><u>comments</u></a>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <a href={`favorites?id=${user.id}`}><u>favorites</u></a>
                </td>
              </tr>
            </tbody>
          </table>
          <br />
          <br />
        </td>
      </tr>
    </Main>
  );
};
// Page.propTypes = {
//   user: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     creationTime: PropTypes.string.isRequired,
//   }).isRequired,
// }

const query = gql`
  query User($id: String!) {
    user(id: $id) {
      id
      about
      creationTime
      email
      karma
    }
    me {
      id
    }
  }
`;

const UserPageWithData = graphql(query, {
  options: ({ options: { id } }) => ({
    variables: {
      id,
    },
  }),
  props: ({ data: { loading, error, user, me } }) => ({
    loading,
    error,
    user,
    me,
  }),
})(Page);

export default withData((props) => {
  const userId = (props.url.query && props.url.query.id) || '';
  return (
    <UserPageWithData
      options={{
        id: userId,
        currentURL: props.url.pathname,
        // isFooterVisible: false,
      }}
    />
  );
});
