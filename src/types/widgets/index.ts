import { UNIT_TYPES, WIDGETS } from '@/constants';
import Quill, { Delta, Range } from 'quill';
import { ReactNode } from 'react';

// Пропси з типами Editor
export interface EditorProps {
  readOnly?: boolean;
  defaultValue?: Delta;
  onReady?: (quill: Quill) => void;
  onTextChange?: (
    delta: Delta,
    oldDelta: Delta,
    source: string, // source - це рядок
  ) => void;
  onSelectionChange?: (
    range: Range | null,
    oldRange: Range | null,
    source: string, // source - це рядок
  ) => void;
}

export interface EditorIndexProps {
  valueDefault?: Delta;
  handleSave?: (delta?: Delta) => void;
}

// Віджетні типи
export type Widget = {
  id: number; // унікальний id
  type: TWidgetNames; // тип віджета
  props?: {
    [key: string]: string | undefined;
  }; // додаткові параметри
  createdAt: Date; // дата створення
};

export type WidgetContainerProps = {
  children?: ReactNode;
  widgetName: Widget['type'];
  widgetCreated?: Widget['createdAt'];
  widgetId: number;
  onRemoveHandler: (id: number) => void;
};

export interface IWidgetProps {
  widget: Widget;
  removeWidget: (id: number) => void;
  saveWidget: (id: number, props: Widget['props']) => void;
}

export type TWidgetNames = (typeof WIDGETS)[number];

export type TUNIT = (typeof UNIT_TYPES)[keyof typeof UNIT_TYPES];

export interface IUnitRef {
  type: TUNIT;
  name: string;
}
