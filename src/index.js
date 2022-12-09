// import debounce from "lodash.debounce";

const input = document.querySelector("input");
const trackList = document.querySelector(".track-list");


// input.addEventListener("input", debounce(onInput, 1000));
input.addEventListener("input", onInput);

function onInput(event) {
    const searchQuery = event.target.value.trim();
    console.log(searchQuery)
    
    if (searchQuery !== "") {
        fetchTracks(searchQuery)
        .then((tracks) => renderUserList(tracks.results))
        // .then((tracks) => console.log(tracks.results[0]))
        .catch((error) => console.log(error));
    }
}

function fetchTracks(searchQuery) {
  return fetch(`https://itunes.apple.com/search?term=${searchQuery}&limit=25`).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

function renderUserList(tracks) {
  const markup = tracks
    .map((track) => {
      // return `<li>
      //     <p><b>artistName</b>: ${track.artistName}</p>
      //     <p><b>trackName</b>: ${track.trackName}</p>
      //     <p><b>collectionName</b>: ${track.collectionName}</p>
      //     <p><b>primaryGenreName</b>: ${track.primaryGenreName}</p>
      //   </li>`;
    
{/* <div class="box">{artworkUrl100}</div> */}
      return `<tr>
                <td><div class="box">
                <img src=${track.artworkUrl100} alt="img">
                </div></td>
                <td>${track.artistName}</td>
                <td>${track.trackName}</td>
                <td>${track.collectionName}</td>
                <td>${track.primaryGenreName}</td>
                <td>+</td>
            </tr>`

    })
    .join("");
  trackList.innerHTML = markup;
}
