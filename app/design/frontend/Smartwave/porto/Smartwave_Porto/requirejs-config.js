var config = {
    paths: {
        'imagesloaded': 'Smartwave_Porto/js/imagesloaded',
        'packery': 'Smartwave_Porto/js/packery.pkgd',
        'themeSticky': 'js/jquery.sticky.min',
        'pt_appear': 'Smartwave_Porto/js/apear',
        'pt_animate': 'Smartwave_Porto/js/animate'
    },
    shim: {
        'packery': {
            deps: ['jquery','imagesloaded']
        },
        'themeSticky': {
            deps: ['jquery']
        },
        'pt_animate': {
          deps: ['jquery','pt_appear']
        }
    }
};
