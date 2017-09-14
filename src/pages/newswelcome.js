import React from 'react';
import Link from 'next/link';

import Notice from '../layouts/Notice';

export default () => (
  <Notice>
    <b>Welcome to Hacker News</b>
    <br /><br />
    <p>
      <Link prefetch href="/"><a>Hacker News</a></Link> is a bit
      different from other community sites, and we&#39;d appreciate it if
      you&#39;d take a minute to read the following as well as the <Link prefetch href="/newsguidelines"><a>official     guidelines</a></Link>.
    </p>
    <p>
      HN is an experiment.  As a rule, a community site that becomes
      popular will decline in quality.  Our hypothesis is that this is not
      inevitable—that by making a conscious effort to resist
      decline, we can keep it from happening.
    </p>
    <p>
      Essentially there are two rules here: don&#39;t post or upvote crap
      links, and don&#39;t be rude or dumb in comment threads.
    </p>
    <p>
      A crap link is one that&#39;s only superficially
      interesting. Stories on HN don&#39;t have to be
      about hacking, because good hackers aren&#39;t only interested in hacking,
      but they do have to be deeply interesting.
    </p>
    <p>
      What does &quot;deeply interesting&quot; mean?  It means stuff that teaches you
      about the world.  A story about a robbery, for example, would
      probably not be deeply interesting.  But if this robbery was a sign
      of some bigger, underlying trend, perhaps it could be.
    </p>
    <p>
      The worst thing to post or upvote is something that&#39;s
      intensely but shallowly interesting: gossip about famous people,
      funny or cute pictures or videos, partisan political articles, etc.
      If you let <a href="http://en.wikipedia.org/wiki/Nile_perch">that
      sort of thing onto a news site, it will push
      aside the deeply interesting stuff, which tends to be quieter.</a>
    </p>
    <p>
      The most important principle on HN, though, is to make thoughtful
      comments.  Thoughtful in both senses: civil and substantial.
    </p>
    <p>
      The test for substance is a lot like it is for links. Does your
      comment teach us anything?  There are two ways to do that: by
      pointing out some consideration that hadn&#39;t previously been mentioned,
      and by giving more information about the topic, perhaps from personal
      experience.  Whereas comments like &quot;LOL!&quot; or worse still, &quot;That&#39;s
      retarded!&quot; teach us nothing.
    </p>
    <p>
      Empty comments can be ok if they&#39;re positive.  There&#39;s nothing wrong
      with submitting a comment saying just &quot;Thanks.&quot;  What we especially
      discourage are comments that are empty and negative—comments
      that are mere name-calling.
    </p>
    <p>
      Which brings us to the most important principle
      on HN: civility.  Since long before the web, the anonymity of online
      conversation has lured people into being much ruder than they&#39;d
      be in person.  So the principle here is: don&#39;t say anything
      you wouldn&#39;t say face to face.  This doesn&#39;t mean you can&#39;t disagree.
      But disagree without calling names.
      If you&#39;re right, your argument will be more convincing without them.
      <br />
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
    <p /*align="center"*/>
      <span className="foot">
        <br />
        <br />
      </span>
    </p>
  </Notice>
);
