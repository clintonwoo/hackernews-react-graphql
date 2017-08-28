import React from 'react';

import Notice from '../layouts/Notice';

const NewsWelcome = () => (
  <Notice>
    <b>Hacker News Guidelines</b>
    <br />
    <br />
    <b>What to Submit</b>
    <p>
      On-Topic: Anything that good hackers would find interesting. That includes
      more than hacking and startups. If you had to reduce it to a sentence,
      the answer might be: anything that gratifies one&#39;s intellectual
      curiosity.
    </p>
    <p>
      Off-Topic: Most stories about politics, or crime, or sports, unless
      they&#39;re evidence of some interesting new phenomenon. Ideological or
      political battle or talking points. Videos of pratfalls or disasters,
      or cute animal pictures. If they&#39;d cover it on TV news, it&#39;s probably
      off-topic.
    </p>
    <p>
      <b>In Submissions</b>
    </p>
    <p>
      Please don&#39;t do things to make titles stand out, like using uppercase or
      exclamation points, or adding a parenthetical remark saying how
      great an article is.  It&#39;s implicit in submitting something that
      you think it&#39;s important.
    </p>
    <p>
      If you submit a link to a video or pdf, please warn us by appending
      [video] or [pdf] to the title.
    </p>
    <p>
      Please submit the original source.  If a post reports on
      something found on another site, submit the latter.
    </p>
    <p>
      If the original title includes the name of the site,
      please take it out, because the site name will be displayed after the link.
    </p>
    <p>
      If the original title begins with a number or number + gratuitous adjective,
      we&#39;d appreciate it if you&#39;d crop it.  E.g. translate &quot;10 Ways
      To Do X&quot; to &quot;How To Do X,&quot; and &quot;14 Amazing Ys&quot; to &quot;Ys.&quot;  Exception:
      when the number is meaningful, e.g. &quot;The 5 Platonic Solids.&quot;
    </p>
    <p>
      Otherwise please use the original title, unless it
      is misleading or linkbait.
    </p>
    <p>
      Please don&#39;t post on HN to ask or tell us something. Instead, please
      send it to hn@ycombinator.com. Similarly, please don&#39;t use HN posts to
      ask YC-funded companies questions that you could ask by emailing them.
    </p>
    <p>
      Please don&#39;t submit so many links at once that the new page is
      dominated by your submissions.
    </p>
    <p>
    <b>In Comments</b>
    </p>
    <p>
      Be civil. Don&#39;t say things you wouldn&#39;t say face-to-face. Don&#39;t be
      snarky. Comments should get more civil and substantive, not less, as a
      topic gets more divisive.
    </p>
    <p>
      When disagreeing, please reply to the argument instead of calling
      names. &quot;That is idiotic; 1 + 1 is 2, not 3&quot; can be shortened to &quot;1 + 1
      is 2, not 3.&quot;
    </p>
    <p>
      Please respond to the strongest plausible interpretation of what
      someone says, not a weaker one that&#39;s easier to criticize.
    </p>
    <p>
      Eschew flamebait. Don&#39;t introduce flamewar topics unless you have
      something genuinely new to say. Avoid unrelated controversies and
      generic tangents.
    </p>
    <p>
      Please don&#39;t insinuate that someone hasn&#39;t read an article.
      &quot;Did you even read the article? It mentions that&quot; can be shortened to
      &quot;The article mentions that.&quot;
    </p>
    <p>
      Please don&#39;t use uppercase for emphasis.  If you want to emphasize
      a word or phrase, put *asterisks* around it and it will get
      italicized.
    </p>
    <p>
      Please don&#39;t accuse others of astroturfing or shillage. Email us
      instead and we&#39;ll look into it.
    </p>
    <p>
      Please don&#39;t complain that a submission is inappropriate. If a story
      is spam or off-topic, flag it. Don&#39;t feed egregious comments by
      replying; <a href="newsfaq.html#cflag">flag</a> them instead. When you
      flag something, please don&#39;t also comment that you did.
    </p>
    <p>
      Please don&#39;t comment about the voting on comments. It never does any
      good, and it makes boring reading.
    </p>
    <p>
      Throwaway accounts are ok for sensitive information, but please don&#39;t
      create them routinely. On HN, users need an identity that others can
      relate to.
    </p>
    <p>
      We ban accounts that use Hacker News primarily for political or
      ideological battle, regardless of which politics they favor.
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
// <br><br>
// </span>
// </p></td>
//     <b>Welcome to Hacker News</b>
//     <br /><br />
//     <p>
//       <a href="/">Hacker News</a> is a bit
//       different from other community sites, and we&#39;d appreciate it if
//       you&#39;d take a minute to read the following as well as the <a href="/newsguidelines">official     guidelines</a>.
//     </p>
//     <p>
//       HN is an experiment.  As a rule, a community site that becomes
//       popular will decline in quality.  Our hypothesis is that this is not
//       inevitable—that by making a conscious effort to resist
//       decline, we can keep it from happening.
//     </p>
//     <p>
//       Essentially there are two rules here: don&#39;t post or upvote crap
//       links, and don&#39;t be rude or dumb in comment threads.
//     </p>
//     <p>
//       A crap link is one that&#39;s only superficially
//       interesting. Stories on HN don&#39;t have to be
//       about hacking, because good hackers aren&#39;t only interested in hacking,
//       but they do have to be deeply interesting.
//     </p>
//     <p>
//       What does &quot;deeply interesting&quot; mean?  It means stuff that teaches you
//       about the world.  A story about a robbery, for example, would
//       probably not be deeply interesting.  But if this robbery was a sign
//       of some bigger, underlying trend, perhaps it could be.
//     </p>
//     <p>
//       The worst thing to post or upvote is something that&#39;s
//       intensely but shallowly interesting: gossip about famous people,
//       funny or cute pictures or videos, partisan political articles, etc.
//       If you let <ax href="http://en.wikipedia.org/wiki/Nile_perch">that
//       sort of thing onto a news site, it will push
//       aside the deeply interesting stuff, which tends to be quieter.</ax>
//     </p>
//     <p>
//       The most important principle on HN, though, is to make thoughtful
//       comments.  Thoughtful in both senses: civil and substantial.
//     </p>
//     <p>
//       The test for substance is a lot like it is for links. Does your
//       comment teach us anything?  There are two ways to do that: by
//       pointing out some consideration that hadn&#39;t previously been mentioned,
//       and by giving more information about the topic, perhaps from personal
//       experience.  Whereas comments like &quot;LOL!&quot; or worse still, &quot;That&#39;s
//       retarded!&quot; teach us nothing.
//     </p>
//     <p>
//       Empty comments can be ok if they&#39;re positive.  There&#39;s nothing wrong
//       with submitting a comment saying just &quot;Thanks.&quot;  What we especially
//       discourage are comments that are empty and negative—comments
//       that are mere name-calling.
//     </p>
//     <p>
//       Which brings us to the most important principle
//       on HN: civility.  Since long before the web, the anonymity of online
//       conversation has lured people into being much ruder than they&#39;d
//       be in person.  So the principle here is: don&#39;t say anything
//       you wouldn&#39;t say face to face.  This doesn&#39;t mean you can&#39;t disagree.
//       But disagree without calling names.
//       If you&#39;re right, your argument will be more convincing without them.
//       <br />
//       <br />
//       <br />
//       <table width="100%" style={{ padding: '0px', backgroundColor: '#ff6600' }}>
//         <tbody>
//           <tr style={{ height: '0px' }} >
//             <td style={{ padding: '0px' }} />
//           </tr>
//         </tbody>
//       </table>
//     </p>
//     <p /*align="center"*/>
//       <span className="foot">
//         <br />
//         <br />
//       </span>
//     </p>

export default NewsWelcome;
