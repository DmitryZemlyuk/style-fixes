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

            /* Marvel Studios split wrapper */
            .marvel-split {
                position: relative;
                display: inline-block;
            }

            .marvel-split img {
                display: block;
            }

            .marvel-split .marvel-right {
                position: absolute;
                top: 0;
                left: 50%;
                width: 50%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
            }

            .marvel-split .marvel-right img {
                position: absolute;
                top: 0;
                left: -50%;
                width: 100%;
                height: auto;
                filter: brightness(0) invert(1);
            }
        `;
        document.head.appendChild(style);
    }

    function patchMarvel() {
        document.querySelectorAll('img[alt="Marvel Studios"]').forEach(img => {
            if (img.closest('.marvel-split')) return;

            const wrapper = document.createElement('span');
            wrapper.className = 'marvel-split';

            const right = document.createElement('span');
            right.className = 'marvel-right';

            const rightImg = img.cloneNode(true);

            right.appendChild(rightImg);

            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);
            wrapper.appendChild(right);
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
