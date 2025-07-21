import React from 'react';
import { Modal } from './Modal';
import { figma } from '@figma/code-connect';

figma.connect(
  Modal,
  'https://www.figma.com/design/SpkppjQ9HwZa4RWiFrUrIk/%F0%9F%8D%87%F0%9F%92%BB-Compo.---Web?node-id=6-13757&m',
  {
    props: {
      iconVariant: figma.enum('Type', {
        Info: 'info',
        Alert: 'alert',
        Warning: 'warning',
        Success: 'success',
      }),
      title: figma.string('Title (mandatory)'),
      subtitle: figma.string('Content (mandatory)'),
    },
    example: (props) => (
      <Modal {...props} isOpen={true} iconName="circle-information" />
    ),
  },
);
