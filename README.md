# ConcertCrawler


Catie Evans and David Bolton's first major project utilizing API's from Spotify and Eventful.
The goal of this project was to create a landing page that would allow the user to log-in to their Spotify account, and once the log-in was confirmed by Spotify we would redirect them to a new page that would display their top 10 artists. The user would then have the ability to see future concert data for their artists.

## Code

A backend is created and allows a user to log-in to their Spotify account. Upon validating a user's credentials, Catie wrote the code and set the endoints to redirect a user to our "logged-in" page.
David then wrote multiple fetch functions, the first returns a list of the logged-in user's top 10 artists with proper formatting. We then map through each artist to create a card that we will use later.
```javascript
async function fetchArtistNames() {
    return await fetch('https://api.spotify.com/v1/me/top/artists', settings)
    .then((response) => {return response.json()})
      .then((data) => {
        let listOfNames = data.items.map((item) => {
          return item.name.split(' ').join('%20');
        })
        return listOfNames;
      });
  };
  ```
  A second fetch request is then ran, returning an array of URLs that link to an image of each artist.
  ```javascript
  async function fetchArtistPictures() {
    return await fetch('https://api.spotify.com/v1/me/top/artists', settings)
    .then((response) => {return response.json()})
      .then((data) => {
        let listOfImages = data.items.map((item) => {
          return item.images[1].url
        })
        return listOfImages;
      });
  };
```
If a user tries to log-in with an incorrect password, we return an error message to the user and give them the opportunity to try to log-in again.


David wrote various functions to link the user's Spotify data with the Eventful API. Functions were added to take a given Spotify artist and make a fetch request to Eventful, returning the start time, venue name, venue address, and a url to purchase tickets for their next 5 concerts.

## Design

Along with creating a redirect page that stored the user's Spotify authorization token, Catie constructed the framework of both our pages and then devised a styling layout for each.

## Technologies Used
JavaScript, HTML, CSS, Bootstrap 4, Node, Express

## Stretch Goals
We would like to add a display all events that would show all upcoming events of all artists. We have the functional code written but haven't diplayed it. We would like to add more filtering features, allowing a user to search by zip code/city. 

## Challenges
The Spotify API is a challenge to use because of how serious it takes user privacy. Storing a personal auth token and asking for the right permissions to access certain user data was difficult at the beginning. 


## Collaborators 

[Catie's GitHub](https://github.com/evanscatie)

[David's Github](https://github.com/Aerohob)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

