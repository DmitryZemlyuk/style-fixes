(function () {
    'use strict';

    function injectStyle() {
        if (document.getElementById('ui-fixes-style')) return;

        const style = document.createElement('style');
        style.id = 'ui-fixes-style';
        style.textContent = `
            /* SVG padding fix */
            .applecation__info.show > span > div > svg {
                padding-right: 1px;
            }

            /* Marvel Studios split logo */
            img[alt="Marvel Studios"] {
                position: relative;
                display: inline-block;
                width: auto;
                clip-path: inset(0 50% 0 0); /* левая половина */
            }

            img[alt="Marvel Studios"]::after {
                content: "";
                position: absolute;
                top: 0;
                right: 0;
                width: 100%;
                height: 100%;
                background-image: inherit;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                clip-path: inset(0 0 0 50%); /* правая половина */
                filter: brightness(0) invert(1);
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }

    function patchMarvel() {
        document.querySelectorAll('img[alt="Marvel Studios"]').forEach(img => {
            if (img.dataset.patched) return;
            img.dataset.patched = '1';

            // Нужно, чтобы background-image совпадал с src
            img.style.backgroundImage = `url("${img.src}")`;
        });
    }

    injectStyle();
    patchMarvel();

    if (window.Lampa && Lampa.Listener) {
        Lampa.Listener.follow('app', () => {
            injectStyle();
            patchMarvel();
        });
    }
})();
