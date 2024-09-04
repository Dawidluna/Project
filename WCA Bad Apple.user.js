// ==UserScript==
// @name         WCA Bad Apple
// @namespace    http://tampermonkey.net/
// @version      2024-09-04
// @description  Bad Apple on WCA competitors site
// @author       Dawid Wójcik
// @match        https://www.worldcubeassociation.org/competitions/*/registrations
// @icon         https://www.google.com/s2/favicons?sz=64&domain=worldcubeassociation.org
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function() {
    'use strict';

    var data;
    const jsonUrl = 'https://raw.githubusercontent.com/Dawidluna/Project/main/data.json';
    GM_xmlhttpRequest({
        method: 'GET',
        url: jsonUrl,
        onload: function(response) {
            try {
                data = JSON.parse(response.responseText).data;

            } catch (error) {
                console.error('Failed to parse JSON:', error);
            }
        },
        onerror: function(error) {
            console.error('Error fetching JSON:', error);
        }
    });
    var tds = document.getElementsByTagName("td");
    for(let i =20; i<tds.length; i+=21) tds[i].innerHTML = "<div style = 'height: 22px; width: 1px;'></div>";
    var frameNumber = 0;
    var events = ["333", "222", "444", "555", "666", "777", "333bf", "333fm", "333oh", "clock", "minx", "pyram", "skewb", "sq1", "444bf", "555bf", "333mbf"];
    var current;
    var player = document.createElement('audio');
    var audio = document.createElement('audio');
    audio.src = 'https://www.dropbox.com/scl/fi/geqxarrmhmyvnfunq0jwm/Bad-Apple.mp3?rlkey=f99e83nra85zgr1a1ypt9wshf&st=pa1q1dft&dl=1';
    audio.preload = 'auto';
    var hr = document.getElementsByTagName("hr");
    hr[0].innerHTML = "<button id='startButton'>GO!</button>";
    document.getElementById ("startButton").addEventListener("click", start, false);
    var intId;
    var eventCount;

    function start() {
        audio.play();
        intId = setInterval(updateFrame, 1000/30);
    };

    function updateFrame() {
        for(let i = 0; i < 13; i++) {
            eventCount = 0;
            for(let j = 0; j <18; j++) {
                current = i * 21 + j + 2;
                if(j == 17) {
                    tds[current].innerHTML = eventCount;
                    break;
                }
                if(data[frameNumber][i][j] == "0") {
                    tds[current].innerHTML = "<i class = 'cubing-icon icon event-" + events[j] + "'> </i>";
                    eventCount ++;
                }
                else tds[current].innerHTML = "";
                }
            }
        frameNumber++;
        if(frameNumber == 6568) clearInterval(intId);
    };
})();