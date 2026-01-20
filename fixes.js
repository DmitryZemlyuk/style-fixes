(function () {
    'use strict';

    const STYLE_ID = 'ui-fixes-style';
    const MARVEL_LOGO = 'https://dmitryzemlyuk.github.io/style-fixes/logo.png';

    function injectStyle() {
        if (document.getElementById(STYLE_ID)) return;

        const style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent = `
            /* SVG padding fix */
            .applecation__info.show > span > div > svg {
                padding-right: 1px;
            }

            /* Marvel Studios — remove forced invert */
            img[alt="Marvel Studios"] {
                filter: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    function replaceMarvelLogo() {
        document.querySelectorAll('img[alt="Marvel Studios"]').forEach(img => {
            img.src = MARVEL_LOGO;
            img.removeAttribute('srcset');
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

    setTimeout(apply, 500);
    setTimeout(apply, 1500);
})();
