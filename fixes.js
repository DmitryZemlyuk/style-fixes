(function () {
    'use strict';

    const STYLE_ID = 'ui-fixes-style';

    function injectStyle() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            /* SVG padding fix */
            .applecation__info.show > span > div > svg {
                padding-right: 1px;
            }
        `;
        document.head.appendChild(style);
    }

    function replaceMarvelLogo() {
        const logoUrl = 'https://dmitryzemlyuk.github.io/style-fixes/logo.png';

        document.querySelectorAll('img[alt="Marvel Studios"]').forEach(img => {
            if (img.dataset.marvelReplaced) return;
            img.dataset.marvelReplaced = '1';

            img.src = logoUrl;
            img.srcset = logoUrl;
        });
    }

    function apply() {
        injectStyle();
        replaceMarvelLogo();
    }

    apply();

    if (window.Lampa && Lampa.Listener) {
        Lampa.Listener.follow('app', apply);
    }
})();
