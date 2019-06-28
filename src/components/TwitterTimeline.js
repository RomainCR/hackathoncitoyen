import React, { Component } from 'react';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

const TwitterTimeline = () => (

  <div className="container-fluid">
    <TwitterTimelineEmbed
      sourceType="hashtag"
      screenName="UniCityMy"
      theme="dark"
      options={{
        height: 600,
        witdh: 600,
      }}
    />
    <TwitterHashtagButton
      tag={'#UniCity'}
    />
  </div>
);


export default TwitterTimeline;
