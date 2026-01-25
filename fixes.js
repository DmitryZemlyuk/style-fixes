(function () {
    'use strict';

    const STYLE_ID = 'ui-fixes-style';
    const MARVEL_LOGO = 'https://dmitryzemlyuk.github.io/style-fixes/logo.png';

    let observerStarted = false;
    let killerStarted = false;

    function isCardPage() {
        const params = new URLSearchParams(location.search);

        return (
            params.has('card') &&
            params.get('media') === 'tv' &&
            params.get('source') === 'tmdb' &&
            params.get('select') === 'open'
        );
    }

    function injectStyle() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            /* SVG padding fix */
            .applecation__info.show > span > div {
                padding: 1px;
            }
            .applecation__info.show > span > div > svg {
                padding-right: 1px;
            }

            /* Marvel Studios — remove forced invert + spacing fix */
            img[alt="Marvel Studios"],
            img[alt="Hutch Parker Entertainment"] {
                filter: none !important;
            }

            /* ===== HEADER BODY OVERLAY FIX ===== */

            .head__body {
                position: relative;
                z-index: 2;
            }

            .head__body::before {
                content: '';
                position: absolute;
                inset: 0;
                background: linear-gradient(
                    to bottom,
                    rgba(0,0,0,.65),
                    rgba(0,0,0,.25),
                    rgba(0,0,0,0)
                );
                pointer-events: none;
                z-index: -1;
            }

            /* ===== AD SERVER KILL ===== */

            .ad-server {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    function replaceMarvelLogo(root = document) {
        root.querySelectorAll('img[alt="Marvel Studios"]').forEach(img => {
            if
