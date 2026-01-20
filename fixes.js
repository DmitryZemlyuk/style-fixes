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

            /* Marvel Studios — split logo (right part white) */
            img[alt="Marvel Studios"] {
                position: relative;
                display: inline-block;
                clip-path: inset(0 50% 0 0);
            }

            img[alt="Marvel Studios"]::after {
                content: "";
                position: absolute;
                inset: 0;
                background-image: inherit;
                background-repeat: no-repeat;
                background-size: 200% 100%;
                background-position: right center;
                clip-path: inset(0 0 0 50%);
                filter: brightness(0) invert(1);
                pointer-events: none;
            }
        `;

        document.head.appendChild(style);
    }

    function patchMarvel() {
        document.querySelectorAll('img[alt="Marvel Studios"]').forEach(img => {
            if (img.dataset.splitPatched) return;
            img.dataset.splitPatched = '1';

            img.style.backgroundImage = `url("${img.src}")`;
        });
    }

    function apply() {
        injectStyle();
        patchMarvel();
    }

    apply();

    if (window.Lampa && Lampa.Listener) {
        Lampa.Listener.follow('app', apply);
    }
})();
