import { analyzeWCAGContrast } from '@app/anlayze-wcag-contrast';
import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';
import React, { useMemo } from 'react';
import { render } from 'react-dom';
import { dark } from 'style/theme';

if (process.env.NODE_ENV !== 'development' && process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

const { background, primary, secondary } = dark.palette;

function App() {
  const { scores, svg } = useMemo(() => analyzeWCAGContrast(background, [primary, secondary]), []);
  
  return (
    <div>
      {svg}
      
      <pre>
        {JSON.stringify(scores)}
      </pre>
    </div>
  );
}

render(<App/>, document.querySelector('#app'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
