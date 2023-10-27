// ==UserScript==
// @name         Youtube Adblock Blocker Blocker
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  block the youtube adblock blocker
// @author       golngaz
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const sleep = 4;
    const watcherInterval = 1000;

    let idWatcher = null;

    let url = window.location.href;

    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function clickWhenIsVisible(selector) {
        while (true) {
            const element = document.querySelector(selector);
            if (element && element.offsetParent !== null) {
                element.click();
                return;
            }

            await wait(250);
        }
    }

    function tokenFromLink(link) {
        return link.split('/').at(-1).split('?')[0];
    }

    function adblockBlockerElement() {
        return document.querySelector('yt-playability-error-supported-renderers');
    }

    function runWatcher() {
        if (idWatcher !== null) {
            return;
        }

        idWatcher = setInterval(() => {
            if (adblockBlockerElement()) {
                clearInterval(idWatcher);
                idWatcher = null;
                destroyAdblockBlocker();
            }
        }, watcherInterval)
    }

    function runWatcherClosing() {
        setInterval(() => {
            if (window.location.href !== url) {
                // Permet de remettre à neuf le noeud
                if (document.querySelector('#golngazframe')) {
                    location.reload();
                } else {
                    url = window.location.href;
                }
            }
        }, watcherInterval);
    }

    // Fonction pour insérer l'iframe dans le lecteur vidéo
    function insertIframe(token) {
        const height = '600';
        document.querySelector('#player-container.ytd-watch-flexy').innerHTML = `
            <iframe
                id="golngazframe"
                class=""
                src="https://www.youtube.com/embed/${token}?autoplay=1&amp;auto_play=1"
                style="position: absolute; top: 0; left: 0; max-width: 2100px; max-height: ${height}px;"
                width="2100"
                height="${height}"
                frameborder="0"
                scrolling="no"
                allowfullscreen=""
                sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
<!--                tc-textcontent="true"-->
<!--                data-tc-id="w-0.147780797001408"-->
            ></iframe>`;

        document.querySelector('#full-bleed-container').style.maxHeight = height + 'px';
    }

    // Fonction principale asynchrone
    async function destroyAdblockBlocker() {
        await wait(1000 * sleep);

        await clickWhenIsVisible('button[aria-label="Partager"]:not([style*="display: none"])');

        await wait(2000);

        await clickWhenIsVisible('#close-button > button:nth-child(1)');

        adblockBlockerElement().remove();

        const link = document.querySelector('#share-url').value;
        const token = tokenFromLink(link);

        insertIframe(token);

        runWatcher();
    }

    runWatcher();
    runWatcherClosing();
})();
