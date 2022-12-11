// import debounce from "lodash.debounce";

const input = document.querySelector("input");
const trackList = document.querySelector(".track-list");
// 
let btnInfoBox;
let infoBox = "";
let activeBtnInfoBox;

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
  // console.log(tracks)
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
            </tr>
            <tr class="info-box"></tr>`
    })
    .join("");
  trackList.innerHTML = markup;

  infoBox = document.querySelectorAll(".info-box");
  btnInfoBox = document.querySelectorAll(".btn-info-box");
  for (let i = 0; i < btnInfoBox.length; i++) {
    // console.log(tracks[i])
    
    btnInfoBox[i].addEventListener("click", () => {
      btnInfoBox[i].classList.toggle("active-btn");
      activeBtnInfoBox = document.querySelector(".active-btn")
 
      if (btnInfoBox[i].classList.contains("active-btn")) {
        renderDetailInfo(tracks[i], i)
        btnInfoBox[i].innerHTML = "-";
      }
      else {
        btnInfoBox[i].innerHTML = "+";
        infoBox[i].innerHTML = "";
      }      
    });
  }

}

function renderDetailInfo(track, i) {
  // infoBox = document.querySelectorAll(".info-box");
  const markup = `<td></td>
  <td>
    <p>${track.artistName} - ${track.trackName}</p>
    <p>Collection: ${track.collectionName}</p>
    <p>Track Count: ${track.trackCount}</p>
    <p>Price: ${track.collectionPrice}</p>
  </td>
  <td></td>
  <td>
    <p>Track duration: ${track.trackTimeMillis}</p>
    <p>Track price: ${track.trackPrice}</p>
  </td>`
  console.log(track)

  infoBox.forEach(function (item) { 
    if (item !== "") {
      item.innerHTML = "";
    }
  })
  infoBox[i].innerHTML = markup;
  }

// activeBtnInfoBox = document.querySelector(".foo")
// console.log(activeBtnInfoBox + 66666666666)