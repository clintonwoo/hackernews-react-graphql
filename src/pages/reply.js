import React from 'react';
import {
  graphql,
  gql,
} from 'react-apollo';

import Main from '../layouts/Main';
import Comment from '../components/presentational/Comment';
import withData from '../helpers/withData';


const query = gql`
  query Comment($id: Int!) {
    comment(id: $id) {
      id
      ...Comment
    }
  }
  ${Comment.fragments.comment}
`;
const variables = {
  id: 100,
};

const page = ({ data: { loading, error, comment }, data, options }) => {
  const vote = () => {
    console.log('onclick');
  };
  const toggle = () => {
    console.log('toggle');
  };
  return (
    <tr>
      <td>
        <table className="fatitem" style={{ border: '0' }}>
          <tbody>
            <tr className="athing" id="15260438">
              <td className="ind" />
              <td style={{ verticalAlign: 'top' }} className="votelinks">
                <center>
                  <a id="up_15260438" onClick={vote} href="vote?id=15260438&amp;how=up&amp;auth=82a0b28fffc36f0d2f3e733c3a339bb29315dd10&amp;goto=reply%3Fgoto%3Ditem%3Fid%3D15260384%2315260438%26id%3D15260438#15260438">
                    <div className="votearrow" title="upvote" />
                  </a>
                </center>
              </td>
              <td className="default">
                <div style={{ marginTop: '2px', marginBottom: '-10px' }}>
                  <span className="comhead">
                    <a href="user?id=philipkglass" className="hnuser">
                      philipkglass
                    </a>
                    <span className="age">
                      <a href="item?id=15260438">2 hours ago</a>
                    </span>
                    <span id="unv_15260438" />
                    <span className="par"> | <a href="item?id=15260384">parent</a></span>
                    <a className="togg" href="javascript:void(0)" onClick={toggle} />
                    <span className="storyon"> | on: <a href="item?id=15260384">Electric dump truck stores as much energy as 8 Mod...</a></span>
                  </span>
                </div>
                <br />
                <div className="comment">
                  <span className="c00">
                    <i>
                      Because the vehicle is electric, there is no need to “heat up” the brakes when descending. This is because the enormous electric engine acts as a generator and recharges the battery pack. That same energy is then used to help the vehicle travel back up the hill. Phys reports, “If all goes as planned, the electric dumper truck will even harvest more electricity while traveling downhill than it needs for the ascent. Instead of consuming fossil fuels, it would then feed surplus electricity into the grid.”
                    </i>
                    <p>
                      Clever. It can do this because it travels uphill empty and comes downhill full.
                      <span />
                    </p>
                    <div className="reply" />
                  </span>
                </div>
              </td>
            </tr>
            <tr style={{ height: '10px' }} />
            <tr>
              <td colSpan="2" />
              <td>
                <form method="post" action="comment">
                  <input type="hidden" name="parent" value="15260438" />
                  <input type="hidden" name="goto" value="item?id=15260384#15260438" />
                  <input type="hidden" name="hmac" value="d4cda96b7000a0e0cd578dde21feb6c9070cda8a" />
                  <textarea name="text" rows="6" cols="60" />
                  <br />
                  <br />
                  <input type="submit" value="reply" />
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
};

const ReplyToComment = graphql(query, {
  options: {
    variables,
  },
  props: ({ data }) => ({
    data,
  }),
})(page);

export default withData((props) => {
  variables.id = (props.url.query && +props.url.query.id) || 0;
  return (
    <Main title="Add Comment" currentURL={props.url.pathname} isNavVisible={false}>
      <ReplyToComment />
    </Main>
  );
});
