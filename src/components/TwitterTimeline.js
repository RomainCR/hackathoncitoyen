import React, { Component } from 'react';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

const TwitterTimeline = () => (

  <div className="container-fluid">
    <TwitterTimelineEmbed
      sourceType="hashtag"
      screenName="lyon"
      theme="dark"
      options={{
        height: 600,
        witdh: 400,
         }}
      data-chrome='transparent'
    />
  </div>
);


export default TwitterTimeline;
