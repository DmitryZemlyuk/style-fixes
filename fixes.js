(function () {
    'use strict';

    function injectStyle() {
        if (document.getElementById('app-info-svg-padding')) return;

        const style = document.createElement('style');
        style.id = 'app-info-svg-padding';
        style.textContent = `
            .applecation__info.show > span > div > svg {
                padding-right: 1px;
            }
        `;
        document.head.appendChild(style);
    }

    injectStyle();

    if (window.Lampa && Lampa.Listener) {
        Lampa.Listener.follow('app', injectStyle);
    }

})();
