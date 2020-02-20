// --------------------------------------------------------------APP-MAIN-JS (INCLUDES SPOTIFY)------------------------------------------------------

// ACCESS TOKEN SCRIPT 
// __________________________________________________________________________________________________

// I'm seeing this function declared several times.
// Maybe put it in a `utils.js` that you have a script tag for in your two HTML files.
// < Obtains parameters from the hash of the URL @return Object >
function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

// < Saves access token as variable >
var params = getHashParams();
var access_token = params.access_token,
    refresh_token = params.refresh_token,
    error = params.error;

console.log(access_token);







// -------------------------------------------------------------------SPOTIFY----------------------------------------------------------------------------

// FETCH REQUEST TO SPOTIFY API FOR TOP ARTIST
// ___________________________________________________________________________________________________

// Defines required settings to access Spotify API
let settings = {
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": `Bearer ${access_token}`,
  }
}

// Function creates fetch request to Spotify API and returns the user's top 10 artist and returns (name: med picture) as an object.

window.onload = (fetchArtists());


async function fetchArtists() {
  return await fetch('https://api.spotify.com/v1/me/top/artists', settings)
  .then((response) => {return response.json()})
    .then((data) => {
      let listOfArtists = data.items.slice(0, 10).map((item) => {
        return {
         name: item.name, 
         picture: item.images[0].url
        }
      })
      //console.log(listOfArtists)
      return listOfArtists;
         


  // CREATES ARTIST CARD
  // ___________________________________________________________________________________________________

    }).then((listOfArtists) => {
      listOfArtists.forEach((artist) => {
          let createCard = document.createElement('div');
          createCard.class = "card"
        // Add comment about innerHTML, just to show that you know that this isn't the best idea.
        // Also, you may get the question about why this isn't a handlebars template instead of an HTML string.
          createCard.innerHTML = `
          <div class="row card-row justify-content-center">
            <div class="col-md-6">
              <div class="card text-black text-center ">
                <img src="${artist.picture}" class="card-img rounded-circle shadow-lg p-0 mb-4  rounded" alt="...">
                  <div class="card-img-overlay"></div>
                    <div id="${artist.name}" class="card-title font-weight-bold bg-transparent">${artist.name}
                      <div class="row-md-6">
                        <button class="upcoming-shows-btn btn btn-outline-light">View Upcoming Shows</button>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          `
 
      createCard.addEventListener('click', () => {
        let hiddenContainer= document.querySelector(".test-container")
        hiddenContainer.style.display = "block";
        hiddenContainer.innerHTML = getEventDetails(`${artist.name}`)
          //console.log(getEventDetails(`${artist.name}`))
        })

      
       let container = document.querySelector(".artist-grid")
        container.appendChild(createCard);
      })
    });
    
};
// If this is no longer in use, delete it.
// ADDS EVENT DATA TO ARTIST CARD
// ___________________________________________________________________________________________________
// function generateEventCards(artist) {
//   buttonDiv = document.getElementById(artist)
//   artist = artist.toLowerCase()

//   console.log(artist)
//   const makeRequest = async () => {
//     await getEventDetails(artist).then(function(eventDetails) {
//       if (eventDetails.events != null){
//         events = eventDetails.events.event
//         console.log(events)
//         for (var i = 0; i < events.length; i++) {
//           buttonDiv.innerHTML += `
//             <div class="row card-row justify-content-center">
//               <div class="col-md-6">
//                 <div class="card bg-transparent text-black text-center ">
//                   <div class="card-footer font-weight-bold bg-transparent">
//                     ${events[i].title}
//                     <div class="bg-transparent event-location">
//                       ${events[i].venue_name} ***** ${events[i].start_time.slice(0,10)}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             `
//         }
//       } else {
//         buttonDiv.innerHTML += "We're sorry - events are unavailable for this artist at this time"
//       } 
//     })
//   }
//   makeRequest() 

// This code looks awfully familiar...is it also in `landing-access.token.js`?
// < ERROR HANDLING FOR USER LOGIN >
// ___________________________________________________________________________________________________
if (error) {
  alert('There was an error during the authentication');
} else {
  if (access_token) {
    $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': 'Bearer ' + access_token
        },
    });
  } else {
      // render initial screen
      $('#login').show();
      $('#loggedin').hide();
  }
      document.getElementById('obtain-new-token').addEventListener('click', function() {
        $.ajax({
          url: '/refresh_token',
          data: {
            'refresh_token': refresh_token
          }
        }).done(function(data) {
          access_token = data.access_token;
        });
      }, false);

  };
