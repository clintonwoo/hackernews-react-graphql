import React from 'react';

import Main from '../layouts/Main';

import data from '../data/SampleData';

const HomePage = () => (
  <Main user={data.users[0]} isFooterVisible={false} >
    <tr>
      <td>
        <form className="profileform" method="post" action="/xuser">
          <input type="hidden" name="id" value="clintonwoo" />
          <input type="hidden" name="hmac" value="71104445c3c41b4167c38db67a656e610d5fbad9" />
          <table border="0">
            <tbody>
              <tr className="athing">
                <td valign="top">user:</td>
                <td timestamp="1503454410">
                  <a href="/user?id=clintonwoo" className="hnuser">
                    <font color="#3c963c">clintonwoo</font>
                  </a>
                </td>
              </tr>
              <tr>
                <td valign="top">created:</td><td>4 days ago</td>
              </tr>
              <tr>
                <td valign="top">karma:</td>
                <td>1</td>
              </tr>
              <tr>
                <td valign="top">about:</td>
                <td>
                  <textarea cols="60" rows="5" wrap="virtual" name="about" />
                  <font size="-2">
                    <a href="formatdoc" tabIndex="-1">
                      <font color="#afafaf">help</font>
                    </a>
                  </font>
                </td>
              </tr>
              <tr>
                <td valign="top">email:</td>
                <td>
                  <input type="text" name="uemail" value="clinton.d@iinet.net.au" size="60" />
                </td>
              </tr>
              <tr>
                <td valign="top">showdead:</td>
                <td>
                  <select name="showd">
                    <option>yes</option>
                    <option selected="">no</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td valign="top">noprocrast:</td>
                <td>
                  <select name="nopro">
                    <option>yes</option>
                    <option selected="">no</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td valign="top">maxvisit:</td>
                <td>
                  <input type="text" name="maxv" value="20" size="16" />
                </td>
              </tr>
              <tr>
                <td valign="top">minaway:</td>
                <td>
                  <input type="text" name="mina" value="180" size="16" />
                </td>
              </tr>
              <tr>
                <td valign="top">delay:</td>
                <td>
                  <input type="text" name="delay" value="0" size="16" />
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <a href="/changepw"><u>change password</u></a>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <a href="/submitted?id=clintonwoo"><u>submissions</u></a>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <a href="/threads?id=clintonwoo"><u>comments</u></a>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <a href="/hidden"><u>hidden</u></a>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <a href="/upvoted?id=clintonwoo">
                    <u>upvoted submissions</u>
                  </a>
                  {' / '}
                  <a href="/upvoted?id=clintonwoo&amp;comments=t">
                    <u>comments</u>
                  </a>
                  &nbsp;&nbsp;
                  <span style={{ fontStyle: 'italic' }}>(private)</span>
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <a href="/favorites?id=clintonwoo">
                    <u>favorite submissions</u>
                  </a>
                  {' / '}
                  <a href="/favorites?id=clintonwoo&amp;comments=t">
                    <u>comments</u>
                  </a>
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


export default HomePage;
