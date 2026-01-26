(function () {
    'use strict';

    /************************
     * ABSOLUTE AD KILL (DOM LEVEL)
     ************************/
    (function () {
        const origAppend = Node.prototype.appendChild;
        const origInsert = Node.prototype.insertBefore;

        function isAd(node) {
            return node &&
                node.nodeType === 1 &&
                node.classList &&
                node.classList.contains('ad-server');
        }

        Node.prototype.appendChild = function (node) {
            if (isAd(node)) return node;
            return origAppend.call(this, node);
        };

        Node.prototype.insertBefore = function (node, ref) {
            if (isAd(node)) return node;
            return origInsert.call(this, node, ref);
        };
    })();

    /***********************
     * CONSTANTS
     ***********************/
    const STYLE_ID = 'ui-fixes-style';
    const MARVEL_LOGO = 'https://dmitryzemlyuk.github.io/style-fixes/logo.png';

    let observerStarted = false;

    /***********************
     * HELPERS
     ***********************/
    function isModssSettingsPage() {
        const params = new URLSearchParams(location.search);
        return params.get('settings') === 'settings_modss';
    }

    function isParserSettingsPage() {
        const params = new URLSearchParams(location.search);
        return params.get('settings') === 'parser';
    }

    function isSelectOpen() {
        const params = new URLSearchParams(location.search);
        return params.get('select') === 'open';
    }

    /***********************
     * STYLE INJECT
     ***********************/
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

            /* HEADER BODY OVERLAY */
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

            /* MODSS settings — hide titles */
            .settings-param-title.modss-hidden {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    /***********************
     * MARVEL LOGO REPLACE
     ***********************/
    function replaceMarvelLogo(root = document) {
        root.querySelectorAll('img[alt="Marvel Studios"]').forEach(img => {
            if (img.src === MARVEL_LOGO) return;
            img.src = MARVEL_LOGO;
            img.removeAttribute('srcset');
        });
    }

    /***********************
     * HIDE MODSS TITLES
     ***********************/
    function hideModssTitles(root = document) {
        if (!isModssSettingsPage()) return;

        root.querySelectorAll('.settings-param-title').forEach(el => {
            el.classList.add('modss-hidden');
        });
    }

    /***********************
     * CLEAN SUBTITLE
     ***********************/
    function cleanSelectSubtitle(root = document) {
        if (!isSelectOpen()) return;

        root.querySelectorAll('.selectbox-item__subtitle').forEach(el => {
            el.textContent = el.textContent.replace(/\s*\(.*?\)\s*$/, '');
        });
    }

    /***********************
     * REMOVE JACKett URL2
     ***********************/
    function removeJackett(root = document) {
        if (!isParserSettingsPage()) return;

        root.querySelectorAll('.settings-param[data-name="jackett_url2"]').forEach(el => el.remove());
    }

    /***********************
     * OBSERVER
     ***********************/
    function startObserver() {
        if (observerStarted) return;
        observerStarted = true;

        const observer = new MutationObserver(mutations => {
            mutations.forEach(m => {
                m.addedNodes.forEach(node => {
                    if (node.nodeType !== 1) return;

                    replaceMarvelLogo(node);
                    hideModssTitles(node);
                    cleanSelectSubtitle(node);
                    removeJackett(node);
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    /***********************
     * APPLY
     ***********************/
    function apply() {
        injectStyle();
        replaceMarvelLogo();
        hideModssTitles();
        cleanSelectSubtitle();
        removeJackett();
        startObserver();
    }

    apply();

    if (window.Lampa && Lampa.Listener) {
        Lampa.Listener.follow('activity', apply);
        Lampa.Listener.follow('app', apply);
    }
})();
