import {basicSetup, EditorView} from 'codemirror'
import {Compartment} from '@codemirror/state'
import {showPanel, ViewPlugin, ViewUpdate} from '@codemirror/view'
import {javascriptLanguage, scopeCompletionSource} from '@codemirror/lang-javascript'
import {markdownLanguage} from '@codemirror/lang-markdown'
import {syntaxTree} from '@codemirror/language'
import {getStyleTags} from '@lezer/highlight'
import {SyntaxNode} from '@lezer/common'
import {LanguageDescription} from '@codemirror/language'
import h from 'crelt'
import {color, mariana} from './mariana'

function sql(dialectName: keyof typeof import("@codemirror/lang-sql")) {
  return import("@codemirror/lang-sql").then(m => m.sql({dialect: (m as any)[dialectName]}))
}

const languages = [
  LanguageDescription.of({
    name: "C++",
    alias: ["cpp"],
    extensions: ["cpp","c++","cc","cxx","hpp","h++","hh","hxx"],
    load() {
      return import("@codemirror/lang-cpp").then(m => m.cpp())
    }
  }),
  LanguageDescription.of({
    name: "CSS",
    extensions: ["css"],
    load() {
      return import("@codemirror/lang-css").then(m => m.css())
    }
  }),
  LanguageDescription.of({
    name: "HTML",
    alias: ["xhtml"],
    extensions: ["html", "htm", "handlebars", "hbs"],
    load() {
      return import("@codemirror/lang-html").then(m => m.html())
    }
  }),
  LanguageDescription.of({
    name: "Java",
    extensions: ["java"],
    load() {
      return import("@codemirror/lang-java").then(m => m.java())
    }
  }),
  LanguageDescription.of({
    name: "JavaScript",
    alias: ["ecmascript","js","node"],
    extensions: ["js", "mjs", "cjs"],
    load() {
      return import("@codemirror/lang-javascript").then(m => m.javascript())
    }
  }),
  LanguageDescription.of({
    name: "JSON",
    alias: ["json5"],
    extensions: ["json","map"],
    load() {
      return import("@codemirror/lang-json").then(m => m.json())
    }
  }),
  LanguageDescription.of({
    name: "JSX",
    extensions: ["jsx"],
    load() {
      return import("@codemirror/lang-javascript").then(m => m.javascript({jsx: true}))
    }
  }),
  LanguageDescription.of({
    name: "LESS",
    extensions: ["less"],
    load() {
      return import("@codemirror/lang-less").then(m => m.less())
    }
  }),
  LanguageDescription.of({
    name: "Liquid",
    extensions: ["liquid"],
    load() {
      return import("@codemirror/lang-liquid").then(m => m.liquid())
    }
  }),
  LanguageDescription.of({
    name: "Markdown",
    extensions: ["md", "markdown", "mkd"],
    load() {
      return import("@codemirror/lang-markdown").then(m => m.markdown({
        codeLanguages: languages,
        base: markdownLanguage,
      }))
    }
  }),
  LanguageDescription.of({
    name: "PHP",
    extensions: ["php", "php3", "php4", "php5", "php7", "phtml"],
    load() {
      return import("@codemirror/lang-php").then(m => m.php())
    }
  }),
  LanguageDescription.of({
    name: "Python",
    extensions: ["BUILD","bzl","py","pyw"],
    filename: /^(BUCK|BUILD)$/,
    load() {
      return import("@codemirror/lang-python").then(m => m.python())
    }
  }),
  LanguageDescription.of({
    name: "Rust",
    extensions: ["rs"],
    load() {
      return import("@codemirror/lang-rust").then(m => m.rust())
    }
  }),
  LanguageDescription.of({
    name: "Sass",
    extensions: ["sass"],
    load() {
      return import("@codemirror/lang-sass").then(m => m.sass({indented: true}))
    }
  }),
  LanguageDescription.of({
    name: "SCSS",
    extensions: ["scss"],
    load() {
      return import("@codemirror/lang-sass").then(m => m.sass())
    }
  }),
  LanguageDescription.of({
    name: "SQL",
    extensions: ["sql"],
    load() { return sql("StandardSQL") }
  }),
  LanguageDescription.of({
    name: "SQLite",
    load() { return sql("SQLite") }
  }),
  LanguageDescription.of({
    name: "TSX",
    extensions: ["tsx"],
    load() {
      return import("@codemirror/lang-javascript").then(m => m.javascript({jsx: true, typescript: true}))
    }
  }),
  LanguageDescription.of({
    name: "TypeScript",
    alias: ["ts"],
    extensions: ["ts","mts","cts"],
    load() {
      return import("@codemirror/lang-javascript").then(m => m.javascript({typescript: true}))
    }
  }),
  LanguageDescription.of({
    name: "WebAssembly",
    extensions: ["wat","wast"],
    load() {
      return import("@codemirror/lang-wast").then(m => m.wast())
    }
  }),
  LanguageDescription.of({
    name: "XML",
    alias: ["rss","wsdl","xsd"],
    extensions: ["xml","xsl","xsd","svg"],
    load() {
      return import("@codemirror/lang-xml").then(m => m.xml())
    }
  })
]

document.body.style.background = color.bg

const lang = sessionStorage.getItem('lang') ?? 'TypeScript'

const doc = sessionStorage.getItem('doc') ?? `const a = 1;
function hello(who = "world") {
  console.log(\`Hello, \${who}!\`)
}`

const language = new Compartment()

globalThis.view = new EditorView({
  doc,
  extensions: [
    basicSetup,
    showPanel.of(view => {
      let dom = h('div', { class: 'settings' },
        h('label', { for: 'lang' }, 'Language: '),
        h('select', { id: 'lang' },
          ...languages.map(e => h('option', {}, e.name))))
      let select = dom.querySelector<HTMLSelectElement>('select')!
      select.value = lang
      select.onchange = async () => {
        let found = LanguageDescription.matchLanguageName(languages, select.value, true)
        if (found) {
          let support = await found.load()
          view.dispatch({
            effects: language.reconfigure(support.extension)
          })
          sessionStorage.setItem('lang', select.value)
        }
      }
      select.dispatchEvent(new InputEvent('change', {bubbles: true}))
      return { dom, top: true }
    }),
    language.of([]),
    javascriptLanguage.data.of({
      autocomplete: scopeCompletionSource(globalThis)
    }),
    mariana,
    showPanel.of(() => {
      let dom = h('div', { class: 'inspect' })
      function dfs(node: SyntaxNode, at: number): SyntaxNode {
        if (node.firstChild) {
          let c = node.firstChild
          while (c.nextSibling && c.nextSibling.from <= at)
            c = c.nextSibling
          return dfs(c, at)
        }
        return node
      }
      return {
        dom,
        update(update) {
          if (update.selectionSet) {
            let result = '(empty)'
            let tree = syntaxTree(update.state)
            let at = update.state.selection.main.anchor
            let node = dfs(tree.resolveInner(at), at)
            let code = update.state.sliceDoc(node.from, node.to)
            let rule = getStyleTags(node)
            if (rule) {
              let tags: string[] = []
              for (let tag of rule.tags)
                tags.push('t.' + tag.toString().replaceAll('(', '(t.'))
              result = tags.join('\n')
            }
            dom.textContent = `'${code}' => ${result}`
          }
        }
      }
    }),
    ViewPlugin.fromClass(class {
      update(update: ViewUpdate) {
        if (update.docChanged) {
          sessionStorage.setItem('doc', update.state.sliceDoc())
        }
      }
    })
  ],
  parent: document.querySelector('#editor')!
})
