import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import { UploadButton } from './';

describe('UploadButton component', () => {
  describe('given default props', () => {
    it('displays the text from props in a button', () => {
      render(<UploadButton text="Upload" onUpload={vi.fn()} />);
      expect(screen.getByRole('button', { name: 'Upload' })).toBeVisible();
    });

    it('calls `onUpload` when clicking on the button and selecting files', async () => {
      const promise = Promise.resolve();
      const handleUpload = vi.fn(() => promise);
      render(<UploadButton text="Upload" onUpload={handleUpload} />);

      const fakeFile = new File(['(⌐□_□)'], 'chucknorris.png', {
        type: 'image/png',
      });

      const fileInput = screen.getByPlaceholderText('File input');
      fireEvent.change(fileInput, {
        target: {
          files: [fakeFile],
        },
      });
      await act(async () => {
        await promise;
      });
      expect(handleUpload).toHaveBeenCalledWith([fakeFile]);
    });
  });

  describe('given `className` props', () => {
    it("adds the classname to the component's classnames", () => {
      render(
        <UploadButton
          className="MyUploadButton"
          text="Upload"
          onUpload={vi.fn()}
        />,
      );
      expect(screen.getByRole('button', { name: 'Upload' })).toHaveClass(
        'MyUploadButton',
      );
    });
  });

  describe('given `isDisabled` props', () => {
    it('has a disabled button as child', () => {
      render(<UploadButton isDisabled text="Upload" onUpload={vi.fn()} />);
      expect(screen.getByRole('button', { name: 'Upload' })).toBeDisabled();
    });
  });
});
