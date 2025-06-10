import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Upload } from '.';
import { Callout } from '../Callout';

function createDragEventWithFiles(file: File) {
  return {
    dataTransfer: {
      files: [file],
      items: file,
      types: ['Files'],
    },
  };
}

describe('Upload component', () => {
  describe('given default props', () => {
    it('displays the content and allow user to upload only one file', async () => {
      const onUpload = vi.fn();
      const file1 = new File(['grapes'], 'grapes.png', { type: 'image/png' });
      const file2 = new File(['grapes'], 'grapes.jpg', { type: 'image/jpg' });
      render(
        <Upload
          content={<p>Drag & drop your files</p>}
          activeDragContent={<p>Upload files</p>}
          onUpload={onUpload}
        />,
      );
      expect(screen.getByText('Drag & drop your files')).toBeVisible();

      // A file input doesn't have a role so we use *byLabelText to target it
      await userEvent.upload(screen.getByLabelText('Drag & drop your files'), [
        file1,
        file2,
      ]);

      // Expect only the first file to be given as multiple file upload isn't allowed by default
      expect(onUpload).toHaveBeenCalledWith([file1], 'selection');
    });

    it('supports keyboard navigation', async () => {
      render(
        <Upload
          content={<p>Drag & drop your files</p>}
          activeDragContent={<p>Upload files</p>}
          onUpload={vi.fn()}
        />,
      );

      await userEvent.tab();
      expect(screen.getByLabelText('Drag & drop your files')).toHaveFocus();

      await userEvent.tab();
      expect(screen.getByLabelText('Drag & drop your files')).not.toHaveFocus();
    });

    it('supports drag and drop', () => {
      const onUpload = vi.fn();
      const file = new File(['grapes'], 'grapes.png', { type: 'image/png' });
      render(
        <Upload
          content={<p>Drag & drop your files</p>}
          activeDragContent={<p>Upload files</p>}
          onUpload={onUpload}
        />,
      );

      // userEvent doesn't support drag&drop event yet
      fireEvent.drop(
        screen.getByLabelText('Drag & drop your files'),
        createDragEventWithFiles(file),
      );
      expect(onUpload).toHaveBeenCalledWith([file], 'drag_and_drop');
    });

    it('updates content on drag', () => {
      const content = 'Drag & drop your files';
      const activeDragContent = 'Upload files';
      render(
        <Upload
          content={<p>{content}</p>}
          activeDragContent={<p>{activeDragContent}</p>}
          onUpload={vi.fn()}
        />,
      );

      fireEvent.dragEnter(screen.getByLabelText(content));

      expect(screen.getByLabelText(activeDragContent)).toBeVisible();
      expect(screen.queryByLabelText(content)).not.toBeInTheDocument();

      fireEvent.dragLeave(screen.getByLabelText(activeDragContent));
      expect(screen.getByLabelText(content)).toBeVisible();
    });

    it('allows user to upload multiple files', async () => {
      const onUpload = vi.fn();
      const file1 = new File(['grapes'], 'grapes.png', { type: 'image/png' });
      const file2 = new File(['grapes'], 'grapes.jpg', { type: 'image/jpg' });
      render(
        <Upload
          content={<p>Drag & drop your files</p>}
          activeDragContent={<p>Upload files</p>}
          onUpload={onUpload}
          multiple
        />,
      );

      await userEvent.upload(screen.getByLabelText('Drag & drop your files'), [
        file1,
        file2,
      ]);

      expect(onUpload).toHaveBeenCalledWith([file1, file2], 'selection');
    });

    it('supports invalid state and aria attributes', () => {
      render(
        <>
          <Upload
            content={<p>Drag & drop your files</p>}
            activeDragContent={<p>Upload files</p>}
            onUpload={vi.fn()}
            isInvalid
            aria-errormessage="error"
          />
          <Callout title="Invalid file" variant="alert" id="error" />
        </>,
      );

      expect(screen.getByLabelText('Drag & drop your files')).toBeInvalid();
      expect(
        screen.getByLabelText('Drag & drop your files'),
      ).toHaveAccessibleErrorMessage('Invalid file');
    });
  });
});
