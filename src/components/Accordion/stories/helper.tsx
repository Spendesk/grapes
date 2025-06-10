import React from 'react';

export function renderHeader(isCollapsed: string, text: string) {
  return isCollapsed ? (
    <div
      style={{
        fontSize: '16px',
        fontWeight: 500,
        color: '#706f81',
      }}
    >
      {text}
    </div>
  ) : (
    <div
      style={{
        fontSize: '16px',
        fontWeight: 500,
        color: '#17114e',
      }}
    >
      {text}
    </div>
  );
}
