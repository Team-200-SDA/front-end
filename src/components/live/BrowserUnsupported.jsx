import React from 'react';

export default function BrowserUnsupported() {
  return (
    <p className="browser-unsupported">
      {language.Looks_like}
      <br />
      See&nbsp;
      <a href="https://help.daily.co/en/articles/3179421-what-browser-version-does-daily-co-require">
        {language.this_page}
      </a>
      &nbsp;{language.for_help}
    </p>
  );
}
