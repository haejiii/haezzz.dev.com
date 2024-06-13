// custom typefaces
import '@fontsource-variable/montserrat'
import '@fontsource/merriweather'

// custom CSS styles
import './src/style/font.scss'
import './src/style/main.scss'

// initialize highlight code
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'

deckDeckGoHighlightElement()
