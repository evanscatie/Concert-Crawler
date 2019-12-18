// --------------------------------------------------------------APP-MAIN-JS (INCLUDES SPOTIFY)------------------------------------------------------

// ACCESS TOKEN SCRIPT 
// __________________________________________________________________________________________________

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

async function fetchArtists() {
  return await fetch('https://api.spotify.com/v1/me/top/artists', settings)
  .then((response) => {return response.json()})
    .then((data) => {
      let listOfArtists = data.items.slice(0, 10).map((item) => {
        return {
         name: item.name, 
         picture: item.images[1].url
        }
      })
      //console.log(listOfArtists)
      return listOfArtists;


    }).then((listOfArtists) => {
      listOfArtists.forEach((artist) => {
        let createCard = document.createElement('div');
        createCard.class = "card"
        createCard.style = "width: 40% height: 40%"
        createCard.innerHTML = `
        <div class="row card-row justify-content-center">
          <div class="col-md-6">
            <div class="card bg-transparent text-black text-center ">
              <img src="${artist.picture}" class="card-img rounded-circle shadow-lg p-3 mb-5 bg-black rounded" alt="...">
                <div class="card-img-overlay"></div>
                  <div class="card-footer font-weight-bold bg-transparent">${artist.name}
                  <div class="row-md-6">
                    <button class="btn btn-dark">View Upcoming Shows</button>
                  </div>
                </div>
              </div>
            </div>
            `
        
        <!-- 
        // <img src="./images/vEcBrrYv_400x400.jpg" class="card-img rounded-circle shadow-lg p-3 mb-5 bg-black rounded" alt="...">

        // <div class="card-img-overlay"></div>
        // <div class="card-footer bg-transparent">Artist Name
        //   <div class="row-md-6">
        //     <button class="btn btn-dark">View Upcoming Shows</button>
        //   </div>
        // </div>

      //   createCard.addEventListener("Click", (e) => {
      //     //containerplaceholder.classList.add('hidden')
      //   }


        let container = document.querySelector(".artist-grid")
        container.appendChild(createCard)
      } 



      // getEventDetails(artist)
      // let hiddenContainer = document.querySelector(".")
      // classList.remove("hidden")
      )
    });
};



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

  }

