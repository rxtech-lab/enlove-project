import type { Meta, StoryObj } from "@storybook/react";

import { IntroTitleStory } from "./IntroTitle";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Ui/Intro/Title",
  component: IntroTitleStory,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    text: {
      description: "The text to be displayed with typing animation.",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: {
          summary: "Welcome to Code Crash, share and find your crash",
        },
      },
    },
    typingSpeed: {
      description:
        "Speed of the typing animation in milliseconds per character",
      control: { type: "number", min: 10, max: 500 },
    },
    cursorBlinkSpeed: {
      description:
        "Blinking speed of the cursor in seconds (duration of one blink cycle)",
      control: { type: "number", min: 0.1, max: 2, step: 0.1 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "0.8" },
      },
    },
    className: {
      description: "Additional CSS classes to apply to the component",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    cursorHeight: {
      description: "Height of the cursor in rem units",
      control: { type: "number", min: 0.5, max: 5, step: 0.5 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "2" },
      },
    },
    cursorColor: {
      description: "Color of the cursor. Can be any valid CSS color value",
      control: "color",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "currentColor" },
      },
    },
    fontSize: {
      description: "Font size in pixels",
      control: { type: "number", min: 10, max: 50, step: 1 },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "16" },
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    text: "Welcome to Code Crash, share and find your crash",
    typingSpeed: 100,
    cursorBlinkSpeed: 0.8,
    className: "",
    cursorHeight: 2,
    cursorColor: "currentColor",
    fontSize: 40,
  },
} satisfies Meta<typeof IntroTitleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {};
