"use strict";
(() => {
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a2, b) => (typeof require !== "undefined" ? require : a2)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });

  // src/dev-main.ts
  var import_codemirror = __require("codemirror");
  var import_view2 = __require("@codemirror/view");
  var import_lang_javascript = __require("@codemirror/lang-javascript");
  var import_language2 = __require("@codemirror/language");
  var import_highlight2 = __require("@lezer/highlight");

  // node_modules/crelt/index.js
  function crelt() {
    var elt = arguments[0];
    if (typeof elt == "string") elt = document.createElement(elt);
    var i = 1, next = arguments[1];
    if (next && typeof next == "object" && next.nodeType == null && !Array.isArray(next)) {
      for (var name in next) if (Object.prototype.hasOwnProperty.call(next, name)) {
        var value = next[name];
        if (typeof value == "string") elt.setAttribute(name, value);
        else if (value != null) elt[name] = value;
      }
      i++;
    }
    for (; i < arguments.length; i++) add(elt, arguments[i]);
    return elt;
  }
  function add(elt, child) {
    if (typeof child == "string") {
      elt.appendChild(document.createTextNode(child));
    } else if (child == null) {
    } else if (child.nodeType != null) {
      elt.appendChild(child);
    } else if (Array.isArray(child)) {
      for (var i = 0; i < child.length; i++) add(elt, child[i]);
    } else {
      throw new RangeError("Unsupported child node: " + child);
    }
  }

  // src/mariana.ts
  var import_view = __require("@codemirror/view");
  var import_language = __require("@codemirror/language");
  var import_highlight = __require("@lezer/highlight");
  var black = "hsl(0, 0%, 0%)";
  var blue = "hsl(210, 50%, 60%)";
  var blueVibrant = "hsl(210, 60%, 60%)";
  var blue2 = "hsla(210, 13%, 40%, 0.7)";
  var blue3 = "hsl(210, 15%, 22%)";
  var blue4 = "hsl(210, 13%, 45%)";
  var blue5 = "hsl(180, 36%, 54%)";
  var blue6 = "hsl(221, 12%, 69%)";
  var green = "hsl(114, 31%, 68%)";
  var grey = "hsl(0, 0%, 20%)";
  var yellow = "hsl(50, 100%, 60%)";
  var orange = "hsl(32, 93%, 66%)";
  var orange2 = "hsl(32, 85%, 55%)";
  var orange3 = "hsl(40, 94%, 68%)";
  var pink = "hsl(300, 30%, 68%)";
  var red = "hsl(357, 79%, 65%)";
  var red2 = "hsl(13, 93%, 66%)";
  var white = "hsl(0, 0%, 100%)";
  var white2 = "hsl(0, 0%, 97%)";
  var white3 = "hsl(219, 28%, 88%)";
  var blend = (a2, b, p) => `color-mix(in srgb, ${a2} ${p * 100}%, ${b})`;
  var a = (color2, p) => blend(color2, "transparent", p);
  var foreground = white3;
  var background = blue3;
  var accent = blueVibrant;
  var caret = orange;
  var lineHighlight = blue2;
  var selection = blue2;
  var selectionBorder = blue4;
  var inactiveSelection = blue2;
  var misspelling = red;
  var shadow = a(black, 0.25);
  var activeGuide = blue5;
  var stackGuide = a(blue5, 0.5);
  var highlight = blue5;
  var findHighlightForeground = grey;
  var findHighlight = orange3;
  var bracketsOptions = "underline";
  var bracketsForeground = orange;
  var bracketsContentsOptions = "underline";
  var bracketsContentsForeground = blue5;
  var tagsOptions = "dotted";
  var tagsForeground = pink;
  var bg = blend(background, black, 0.6);
  var link = "hsl(215, 60%, 50%)";
  var divider = "hsl(0, 0%, 38%)";
  var tooltip = blend(background, white, 0.95);
  var color = {
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
  };
  var marianaTheme = import_view.EditorView.theme({
    "&": {
      color: white3,
      backgroundColor: blue3
    },
    ".cm-content": {
      caretColor: orange
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: orange,
      borderLeftWidth: "2px",
      marginLeft: "-1px"
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
      backgroundColor: "transparent"
    },
    ".cm-searchMatch.cm-searchMatch-selected": {
      outline: "none",
      backgroundColor: color.findHighlight,
      color: color.findHighlightForeground
    },
    ".cm-activeLine": {
      backgroundColor: "transparent"
    },
    ".cm-selectionMatch": {
      outline: `${color.highlight} solid 1px`,
      backgroundColor: "transparent"
    },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "transparent",
      borderBottom: `1px solid ${color.bracketsForeground}`
    },
    ".cm-gutterElement": {
      width: "10px"
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
        backgroundColor: color.blue2
      }
    }
  }, { dark: true });
  var marianaHighlightStyle = import_language.HighlightStyle.define([
    { tag: [import_highlight.tags.comment, import_highlight.tags.separator, import_highlight.tags.derefOperator], color: blue6 },
    { tag: [import_highlight.tags.string], color: green },
    { tag: [import_highlight.tags.function(import_highlight.tags.name), import_highlight.tags.typeName], color: blue },
    { tag: [import_highlight.tags.definition(import_highlight.tags.propertyName), import_highlight.tags.function(import_highlight.tags.definition(import_highlight.tags.variableName))], color: blue5 },
    { tag: [import_highlight.tags.number, import_highlight.tags.definition(import_highlight.tags.className)], color: orange },
    { tag: [import_highlight.tags.self, import_highlight.tags.constant(import_highlight.tags.name), import_highlight.tags.definitionOperator, import_highlight.tags.arithmeticOperator, import_highlight.tags.compareOperator, import_highlight.tags.logicOperator], color: red },
    { tag: [import_highlight.tags.keyword, import_highlight.tags.escape, import_highlight.tags.function(import_highlight.tags.punctuation)], color: pink },
    { tag: [import_highlight.tags.special(import_highlight.tags.brace)], color: white }
  ]);
  var mariana = [marianaTheme, (0, import_language.syntaxHighlighting)(marianaHighlightStyle)];

  // src/dev-main.ts
  document.body.style.background = color.bg;
  var doc = sessionStorage.getItem("doc") ?? `const a = 1;
function hello(who = "world") {
  console.log(\`Hello, \${who}!\`)
}`;
  globalThis.view = new import_codemirror.EditorView({
    doc,
    extensions: [
      import_codemirror.basicSetup,
      (0, import_lang_javascript.javascript)({ typescript: true }),
      import_lang_javascript.javascriptLanguage.data.of({
        autocomplete: (0, import_lang_javascript.scopeCompletionSource)(globalThis)
      }),
      mariana,
      import_view2.showPanel.of(() => {
        let dom = crelt("div", { class: "inspect" });
        function dfs(node, at) {
          if (node.firstChild) {
            let c = node.firstChild;
            while (c.nextSibling && c.nextSibling.from <= at)
              c = c.nextSibling;
            return dfs(c, at);
          }
          return node;
        }
        return {
          dom,
          update(update) {
            if (update.selectionSet) {
              let result = "(empty)";
              let tree = (0, import_language2.syntaxTree)(update.state);
              let at = update.state.selection.main.anchor;
              let node = dfs(tree.resolve(at), at);
              let code = update.state.sliceDoc(node.from, node.to);
              let rule = (0, import_highlight2.getStyleTags)(node);
              if (rule) {
                let tags = [];
                for (let tag of rule.tags)
                  tags.push("t." + tag.toString().replaceAll("(", "(t."));
                result = tags.join("\n");
              }
              dom.textContent = `'${code}' => ${result}`;
            }
          }
        };
      }),
      import_view2.ViewPlugin.fromClass(class {
        update(update) {
          if (update.docChanged) {
            sessionStorage.setItem("doc", update.state.sliceDoc());
          }
        }
      })
    ],
    parent: document.querySelector("#editor")
  });
})();
