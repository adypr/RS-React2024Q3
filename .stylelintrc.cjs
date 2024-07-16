module.exports = {
  plugins: ['stylelint-order', 'stylelint-prettier'],
  ignoreFiles: ['**/*.js', 'node_modules/**/*.*'],
  rules: {
    'selector-class-pattern': null,
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extend', 'mixin', 'include', 'use'],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes'],
      },
    ],
    'unit-allowed-list': [
      'em',
      'rem',
      '%',
      'px',
      'vh',
      'vw',
      'vmin',
      'vmax',
      's',
      'fr',
    ],
    'color-named': 'never',
    'color-function-notation': 'modern',
    'declaration-empty-line-before': [
      'never',
      {
        ignore: [
          'after-comment',
          'after-declaration',
          'inside-single-line-block',
        ],
      },
    ],
    'color-hex-length': 'long',
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'declarations',
      'rules',
      'at-rules',
    ],
    'order/properties-order': [
      {
        emptyLineBefore: 'never',
        properties: ['composes', 'composes-with'],
      },
      {
        emptyLineBefore: 'always',
        properties: [
          'content',
          'position',
          'top',
          'right',
          'bottom',
          'left',
          'z-index',
        ],
      },
      {
        emptyLineBefore: 'always',
        properties: [
          'display',
          '-webkit-box',
          '-webkit-flex',
          '-moz-box',
          '-ms-flexbox',
          'flex',
          '-webkit-box-flex',
          '-webkit-flex-grow',
          '-moz-box-flex',
          '-ms-flex-positive',
          'flex-grow',
          '-webkit-flex-shrink',
          '-ms-flex-negative',
          'flex-shrink',
          '-webkit-flex-basis',
          '-ms-flex-preferred-size',
          'flex-basis',
          '-webkit-flex-flow',
          '-ms-flex-flow',
          'flex-flow',
          '-webkit-box-orient',
          '-webkit-box-direction',
          '-webkit-flex-direction',
          '-moz-box-orient',
          '-moz-box-direction',
          '-ms-flex-direction',
          'flex-direction',
          '-webkit-flex-wrap',
          '-ms-flex-wrap',
          'flex-wrap',
          '-webkit-box-pack',
          '-webkit-justify-content',
          '-moz-box-pack',
          '-ms-flex-pack',
          'justify-content',
          '-webkit-align-content',
          '-ms-flex-line-pack',
          'align-content',
          '-webkit-box-align',
          '-webkit-align-items',
          '-moz-box-align',
          '-ms-flex-align',
          'align-items',
          '-webkit-box-ordinal-group',
          '-webkit-order',
          '-moz-box-ordinal-group',
          '-ms-flex-order',
          'order',
          '-webkit-align-self',
          '-ms-flex-item-align',
          '-ms-grid-row-align',
          'align-self',
          'float',
          'clear',
          '-webkit-box-sizing',
          '-moz-box-sizing',
          'box-sizing',
          'width',
          'min-width',
          'max-width',
          'height',
          'min-height',
          'max-height',
          'margin',
          'margin-top',
          'margin-right',
          'margin-bottom',
          'margin-left',
          'padding',
          'padding-top',
          'padding-right',
          'padding-bottom',
          'padding-left',
          'overflow',
          '-ms-overflow-x',
          'overflow-x',
          '-ms-overflow-y',
          'overflow-y',
          '-webkit-overflow-scrolling',
        ],
      },
      {
        emptyLineBefore: 'always',
        properties: [
          'list-style',
          'list-style-position',
          'list-style-type',
          'list-style-image',
          'border-collapse',
          'border-spacing',
          'table-layout',
          'empty-cells',
          'caption-side',
          'font',
          'font-style',
          'font-variant',
          'font-weight',
          'font-size',
          'line-height',
          'font-family',
          'vertical-align',
          'text-align',
          'direction',
          'color',
          'text-transform',
          '-webkit-text-decoration',
          '-moz-text-decoration',
          'text-decoration',
          'font-size-adjust',
          'font-stretch',
          'font-effect',
          'font-emphasize',
          'font-emphasize-position',
          'font-emphasize-style',
          'font-smooth',
          '-webkit-text-align-last',
          '-moz-text-align-last',
          '-ms-text-align-last',
          'text-align-last',
          'letter-spacing',
          'word-spacing',
          'white-space',
          '-webkit-text-emphasis',
          'text-emphasis',
          '-webkit-text-emphasis-color',
          'text-emphasis-color',
          '-webkit-text-emphasis-style',
          'text-emphasis-style',
          '-webkit-text-emphasis-position',
          'text-emphasis-position',
          'text-indent',
          '-ms-text-justify',
          'text-justify',
          '-ms-writing-mode',
          'text-outline',
          'text-wrap',
          '-ms-text-overflow',
          '-o-text-overflow',
          'text-overflow',
          'text-overflow-ellipsis',
          'text-overflow-mode',
          'text-orientation',
          '-ms-word-wrap',
          'word-wrap',
          '-ms-word-break',
          'word-break',
          '-moz-tab-size',
          '-o-tab-size',
          'tab-size',
          '-webkit-hyphens',
          '-moz-hyphens',
          '-ms-hyphens',
          'hyphens',
          'unicode-bidi',
          '-webkit-columns',
          '-moz-columns',
          'columns',
          '-webkit-column-count',
          '-moz-column-count',
          'column-count',
          '-webkit-column-fill',
          '-moz-column-fill',
          'column-fill',
          '-webkit-column-gap',
          '-moz-column-gap',
          'column-gap',
          '-webkit-column-rule',
          '-moz-column-rule',
          'column-rule',
          '-webkit-column-rule-color',
          '-moz-column-rule-color',
          'column-rule-color',
          '-webkit-column-rule-style',
          '-moz-column-rule-style',
          'column-rule-style',
          '-webkit-column-rule-width',
          '-moz-column-rule-width',
          'column-rule-width',
          '-webkit-column-span',
          '-moz-column-span',
          'column-span',
          '-webkit-column-width',
          '-moz-column-width',
          'column-width',
          'text-shadow',
          'page-break-after',
          'page-break-before',
          'page-break-inside',
        ],
      },
      {
        emptyLineBefore: 'always',
        properties: [
          'background',
          'background-color',
          'background-image',
          '-webkit-gradient',
          '-webkit-linear-gradient',
          '-moz-linear-gradient',
          '-o-linear-gradient',
          'linear-gradient',
          'background-repeat',
          'background-position',
          '-ms-background-position-x',
          'background-position-x',
          '-ms-background-position-y',
          'background-position-y',
          '-webkit-background-size',
          '-moz-background-size',
          '-o-background-size',
          'background-size',
          '-webkit-background-clip',
          '-moz-background-clip',
          'background-clip',
          '-webkit-background-origin',
          '-moz-background-origin',
          '-o-background-origin',
          'background-origin',
          'background-attachment',
          '-webkit-box-decoration-break',
          'box-decoration-break',
          'background-blend-mode',
          'border',
          'border-width',
          'border-style',
          'border-color',
          'border-top',
          'border-top-width',
          'border-top-style',
          'border-top-color',
          'border-right',
          'border-right-width',
          'border-right-style',
          'border-right-color',
          'border-bottom',
          'border-bottom-width',
          'border-bottom-style',
          'border-bottom-color',
          'border-left',
          'border-left-width',
          'border-left-style',
          'border-left-color',
          '-webkit-border-radius',
          '-moz-border-radius',
          'border-radius',
          '-webkit-border-top-left-radius',
          '-moz-border-radius-topleft',
          'border-top-left-radius',
          '-webkit-border-top-right-radius',
          '-moz-border-radius-topright',
          'border-top-right-radius',
          '-webkit-border-bottom-right-radius',
          '-moz-border-radius-bottomright',
          'border-bottom-right-radius',
          '-webkit-border-bottom-left-radius',
          '-moz-border-radius-bottomleft',
          'border-bottom-left-radius',
          '-webkit-border-image',
          '-moz-border-image',
          '-o-border-image',
          'border-image',
          '-webkit-border-image-source',
          '-moz-border-image-source',
          '-o-border-image-source',
          'border-image-source',
          '-webkit-border-image-slice',
          '-moz-border-image-slice',
          '-o-border-image-slice',
          'border-image-slice',
          '-webkit-border-image-width',
          '-moz-border-image-width',
          '-o-border-image-width',
          'border-image-width',
          '-webkit-border-image-outset',
          '-moz-border-image-outset',
          '-o-border-image-outset',
          'border-image-outset',
          '-webkit-border-image-repeat',
          '-moz-border-image-repeat',
          '-o-border-image-repeat',
          'border-image-repeat',
          'outline',
          'outline-width',
          'outline-style',
          'outline-color',
          'outline-offset',
          '-webkit-box-shadow',
          '-moz-box-shadow',
          'box-shadow',
          '-webkit-transform',
          '-moz-transform',
          '-ms-transform',
          '-o-transform',
          'transform',
          '-webkit-transform-origin',
          '-moz-transform-origin',
          '-ms-transform-origin',
          '-o-transform-origin',
          'transform-origin',
          '-webkit-backface-visibility',
          '-moz-backface-visibility',
          'backface-visibility',
          '-webkit-perspective',
          '-moz-perspective',
          'perspective',
          '-webkit-perspective-origin',
          '-moz-perspective-origin',
          'perspective-origin',
          '-webkit-transform-style',
          '-moz-transform-style',
          'transform-style',
          'visibility',
          'cursor',
          'opacity',
          '-webkit-filter',
          'filter',
        ],
      },
      {
        emptyLineBefore: 'always',
        properties: [
          '-webkit-transition',
          '-moz-transition',
          '-ms-transition',
          '-o-transition',
          'transition',
          '-webkit-transition-delay',
          '-moz-transition-delay',
          '-ms-transition-delay',
          '-o-transition-delay',
          'transition-delay',
          '-webkit-transition-timing-function',
          '-moz-transition-timing-function',
          '-ms-transition-timing-function',
          '-o-transition-timing-function',
          'transition-timing-function',
          '-webkit-transition-duration',
          '-moz-transition-duration',
          '-ms-transition-duration',
          '-o-transition-duration',
          'transition-duration',
          '-webkit-transition-property',
          '-moz-transition-property',
          '-ms-transition-property',
          '-o-transition-property',
          'transition-property',
          '-webkit-animation',
          '-moz-animation',
          '-ms-animation',
          '-o-animation',
          'animation',
          '-webkit-animation-name',
          '-moz-animation-name',
          '-ms-animation-name',
          '-o-animation-name',
          'animation-name',
          '-webkit-animation-duration',
          '-moz-animation-duration',
          '-ms-animation-duration',
          '-o-animation-duration',
          'animation-duration',
          '-webkit-animation-play-state',
          '-moz-animation-play-state',
          '-ms-animation-play-state',
          '-o-animation-play-state',
          'animation-play-state',
          '-webkit-animation-timing-function',
          '-moz-animation-timing-function',
          '-ms-animation-timing-function',
          '-o-animation-timing-function',
          'animation-timing-function',
          '-webkit-animation-delay',
          '-moz-animation-delay',
          '-ms-animation-delay',
          '-o-animation-delay',
          'animation-delay',
          '-webkit-animation-iteration-count',
          '-moz-animation-iteration-count',
          '-ms-animation-iteration-count',
          '-o-animation-iteration-count',
          'animation-iteration-count',
          '-webkit-animation-direction',
          '-moz-animation-direction',
          '-ms-animation-direction',
          '-o-animation-direction',
          'animation-direction',
        ],
      },
      {
        emptyLineBefore: 'always',
        properties: [
          'quotes',
          'counter-reset',
          'counter-increment',
          'resize',
          '-webkit-user-select',
          '-moz-user-select',
          '-ms-user-select',
          'user-select',
          'nav-index',
          'nav-up',
          'nav-right',
          'nav-down',
          'nav-left',
          'pointer-events',
          'will-change',
          'clip',
          '-webkit-clip-path',
          'clip-path',
          'zoom',
        ],
      },
    ],
  },
};
