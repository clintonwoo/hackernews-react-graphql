import React from 'react';
import Head from 'next/head';

import Blank from '../layouts/Blank';

const spanStyle = { fontSize: '11.5pt', fontFamily: 'Helvetica', color: '#444444' };
const paragraphStyle = { marginBottom: '7.5pt', lineHeight: 'normal', background: 'white' };
const liStyle = { color: '#444444', marginBottom: '15.0pt', lineHeight: 'normal', background: 'white' };
const liSpanStyle = { fontSize: '10.5pt', fontFamily: 'Helvetica' };
const paragraphStyle2 = { marginTop: '7.5pt', marginRight: '0in', marginBottom: '15.0pt', marginLeft: '0in', lineHeight: 'normal', background: 'white' };
const bSpanStyle = { fontSize: '13.5pt', fontFamily: 'Helvetica', color: '#444444' };


export default props => (
  <Blank>
    <Head>
      <link rel="stylesheet" type="text/css" href="/static/dmca.css" />
    </Head>
    <p
      className="MsoNormal"
      style={{
        marginBottom: '15.0pt',
        lineHeight: 'normal',
        background: 'white',
      }}
    >
    <span style={spanStyle}>Y Combinator
    has adopted the following policy toward copyright infringement on the Services
    in accordance with the Digital Millennium Copyright Act (a copy of which is
    located at </span><a href="http://www.loc.gov/copyright/legislation/dmca.pdf">
    <span style={{ fontSize: '11.5pt', fontFamily: 'Helvetica' }}>http://www.loc.gov/copyright/legislation/dmca.pdf</span></a>
    <span style={spanStyle}>, the "<b>DMCA</b>").
    The address of Y Combinator's Designated Agent for copyright takedown notices
    ("<b>Designated Agent</b>") is listed below.</span></p>

    <p className="MsoNormal" style={paragraphStyle}><b><span style={bSpanStyle}>Reporting
    Instances of Copyright Infringement:</span></b></p>

    <p className="MsoNormal" style={paragraphStyle2}><span style={spanStyle}>If you believe that content residing
    or accessible on or through the our website (“Services”) infringes a copyright,
    please send a written notice (by fax or regular mail) to the Designated Agent
    at the address below. <b>You may not communicate the information specified
    below by email. </b>Please note that you will be liable for damages (including
    costs and attorney’s fees) if you materially misrepresent that material is
    infringing your copyright(s). Please use the following format (including
    section numbers) when you send written notice to us: </span></p>

    <ol style={{ marginTop: '0in' }} start="1" type="1">
     <li className="MsoNormal" style={liStyle}><span style={liSpanStyle}>Identification
         of the work or material being infringed. <i>&nbsp;</i></span></li>
     <li className="MsoNormal" style={liStyle}><span style={liSpanStyle}>Identification
         of the material that is claimed to be infringing, including its location,
         with sufficient detail so that Y Combinator is capable of finding it and
         verifying its existence.</span></li>
     <li className="MsoNormal" style={liStyle}><span style={liSpanStyle}>Contact
         information for the notifying party (the "<b>Notifying Party</b>"),
         including name, address, telephone number and e-mail address.</span></li>
     <li className="MsoNormal" style={liStyle}><span style={liSpanStyle}>A
         statement that the Notifying Party has a good faith belief that the
         material is not authorized by the copyright owner, its agent or law.</span></li>
     <li className="MsoNormal" style={liStyle}><span style={liSpanStyle}>A
         statement made under penalty of perjury that the information provided in
         the notice is accurate and that the Notifying Party is either the
         copyright owner, or authorized to make the complaint on behalf of the
         copyright owner.</span></li>
     <li className="MsoNormal" style={liStyle}><span style={liSpanStyle}>A
         signature of the copyright owner, or a person authorized to act on behalf
         of the owner of the copyright that has been allegedly infringed.</span></li>
    </ol>

    <p className="MsoNormal" style={paragraphStyle2}><span style={spanStyle}>After removing material pursuant to
    a valid DMCA notice, Y Combinator will notify the Subscriber responsible for the
    allegedly infringing material that it has removed or disabled access to the
    material. Y Combinator reserves the right, in its sole discretion, to
    immediately terminate the account of any Subscriber who is the subject of
    repeated DMCA notifications.</span></p>

    <p className="MsoNormal" style={paragraphStyle}><b><span style={bSpanStyle}>Submitting
    a DMCA Counter-Notification:</span></b></p>

    <p className="MsoNormal" style={paragraphStyle2}><span style={spanStyle}>If you believe you are the wrongful
    subject of a DMCA notification, you may file a counter-notification with Y Combinator
    by providing the following information to the Designated Agent at the address
    below:</span></p>

    <ul style={{ marginTop: '0in' }} type="disc">
     <li className="MsoNormal" style={liStyle}><span style={liSpanStyle}>The
         specific URLs of material that Y Combinator has removed or to which
         Y Combinator has disabled access.</span></li>
     <li className="MsoNormal" style={liStyle}><span style={liSpanStyle}>Your
         name, address, telephone number, and email address.</span></li>
     <li className="MsoNormal" style={liStyle}><span style={liSpanStyle}>A
         statement that you consent to the jurisdiction of Federal District Court
         for the judicial district in which your address is located (or the federal
         district courts located in San Francisco, CA if your address is outside of
         the United States), and that you will accept service of process from the
         person who provided the original DMCA notification or an agent of such
         person.</span></li>
     <li className="MsoNormal" style={liStyle}><span style={liSpanStyle}>The
         following statement: "I swear, under penalty of perjury, that I have
         a good faith belief that the material was removed or disabled as a result
         of a mistake or misidentification of the material to be removed or
         disabled."</span></li>
     <li className="MsoNormal" style={liStyle}><span style={liSpanStyle}>Sign
         the written document.</span></li>
    </ul>

    <p className="MsoNormal" style={paragraphStyle2}><span style={spanStyle}>Upon receipt of a valid
    counter-notification, Y Combinator will forward it to Notifying Party who
    submitted the original DMCA notification. The original Notifying Party (or the
    copyright holder he or she represents) will then have ten (10) days to notify
    us that he or she has filed legal action relating to the allegedly infringing
    material. If Y Combinator does not receive any such notification within ten (10)
    days, we may restore the material to the Services.</span></p>

    <p className="MsoNormal" style={paragraphStyle}><b><span style={bSpanStyle}>Designated Agent</span></b></p>

    <p className="MsoNormal" style={paragraphStyle2}>
      <span style={spanStyle}>
        Y Combinator<br />
        320 Pioneer Way, Mountain View, CA 94041<br />
        <b>Attn:</b> Copyright Agent; Legal <br />
        <b>Fax:</b> 650.360.3189<br />
        <br />
      </span>
    </p>
    <p className="MsoNormal">&nbsp;</p>
  </Blank>
);
