const input=document.querySelector("input"),trackList=document.querySelector(".track-list");let btnInfoBox,activeBtnInfoBox,infoBox="";function onInput(n){const t=n.target.value.trim();console.log(t),""!==t&&fetchTracks(t).then((n=>renderUserList(n.results))).catch((n=>console.log(n)))}function fetchTracks(n){return fetch(`https://itunes.apple.com/search?term=${n}&limit=25`).then((n=>{if(!n.ok)throw new Error(n.status);return n.json()}))}function renderUserList(n){const t=n.map((n=>`<tr>\n                <td><div class="box">\n                <img src=${n.artworkUrl100} alt="img">\n                </div></td>\n                <td>${n.artistName}</td>\n                <td>${n.trackName}</td>\n                <td>${n.collectionName}</td>\n                <td>${n.primaryGenreName}</td>\n                \n                <td><button class="btn-info-box" type="button">+</button></td>\n            </tr>\n            <tr class="info-box"></tr>`)).join("");trackList.innerHTML=t,onDetailInfoClick(n)}function renderDetailInfo(n,t){const o=`<td></td>\n  <td>\n    <p>${n.artistName} - ${n.trackName}</p>\n    <p>Collection: ${n.collectionName}</p>\n    <p>Track Count: ${n.trackCount}</p>\n    <p>Price: ${n.collectionPrice}</p>\n  </td>\n  <td></td>\n  <td>\n    <p>Track duration: ${n.trackTimeMillis}</p>\n    <p>Track price: ${n.trackPrice}</p>\n  </td>`;console.log(n),infoBox[t].innerHTML=o}function onDetailInfoClick(n){infoBox=document.querySelectorAll(".info-box"),btnInfoBox=document.querySelectorAll(".btn-info-box");for(let t=0;t<btnInfoBox.length;t++)btnInfoBox[t].addEventListener("click",(()=>{btnInfoBox.forEach((function(n){n.classList.contains("active-btn")&&(n.classList.remove("active-btn"),n.innerHTML="+")})),btnInfoBox[t].classList.toggle("active-btn"),btnInfoBox[t].classList.contains("active-btn")?(infoBox.forEach((function(n){""!==n&&(n.innerHTML="")})),renderDetailInfo(n[t],t),btnInfoBox[t].innerHTML="-"):(btnInfoBox[t].innerHTML="+",infoBox[t].innerHTML="")}))}input.addEventListener("input",onInput);
//# sourceMappingURL=index.63abffff.js.map