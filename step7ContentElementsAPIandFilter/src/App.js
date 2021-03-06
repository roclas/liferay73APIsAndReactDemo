import React, {useEffect, useState} from 'react';
import Video from './Video';
import './App.css';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import UserProfile from './UserProfile';

const username="test@liferay.com";
const password="test1";
const b64=Buffer.from(`${username}:${password}`).toString('base64');

export default () => {
  const [videos, setVideos] = useState(FAKE_VIDEOS);

  useEffect(() => {

    const endpoint = new URL('http://localhost:8080/o/headless-delivery/v1.0/asset-libraries/45673/content-elements');

    endpoint.searchParams.append('nestedFields', 'contentValue');
    endpoint.searchParams.append("filter", "keywords/any(k:k eq 'tiktok')");

    fetch(endpoint, {headers: {"Authorization": "Basic "+b64}})
      .then(response => response.json())
      .then(data => {
        console.log("data",data)

	if(data.items){ 
		console.log("data.items",data.items);
		setVideos(data.items.map(({content: document}) => ({
          		creator: document.creator,
          		remove: document.actions.delete,
          		song: document.title,
          		description: document.description,
          		url: document.contentValue ? ('data:video/mp4;base64,' +  document.contentValue) : 'http://localhost:8080/' + document.contentFields[0].contentFieldValue.document.contentUrl
        	})));
	}else{
		alert("you need to add some videos to your asset library");
	}
      })
  }, [])

  return (
    <Router>
      <div className="app">
        <div className="app-videos">
          <Switch>
            <Route exact path="/">
              {videos.map(
                ({
                   creator = {}, description, likes = 0, messages = "", remove, shares = 0, song, url,
                 }) => (
                  <Video
                    creator={creator}
                    description={description}
                    key={url}
                    likes={likes}
                    messages={messages}
                    remove={remove}
                    shares={shares}
                    song={song}
                    url={url}
                  />
                ),
              )}
            </Route>
            <Route path="/:creatorId">
              <UserProfile/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

const FAKE_VIDEOS = [{
  channel: 'channel1',
  description: 'Description',
  likes: 0,
  messages: 'Messages',
  remove: false,
  shares: 0,
  song: 'Song 1',
  url: 'http://www.exit109.com/~dnn/clips/RW20seconds_2.mp4',
}, {
  channel: 'channel2',
  description: 'Description',
  likes: 0,
  messages: 'Messages',
  remove: false,
  shares: 0,
  song: 'Song 2',
  url: 'http://www.exit109.com/~dnn/clips/RW20seconds_1.mp4',
}];
