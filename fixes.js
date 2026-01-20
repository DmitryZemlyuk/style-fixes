(function () {
    'use strict';

    const STYLE_ID = 'ui-fixes-style';

    function getScriptBasePath() {
        const script = document.currentScript;
        if (!script || !script.src) return null;
        return script.src.substring(0, script.src.lastIndexOf('/') + 1);
    }

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
        const basePath = getScriptBasePath();
        if (!basePath) return;

        const logoUrl = basePath + 'logo.png';

        document.querySelectorAll('img[alt="Marvel Studios"]').forEach(img => {
            if (img.src === logoUrl) return;

            img.src = logoUrl;
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
