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

            /* Marvel Studios split logo (DOM untouched) */
            img[alt="Marvel Studios"] {
                position: relative;
                display: inline-block;
            }

            /* Right white half */
            img[alt="Marvel Studios"]::after {
                content: "";
                position: absolute;
                top: 0;
                left: 50%;
                width: 50%;
                height: 100%;
                background-image: var(--marvel-src);
                background-repeat: no-repeat;
                background-size: 200% 100%;
                background-position: right center;
                filter: brightness(0) invert(1);
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }

    function patchMarvel() {
        document.querySelectorAll('img[alt="Marvel Studios"]').forEach(img => {
            if (img.dataset.marvelPatched) return;
            img.dataset.marvelPatched = '1';

            img.style.setProperty('--marvel-src', `url("${img.src}")`);
        });
    }

    function apply() {
        injectStyle();
        patchMarvel();
    }

    apply();

    if (window.Lampa && window.Lampa.Listener) {
        Lampa.Listener.follow('app', apply);
    }
})();
