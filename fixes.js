(function () {
    'use strict';

    const STYLE_ID = 'ui-fixes-style';
    const MARVEL_LOGO =
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b65effc6-45d7-4225-8e94-82458b9ca149/df00rkf-8d8449d3-c7c3-49fa-b97d-7aa53f79e698.png/v1/fill/w_1280,h_286/marvel_studios_2016_logo_svg_by_hugo150pro_df00rkf-fullview.png';

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
        document.querySelectorAll('img[alt="Marvel Studios"]').forEach(img => {
            if (img.dataset.marvelReplaced) return;
            img.dataset.marvelReplaced = '1';

            img.src = MARVEL_LOGO;
            img.srcset = MARVEL_LOGO;
        });
    }

    function apply() {
        injectStyle();
        replaceMarvelLogo();
    }

    apply();

    if (window.Lampa && window.Lampa.Listener) {
        Lampa.Listener.follow('app', apply);
    }
})();
