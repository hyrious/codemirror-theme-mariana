import {basicSetup, EditorView} from 'codemirror'
import {showPanel, ViewPlugin, ViewUpdate} from '@codemirror/view'
import {javascript, javascriptLanguage, scopeCompletionSource} from '@codemirror/lang-javascript'
import {syntaxTree} from '@codemirror/language'
import {getStyleTags} from '@lezer/highlight'
import {SyntaxNode} from '@lezer/common'
import h from 'crelt'
import {color, mariana} from './mariana'

document.body.style.background = color.bg

const doc = sessionStorage.getItem('doc') ?? `const a = 1;
function hello(who = "world") {
  console.log(\`Hello, \${who}!\`)
}`

globalThis.view = new EditorView({
  doc,
  extensions: [
    basicSetup,
    javascript({ typescript: true }),
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
            let node = dfs(tree.resolve(at), at)
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
