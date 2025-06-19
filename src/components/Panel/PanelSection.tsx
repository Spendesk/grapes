import React from 'react';
import {
  PanelSimpleSection,
  type PanelSimpleSectionProps,
} from './PanelSimpleSection';
import {
  PanelEditableSection,
  type PanelEditableSectionProps,
} from './PanelEditableSection';

export type PanelSectionProps =
  | ({
      /**
       * Whether the PanelSection is editable
       */
      isEditable?: false;
    } & PanelSimpleSectionProps)
  | ({
      isEditable: true;
    } & PanelEditableSectionProps);

function isPanelEditable(
  props: PanelSimpleSectionProps | PanelEditableSectionProps,
  isEditable?: boolean,
): props is PanelEditableSectionProps {
  return !!isEditable;
}

export const PanelSection = ({ isEditable, ...props }: PanelSectionProps) =>
  isPanelEditable(props, isEditable) ? (
    <PanelEditableSection {...props} />
  ) : (
    <PanelSimpleSection {...props} />
  );
