// ==UserScript==
// @name         Youtube Adblock Blocker Blocker
// @namespace    http://tampermonkey.net/
// @version      2.2
// @description  block the youtube adblock blocker, use Alt + b
// @author       golngaz
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function modal() {
        return document.querySelector('#golngaz-modal');
    }

    function createModal(token) {
        let modal = document.createElement('div');
        modal.id = 'golngaz-modal';
        modal.style.width = '50%';
        modal.style.height = '315px';
        modal.style.backgroundColor = '#939393';
        modal.style.zIndex = '2424';
        modal.style.position = 'absolute';
        modal.style.left = '25%';
        modal.style.top = '100px';
        modal.style.borderRadius = '10px';

        document.querySelector('html').appendChild(modal);

        let iframe = document.createElement('iframe');
        iframe.width = '560';
        iframe.height = '315';
        iframe.src = 'https://www.youtube.com/embed/'+token+'?autoplay=1&auto_play=1';
        iframe.title = 'Remerciez Golngaz';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;

        modal.appendChild(iframe);
        modal.innerHTML = modal.innerHTML + `<svg id="golngaz-logo" width="100" height="100" style="display: inline-block; cursor: pointer; width: 10%;">
        <path d="M10 20 L10 80 Q10 90 20 90 H80 Q90 90 90 80 V50 H60 V70 H40 V20 H80" fill="black"></path>
        <circle cx="70" cy="30" r="10" fill="black"></circle>
    </svg>`;

        document.querySelector('#golngaz-logo').addEventListener('click', event => {
            modal.remove();
        });
    }

    function videoToken() {
        return window.location.href.split('/').at(-1).split('v=').at(-1).split('&').at(0);
    }

    document.addEventListener("keydown", function(event) {
        if (!modal() && event.altKey && event.key === "b") {
            createModal(videoToken());
        }
    });
})();
