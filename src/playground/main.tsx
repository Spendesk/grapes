import React from 'react';
import { createRoot } from 'react-dom/client';

import { GrapesProvider } from '../components/GrapesProvider';
import { LOCALES } from '../components/GrapesProvider/exampleLocales';

import Cask from './Cask/Cask';

import './main.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <GrapesProvider locale="en" localesDefinition={LOCALES}>
        <div className="text-center max-w-lg mx-auto">
          <header className="Playground_Header" />
          <Cask />
        </div>
      </GrapesProvider>
    </React.StrictMode>,
  );
}
