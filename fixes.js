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

            /* Marvel Studios split logo */
            .marvel-split {
                position: relative;
                display: inline-block;
                line-height: 0;
            }

            /* ORIGINAL image — always untouched */
            .marvel-split > img {
                display: block;
                filter: none !important;
            }

            /* Right (white) half wrapper */
            .marvel-right {
                position: absolute;
                top: 0;
                right: 0;
                width: 50%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
            }

            /* Cloned image inside right half */
            .marvel-right img {
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

            const clone = img.cloneNode(true);

            right.appendChild(clone);

            img.parentNode.insertBefore(wrapper, img);
            wrapper.appendChild(img);     // original (left)
            wrapper.appendChild(right);   // white right half
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
