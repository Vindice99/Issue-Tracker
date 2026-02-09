'use client'
import { DropdownMenu, Button } from "@radix-ui/themes";
import React from 'react';

interface DropdownOption{
  value: string;
  label: string;
}


interface DropdownProps {
  value?: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
}


const Dropdown = ({ value, options, onChange } : DropdownProps) => {
  const selectedOption = options.find(opt => opt.value === value);
  return (
      <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft">
              {selectedOption ? selectedOption.label : 'Select…'}
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {options.map((task) => (
              <DropdownMenu.Item key={task.value} onSelect={() => onChange(task.value)}>
                {task.label}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
      </DropdownMenu.Root>
  );
};

export default Dropdown;