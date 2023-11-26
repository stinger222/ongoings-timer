# Ongoings Timer
This is Trello-based app for tracking your anime (or not so) ongoings with timer until next episode.
<br/>

## Preview

**Result example:**
![Preview](https://github.com/stinger222/ongoings-timer/assets/39219491/a25edcbd-165e-44b4-a506-b7bf8458f08c)

**Card Creation process:**
![Card Creation](https://github.com/stinger222/ongoings-timer/assets/39219491/1f9e3a89-0700-4c9c-9e29-9dc2e6f3d2de)

## Demo
Check out the demo [here](https://stinger222.github.io/ongoings-timer)!

## Features
  - Create cards for each ongoing series you want to track
  - Go to player url by simply clicking on the title of the card
  - Handy progress bar will help you keeping track of episodes you already watched 
  - Delete card from Trello in one click
  - Countdown timer until next episode

## Tech Stack <i><sub><sup>(click to collapse)</sup></sub></i>
 <b>▷ Typescript</b>
 
 <b>▷ Jest </b>
 
 <details open>
   <summary><b>React</b></summary>
  
   - Redux & Redux Toolkit
     > For global state management and data fetching
   - Formik
     > To create card creation form with necessary logic such as validation and form state management
   - React Router Dom
     > For dynamic routing and navigation in the app 
</details>

 <details open>
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

## Development
1. Clone app using `git clone`
2. Install dependencies using `npm install`
3. Create `.env` file in the root directory
4. Run `npm start` 
