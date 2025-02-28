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

export interface WireframeElement {
  id: string;
  type: ElementType;
  position: Position;
  size: Size;
  properties: Record<string, any>;
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
  defaultProperties: Record<string, any>;
} 