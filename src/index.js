// import debounce from "lodash.debounce";

const input = document.querySelector("input");
const trackList = document.querySelector(".track-list");
const infoBox = document.querySelector(".info-box");
// const btnInfoBox = document.querySelector(".btn-info-box");
let btnInfoBox;

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

      // btnInfoBox.addEventListener("click", onDenailClick);
  }
   
}

if (btnInfoBox) {
   console.log(6)
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
      return `<tr>
                <td><div class="box">
                <img src=${track.artworkUrl100} alt="img">
                </div></td>
                <td>${track.artistName}</td>
                <td>${track.trackName}</td>
                <td>${track.collectionName}</td>
                <td>${track.primaryGenreName}</td>
                
                <td><button class="btn-info-box" type="button">+</button></td>
            </tr>`
    })
    .join("");
  trackList.innerHTML = markup;

  btnInfoBox = document.querySelectorAll(".btn-info-box");
  for (let i = 0; i < btnInfoBox.length; i++) {
    btnInfoBox[i].addEventListener("click", onDenailClick);
  }
  // clickOnDetail(btnInfoBox)
  // btnInfoBox.addEventListener("click", onDenailClick);
  
  
}


  function clickOnDetail(btn) {
    // btn = document.querySelector(".btn-info-box");
    btn.addEventListener("click", onDenailClick);
  }
  function onDenailClick() {
    console.log(55555555555)
  }

// btnInfoBox.addEventListener("click", () => alert('Спасибо!'));
// if (btnInfoBox) {
//   clickOnDetail(btnInfoBox);
// }
console.log(btnInfoBox)
