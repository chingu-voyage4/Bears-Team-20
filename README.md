# MusicHub
## Bears-Team-20 | Voyage-4

[![CircleCI](https://circleci.com/gh/chingu-voyage4/Bears-Team-20.svg?style=svg)](https://circleci.com/gh/chingu-voyage4/Bears-Team-20)

### Description
Web application that allows the user to create, share and listen playlists using tracks different services such as Youtube, DailyMotion, Vimeo, etc..

### Heroku deploy
```
git push heroku $BRANCH_TO_DEPLOY:master
```

### Development

```
yarn start
cd client && yarn start
```
And then access `localhost:3001`
##### Env file   
```
DB_LOCAL_URL=
DB_PROD_URL=
ENV=

YOUTUBE_KEY=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

#### Clientside
```
PORT=3001
BROWSER=none
```
