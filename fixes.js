(function () {
    'use strict';

    /***********************
     * HARD AD BLOCK (MODSS)
     ***********************/
    (function () {
        const origInsert = Element.prototype.insertAdjacentHTML;

        Element.prototype.insertAdjacentHTML = function (pos, html) {
            if (typeof html === 'string' && html.includes('ad-server')) {
                html = html.replace(/<div class="ad-server"[\\s\\S]*?<\\/div>\\s*<\\/div>/g, '');
            }

            return origInsert.call(this, pos, html);
        };
    })();

    /***********************
     * CONSTANTS
     ***********************/
    const STYLE_ID = 'ui-fixes-style';
    const MARVEL_LOGO = 'https://dmitryzemlyuk.github.io/style-fixes/logo.png';

    let observerStarted = false;

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
