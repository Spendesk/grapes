/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { composeStory } from '@storybook/react';

function renderStory(meta: any, story: any, index?: number) {
  const MyStory = composeStory(story, meta);
  return (
    <div key={index}>
      <MyStory />
    </div>
  );
}

type SnapshotContainerProps = {
  stories: any[];
  meta: any;
};

export function SnapshotContainer({ stories, meta }: SnapshotContainerProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        flexFlow: 'row wrap',
        maxWidth: '900px',
        alignItems: 'start',
      }}
    >
      {stories.map((story, index) => renderStory(meta, story, index))}
    </div>
  );
}
