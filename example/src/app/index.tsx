import { analyzeWCAGContrast } from '@ssen/anlayze-wcag-contrast';
import React, { useMemo } from 'react';
import { render } from 'react-dom';
import { dark } from 'style/theme';

const {
  background,
  primary,
  secondary,
  error,
  warning,
  info,
  success,
} = dark.palette;

function App() {
  const { scores, svg } = useMemo(
    () =>
      analyzeWCAGContrast({
        backgroundColor: background.default,
        paperColor: background.paper,
        colors: {
          primary: primary.main,
          secondary: secondary.main,
          error: error.main,
          warning: warning.main,
          info: info.main,
          success: success.main,
        },
      }),
    [],
  );

  return (
    <div>
      {svg}

      <pre>{JSON.stringify(scores)}</pre>
    </div>
  );
}

render(<App />, document.querySelector('#app'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
