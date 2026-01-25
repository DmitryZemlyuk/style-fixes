(function () {
    'use strict';

    const STYLE_ID = 'ui-fixes-style';
    const MARVEL_LOGO = 'https://dmitryzemlyuk.github.io/style-fixes/logo.png';

    let observerStarted = false;

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
        `;
        document.head.appendChild(style);
    }

    function replaceMarvelLogo(root = document) {
        root.querySelectorAll('img[alt="Marvel Studios"]').forEach(img => {
            if (img.src === MARVEL_LOGO) return;

            img.src = MARVEL_LOGO;
            img.removeAttribute('srcset');
        });
    }

    function removeAds(root = document) {
        root.querySelectorAll('.scroll__body > ad-server').forEach(el => el.remove());
    }

    function startObserver() {
        if (observerStarted) return;
        observerStarted = true;

        const observer = new MutationObserver(mutations => {
            mutations.forEach(m => {
                m.addedNodes.forEach(node => {
                    if (node.nodeType !== 1) return;

                    if (node.tagName === 'IMG' && node.alt === 'Marvel Studios') {
                        replaceMarvelLogo(node.parentNode);
                        return;
                    }

                    replaceMarvelLogo(node);
                    removeAds(node);
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function apply() {
        injectStyle();
        replaceMarvelLogo();
        removeAds();
        startObserver();
    }

    apply();

    if (window.Lampa && Lampa.Listener) {
        Lampa.Listener.follow('activity', apply);
        Lampa.Listener.follow('app', apply);
    }
})();
