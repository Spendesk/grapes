import React from 'react';
import { Button } from './Button';
import figma from '@figma/code-connect';

figma.connect(
  Button,
  'https://www.figma.com/design/SpkppjQ9HwZa4RWiFrUrIk/%F0%9F%8D%87-%F0%9F%92%BB-Web?node-id=7-19311&m=dev',
  {
    props: {
      text: figma.string('Button Label'),
      variant: figma.enum('Status', {
        Brand: 'primaryBrand',
        Info: 'primaryInfo',
        Success: 'primarySuccess',
        Warning: 'primaryWarning',
        Alert: 'primaryAlert',
      }),
    },
    example: (props) => <Button {...props} />,
  },
);
