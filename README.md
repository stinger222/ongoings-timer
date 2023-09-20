# Ongoings Timer
This is Trello-based app for tracking your anime (or not so) ongoings with timer until next episode.
<br/>
<br/>
_(or at least it was, until **Trello leaved russia**, rendering it useless for now)_

## Preview

**Result example:**
![Preview](https://github.com/stinger222/ongoings-timer/assets/39219491/a25edcbd-165e-44b4-a506-b7bf8458f08c)

**Card Creation process:**
![Card Creation](https://github.com/stinger222/ongoings-timer/assets/39219491/1f9e3a89-0700-4c9c-9e29-9dc2e6f3d2de)

## Demo
~~Check out [the demo](https://stinger222.github.io/ongoings-timer) to explore all features of the app!~~
Trello deleted all ru accounts, including the one I used for OAuth Client, so even it you have working Trello account, app still not working yet

## Features
  - Create cards for each ongoing series you want to track
  - Go to player url by simply clicking on the title of the card
  - Handy progress bar will help you keeping track of episodes you already watched 
  - Delete card from Trello in one click
  - Countdown timer until next episode

## Tech Stack <i><sub><sup>(click to expand)</sup></sub></i>
 <b>▷ Typescript</b>
 
 <details>
   <summary><b>React</b></summary>
  
   - Redux & Redux Toolkit
     > For global state management and data fetching
   - Formik
     > To create card creation form with necessary logic such as validation and form state management
   - React Router Dom
     > For dynamic routing and navigation in the app 
</details>

 <details>
   <summary><b>Jest</b></summary>
   - Unit testing 
</details>

 <details>
   <summary><b>CSS</b></summary>

   - React Spring
     > Used to create mount animation for cards
   - React transition group
     > To animate navigation in dropdown menu
   - CSS Modules
     > For general components styling
</details>

## Usage
  1. Log in using your Trello account
  2. Select the Trello board and list where your ongoing series data will be stored
  3. Open card creation form  using the "New Card" button in dropdown menu
  4. Fill out the form with necessary data such as: 
    - Title
    - Time and day of the week when new episodes released
    - Amount of watched episodes (optional) and their overall amount
    - Thumbnail (optional) and player urls 
  5. Press "Create" and that's it!

## Installation / Dev stuff
npm i
