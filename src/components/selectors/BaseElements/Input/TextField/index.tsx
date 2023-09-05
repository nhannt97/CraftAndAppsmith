/*
 *   This craft.js node element will exstend a base class from BaseElements/_classes - select the most appropriate
 *   You should create any custom settings that need to be handled on top of the default class.
 *   When you are ready to load this to the toolbar, update the following:
 *    1) //src/Components/editor/Viewport/Toolbox.tsx
 *      a) import icon from material
 *      b) import this folder as a export const [name]
 *      c) add the element to the return list with a toolTip
 *   1) // pages/index.tsx
 *      a) import this folder as an export const [name]
 *      b) add export const [name] to Resolver
 */

// src/components/selectors/BaseElements/Input/TextField/index.tsx
import React from "react";
import { BaseInput } from "../../_classes/input";

interface TextInputProps {
  value: string; // Current value of the text input
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Handler for value changes
}

// TextInput component, extending the BaseInput class to create a text input field
export const TextInput: React.FC<TextInputProps> = ({ value, onChange }) => {
  return (
    <BaseInput>
      <input type="text" value={value} onChange={onChange} />
      {/* This input element is wrapped inside the BaseInput component, */}
      {/* inheriting its styling and craft.js functionalities. */}
    </BaseInput>
  );
};
// Usage: To create a new text input field, use the TextInput component and
// pass the necessary props like value and onChange handler.
