(function () {
    'use strict';

    const STYLE_ID = 'ui-fixes-style';

    const MARVEL_LOGO = './logo.png';

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
        document.querySelectorAll('img[alt="Marvel Studios"]').forEach(img => {
            if (img.dataset.marvelReplaced) return;
            img.dataset.marvelReplaced = '1';

            img.src = MARVEL_LOGO;
            img.srcset = MARVEL_LOGO;
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
