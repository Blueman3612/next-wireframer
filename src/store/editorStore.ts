import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { 
  ElementType, 
  Position, 
  Size, 
  WireframeElement, 
  WireframeProject,
  ElementProperties 
} from '../types/wireframe';

interface EditorState {
  // Current project
  project: WireframeProject;
  
  // UI state
  selectedElementId: string | null;
  isDragging: boolean;
  
  // Actions
  createNewProject: (name: string) => void;
  addElement: (type: ElementType, position: Position) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, updates: Partial<WireframeElement>) => void;
  selectElement: (id: string | null) => void;
  moveElement: (id: string, position: Position) => void;
  resizeElement: (id: string, size: Size) => void;
  updateElementProperties: (id: string, properties: ElementProperties) => void;
  setIsDragging: (isDragging: boolean) => void;
  duplicateElement: (id: string) => void;
  clearCanvas: () => void;
}

// Default properties for different element types
const getDefaultProperties = (type: ElementType): ElementProperties => {
  switch (type) {
    case 'container':
      return { backgroundColor: '#f0f0f0', borderWidth: 1, borderColor: '#ddd', borderStyle: 'solid' };
    case 'text':
      return { content: 'Text element', fontSize: 16, fontWeight: 'normal', color: '#000000' };
    case 'button':
      return { label: 'Button', variant: 'primary', size: 'md', borderRadius: 4 };
    case 'input':
      return { placeholder: 'Input field', label: 'Label', type: 'text' };
    case 'image':
      return { src: 'https://via.placeholder.com/150', alt: 'Image placeholder' };
    case 'navbar':
      return { title: 'Website Title', links: ['Home', 'About', 'Contact'] };
    case 'card':
      return { title: 'Card Title', content: 'Card content goes here', hasImage: true };
    case 'list':
      return { items: ['Item 1', 'Item 2', 'Item 3'], style: 'bulleted' };
    default:
      return {};
  }
};

// Default sizes for different element types
const getDefaultSize = (type: ElementType): Size => {
  switch (type) {
    case 'container':
      return { width: 300, height: 200 };
    case 'text':
      return { width: 200, height: 24 };
    case 'button':
      return { width: 120, height: 40 };
    case 'input':
      return { width: 200, height: 40 };
    case 'image':
      return { width: 150, height: 150 };
    case 'navbar':
      return { width: 1024, height: 60 };
    case 'card':
      return { width: 300, height: 200 };
    case 'list':
      return { width: 200, height: 120 };
    default:
      return { width: 100, height: 100 };
  }
};

// Create the store
export const useEditorStore = create<EditorState>((set) => ({
  // Initialize with empty project
  project: {
    id: nanoid(),
    name: 'Untitled Wireframe',
    elements: [],
    canvasSize: { width: 1024, height: 768 },
    updatedAt: new Date().toISOString()
  },
  
  // UI state
  selectedElementId: null,
  isDragging: false,
  
  // Actions
  createNewProject: (name) => set({
    project: {
      id: nanoid(),
      name,
      elements: [],
      canvasSize: { width: 1024, height: 768 },
      updatedAt: new Date().toISOString()
    },
    selectedElementId: null
  }),
  
  addElement: (type, position) => set((state) => {
    const newElement: WireframeElement = {
      id: nanoid(),
      type,
      position,
      size: getDefaultSize(type),
      properties: getDefaultProperties(type)
    };
    
    return {
      project: {
        ...state.project,
        elements: [...state.project.elements, newElement],
        updatedAt: new Date().toISOString()
      },
      selectedElementId: newElement.id
    };
  }),
  
  removeElement: (id) => set((state) => ({
    project: {
      ...state.project,
      elements: state.project.elements.filter(element => element.id !== id),
      updatedAt: new Date().toISOString()
    },
    selectedElementId: state.selectedElementId === id ? null : state.selectedElementId
  })),
  
  updateElement: (id, updates) => set((state) => ({
    project: {
      ...state.project,
      elements: state.project.elements.map(element => 
        element.id === id ? { ...element, ...updates } : element
      ),
      updatedAt: new Date().toISOString()
    }
  })),
  
  selectElement: (id) => set({ selectedElementId: id }),
  
  moveElement: (id, position) => set((state) => ({
    project: {
      ...state.project,
      elements: state.project.elements.map(element => 
        element.id === id ? { ...element, position } : element
      ),
      updatedAt: new Date().toISOString()
    }
  })),
  
  resizeElement: (id, size) => set((state) => ({
    project: {
      ...state.project,
      elements: state.project.elements.map(element => 
        element.id === id ? { ...element, size } : element
      ),
      updatedAt: new Date().toISOString()
    }
  })),
  
  updateElementProperties: (id, properties) => set((state) => ({
    project: {
      ...state.project,
      elements: state.project.elements.map(element => 
        element.id === id ? { 
          ...element, 
          properties: { ...element.properties, ...properties } 
        } : element
      ),
      updatedAt: new Date().toISOString()
    }
  })),
  
  setIsDragging: (isDragging) => set({ isDragging }),
  
  duplicateElement: (id) => set((state) => {
    const elementToDuplicate = state.project.elements.find(element => element.id === id);
    if (!elementToDuplicate) return state;
    
    const newElement: WireframeElement = {
      ...elementToDuplicate,
      id: nanoid(),
      position: {
        x: elementToDuplicate.position.x + 20,
        y: elementToDuplicate.position.y + 20
      }
    };
    
    return {
      project: {
        ...state.project,
        elements: [...state.project.elements, newElement],
        updatedAt: new Date().toISOString()
      },
      selectedElementId: newElement.id
    };
  }),
  
  clearCanvas: () => set((state) => ({
    project: {
      ...state.project,
      elements: [],
      updatedAt: new Date().toISOString()
    },
    selectedElementId: null
  }))
})); 