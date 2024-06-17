// custom typefaces
import '@fontsource-variable/montserrat'
import '@fontsource/merriweather'

// custom CSS styles
import './src/style/font.scss'
import './src/style/main.scss'

// initialize highlight code
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader'

import * as Sentry from '@sentry/gatsby'

deckDeckGoHighlightElement()

Sentry.init({
  dsn: 'https://f51211c56d7b96eaf6637f2611ab3092@o4507445480783872.ingest.us.sentry.io/4507445488451584',
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost'],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})
