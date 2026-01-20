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

            /* Marvel Studios logo — disable invert/brightness */
            img[alt="Marvel Studios"] {
                filter: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    injectStyle();

    if (window.Lampa && Lampa.Listener) {
        Lampa.Listener.follow('app', injectStyle);
    }

})();
