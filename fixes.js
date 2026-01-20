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
            .applecation__info.show > span > div > svg {
                padding-right: 1px;
            }

            /* Marvel Studios — remove forced invert + spacing fix */
            img[alt="Marvel Studios"] {
                filter: none !important;
                margin-bottom: 1px;
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
        startObserver();
    }

    apply();

    if (window.Lampa && Lampa.Listener) {
        Lampa.Listener.follow('activity', apply);
        Lampa.Listener.follow('app', apply);
    }
})();
