import React from 'react';
import Link from 'next/link';

import Notice from '../layouts/Notice';

export default () => (
  <Notice>
    <b>Hacker News Security</b>
    <p>
      If you find a security hole, please let us know at <a href="mailto:security@ycombinator.com">security@ycombinator.com</a>. We try to respond (with fixes!) as soon as possible, and really appreciate the help.
    </p>
    <p>
      Thanks to the following people who have discovered and responsibly disclosed security holes in Hacker News:
    </p>
    <p>
      <b>20170430: <a href="http://www.michaelflaxman.com">Michael Flaxman</a></b>
    </p>
    <ul>
      <li>
        The minor version of bcrypt used for passwords was susceptible to a collision in some cases.
      </li>
    </ul>
    <p />
    <p>
      <b>20170414: Blake Rand</b>
    </p>
    <ul>
      <li>Links in comments were vulnerable to an IDN homograph attack.</li>
    </ul>
    <p />
    <p>
      <b>20170315: Blake Rand</b>
    </p>
    <ul>
      <li>The right-to-left override character could be used to obscure link text in comments.</li>
    </ul>
    <p />
    <p>
      <b>20170301: <a href="https://twitter.com/_iamjk">Jaikishan Tulswani</a></b>
    </p>
    <ul>
      <li>Logged-in users could bypass &#39;old password&#39; form field.</li>
    </ul>
    <p />
    <p>
      <b>20160217: <a href="http://www.tjosse.me">Eric Tjossem</a></b>
    </p>
    <ul>
      <li>Logout and login were vulnerable to CSRF.</li>
    </ul>
    <p />
    <p>
      <b>20160113: <a href="https://twitter.com/merttasci_">Mert Taşçi</a></b>
    </p>
    <ul>
      <li>The &#39;forgot password&#39; link was vulnerable to reflected XSS.</li>
    </ul>
    <p />
    <p>
      <b>20150907: <a href="http://www.s4ndeep.com">Sandeep Singh</a></b>
    </p>
    <ul>
      <li>An open redirect was possible by passing a URL with a mixed-case protocol as the <em>goto</em> parameter.</li>
    </ul>
    <p />
    <p>
      <b>20150904: <a href="http://twitter.com/umenmactech">Manish Bhattacharya</a></b>
    </p>
    <ul>
      <li>The site name display for stories was vulnerable to an <a href="https://en.wikipedia.org/wiki/IDN_homograph_attack">IDN homograph attack.</a></li>
    </ul>
    <p />
    <p>
      <b>20150827: <a href="http://twitter.com/chrismarlow9">Chris Marlow</a></b>
    </p>
    <ul>
      <li>Revisions to HN&#39;s markup caused an HTML injection regression.</li>
    </ul>
    <p />
    <p>
      <b>20150624: <a href="http://stephensclafani.com">Stephen Sclafani</a></b>
    </p>
    <ul>
      <li>A form handling bug led to a XSS vulnerability using <a href="http://www.slideshare.net/Wisec/http-parameter-pollution-a-new-category-of-web-attacks">HTTP parameter polution</a>.</li>
    </ul>
    <p />
    <p>
      <b>20150302: Max Bond</b>
    </p>
    <ul>
      <li>Information leaked during /r processing allowed an attacker to discover valid profile edit links and the user for which they were valid.</li>
      <li><em>goto</em> parameters functioned as open redirects.</li>
    </ul>
    <p />
    <p>
      <b>20141101: Ovidiu Toader</b>
    </p>
    <ul>
      <li>In rare cases some users&#39; profiles (including email addresses and password hashes) were mistakenly published to the Firebase API.</li>
    </ul>
    <p>
    See <a href="https://news.ycombinator.com/item?id=8604586">https://news.ycombinator.com/item?id=8604586</a> for details.
    </p>
    <p />
    <p>
      <b>20141027: San Tran</b>
    </p>
    <ul>
      <li>Some pages displaying forms were vulnerable to reflected XSS when provided malformed query string arguments.</li>
    </ul>
    <p />
    <p>
      <b>20140501: <a href="https://titanous.com">Jonathan Rudenberg</a></b>
    </p>
    <ul>
      <li>Some YC internal pages were vulnerable to persistent XSS.</li>
    </ul>
    <p />
    <p>
      <b>20120801: <a href="http://louislang.com/">Louis Lang</a></b>
    </p>
    <ul>
      <li>Redirects were vulnerable to HTTP response splitting via the <em>whence</em> argument.</li>
      <li>Persistent XSS could be achieved via the <em>X-Forwarded-For</em> header.</li>
    </ul>
    <p />
    <p>
      <b>20120720: <a href="http://www.tinfoilsecurity.com">Michael Borohovski</a></b>
    </p>
    <ul>
      <li>Incorrect handling of unauthenticated requests meant anyone could change rsvp status for Demo Day.</li>
    </ul>
    <p />
    <p>
      <b>20090603: <a href="https://www.dfranke.us/">Daniel Fox Franke</a></b>
    </p>
    <ul>
      <li>The state of the PRNG used to generate cookies could be determined from observed outputs. This allowed an attacker to fairly easily determine valid user cookies and compromise accounts.</li>
    </ul>
    <p>
    See <Link prefetch href="/item?id=639976"><a>https://news.ycombinator.com/item?id=639976</a></Link> for details.
    </p>
    <p />
    <p>
      <b>Missing From This List?</b> If you reported a vulnerability to us and don&#39;t see your name, please shoot us an email and we&#39;ll happily add you. We crawled through tons of emails trying to find all reports but inevitably missed some.
    </p>
  </Notice>
);
