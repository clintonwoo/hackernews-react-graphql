import React from 'react';
import Link from 'next/link';

import Notice from '../layouts/Notice';

export default () => (
  <Notice>
    <b>Show HN</b>
    <br />
    <br />
    <p>
      Show HN is a way to share something that you've made on Hacker News.
    </p>
    <p>
      The current Show HNs can be found via <Link prefetch href="/show"><a>show</a></Link> in
      the top bar, and the newest are <Link prefetch href="/shownew"><a>here</a></Link>.
      To post one, simply <Link prefetch href="/submit"><a>submit</a></Link> a story
      whose title begins with "Show HN".
    </p>
    <p>
      <b>What to Submit</b>
    </p>
    <p>
      Show HN is for something you've made that other people can play with.
      HN users can try it out, give you feedback, and ask questions in the
      thread.
    </p>
    <p>
      A Show HN needn't be complicated or look slick. The community is
      comfortable with work that's at an early stage.
    </p>
    <p>
      If your work isn't ready for people to try out yet, please don't do
      a Show HN. Once it's ready, come back and do it then.
    </p>
    <p>
      Blog posts, sign-up pages, and fundraisers can't be tried
      out, so they can't be Show HNs.
    </p>
    <p>
      New features and upgrades ("Foo 1.3.1 is out") generally aren't substantive
      enough to be Show HNs. A major overhaul is probably ok.
    </p>
    <p>
      <b>In Comments</b>
    </p>
    <p>
      Be respectful. Anyone sharing work is making a contribution, however modest.
    </p>
    <p>
      Ask questions out of curiosity. Don't cross-examine.
    </p>
    <p>
      Instead of "you're doing it wrong", suggest alternatives. When someone
      is learning, help them learn more.
    </p>
    <p>
      When something isn't good, you needn't pretend that it is. But don't be
      gratuitously negative.
    </p>
    <p>
      <br />
      <br />
      <table width="100%" style={{ padding: '0px', backgroundColor: '#ff6600' }}>
        <tbody>
          <tr style={{ height: '0px' }} >
            <td style={{ padding: '0px' }} />
          </tr>
        </tbody>
      </table>
    </p>
    <p>
      <span className="foot">
        <br />
        <br />
      </span>
    </p>
  </Notice>
);
