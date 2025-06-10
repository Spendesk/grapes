import React, { useState } from 'react';
import { Button, Modal } from '../../index';

/**
 * When you put grapes in the cask, you get joice !
 */
export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-48 bg-neutral-lightest">
      <div></div>
      <Button
        variant="primaryBrand"
        text="Click me!"
        onClick={() => setIsOpen(true)}
      />
      <Modal
        isOpen={isOpen}
        title="It's a modal"
        iconName="sparkle"
        actions={[
          <Button
            key="certified"
            variant="primaryBrand"
            text="Thank you :)"
            iconName="sparkle"
            onClick={() => setIsOpen(false)}
          />,
        ]}
      />
    </div>
  );
};
