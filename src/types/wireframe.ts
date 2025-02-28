export type ElementType = 
  | 'container'
  | 'text'
  | 'button'
  | 'input'
  | 'image'
  | 'navbar'
  | 'card'
  | 'list';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

// Define our property types consistently with editorStore
export type ElementPropertyValue = string | number | boolean | null | string[];
export type ElementProperties = Record<string, ElementPropertyValue>;

export interface WireframeElement {
  id: string;
  type: ElementType;
  position: Position;
  size: Size;
  properties: ElementProperties;
  children?: WireframeElement[];
}

export interface WireframeProject {
  id: string;
  name: string;
  elements: WireframeElement[];
  canvasSize: Size;
  updatedAt: string;
}

export interface ElementTemplate {
  type: ElementType;
  name: string;
  icon: string;
  defaultSize: Size;
  defaultProperties: ElementProperties;
} 