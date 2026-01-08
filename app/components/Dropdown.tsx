'use client'
import { DropdownMenu, Button } from "@radix-ui/themes";

const Dropdown = ({ children, triggerLabel = 'Options' }: { 
  children: React.ReactNode;
  triggerLabel?: string;
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft">
          {triggerLabel}
          <DropdownMenu.TriggerIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default Dropdown;