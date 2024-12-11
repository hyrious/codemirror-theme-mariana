"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a2, b) => (typeof require !== "undefined" ? require : a2)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/dev-main.ts
  var import_codemirror = __require("codemirror");
  var import_state = __require("@codemirror/state");
  var import_view2 = __require("@codemirror/view");
  var import_lang_javascript = __require("@codemirror/lang-javascript");
  var import_lang_markdown = __require("@codemirror/lang-markdown");
  var import_language2 = __require("@codemirror/language");
  var import_highlight2 = __require("@lezer/highlight");
  var import_language3 = __require("@codemirror/language");

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
      borderRadius: "2px",
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
      borderRadius: "2px",
      backgroundColor: "transparent"
    },
    "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
      backgroundColor: "transparent",
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
        backgroundColor: color.blue2
      }
    }
  }, { dark: true });
  var marianaHighlightStyle = import_language.HighlightStyle.define([
    { tag: [import_highlight.tags.comment, import_highlight.tags.separator, import_highlight.tags.derefOperator], color: blue6 },
    { tag: [import_highlight.tags.string], color: green },
    { tag: [import_highlight.tags.function(import_highlight.tags.name), import_highlight.tags.typeName], color: blue },
    { tag: [import_highlight.tags.angleBracket, import_highlight.tags.definition(import_highlight.tags.propertyName), import_highlight.tags.function(import_highlight.tags.definition(import_highlight.tags.variableName))], color: blue5 },
    { tag: [import_highlight.tags.number, import_highlight.tags.definition(import_highlight.tags.className)], color: orange },
    { tag: [import_highlight.tags.self, import_highlight.tags.bool, import_highlight.tags.constant(import_highlight.tags.name), import_highlight.tags.special(import_highlight.tags.name), import_highlight.tags.tagName, import_highlight.tags.operator], color: red },
    { tag: [import_highlight.tags.keyword, import_highlight.tags.escape, import_highlight.tags.function(import_highlight.tags.punctuation), import_highlight.tags.processingInstruction, import_highlight.tags.labelName, import_highlight.tags.attributeName, import_highlight.tags.className, import_highlight.tags.namespace], color: pink },
    { tag: [import_highlight.tags.special(import_highlight.tags.brace)], color: white },
    { tag: [import_highlight.tags.macroName], color: blue, fontStyle: "italic" },
    { tag: [import_highlight.tags.link, import_highlight.tags.url], color: blue, textDecoration: "underline" },
    { tag: [import_highlight.tags.heading, import_highlight.tags.strong], fontWeight: "bold" },
    { tag: [import_highlight.tags.emphasis], fontStyle: "italic" },
    { tag: [import_highlight.tags.strikethrough], textDecoration: "line-through" }
  ]);
  var mariana = [marianaTheme, (0, import_language.syntaxHighlighting)(marianaHighlightStyle)];

  // src/dev-main.ts
  function sql(dialectName) {
    return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-sql"), 1)).then((m) => m.sql({ dialect: m[dialectName] }));
  }
  var languages = [
    import_language3.LanguageDescription.of({
      name: "C++",
      alias: ["cpp"],
      extensions: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-cpp"), 1)).then((m) => m.cpp());
      }
    }),
    import_language3.LanguageDescription.of({
      name: "CSS",
      extensions: ["css"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-css"), 1)).then((m) => m.css());
      }
    }),
    import_language3.LanguageDescription.of({
      name: "HTML",
      alias: ["xhtml"],
      extensions: ["html", "htm", "handlebars", "hbs"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-html"), 1)).then((m) => m.html());
      }
    }),
    import_language3.LanguageDescription.of({
      name: "Java",
      extensions: ["java"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-java"), 1)).then((m) => m.java());
      }
    }),
    import_language3.LanguageDescription.of({
      name: "JavaScript",
      alias: ["ecmascript", "js", "node"],
      extensions: ["js", "mjs", "cjs"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-javascript"), 1)).then((m) => m.javascript());
      }
    }),
    import_language3.LanguageDescription.of({
      name: "JSON",
      alias: ["json5"],
      extensions: ["json", "map"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-json"), 1)).then((m) => m.json());
      }
    }),
    import_language3.LanguageDescription.of({
      name: "JSX",
      extensions: ["jsx"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-javascript"), 1)).then((m) => m.javascript({ jsx: true }));
      }
    }),
    import_language3.LanguageDescription.of({
      name: "LESS",
      extensions: ["less"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-less"), 1)).then((m) => m.less());
      }
    }),
    import_language3.LanguageDescription.of({
      name: "Liquid",
      extensions: ["liquid"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-liquid"), 1)).then((m) => m.liquid());
      }
    }),
    import_language3.LanguageDescription.of({
      name: "Markdown",
      extensions: ["md", "markdown", "mkd"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-markdown"), 1)).then((m) => m.markdown({
          codeLanguages: languages,
          base: import_lang_markdown.markdownLanguage
        }));
      }
    }),
    import_language3.LanguageDescription.of({
      name: "PHP",
      extensions: ["php", "php3", "php4", "php5", "php7", "phtml"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-php"), 1)).then((m) => m.php());
      }
    }),
    import_language3.LanguageDescription.of({
      name: "Python",
      extensions: ["BUILD", "bzl", "py", "pyw"],
      filename: /^(BUCK|BUILD)$/,
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-python"), 1)).then((m) => m.python());
      }
    }),
    import_language3.LanguageDescription.of({
      name: "Rust",
      extensions: ["rs"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-rust"), 1)).then((m) => m.rust());
      }
    }),
    import_language3.LanguageDescription.of({
      name: "Sass",
      extensions: ["sass"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-sass"), 1)).then((m) => m.sass({ indented: true }));
      }
    }),
    import_language3.LanguageDescription.of({
      name: "SCSS",
      extensions: ["scss"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-sass"), 1)).then((m) => m.sass());
      }
    }),
    import_language3.LanguageDescription.of({
      name: "SQL",
      extensions: ["sql"],
      load() {
        return sql("StandardSQL");
      }
    }),
    import_language3.LanguageDescription.of({
      name: "SQLite",
      load() {
        return sql("SQLite");
      }
    }),
    import_language3.LanguageDescription.of({
      name: "TSX",
      extensions: ["tsx"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-javascript"), 1)).then((m) => m.javascript({ jsx: true, typescript: true }));
      }
    }),
    import_language3.LanguageDescription.of({
      name: "TypeScript",
      alias: ["ts"],
      extensions: ["ts", "mts", "cts"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-javascript"), 1)).then((m) => m.javascript({ typescript: true }));
      }
    }),
    import_language3.LanguageDescription.of({
      name: "WebAssembly",
      extensions: ["wat", "wast"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-wast"), 1)).then((m) => m.wast());
      }
    }),
    import_language3.LanguageDescription.of({
      name: "XML",
      alias: ["rss", "wsdl", "xsd"],
      extensions: ["xml", "xsl", "xsd", "svg"],
      load() {
        return Promise.resolve().then(() => __toESM(__require("@codemirror/lang-xml"), 1)).then((m) => m.xml());
      }
    })
  ];
  document.body.style.background = color.bg;
  var lang = sessionStorage.getItem("lang") ?? "TypeScript";
  var doc = sessionStorage.getItem("doc") ?? `const a = 1;
function hello(who = "world") {
  console.log(\`Hello, \${who}!\`)
}`;
  var language = new import_state.Compartment();
  globalThis.view = new import_codemirror.EditorView({
    doc,
    extensions: [
      import_codemirror.basicSetup,
      import_view2.showPanel.of((view) => {
        let dom = crelt(
          "div",
          { class: "settings" },
          crelt("label", { for: "lang" }, "Language: "),
          crelt(
            "select",
            { id: "lang" },
            ...languages.map((e) => crelt("option", {}, e.name))
          )
        );
        let select = dom.querySelector("select");
        select.value = lang;
        select.onchange = async () => {
          let found = import_language3.LanguageDescription.matchLanguageName(languages, select.value, true);
          if (found) {
            let support = await found.load();
            view.dispatch({
              effects: language.reconfigure(support.extension)
            });
            sessionStorage.setItem("lang", select.value);
          }
        };
        select.dispatchEvent(new InputEvent("change", { bubbles: true }));
        return { dom, top: true };
      }),
      language.of([]),
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
              let node = dfs(tree.resolveInner(at), at);
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
