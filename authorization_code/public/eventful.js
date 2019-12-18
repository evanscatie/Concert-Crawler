
// -------------------------------------------------------------------EVENTFUL-JS----------------------------------------------------------------------------


// VARIABLE DEFINITIONS FOR EVENTFUL FETCH REQUEST PARAMETERS
// ___________________________________________________________________________________________________________________
const eventfulAddress = 'http://api.eventful.com/json/performers/search?...&keywords='; // Eventful API address
const app_key = 'CXHGMvbQBshRwpqL' // app_key parameter
const date = 'Future'; // Date parameter
const eventRequest = 'http://api.eventful.com/json/events/search?...&keywords=' //const eventLocation = 'Atlanta'  <-- We can add this later if we want to search by zip code or for a certain city




// FETCH REQUEST TO EVENTFUL
// ___________________________________________________________________________________________________

    // This is a function that will pull the list of events for an artist that you pass in.
    async function getEventDetails(artist) {
    const eventAddress = `${eventRequest}${encodeURI(artist)}&app_key=${app_key}&date=${date}` //string interpolation of eventful API adress including keys for event data
    
    //&location=${eventLocation} // This is how we would add location in future phases

    // Required settings to make the fetch request work
    let settings = {
        "headers": {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": "Bearer BQDCqShyDaeXc6p-5IWaW_H_ksdC2enSp18Y9H2jaAUz4m_gYNFzd-sV0HprYcI-a_FvyKUWygRYfogkBe2MDyIzk8OF8KQcChFBW0jxV_wU2D6QQilhuveqGhWR-q9L6yQCdTLM82JE00zAcYYuKQ_V6TlX-asmTR9_wRZjB-e_ZQYnoiUc7WJE0CjYow",
        }
    }


    // Fetch request to Eventful API for event data on provided artist from Spotify top 10
    const eventResponse= await fetch(`https://cors-anywhere.herokuapp.com/${eventAddress}`, settings)
    .then((eventResponse) => {
        eventResponse.json().then(getConcertData).then((concertData) => { //returns json file ALL events for the artist
            //console.log(concertData) 
            let hiddenContainer= document.querySelector(".test-container")
            concertData.forEach((concert) => {
              let myDiv = document.createElement('div')
              let concertInfo =  document.createElement('p')
              concertInfo.innerHTML = `Concert Time: ${concert.Time}<br>
              Concert Venue: ${concert.Venue}<br>
              Concert Address: ${concert.Address}<br>
               <a href=${concert.EventURL}> Concert URL</a>`;
              myDiv.appendChild(concertInfo)
              hiddenContainer.appendChild(myDiv)
            })
        }); 
    });
    // Return the response
        return eventResponse
    } 

    
    // If the artist has any upcoming concerts, the following key:values will be stored as an array of objects in the variable getConcertData
    let getConcertData = 
    (data) => {
        if (data.events) {
        return concertData = [
            {
            Time: data.events.event[0].start_time,
            Venue: data.events.event[0].venue_name,
            Address: data.events.event[0].venue_address,
            EventURL: data.events.event[0].url,
            },
            {
            Time: data.events.event[1].start_time,
            Venue: data.events.event[1].venue_name,
            Address: data.events.event[1].venue_address,
            EventURL: data.events.event[1].url,
            },
            {
            Time: data.events.event[2].start_time,
            Venue: data.events.event[2].venue_name,
            Address: data.events.event[2].venue_address,
            EventURL: data.events.event[2].url,
            },
            {
            Time: data.events.event[3].start_time,
            Venue: data.events.event[3].venue_name,
            Address: data.events.event[3].venue_address,
            EventURL: data.events.event[3].url,
            },
            {
            Time: data.events.event[4].start_time,
            Venue: data.events.event[4].venue_name,
            Address: data.events.event[4].venue_address,
            EventURL: data.events.event[4].url,
            }
        ]
        }
    }
