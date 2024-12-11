import {EditorView} from '@codemirror/view'
import {Extension} from '@codemirror/state'
import {HighlightStyle, syntaxHighlighting} from '@codemirror/language'
import {tags as t} from '@lezer/highlight'

// Colors extracted from Mariana.sublime-color-scheme.

const black = "hsl(0, 0%, 0%)",
  blue = "hsl(210, 50%, 60%)",
  blueVibrant = "hsl(210, 60%, 60%)",
  blue2 = "hsla(210, 13%, 40%, 0.7)",
  blue3 = "hsl(210, 15%, 22%)",
  blue4 = "hsl(210, 13%, 45%)",
  blue5 = "hsl(180, 36%, 54%)",
  blue6 = "hsl(221, 12%, 69%)",
  green = "hsl(114, 31%, 68%)",
  grey = "hsl(0, 0%, 20%)",
  yellow = "hsl(50, 100%, 60%)",
  orange = "hsl(32, 93%, 66%)",
  orange2 = "hsl(32, 85%, 55%)",
  orange3 = "hsl(40, 94%, 68%)",
  pink = "hsl(300, 30%, 68%)",
  red = "hsl(357, 79%, 65%)",
  red2 = "hsl(13, 93%, 66%)",
  white = "hsl(0, 0%, 100%)",
  white2 = "hsl(0, 0%, 97%)",
  white3 = "hsl(219, 28%, 88%)"

// Helper methods, the method name are reflecting the same as sublime uses.

const blend = (a: string, b: string, p: number) => `color-mix(in srgb, ${a} ${p * 100}%, ${b})`
const a = (color: string, p: number) => blend(color, 'transparent', p)

// Variables from sublime color scheme.
const foreground = white3,
  background = blue3,
  accent = blueVibrant,
  caret = orange,
  lineHighlight = blue2,
  selection = blue2,
  selectionBorder = blue4,
  inactiveSelection = blue2,
  misspelling = red,
  shadow = a(black, 0.25),
  activeGuide = blue5,
  stackGuide = a(blue5, 0.5),
  highlight = blue5,
  findHighlightForeground = grey,
  findHighlight = orange3,
  bracketsOptions = 'underline',
  bracketsForeground = orange,
  bracketsContentsOptions = 'underline',
  bracketsContentsForeground = blue5,
  tagsOptions = 'dotted',
  tagsForeground = pink,
  bg = blend(background, black, 0.6),
  link = 'hsl(215, 60%, 50%)',
  divider = 'hsl(0, 0%, 38%)',
  tooltip = blend(background, white, 0.95)

/// The colors used in the theme, as CSS color strings.
export const color = {
  black,
  blue,
  blueVibrant,
  blue2,
  blue3,
  blue4,
  blue5,
  blue6,
  green,
  grey,
  yellow,
  orange,
  orange2,
  orange3,
  pink,
  red,
  red2,
  white,
  white2,
  white3,

  // Variables.
  foreground,
  background,
  accent,
  caret,
  lineHighlight,
  selection,
  selectionBorder,
  inactiveSelection,
  misspelling,
  shadow,
  activeGuide,
  stackGuide,
  highlight,
  findHighlightForeground,
  findHighlight,
  bracketsOptions,
  bracketsForeground,
  bracketsContentsOptions,
  bracketsContentsForeground,
  tagsOptions,
  tagsForeground,
  bg,
  link,
  divider,
  tooltip
}

/// The editor theme styles for Mariana, inspired by the "Adaptive" theme in Sublime Text.
export const marianaTheme = EditorView.theme({
  "&": {
    color: white3,
    backgroundColor: blue3
  },

  ".cm-content": {
    caretColor: orange
  },

  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: orange,
    borderLeftWidth: '2px',
    marginLeft: '-1px'
  },
  "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: blue2,
    outline: color.selectionBorder
  },

  ".cm-panels": {
    backgroundColor: `hsl(from ${color.background} h s calc(l * 0.5))`
  },

  ".cm-searchMatch": {
    outline: `${color.highlight} solid 1px`,
    borderRadius: '2px',
    backgroundColor: 'transparent'
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    outline: 'none',
    backgroundColor: color.findHighlight, color: color.findHighlightForeground
  },

  ".cm-activeLine": {
    backgroundColor: 'transparent'
  },
  ".cm-selectionMatch": {
    outline: `${color.highlight} solid 1px`,
    borderRadius: '2px',
    backgroundColor: 'transparent'
  },

  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${color.bracketsForeground}`
  },

  ".cm-gutters": {
    backgroundColor: color.background,
    color: a(color.foreground, 0.5),
    border: "none"
  },

  ".cm-activeLineGutter": {
    backgroundColor: color.lineHighlight,
    color: a(color.foreground, 0.9)
  },

  ".cm-foldPlaceholder": {
    backgroundColor: "transparent",
    border: "none",
    color: color.foreground
  },

  ".cm-tooltip": {
    border: "none",
    backgroundColor: tooltip,
    boxShadow: `0 2px 15px ${color.shadow}`
  },
  ".cm-tooltip .cm-tooltip-arrow:before": {
    borderTopColor: "transparent",
    borderBottomColor: "transparent"
  },
  ".cm-tooltip .cm-tooltip-arrow:after": {
    borderTopColor: tooltip,
    borderBottomColor: tooltip
  },
  ".cm-tooltip-autocomplete": {
    "& > ul": {
      scrollbarColor: `${divider} transparent`
    },
    "& > ul > li[aria-selected]": {
      backgroundColor: color.blue2,
    }
  }
}, {dark: true})

/// The highlighting style for code in the Mariana theme.
export const marianaHighlightStyle = HighlightStyle.define([
  {tag: [t.comment, t.separator, t.derefOperator], color: blue6},
  {tag: [t.string], color: green},
  {tag: [t.function(t.name), t.typeName], color: blue},
  {tag: [t.angleBracket, t.definition(t.propertyName), t.function(t.definition(t.variableName))], color: blue5},
  {tag: [t.number, t.definition(t.className)], color: orange},
  {tag: [t.self, t.bool, t.constant(t.name), t.special(t.name), t.tagName, t.operator], color: red},
  {tag: [t.keyword, t.escape, t.function(t.punctuation), t.processingInstruction, t.labelName, t.attributeName, t.className, t.namespace], color: pink},
  {tag: [t.special(t.brace)], color: white},
  {tag: [t.macroName], color: blue, fontStyle: 'italic'},
  {tag: [t.link, t.url], color: blue, textDecoration: 'underline'},
  {tag: [t.heading, t.strong], fontWeight: 'bold'},
  {tag: [t.emphasis], fontStyle: 'italic'},
  {tag: [t.strikethrough], textDecoration: 'line-through'}
])

/// Extension to enable the Mariana theme (both the editor theme and the highlight style).
export const mariana: Extension = [marianaTheme, syntaxHighlighting(marianaHighlightStyle)]
