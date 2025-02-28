# Next Wireframer

## Project Overview and Purpose
Next Wireframer is a web-based tool designed for developers and designers to rapidly create wireframes specifically for Next.js applications. The tool bridges the gap between design and implementation by allowing users to not only design wireframes visually but also export functional Next.js code that can serve as a starting point for real applications.

The purpose of this tool is to:
- Accelerate the prototyping phase of Next.js application development
- Provide a visual editor tailored to Next.js component patterns and best practices
- Generate clean, production-ready code that follows modern development standards
- Streamline the process from wireframe to working application

## Tech Stack Explanation

### Frontend
- **Next.js**: React framework providing server-side rendering, routing, and development features
- **TypeScript**: Adds static typing to enhance code quality and developer experience
- **TailwindCSS**: Utility-first CSS framework for rapid UI development

### Backend & Services
- **Supabase**: Provides authentication, database storage, and real-time capabilities
- **Vercel**: Platform for deploying Next.js applications with seamless integration

## Architecture Breakdown

### Frontend Components
1. **Core Editor Components**
   - Canvas: The main editing area where components are placed and arranged
   - Component Palette: Library of available components to drag onto the canvas
   - Property Editor: Interface for modifying component properties
   - Project Manager: UI for saving/loading/exporting projects

2. **Wireframe Components**
   - Layout Components: Containers, grids, flex layouts
   - UI Elements: Buttons, inputs, navigation, modals, cards
   - Content Blocks: Text areas, image placeholders, lists
   - Special Components: Next.js specific elements (Link, Image, etc.)

### Backend Services
1. **Authentication System**
   - User registration and login via Supabase Auth
   - Session management
   - User profile storage

2. **Database Structure**
   - Users table: User information and preferences
   - Projects table: Wireframe project metadata
   - Wireframes table: Actual wireframe data (JSON structure)

3. **Export Service**
   - Code generation engine
   - File packaging system
   - Download management

## Development Roadmap

### Phase 1: MVP
- Basic editor canvas with drag-and-drop functionality
- Limited component set (containers, text, buttons)
- Property editing for basic attributes
- Project saving/loading with Supabase
- Simple export to Next.js components

### Phase 2: Enhanced Editor
- Expanded component library
- Layout grid system
- Component grouping and nesting
- Responsive design preview
- User authentication and project management

### Phase 3: Advanced Features
- Component templates and presets
- Theme customization
- Advanced property controls
- Real-time collaboration
- Version history

### Phase 4: Complete Solution
- Full export system with project structure
- Custom component creation
- Import from existing projects
- Integration with design tools
- Analytics and insights

## Installation Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/next-wireframer.git
   cd next-wireframer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage Guide

### Creating a New Wireframe
1. Log in to your account
2. Click "New Project" and provide a project name
3. Use the component palette to drag elements onto the canvas
4. Adjust component properties using the property editor
5. Save your project using the "Save" button

### Editing Components
1. Select a component on the canvas
2. Use the property panel to adjust settings
3. Resize and reposition components by dragging
4. Delete components with the Delete key or right-click menu

### Exporting Your Wireframe
1. Click the "Export" button in the project toolbar
2. Select export options (component files, full project, etc.)
3. Download the generated files
4. Follow the included README for implementation instructions

## Key Features

- **Intuitive Drag-and-Drop Interface**: Visual editor designed specifically for Next.js application layout
- **Component Library**: Pre-built components following Next.js and React best practices
- **Property Editor**: Customize component appearance and behavior
- **Project Management**: Save, load, and organize multiple wireframe projects
- **Responsive Design Tools**: Create layouts that work across different screen sizes
- **Code Export**: Generate clean, well-structured Next.js component code
- **Project Export**: Download complete project structure with all necessary files
- **Supabase Integration**: Secure authentication and reliable data storage
- **TailwindCSS Styling**: Modern, responsive design using utility classes

## Deployment Process

### Deploying to Vercel
1. **Connect your repository**
   - Push your code to a Git repository (GitHub, GitLab, BitBucket)
   - Connect the repository to Vercel

2. **Configure project settings**
   - Set the framework preset to Next.js
   - Add environment variables for Supabase credentials

3. **Deploy**
   - Trigger deployment manually or via git push
   - Vercel will automatically build and deploy your application

### Manual Deployment
1. **Build the application**
   ```bash
   npm run build
   # or
   yarn build
   ```

2. **Start the production server**
   ```bash
   npm start
   # or
   yarn start
   ```

### Deployment Considerations
- Ensure Supabase security rules are properly configured
- Set up proper CORS policies for API endpoints
- Consider using a custom domain for production
- Implement monitoring and analytics for production use

## Recommended Project Structure

```
src/
├── app/                             # Next.js App Router files
│   ├── api/                         # API routes
│   │   ├── auth/                    # Authentication endpoints
│   │   ├── projects/                # Project management endpoints
│   │   ├── export/                  # Export functionality endpoints
│   │   └── [...]/                   # Other API endpoints
│   ├── (auth)/                      # Authentication-related pages (grouped)
│   │   ├── login/                   # Login page
│   │   ├── register/                # Registration page
│   │   └── forgot-password/         # Password reset page
│   ├── dashboard/                   # User dashboard
│   │   ├── page.tsx                 # Dashboard main page
│   │   └── layout.tsx               # Dashboard layout
│   ├── editor/                      # Wireframe editor
│   │   ├── [projectId]/             # Dynamic project editing
│   │   │   ├── page.tsx             # Editor main page
│   │   │   └── components/          # Editor-specific components
│   │   ├── new/                     # New project creation
│   │   └── layout.tsx               # Editor layout
│   ├── projects/                    # Project management
│   │   ├── page.tsx                 # Projects list page
│   │   └── [...]/                   # Other project pages
│   ├── page.tsx                     # Home page
│   ├── layout.tsx                   # Root layout
│   ├── error.tsx                    # Error handling
│   └── loading.tsx                  # Loading state
├── components/                      # Reusable components
│   ├── ui/                          # Basic UI components
│   │   ├── button.tsx               # Button component
│   │   ├── input.tsx                # Input component
│   │   └── [...]/                   # Other UI components
│   ├── editor/                      # Editor-specific components
│   │   ├── canvas/                  # Canvas-related components
│   │   │   ├── Canvas.tsx           # Main canvas component
│   │   │   ├── CanvasElement.tsx    # Element on canvas
│   │   │   └── [...]/               # Other canvas components
│   │   ├── palette/                 # Component palette
│   │   │   ├── ComponentPalette.tsx # Palette container
│   │   │   ├── PaletteItem.tsx      # Individual palette item
│   │   │   └── [...]/               # Other palette components
│   │   ├── properties/              # Property editing
│   │   │   ├── PropertyEditor.tsx   # Main property editor
│   │   │   ├── PropertyControls.tsx # Controls for properties
│   │   │   └── [...]/               # Property-specific components
│   │   └── export/                  # Export-related components
│   ├── projects/                    # Project management components
│   ├── navigation/                  # Navigation components
│   └── auth/                        # Authentication components
├── hooks/                           # Custom React hooks
│   ├── useCanvas.ts                 # Canvas management
│   ├── useComponents.ts             # Component management
│   ├── useProperties.ts             # Property editing
│   ├── useExport.ts                 # Export functionality
│   └── [...]/                       # Other hooks
├── lib/                             # Utility libraries
│   ├── supabase/                    # Supabase integration
│   │   ├── client.ts                # Supabase client
│   │   ├── auth.ts                  # Authentication utilities
│   │   └── database.ts              # Database utilities
│   ├── export/                      # Export system
│   │   ├── generator.ts             # Code generation
│   │   ├── templates.ts             # Code templates
│   │   └── zip.ts                   # File compression
│   └── utils/                       # Utility functions
├── store/                           # State management (Zustand)
│   ├── canvasStore.ts               # Canvas state
│   ├── componentStore.ts            # Component state
│   ├── projectStore.ts              # Project state
│   └── userStore.ts                 # User state
├── types/                           # TypeScript type definitions
│   ├── components.ts                # Component types
│   ├── projects.ts                  # Project types
│   ├── canvas.ts                    # Canvas types
│   └── [...]/                       # Other type definitions
└── styles/                          # Global styles
    ├── globals.css                  # Global CSS
    └── editor.css                   # Editor-specific styles
```

## State Management Approach

For a complex application like the wireframe editor, we recommend using Zustand for state management. It provides a lightweight, hook-based state management solution that works well with React and Next.js. The state will be organized into several stores:

1. **Canvas Store**: Manages the canvas state, including elements, position, selection, etc.
2. **Component Store**: Manages the available components, their properties, and templates.
3. **Project Store**: Manages project metadata, saving, and loading.
4. **User Store**: Manages user information and authentication state.

Example of a canvas store using Zustand:

```typescript
// store/canvasStore.ts
import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { CanvasElement, ElementPosition, ElementType } from '../types/canvas';

interface CanvasState {
  elements: CanvasElement[];
  selectedElementId: string | null;
  canvasSize: { width: number; height: number };
  
  // Actions
  addElement: (type: ElementType, position: ElementPosition) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  selectElement: (id: string | null) => void;
  moveElement: (id: string, position: ElementPosition) => void;
  resizeCanvas: (width: number, height: number) => void;
  clearCanvas: () => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  elements: [],
  selectedElementId: null,
  canvasSize: { width: 1280, height: 800 },
  
  addElement: (type, position) => set((state) => ({ 
    elements: [...state.elements, { 
      id: nanoid(), 
      type, 
      position, 
      properties: getDefaultPropertiesForType(type),
    }] 
  })),
  
  removeElement: (id) => set((state) => ({ 
    elements: state.elements.filter(element => element.id !== id),
    selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
  })),
  
  updateElement: (id, updates) => set((state) => ({ 
    elements: state.elements.map(element => 
      element.id === id ? { ...element, ...updates } : element
    ) 
  })),
  
  selectElement: (id) => set({ selectedElementId: id }),
  
  moveElement: (id, position) => set((state) => ({ 
    elements: state.elements.map(element => 
      element.id === id ? { ...element, position } : element
    ) 
  })),
  
  resizeCanvas: (width, height) => set({ 
    canvasSize: { width, height } 
  }),
  
  clearCanvas: () => set({ 
    elements: [], 
    selectedElementId: null 
  }),
}));

// Helper function to provide default properties based on element type
function getDefaultPropertiesForType(type: ElementType) {
  switch(type) {
    case 'button':
      return { text: 'Button', variant: 'primary', size: 'md' };
    case 'text':
      return { content: 'Text element', fontSize: 16, fontWeight: 'normal' };
    case 'container':
      return { width: 200, height: 200, backgroundColor: 'transparent', borderWidth: 1 };
    // Add other element types as needed
    default:
      return {};
  }
}
```

## Implementation Guidance

### Wireframe Editor Canvas Setup

The core of the wireframe editor is the canvas, which will leverage the `dnd-kit` library for drag-and-drop functionality:

```typescript
// components/editor/canvas/Canvas.tsx
import React from 'react';
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { useCanvasStore } from '@/store/canvasStore';
import { CanvasDropArea } from './CanvasDropArea';
import { CanvasElement } from './CanvasElement';

export const Canvas: React.FC = () => {
  const { elements, canvasSize, selectElement, moveElement } = useCanvasStore();
  
  // Configure sensors for mouse and touch interactions
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } })
  );
  
  // Handle drop event
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      // If dropped on canvas, update position
      const elementId = active.id;
      const newPosition = {
        x: over.rect.left - canvasSize.left,
        y: over.rect.top - canvasSize.top
      };
      
      moveElement(elementId, newPosition);
    }
  };
  
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div 
        className="canvas-container"
        style={{ 
          width: `${canvasSize.width}px`, 
          height: `${canvasSize.height}px`,
          position: 'relative',
          backgroundColor: 'white',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}
        onClick={() => selectElement(null)} // Deselect when clicking on empty canvas
      >
        <CanvasDropArea />
        
        {elements.map((element) => (
          <CanvasElement 
            key={element.id}
            element={element}
          />
        ))}
      </div>
    </DndContext>
  );
};
```

### Component Property Editor

The property editor allows users to modify component properties:

```typescript
// components/editor/properties/PropertyEditor.tsx
import React from 'react';
import { useCanvasStore } from '@/store/canvasStore';
import { PropertyControlsMap } from './PropertyControls';
import { Panel, PanelHeader, PanelBody } from '@/components/ui/panel';

export const PropertyEditor: React.FC = () => {
  const { elements, selectedElementId, updateElement } = useCanvasStore();
  
  const selectedElement = elements.find(el => el.id === selectedElementId);
  
  if (!selectedElement) {
    return (
      <Panel>
        <PanelHeader>Properties</PanelHeader>
        <PanelBody>
          <div className="text-gray-500 p-4 text-center">
            Select an element to edit its properties
          </div>
        </PanelBody>
      </Panel>
    );
  }
  
  const handlePropertyChange = (propertyName: string, value: any) => {
    updateElement(selectedElement.id, {
      properties: {
        ...selectedElement.properties,
        [propertyName]: value
      }
    });
  };
  
  // Get the appropriate controls for this element type
  const Controls = PropertyControlsMap[selectedElement.type];
  
  return (
    <Panel>
      <PanelHeader>
        {selectedElement.type.charAt(0).toUpperCase() + selectedElement.type.slice(1)} Properties
      </PanelHeader>
      <PanelBody>
        <div className="p-4 space-y-4">
          {/* Common properties for all elements */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Position X</label>
            <input
              type="number"
              value={selectedElement.position.x}
              onChange={(e) => updateElement(selectedElement.id, {
                position: { ...selectedElement.position, x: Number(e.target.value) }
              })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Position Y</label>
            <input
              type="number"
              value={selectedElement.position.y}
              onChange={(e) => updateElement(selectedElement.id, {
                position: { ...selectedElement.position, y: Number(e.target.value) }
              })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          {/* Element-specific properties */}
          {Controls && <Controls 
            properties={selectedElement.properties} 
            onChange={handlePropertyChange} 
          />}
        </div>
      </PanelBody>
    </Panel>
  );
};
```

### Project Saving/Loading with Supabase

Set up Supabase integration for project persistence:

```typescript
// lib/supabase/client.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// lib/supabase/database.ts
import { supabase } from './client';
import { Project, Wireframe } from '@/types/projects';

// Save project data
export async function saveProject(project: Project, wireframeData: Wireframe) {
  // First update/create the project metadata
  const { data: projectData, error: projectError } = await supabase
    .from('projects')
    .upsert({
      id: project.id,
      name: project.name,
      description: project.description,
      created_at: project.createdAt || new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: project.userId,
    })
    .select('id');
    
  if (projectError) throw projectError;
  
  // Then save the wireframe data
  const { error: wireframeError } = await supabase
    .from('wireframes')
    .upsert({
      project_id: projectData[0].id,
      data: wireframeData,
      updated_at: new Date().toISOString(),
    });
    
  if (wireframeError) throw wireframeError;
  
  return projectData[0].id;
}

// Load project data
export async function loadProject(projectId: string) {
  // Get project metadata
  const { data: projectData, error: projectError } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single();
    
  if (projectError) throw projectError;
  
  // Get wireframe data
  const { data: wireframeData, error: wireframeError } = await supabase
    .from('wireframes')
    .select('data')
    .eq('project_id', projectId)
    .single();
    
  if (wireframeError) throw wireframeError;
  
  return {
    project: projectData,
    wireframe: wireframeData.data,
  };
}
```

### Export System

Create the export system that generates downloadable Next.js files:

```typescript
// lib/export/generator.ts
import { Wireframe, WireframeElement } from '@/types/projects';
import { generateComponentCode } from './templates';
import JSZip from 'jszip';

export async function generateExport(wireframe: Wireframe, projectName: string) {
  const zip = new JSZip();
  
  // Create project folder structure
  const projectFolder = zip.folder(projectName);
  const componentsFolder = projectFolder.folder('components');
  const pagesFolder = projectFolder.folder('pages');
  const stylesFolder = projectFolder.folder('styles');
  
  // Add package.json
  projectFolder.file('package.json', generatePackageJson(projectName));
  
  // Add next.config.js
  projectFolder.file('next.config.js', generateNextConfig());
  
  // Add README.md
  projectFolder.file('README.md', generateReadme(projectName));
  
  // Add tailwind.config.js
  projectFolder.file('tailwind.config.js', generateTailwindConfig());
  
  // Add global styles
  stylesFolder.file('globals.css', generateGlobalStyles());
  
  // Generate component files
  wireframe.elements.forEach(element => {
    if (element.type === 'page') {
      // Generate page component
      pagesFolder.file(
        `${element.properties.name || 'index'}.tsx`,
        generateComponentCode(element, wireframe.elements)
      );
    } else {
      // Generate regular component
      componentsFolder.file(
        `${element.properties.name || element.id}.tsx`,
        generateComponentCode(element, [])
      );
    }
  });
  
  // Generate the main page file if it doesn't exist
  if (!wireframe.elements.some(el => el.type === 'page' && el.properties.name === 'index')) {
    pagesFolder.file('index.tsx', generateMainPage(wireframe));
  }
  
  // Generate the zip file
  const content = await zip.generateAsync({ type: 'blob' });
  return content;
}

// Helper functions to generate various files
function generatePackageJson(projectName: string) {
  return JSON.stringify({
    name: projectName.toLowerCase().replace(/\s+/g, '-'),
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
      lint: 'next lint'
    },
    dependencies: {
      next: '^13.4.19',
      react: '^18.2.0',
      'react-dom': '^18.2.0'
    },
    devDependencies: {
      '@types/node': '^20.5.7',
      '@types/react': '^18.2.21',
      '@types/react-dom': '^18.2.7',
      'autoprefixer': '^10.4.15',
      'postcss': '^8.4.29',
      'tailwindcss': '^3.3.3',
      'typescript': '^5.2.2'
    }
  }, null, 2);
}

// Other helper functions would be implemented similarly
```

## Recommended Libraries

Based on the requirements, these libraries work well with the Next.js, Supabase, and TailwindCSS stack:

### Drag-and-Drop Functionality
- **@dnd-kit/core**: Modern, accessible drag-and-drop library
- **@dnd-kit/sortable**: Sortable functionality for dnd-kit
- **@dnd-kit/modifiers**: Modifiers for dnd-kit operations

### File Generation/Compression
- **JSZip**: Library for creating and downloading ZIP files
- **file-saver**: Utility for saving files on the client side

### UI Component Library
- **@headlessui/react**: Unstyled, accessible UI components, works perfectly with TailwindCSS
- **@heroicons/react**: Icon set designed for TailwindCSS

### Form Handling and Validation
- **react-hook-form**: Performant form management with minimal re-renders
- **zod**: TypeScript-first schema validation with static type inference

### State Management
- **zustand**: Lightweight state management solution with hooks API
- **nanoid**: Tiny, secure, URL-friendly unique ID generator

### Examples

```bash
# Install drag-and-drop libraries
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/modifiers

# Install UI components
npm install @headlessui/react @heroicons/react

# Install form handling
npm install react-hook-form zod

# Install state management
npm install zustand nanoid

# Install file generation
npm install jszip file-saver
``` 