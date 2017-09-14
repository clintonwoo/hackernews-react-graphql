import React from 'react';
import Link from 'next/link';

import Notice from '../layouts/Notice';

export default () => (
  <Notice>
    <b>Hacker News FAQ</b>
    <br />
    <br />
    <b>Are there rules about submissions and comments?</b>
    <p>
      <Link prefetch href="/newsguidelines">
        <a>https://news.ycombinator.com/newsguidelines</a>
      </Link>
    </p>
    <p>
      <b>How are stories ranked?</b>
    </p>
    <p>
      The basic algorithm divides points by a power of the time since
      a story was submitted.  Comments in comment threads are ranked
      the same way.
    </p>
    <p>
      Other factors affecting rank include user flags, anti-abuse
      software, software which downweights overheated discussions, and
      moderator intervention.
    </p>
    <p>
      <b>How is a user&#39;s karma calculated?</b>
    </p>
    <p>
      Roughly, the number of upvotes on their stories and comments
      minus the number of downvotes.  The numbers don&#39;t match
      up exactly, because some votes aren&#39;t counted to prevent abuse.
    </p>
    <p>
      <b>Why don&#39;t I see down arrows?</b>
    </p>
    <p>
      There are no down arrows on stories. They appear on comments after
      users reach a certain karma threshold, but never on direct replies.
    </p>
    <p>
      <b>What kind of formatting can you use in comments?</b>
    </p>
    <p>
      <Link prefetch href="/formatdoc">
        <a>http://news.ycombinator.com/formatdoc</a>
      </Link>
    </p>
    <p>
      <b>How do I submit a question?</b>
    </p>
    <p>
      Use the submit link in the top bar, and leave the url field blank.
    </p>
    <p>
      <b>How do I make a link in a question?</b>
    </p>
    <p>
      You can&#39;t. This is to prevent people from submitting a link
      with their comments in a privileged position at the top of the
      page. If you want to submit a link with comments, just submit it, then
      add a regular comment.
    </p>
    <p>
      <b id="cflag">How do I flag a comment?</b>
    </p>
    <p>
      Click on its timestamp to go to its page, then click the &#39;flag&#39; link
      at the top. There&#39;s a small karma threshold before flag links appear.
    </p>
    <p>
      <b>Are reposts ok?</b>
    </p>
    <p>
      If a story has had significant attention in the last year or so, we
      kill reposts as duplicates. If not, a small number of reposts is ok.
    </p>
    <p>
      Please don&#39;t delete and repost the same story, though. Accounts that
      do that eventually lose submission privileges.
    </p>
    <p>
      <b>Are paywalls ok?</b>
    </p>
    <p>
      It&#39;s ok to post stories from sites with paywalls that have workarounds.
    </p>
    <p>
      In comments, it&#39;s ok to ask how to read an article and to help other
      users do so. But please don&#39;t post complaints about paywalls. Those
      are off topic.
    </p>
    <p />
    <p>
      <b>Can I ask people to upvote my submission?</b>
    </p>
    <p>
      No. Users should vote for a story because it&#39;s intellectually interesting,
      not because someone is promoting it.
    </p>
    <p>
      When the software detects a voting ring, it penalizes the post.
      Accounts that vote like this eventually get their votes ignored.
    </p>
    <p>
      <b>Can I post a job ad?</b>
    </p>
    <p>
      Please do not post job ads as story submissions to HN.
    </p>
    <p>
      A regular &quot;Who Is Hiring?&quot; thread appears on the first weekday of each
      month. Most job ads are welcome there. (But only an account called <Link prefetch href="/submitted?id=whoishiring"><a>whoishiring</a></Link> is allowed to submit
      the thread itself. This prevents a race to post it first.)
    </p>
    <p>
      The other kind of job ad is reserved for YC-funded startups. These
      appear on the front page, but are not stories: they have no vote arrows,
      points, or comments. They begin part-way down, then fall steadily, and
      only one should be on the front page at a time.
    </p>
    <p>
      <b>Why can&#39;t I post a comment to a thread?</b>
    </p>
    <p>
      Threads are closed to new comments after two weeks, or if the
      submission has been killed by software, moderators, or user flags.
    </p>
    <p>
      <b>In my profile, what does showdead do?</b>
    </p>
    <p>
      If you turn it on, you&#39;ll see all the stories and comments that
      have been killed by HN&#39;s software, moderators, and user flags.
    </p>
    <p>
      <b>In my profile, what is delay?</b>
    </p>
    <p>
      It gives you time to edit your comments before they appear to others.
      Set it to the number of minutes you&#39;d like. The maximum is 10.
    </p>
    <p>
      <b>In my profile, what is noprocrast?</b>
    </p>
    <p>
      It&#39;s a way to help you prevent yourself from spending too much time
      on HN.  If you turn it on you&#39;ll only be allowed to visit the site for
      maxvisit minutes at a time, with gaps of minaway minutes in between.
      The defaults are 20 and 180, which would let you view the site for
      20 minutes at a time, and then not allow you back in for 3 hours.
      You can override noprocrast if you want, in which case your visit
      clock starts over at zero.
    </p>
    <p>
      <b>How do I submit a poll?</b>
    </p>
    <p>
      <Link prefetch href="/newpoll">
        <a>http://news.ycombinator.com/newpoll</a>
      </Link>
    </p>
    <p>

      <b>How do I reset my password?</b>
    </p>
    <p>
      If you have an email address in your profile, you can request a password reset <Link prefetch href="/forgot?id="><a>here</a></Link>. If you haven&#39;t, you can create a new account or email hn@ycombinator.com for help.
    </p>
    <p>
      <b>My IP address seems to be banned. How can I unban it?</b>
    </p>
    <p>
      If you request many pages too quickly, your IP address might get banned. The <Link prefetch href="/item?id=4761102"><a>self-serve unbanning procedure</a></Link> works most of the time.
    </p>
    <p>
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
    <p /* align="center" */ >
      <span className="foot">
        <br />
        <br />
      </span>
    </p>
  </Notice>
);
