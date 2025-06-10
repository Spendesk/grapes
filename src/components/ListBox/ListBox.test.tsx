import React, { useState } from 'react';

import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import { ListBox } from '.';
import { TextInput } from '../TextInput';

const options = [
  {
    id: 'michael',
    name: 'Michael Murphy',
    birthDate: '1979-09-19',
    avatar: 'images/aurelien.webp',
    description: 'Growth team',
  },
  {
    id: 'nayden',
    name: 'Nayden Lennart',
    birthDate: '1980-03-01',
    avatar: 'images/bertrand.webp',
    description: 'Design team',
  },
  {
    id: 'nicolas',
    name: 'Nicolas Harvey',
    birthDate: '1980-06-05',
    avatar: 'images/mahedine.webp',
    description: 'Growth team',
  },
];

type Option = {
  id: string;
  name: string;
  birthDate: string;
  avatar: string;
  description: string;
};

describe('ListBox component', () => {
  it('should allow a User to select options', async () => {
    const Option = (props: { option: Option; id: string }) => {
      return <p id={props.id}>{props.option.name}</p>;
    };

    const Wrapper = () => {
      const [optionsSelected, setOptionSelected] = useState<string[]>([]);
      const [activeOption, setActiveOption] = useState<string | undefined>();

      return (
        <ListBox
          options={options}
          getOptionId={(option) => option.id}
          getIsOptionActive={(option) => option.id === activeOption}
          onOptionClick={(option) => setActiveOption(option.id)}
          onOptionChange={(_, id, checked) => {
            setOptionSelected((options) => {
              if (checked) {
                return options.concat(id);
              }
              return options.filter((optionId) => optionId !== id);
            });
          }}
          onAllOptionsChange={(_, ids, checked) => {
            setOptionSelected(checked ? ids : []);
          }}
          checkedOptionIds={optionsSelected}
          aria-label="employees"
          header={<p>Employee</p>}
        >
          {(option, titleId) => <Option option={option} id={titleId} />}
        </ListBox>
      );
    };

    render(<Wrapper />);

    expect(screen.getByRole('listbox', { name: 'employees' })).toBeVisible();
    expect(
      screen.getByRole('option', { name: 'Michael Murphy' }),
    ).toBeVisible();
    expect(
      screen.getByRole('option', { name: 'Nicolas Harvey' }),
    ).toBeVisible();
    expect(
      screen.getByRole('option', { name: 'Nayden Lennart' }),
    ).toBeVisible();

    await userEvent.click(
      screen.getByRole('checkbox', { name: 'Michael Murphy' }),
    );

    expect(
      screen.getByRole('checkbox', { name: 'Michael Murphy' }),
    ).toBeChecked();

    await userEvent.click(
      screen.getByRole('checkbox', { name: 'Nicolas Harvey' }),
    );

    expect(
      screen.getByRole('checkbox', { name: 'Nicolas Harvey' }),
    ).toBeChecked();

    await userEvent.click(
      screen.getByRole('checkbox', { name: 'Nicolas Harvey' }),
    );

    expect(
      screen.getByRole('checkbox', { name: 'Select all' }),
    ).toBePartiallyChecked();

    expect(
      screen.getByRole('checkbox', { name: 'Nicolas Harvey' }),
    ).not.toBeChecked();

    await userEvent.click(screen.getByRole('checkbox', { name: 'Select all' }));

    expect(
      await screen.findByRole('checkbox', { name: 'Unselect all' }),
    ).toBeVisible();
    screen.getAllByRole('checkbox').every((node) => expect(node).toBeChecked());
  });

  it('should allow a User to select one option', async () => {
    const handleOptionClick = vi.fn();
    const Option = (props: { option: Option; id: string }) => {
      return <p id={props.id}>{props.option.name}</p>;
    };

    const Wrapper = () => {
      const [activeOption, setActiveOption] = useState<string>('michael');

      return (
        <ListBox
          options={options}
          getOptionId={(option) => option.id}
          getIsOptionActive={(option) => option.id === activeOption}
          onOptionClick={(option) => {
            setActiveOption(option.id);
            handleOptionClick();
          }}
          aria-label="employees"
        >
          {(option, titleId) => <Option option={option} id={titleId} />}
        </ListBox>
      );
    };

    render(<Wrapper />);

    expect(screen.getByRole('listbox', { name: 'employees' })).toBeVisible();
    expect(
      screen.getByRole('option', { name: 'Michael Murphy' }),
    ).toHaveAttribute('aria-selected', 'true');

    await userEvent.click(
      screen.getByRole('option', { name: 'Nicolas Harvey' }),
    );

    expect(handleOptionClick).toHaveBeenCalled();
    expect(
      screen.getByRole('option', { name: 'Nicolas Harvey' }),
    ).toHaveAttribute('aria-selected', 'true');
  });

  it('should allow to group options', () => {
    const Option = (props: { option: Option; id: string }) => {
      return <p id={props.id}>{props.option.name}</p>;
    };

    render(
      <ListBox
        options={options}
        getOptionId={(option) => option.id}
        onOptionClick={vi.fn()}
        getIsOptionActive={() => false}
        groupBy={(option) => {
          const date = new Date(option.birthDate);
          return `${date.getFullYear()}`;
        }}
        renderGroupedOptionsHeader={(value) => <span>{value}</span>}
        aria-label="employees"
      >
        {(option, titleId) => <Option option={option} id={titleId} />}
      </ListBox>,
    );

    expect(screen.getByRole('listbox', { name: 'employees' })).toBeVisible();
    expect(screen.getByRole('group', { name: '1979' })).toBeVisible();
    expect(screen.getByRole('group', { name: '1980' })).toBeVisible();

    expect(
      within(screen.getByRole('group', { name: '1980' })).getAllByRole(
        'option',
      ),
    ).toHaveLength(2);

    expect(
      within(screen.getByRole('group', { name: '1979' })).getByRole('option', {
        name: 'Michael Murphy',
      }),
    ).toBeVisible();
  });

  it('should diplay a header and a footer', async () => {
    const Option = (props: { option: Option; id: string }) => {
      return <p id={props.id}>{props.option.name}</p>;
    };

    render(
      <ListBox
        options={options}
        getOptionId={(option) => option.id}
        getIsOptionActive={() => false}
        onOptionClick={vi.fn()}
        aria-label="employees"
        header={<h1>header placeholder</h1>}
        footer={<span>footer placeholder</span>}
      >
        {(option, titleId) => <Option option={option} id={titleId} />}
      </ListBox>,
    );

    expect(screen.getByRole('listbox', { name: 'employees' })).toBeVisible();
    await userEvent.click(
      screen.getByRole('option', { name: 'Michael Murphy' }),
    );

    expect(screen.getByText('header placeholder')).toBeVisible();
    expect(screen.getByText('footer placeholder')).toBeVisible();
  });

  it('should display an empty state when no option are provided', () => {
    const Option = (props: { option: Option; id: string }) => {
      return <p id={props.id}>{props.option.name}</p>;
    };

    render(
      <ListBox
        options={[] as Option[]}
        getOptionId={(option) => option.id}
        getIsOptionActive={() => false}
        onOptionClick={vi.fn()}
        aria-label="employees"
        emptyState={{ title: 'No employee found' }}
      >
        {(option, titleId) => <Option option={option} id={titleId} />}
      </ListBox>,
    );

    expect(
      screen.getByRole('listbox', { name: 'employees' }),
    ).toHaveAccessibleDescription('No employee found');
  });

  it('should support keyboard navigation', async () => {
    const Option = (props: { option: Option; id: string }) => {
      return <p id={props.id}>{props.option.name}</p>;
    };

    const Wrapper = () => {
      const [optionsSelected, setOptionSelected] = useState<string[]>([]);
      const [activeOption, setActiveOption] = useState<string | undefined>();

      return (
        <ListBox
          options={options}
          getOptionId={(option) => option.id}
          getIsOptionActive={(option) => option.id === activeOption}
          onOptionClick={(option) => setActiveOption(option.id)}
          aria-label="employees"
          header={<p>Employee</p>}
          onOptionChange={(_, id, checked) => {
            setOptionSelected((options) => {
              if (checked) {
                return options.concat(id);
              }
              return options.filter((optionId) => optionId !== id);
            });
          }}
          onAllOptionsChange={(_, ids, checked) => {
            setOptionSelected(checked ? ids : []);
          }}
          checkedOptionIds={optionsSelected}
        >
          {(option, titleId) => <Option option={option} id={titleId} />}
        </ListBox>
      );
    };

    render(<Wrapper />);

    const firstOption = screen.getByRole('option', { name: 'Michael Murphy' });
    const firstCheckbox = screen.getByRole('checkbox', {
      name: 'Michael Murphy',
    });
    const secondOption = screen.getByRole('option', { name: 'Nayden Lennart' });
    const lastOption = screen.getByRole('option', { name: 'Nicolas Harvey' });

    await userEvent.click(firstOption);
    expect(firstOption).toHaveAttribute('aria-selected', 'true');
    expect(secondOption).toHaveAttribute('aria-selected', 'false');

    await userEvent.click(firstCheckbox); // Check Michael Murphy checkbox
    expect(firstCheckbox).toBeChecked();
    await userEvent.keyboard('{ }'); // Uncheck Michael Murphy checkbox using keyboard
    expect(firstCheckbox).not.toBeChecked();

    await userEvent.keyboard('{ArrowDown}');
    expect(firstOption).toHaveAttribute('aria-selected', 'false');
    expect(secondOption).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowDown}');
    expect(secondOption).toHaveAttribute('aria-selected', 'false');
    expect(lastOption).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowUp}');
    expect(secondOption).toHaveAttribute('aria-selected', 'true');
    expect(lastOption).toHaveAttribute('aria-selected', 'false');

    await userEvent.keyboard('{Home}');
    expect(firstOption).toHaveAttribute('aria-selected', 'true');
    expect(secondOption).toHaveAttribute('aria-selected', 'false');

    await userEvent.keyboard('{End}');
    expect(firstOption).toHaveAttribute('aria-selected', 'false');
    expect(lastOption).toHaveAttribute('aria-selected', 'true');
  });

  it('should disable the top checkbox if every option is disabled', () => {
    const Option = (props: { option: Option; id: string }) => {
      return <p id={props.id}>{props.option.name}</p>;
    };

    const Wrapper = () => {
      const [activeOption, setActiveOption] = useState<string | undefined>();

      return (
        <ListBox
          options={options}
          getOptionId={(option) => option.id}
          getIsOptionActive={(option) => option.id === activeOption}
          onOptionClick={(option) => setActiveOption(option.id)}
          onOptionChange={() => vi.fn()}
          onAllOptionsChange={() => vi.fn()}
          checkedOptionIds={[]}
          aria-label="employees"
          header={<p>Employee</p>}
          getIsOptionDisabled={() => true}
        >
          {(option, titleId) => <Option option={option} id={titleId} />}
        </ListBox>
      );
    };

    render(<Wrapper />);

    expect(screen.getByRole('checkbox', { name: 'Select all' })).toBeDisabled();
  });

  it('should not update focus if focus is outside the listbox', async () => {
    const Option = (props: { option: Option; id: string }) => {
      return <p id={props.id}>{props.option.name}</p>;
    };

    const Wrapper = () => {
      const [value, setValue] = useState('Nayden');
      const regex = new RegExp(value, 'gi');
      const filteredOptions = options.filter(({ name }) => regex.test(name));
      return (
        <div>
          <TextInput
            value={value}
            onChange={(e) => setValue(e.target.value)}
            aria-label="Search"
          />
          <ListBox
            options={filteredOptions}
            getOptionId={(option) => option.id}
            getIsOptionActive={(option) => option.id === 'michael'}
            onOptionClick={vi.fn()}
            aria-label="employees"
          >
            {(option, titleId) => <Option option={option} id={titleId} />}
          </ListBox>
        </div>
      );
    };

    render(<Wrapper />);

    expect(
      screen.getByRole('option', { name: 'Nayden Lennart' }),
    ).toBeVisible();
    expect(
      screen.queryByRole('option', { name: 'Michael Murphy' }),
    ).not.toBeInTheDocument();

    await userEvent.clear(screen.getByRole('textbox'));
    expect(
      screen.getByRole('option', { name: 'Michael Murphy' }),
    ).toBeVisible();
    expect(
      screen.getByRole('option', { name: 'Michael Murphy' }),
    ).toHaveAttribute('aria-selected', 'true');

    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('should allow a User to select options', async () => {
    const Option = (props: { option: Option; id: string }) => {
      return <p id={props.id}>{props.option.name}</p>;
    };

    const onOptionClick = vi.fn();

    const Wrapper = () => {
      const [optionsSelected, setOptionSelected] = useState<string[]>([]);

      return (
        <ListBox
          options={options}
          getOptionId={(option) => option.id}
          getIsOptionCheckable={(option) => option.id !== 'michael'}
          onOptionClick={onOptionClick}
          onOptionChange={(_, id, checked) => {
            setOptionSelected((options) => {
              if (checked) {
                return options.concat(id);
              }
              return options.filter((optionId) => optionId !== id);
            });
          }}
          onAllOptionsChange={(_, ids, checked) => {
            setOptionSelected(checked ? ids : []);
          }}
          checkedOptionIds={optionsSelected}
          aria-label="employees"
          header={<p>Employee</p>}
        >
          {(option, titleId) => <Option option={option} id={titleId} />}
        </ListBox>
      );
    };

    render(<Wrapper />);

    expect(
      screen.getByRole('checkbox', { name: 'Michael Murphy' }),
    ).toBeDisabled();

    await userEvent.click(screen.getByRole('checkbox', { name: 'Select all' }));

    expect(
      screen.getByRole('checkbox', { name: 'Michael Murphy' }),
    ).not.toBeChecked();

    await userEvent.click(
      screen.getByRole('option', { name: 'Michael Murphy' }),
    );
    expect(onOptionClick).toHaveBeenCalled();
  });
});
