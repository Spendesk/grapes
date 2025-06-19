import React, {
  type MouseEventHandler,
  type ReactNode,
  type Reducer,
  useReducer,
} from 'react';

import { Button } from '../../Button';
import { IconButton } from '../../IconButton';

import styles from './PanelEditableSection.module.scss';
import { useTranslate } from '../../../hooks/useTranslate';

const readOnlyState = {
  status: 'readonly',
  isEditMode: false,
} as const;
type ReadOnlyState = typeof readOnlyState;

const editionState = {
  status: 'edition',
  isEditMode: true,
} as const;
type EditionState = typeof editionState;

const loadingState = {
  status: 'loading',
  isEditMode: true,
} as const;
type LoadingState = typeof loadingState;

const getErrorState = (error: Error) =>
  ({
    status: 'error',
    isEditMode: true,
    error,
  }) as const;
type ErrorState = ReturnType<typeof getErrorState>;

const successState = {
  status: 'success',
  isEditMode: false,
} as const;
type SuccessState = typeof successState;

type State =
  | ReadOnlyState
  | EditionState
  | LoadingState
  | ErrorState
  | SuccessState;

const initialState = readOnlyState;

type Action =
  | { type: 'tryUpdate' }
  | { type: 'updateFailed'; error: Error }
  | { type: 'updateSucceeded' }
  | { type: 'startEditMode' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'tryUpdate':
      return loadingState;
    case 'updateFailed':
      return getErrorState(action.error);
    case 'updateSucceeded':
      return successState;
    case 'startEditMode':
      return editionState;
    default:
      return state;
  }
}

export type PanelEditableSectionProps = {
  /**
   * The title of the PanelSection.
   */
  title: string | ReactNode;
  /**
   * The content of the PanelSection.
   */
  children: ReactNode;
  /**
   * The content of the PanelSection when in edit mode.
   */
  editSection: ReactNode;
  /**
   * The translation for the cancel button.
   */
  cancelTranslation: string;
  /**
   * The translation for the save button.
   */
  saveTranslation: string;
  /**
   * Whether the save button should be disabled.
   * @default false
   */
  disableSave?: boolean;
  /**
   * Translation for the aria-label of the edit IconButton.
   */
  editButtonLabel?: string;
  /**
   * Function to render an error in the form.
   */
  renderError?(error: Error): ReactNode;
  /**
   * Handler that is called when an error occurs.
   */
  onError?(error: Error): void;
  /**
   * Handler that is called when the form is saved.
   */
  onSave: MouseEventHandler<HTMLButtonElement>;
  /**
   * Handler that is called when the cancel button is clicked.
   */
  onCancel: MouseEventHandler<HTMLButtonElement>;
  /**
   * Handler that is called when the edit mode is toggled.
   */
  onEditClick?: MouseEventHandler<HTMLButtonElement>;
};

export function PanelEditableSection({
  title,
  children,
  editSection,
  cancelTranslation,
  saveTranslation,
  disableSave = false,
  renderError,
  onError,
  onSave,
  onCancel,
  onEditClick,
  editButtonLabel,
  ...rest
}: PanelEditableSectionProps) {
  const t = useTranslate();

  const [state, dispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    initialState,
  );

  const handleAction =
    (action: MouseEventHandler<HTMLButtonElement>) =>
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      try {
        dispatch({ type: 'tryUpdate' });
        await action(event);
        dispatch({ type: 'updateSucceeded' });
      } catch (rawError) {
        const error =
          rawError instanceof Error
            ? rawError
            : new Error(
                typeof rawError === 'string'
                  ? rawError
                  : 'Failed editing panel section',
              );
        dispatch({ type: 'updateFailed', error });
        if (onError) {
          onError(error);
        }
      }
    };

  return (
    <section {...rest}>
      <div className={styles.panelEditableSectionTitle}>
        <div>{title}</div>
        {!state.isEditMode && (
          <IconButton
            className={styles.panelEditableSectionIcon}
            iconName="pen"
            onClick={(event) => {
              dispatch({ type: 'startEditMode' });
              if (onEditClick) {
                onEditClick(event);
              }
            }}
            hasNegativeMargins
            aria-label={editButtonLabel ?? t('edit')}
          />
        )}
      </div>
      <div className={styles.panelEditableSectionContent}>
        {state.isEditMode ? (
          <>
            {editSection}
            {state.status === 'error' &&
              renderError &&
              renderError(state.error)}
            <div className={styles.panelEditableSectionActions}>
              <Button
                onClick={handleAction(onCancel)}
                text={cancelTranslation}
                variant="secondaryNeutral"
                fit="parent"
                isDisabled={state.status === 'loading'}
              />
              <Button
                onClick={handleAction(onSave)}
                text={saveTranslation}
                variant="primaryBrand"
                fit="parent"
                isDisabled={disableSave || state.status === 'loading'}
              />
            </div>
          </>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
