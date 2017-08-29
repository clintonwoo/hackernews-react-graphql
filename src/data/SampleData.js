// Interface: Commentable (Object can be commented on) comments, commentCount, commenter
// Interface: Voteable (Object can be voted on) upvotes, upvoteCount, hidden, hiddenCount,
// Data Type: Comment, can be on a news item or another comment
// Every time an upvote/downvote/comment is made, update the count
export default {
  newsItems: [
    {
      id: 1224,
      creationTime: new Date(2017, 8, 21, 16, 12, 16),
      submitterId: 'hvo',
      title: '“Learning How to Learn,” the most popular course on Coursera',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 1,
      points: 171,
    },
    //  (kate.io)
    {
      id: 1225,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'luu',
      title: 'Weird Python Integers',
      text: null,
      url: 'https://kate.io/blog/2017/08/22/weird-python-integers/',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 38,
      rank: 2,
      points: 125,
    },
    {
      id: 1226,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'aLee',
      title: 'I spent my career in tech and wasn’t prepared for its effect on my kids',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 101,
      rank: 3,
      points: 90,
    },
    {
      id: 1222,
      creationTime: new Date(2017, 8, 21, 16, 12, 16),
      submitterId: 'clintonwoo',
      title: 'Clinton wins again',
      text: null,
      url: 'https://www.shavelikeaboss.com.au',
      upvotes: new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 0,
      rank: 29,
      points: 122,
    },
    {
      id: 1223,
      creationTime: new Date(2017, 8, 21, 16, 12, 17),
      submitterId: 'john',
      title: 'Clinton wins yet another time',
      text: 'It\'s unbelievable.',
      url: null,
      upvotes: [],
      upvoteCount: 0,
      hidden: [],
      hiddenCount: 0,
      comments: [
        {
          id: 123331,
          creationTime: new Date(2017, 8, 21, 16, 12, 20),
          commenterId: 'clintonwoo',
          text: 'I know this might come accross as bragging, but I just won the internet again.',
          upvotes: new Set([1, 2, 3, 4]),
          upvoteCount: 4,
          hidden: [],
          hiddenCount: 0,
        },
      ],
      commentCount: 1,
      rank: 30,
      points: 20,
    },
    {
      id: 1227,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Water Found Deep Inside the Moon',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 4,
      points: 171,
    },
    {
      id: 1228,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'How did “Handbook for Mortals” get on the NYT bestseller list?',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 5,
      points: 171,
    },
    {
      id: 1229,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Titan in depth: Security in plaintext',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 6,
      points: 171,
    },
    {
      id: 1230,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'The Librem 5: A Matrix-Native FLOSS Smartphone',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 7,
      points: 171,
    },
    {
      id: 1231,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Generic GPU Kernels in Julia',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 8,
      points: 171,
    },
    {
      id: 1232,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'VW Strike in Slovakia Exposes a European Divide',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 9,
      points: 171,
    },
    {
      id: 1233,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Gtk-rs: The huge and long awaited release is finally here',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 10,
      points: 171,
    },
    {
      id: 1234,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Rich Hickey\'s Greatest Hits',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 11,
      points: 171,
    },
    {
      id: 1235,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Tesla’s Push to Build a Self-Driving Car Sparks Dissent Among Its Engineers',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 12,
      points: 171,
    },
    {
      id: 1236,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'How Redlining’s Racist Effects Lasted for Decades',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 13,
      points: 171,
    },
    {
      id: 1237,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Uber, Mired in Corporate Scandals, Sees Uptick in Bookings',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 14,
      points: 171,
    },
    {
      id: 1238,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Feather: Open-source icons',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 15,
      points: 171,
    },
    {
      id: 1239,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Spacex Launch Webcast: Formosat-5 Mission',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 16,
      points: 171,
    },
    {
      id: 1240,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Ask HN: What is your favorite CS paper?',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 17,
      points: 171,
    },
    {
      id: 1241,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Launch HN: Life Bot (YC S17) – Voice app to help with daily activities',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 18,
      points: 171,
    },
    {
      id: 1242,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Debian reproducibility statistics',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 19,
      points: 171,
    },
    {
      id: 1243,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'The Scotsmen Who Invented Modernity',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 20,
      points: 171,
    },
    {
      id: 1244,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Deterministic Browser',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 21,
      points: 171,
    },
    {
      id: 1245,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Deep Learning for Siri’s Voice',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 22,
      points: 171,
    },
    {
      id: 1246,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'I\'m giving up on HPKP',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 23,
      points: 171,
    },
    {
      id: 1247,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Introducing App Engine Firewall',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 24,
      points: 171,
    },
    {
      id: 1248,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Profiling Internet Users in Africa: Insights from the Google Play Store',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 25,
      points: 171,
    },
    {
      id: 1249,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Turing.jl: A Fresh Approach to Probabilistic Programming in Julia',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 26,
      points: 171,
    },
    {
      id: 1250,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'GCC tiny',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 27,
      points: 171,
    },
    {
      id: 1251,
      creationTime: new Date(2017, 8, 24, 18, 12, 16),
      submitterId: 'hvo',
      title: 'Tesorio is hiring engineers and a product designer to modernize finance teams',
      text: null,
      url: 'https://www.nytimes.com/2017/08/04/education/edlife/learning-how-to-learn-barbara-oakley.html?hpw&rref=education&action=click&pgtype=Homepage&module=well-region&region=bottom-well&WT.nav=bottom-well',
      upvotes: new Set([]),
      upvoteCount: 10,
      hidden: [],
      hiddenCount: 0,
      comments: [],
      commentCount: 44,
      rank: 28,
      points: 171,
    },

// 4.  
// Water Found Deep Inside the Moon (nationalgeographic.com)
// 231 points by chenster 6 hours ago | hide | 121 comments
// 5.  
// How did “Handbook for Mortals” get on the NYT bestseller list? (pajiba.com)
// 48 points by cratermoon 1 hour ago | hide | 14 comments
// 6.  
// Titan in depth: Security in plaintext (googleblog.com)
// 39 points by nealmueller 1 hour ago | hide | 4 comments
// 7.  
// The Librem 5: A Matrix-Native FLOSS Smartphone (matrix.org)
// 307 points by Arathorn 6 hours ago | hide | 103 comments
// 8.  
// Generic GPU Kernels in Julia (mikeinnes.github.io)
// 60 points by one-more-minute 2 hours ago | hide | 1 comment
// 9.  
// VW Strike in Slovakia Exposes a European Divide (bloomberg.com)
// 41 points by CrocodileStreet 2 hours ago | hide | 9 comments
// 10. 
// Gtk-rs: The huge and long awaited release is finally here (gtk-rs.org)
// 19 points by trextrex 1 hour ago | hide | 2 comments
// 11. 
// Rich Hickey's Greatest Hits (changelog.com)
// 30 points by tosh 2 hours ago | hide | discuss
// 12. 
// Tesla’s Push to Build a Self-Driving Car Sparks Dissent Among Its Engineers (wsj.com)
// 112 points by dcgudeman 3 hours ago | hide | 137 comments
// 13. 
// How Redlining’s Racist Effects Lasted for Decades (nytimes.com)
// 11 points by zonotope 1 hour ago | hide | 1 comment
// 14. 
// Uber, Mired in Corporate Scandals, Sees Uptick in Bookings (nytimes.com)
// 63 points by carlchenet 4 hours ago | hide | 64 comments
// 15. 
// Feather: Open-source icons (feathericons.com)
// 669 points by mcone 7 hours ago | hide | 109 comments
// 16. 
// Spacex Launch Webcast: Formosat-5 Mission (spacex.com)
// 51 points by cjnicholls 1 hour ago | hide | 38 comments
// 17. 
// Ask HN: What is your favorite CS paper?
// 492 points by lainon 8 hours ago | hide | 165 comments
// 18. 
// Launch HN: Life Bot (YC S17) – Voice app to help with daily activities
// 34 points by MerryOscar 3 hours ago | hide | 28 comments
// 19. 
// Debian reproducibility statistics (reproducible-builds.org)
// 157 points by lamby 9 hours ago | hide | 63 comments
// 20. 
// The Scotsmen Who Invented Modernity (nationalinterest.org)
// 34 points by pepys 3 hours ago | hide | 3 comments
// 21. 
// Deterministic Browser (arxiv.org)
// 34 points by lainon 4 hours ago | hide | 1 comment
// 22. 
// Deep Learning for Siri’s Voice (apple.com)
// 168 points by Yossi_Frenkel 9 hours ago | hide | 54 comments
// 23. 
// I'm giving up on HPKP (scotthelme.co.uk)
// 95 points by el_duderino 8 hours ago | hide | 58 comments
// 24. 
// Introducing App Engine Firewall (googleblog.com)
// 77 points by artsandsci 6 hours ago | hide | 25 comments
// 25. 
// Detailed study of fatalities and litigation involving police use of stun guns (reuters.com)
// 52 points by hownottowrite 6 hours ago | hide | 31 comments
// 26. 
// Why it’s healthy to take a break from your online persona (2016) (theguardian.com)
// 33 points by Tomte 5 hours ago | hide | 7 comments
// 27. 
// Profiling Internet Users in Africa: Insights from the Google Play Store (afridigest.com)
// 29 points by prance 5 hours ago | hide | 1 comment
// 28. 
// Turing.jl: A Fresh Approach to Probabilistic Programming in Julia (turing.guru)
// 79 points by indescions_2017 8 hours ago | hide | 10 comments
// 29. 
// GCC tiny (thinkingeek.com)
// 89 points by ingve 9 hours ago | hide | 11 comments
// 30.   Tesorio is hiring engineers and a product designer to modernize finance teams (tesorio.com)
// 3 hours ago | hide
  ],
  users: [
    {
      // id: 1, // username is Primary Key
      id: 'clintonwoo', // Aka. username
      creationTime: new Date(2017, 8, 21, 16, 10, 14),
      firstName: 'Clinton',
      lastName: 'D\'Annolfo',
      dob: new Date(1992, 12, 6),
      posts: [1222],
      hidden: [],
      email: 'clinton@hotmail.com',
    },
    {
      id: 'john', // Aka. username
      creationTime: new Date(2017, 8, 21, 16, 9, 14),
      firstName: 'John',
      lastName: 'Doe',
      dob: new Date(1987, 7, 2),
      posts: [1223],
      hidden: [],
      email: 'john@doe.com',
    },
  ],
};
