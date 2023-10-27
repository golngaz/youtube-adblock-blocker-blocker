// ==UserScript==
// @name         Youtube Adblock Blocker Blocker
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  block the youtube adblock blocker
// @author       golngaz
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const sleep = 4;


    setTimeout(() => {
        document.querySelector('button[aria-label="Partager"]:not([style*="display: none"])').click();

        setTimeout(() => {
            setTimeout(() => {
		document.querySelector('#close-button > button:nth-child(1)').click();
		document.querySelector('yt-playability-error-supported-renderers').remove();
	}, 0);

	let iframeTemplate = `
            <iframe
	        class=""
	        src="https://www.youtube.com/embed/{{token}}?autoplay=1&amp;auto_play=1"
	        style="position: absolute; top: 0px; left: 0px; max-width: 2100px; max-height: 600px;"
	        width="2100"
	        height="600"
	        frameborder="0"
	        scrolling="no"
	        allowfullscreen=""
	        sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
	        tc-textcontent="true"
	        data-tc-id="w-0.147780797001408"
            ></iframe>`;

	const link = document.querySelector('#share-url').value;

	const token = link.split('/').at(-1).split('?').at(0);

	iframeTemplate = iframeTemplate.replace('{{token}}', token);

	document.querySelector('#player-container.ytd-watch-flexy').innerHTML = iframeTemplate;
        document.querySelector('#full-bleed-container').style.maxHeight = "600px";
    }, 2000);

}, 1000 * sleep);
})();
