import { ComponentType, ReactNode } from 'react';

declare module 'react-mentions' {
  export interface MentionsInputProps {
    value: string;
    onChange: (event: any, newValue: string, newPlainTextValue: string, mentions: any[]) => void;
    markup?: string;
    className?: string;
    placeholder?: string;
    allowSpaceInQuery?: boolean;
    allowSuggestionsAboveCursor?: boolean;
    a11ySuggestionsListLabel?: string;
    children?: ReactNode;
  }

  export interface MentionProps {
    type?: string;
    trigger: string;
    data: Array<{ id: string | number; display: string }>;
    className?: string;
    renderSuggestion?: (
      suggestion: { id: string | number; display: string },
      search: string,
      highlightedDisplay: ReactNode,
      index: number,
      focused: boolean
    ) => ReactNode;
  }

  export const MentionsInput: ComponentType<MentionsInputProps>;
  export const Mention: ComponentType<MentionProps>;
} 