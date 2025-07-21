import React from 'react';
import { Callout, type CalloutProps } from './Callout';
import { figma } from '@figma/code-connect';

figma.connect(
  Callout,
  'https://www.figma.com/design/SpkppjQ9HwZa4RWiFrUrIk/%F0%9F%8D%87%F0%9F%92%BB-Compo.---Web?node-id=7-5528&t=ODUdNCkuX3iuLyZB-4',
  {
    props: {
      title: figma.string('Title'),
      children: figma.string('Description'),
      variant: figma.enum('Status', {
        Info: 'info',
        Alert: 'alert',
        Warning: 'warning',
        Success: 'success',
      }),
    },
    example: (props: CalloutProps) => <Callout {...props} />,
  },
);
