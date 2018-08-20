import { isEmail } from 'validator';

export const required = (value: string) => {
  if (!value.toString().trim().length) {
    // We can return string or jsx as the 'error' prop for the validated Component
    return 'Required';
  } else { return null }
};

export const email = (value: string) => {
  if (!isEmail(value)) {
    return `${value} is not a valid email.`
  } else { return null }
};

export const maxLength = (maxCharacterLength: number) => (value: number) => {
  // get the maxLength from component's props
  if (value.toString().trim().length >= maxCharacterLength) {
    // Return jsx
    return `The value exceeded ${maxCharacterLength} characters.`;
  } else { return null }
};