import type { Meta, StoryObj } from "@storybook/react";

import { SquareButtonStory } from "./SquareButton";
import { fn } from "@storybook/test";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Ui/Button/SquareButton",
  component: SquareButtonStory,
  parameters: {
    docs: {
      description: {
        component: `
A square-shaped button component that supports different variants and states.

## Usage

\`\`\`jsx
import { SquareButton } from '@rx-lab/enlove-ui';

function MyComponent() {
  return (
    <SquareButton variant="primary" onClick={() => console.log('clicked')}>
      Click me
    </SquareButton>
  );
}
\`\`\`
        `,
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      description:
        "The content to be displayed inside the button. Can be text or other React elements.",
      control: "text",
      table: {
        type: { summary: "ReactNode" },
        defaultValue: { summary: "Hello world" },
      },
    },
    onClick: {
      description: "Function called when the button is clicked",
      table: {
        type: { summary: "(event: MouseEvent) => void" },
      },
    },
    variant: {
      description: `The visual style variant of the button:
- primary: Main call-to-action style
- secondary: Alternative, less prominent style`,
      control: "select",
      options: ["primary", "secondary"],
      defaultValue: "primary",
      table: {
        type: { summary: "primary | secondary" },
        defaultValue: { summary: "primary" },
      },
    },
  },
  args: {
    children: "Hello world",
    onClick: fn(),
    variant: "primary",
  },
} satisfies Meta<typeof SquareButtonStory>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Primary",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Primary variant is the default style, used for main call-to-action buttons.",
      },
    },
  },
};
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Secondary variant provides an alternative, less prominent style for secondary actions.",
      },
    },
  },
};
