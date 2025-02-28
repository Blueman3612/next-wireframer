"use client";

import React from 'react';
import { useEditorStore } from '@/store/editorStore';
import { ElementType } from '@/types/wireframe';
import { 
  TrashIcon, 
  ClipboardDocumentIcon, 
  XMarkIcon,
  ArrowsPointingOutIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

// Common properties for all elements
const CommonProperties: React.FC = () => {
  const { project, selectedElementId, updateElement, resizeElement, moveElement, removeElement, duplicateElement } = useEditorStore();
  
  const selectedElement = project.elements.find(el => el.id === selectedElementId);
  if (!selectedElement) return null;
  
  const handleRemoveElement = () => {
    if (confirm('Are you sure you want to delete this element?')) {
      removeElement(selectedElementId!);
    }
  };
  
  const handleDuplicateElement = () => {
    duplicateElement(selectedElementId!);
  };
  
  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleDuplicateElement}
          className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded border border-border bg-card hover:bg-secondary transition-colors"
          title="Duplicate element"
        >
          <ClipboardDocumentIcon className="w-3.5 h-3.5 mr-1.5" />
          Duplicate
        </button>
        
        <div className="flex space-x-1">
          <button 
            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
            title="Hide element (Coming soon)"
          >
            <EyeIcon className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleRemoveElement}
            className="p-1.5 text-destructive hover:bg-destructive/10 rounded transition-colors"
            title="Delete element"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Element Type */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Element Type</label>
        <div className="text-sm py-1 px-2 bg-secondary rounded-md capitalize font-medium">{selectedElement.type}</div>
      </div>
      
      {/* Dimensions */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-medium text-muted-foreground">Dimensions</label>
          <button className="p-1 text-xs text-muted-foreground hover:text-foreground" title="Toggle lock aspect ratio (Coming soon)">
            <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-xs text-muted-foreground">W</span>
              <input
                type="number"
                value={selectedElement.size?.width || 0}
                onChange={(e) => resizeElement(selectedElement.id, { 
                  width: parseInt(e.target.value) || 0,
                  height: selectedElement.size?.height || 0 
                })}
                className="w-full border border-input rounded py-1 pl-7 pr-2 text-sm bg-card"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-xs text-muted-foreground">H</span>
              <input
                type="number"
                value={selectedElement.size?.height || 0}
                onChange={(e) => resizeElement(selectedElement.id, { 
                  width: selectedElement.size?.width || 0,
                  height: parseInt(e.target.value) || 0 
                })}
                className="w-full border border-input rounded py-1 pl-7 pr-2 text-sm bg-card"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Position */}
      <div>
        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Position</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-xs text-muted-foreground">X</span>
              <input
                type="number"
                value={selectedElement.position.x}
                onChange={(e) => moveElement(selectedElement.id, { 
                  ...selectedElement.position, 
                  x: parseInt(e.target.value) || 0 
                })}
                className="w-full border border-input rounded py-1 pl-7 pr-2 text-sm bg-card"
              />
            </div>
          </div>
          <div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-xs text-muted-foreground">Y</span>
              <input
                type="number"
                value={selectedElement.position.y}
                onChange={(e) => moveElement(selectedElement.id, { 
                  ...selectedElement.position, 
                  y: parseInt(e.target.value) || 0 
                })}
                className="w-full border border-input rounded py-1 pl-7 pr-2 text-sm bg-card"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Element-specific property editors
const TextProperties: React.FC = () => {
  const { project, selectedElementId, updateElementProperties } = useEditorStore();
  const selectedElement = project.elements.find(el => el.id === selectedElementId);
  if (!selectedElement) return null;
  
  const { content, fontSize, fontWeight, color } = selectedElement.properties;
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Text Content</label>
        <textarea
          value={content}
          onChange={(e) => updateElementProperties(selectedElement.id, { content: e.target.value })}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          rows={3}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Font Size (px)</label>
        <input
          type="number"
          value={fontSize}
          onChange={(e) => updateElementProperties(selectedElement.id, { fontSize: parseInt(e.target.value) || 12 })}
          min={8}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Font Weight</label>
        <select
          value={fontWeight}
          onChange={(e) => updateElementProperties(selectedElement.id, { fontWeight: e.target.value })}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="light">Light</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
        <input
          type="color"
          value={color}
          onChange={(e) => updateElementProperties(selectedElement.id, { color: e.target.value })}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm h-8"
        />
      </div>
    </div>
  );
};

const ButtonProperties: React.FC = () => {
  const { project, selectedElementId, updateElementProperties } = useEditorStore();
  const selectedElement = project.elements.find(el => el.id === selectedElementId);
  if (!selectedElement) return null;
  
  const { label, variant, size, borderRadius } = selectedElement.properties;
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
        <input
          type="text"
          value={label}
          onChange={(e) => updateElementProperties(selectedElement.id, { label: e.target.value })}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Button Variant</label>
        <select
          value={variant}
          onChange={(e) => updateElementProperties(selectedElement.id, { variant: e.target.value })}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="success">Success</option>
          <option value="danger">Danger</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Button Size</label>
        <select
          value={size}
          onChange={(e) => updateElementProperties(selectedElement.id, { size: e.target.value })}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Border Radius</label>
        <input
          type="number"
          value={borderRadius}
          onChange={(e) => updateElementProperties(selectedElement.id, { borderRadius: parseInt(e.target.value) || 0 })}
          min={0}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>
    </div>
  );
};

// Map element types to their property editors
const PROPERTY_EDITORS: Partial<Record<ElementType, React.ComponentType>> = {
  'text': TextProperties,
  'button': ButtonProperties,
  // Add more specialized property editors for other element types
};

// Main properties panel component
export const PropertiesPanel: React.FC = () => {
  // Call all hooks at the top level, unconditionally
  const { selectedElementId, selectElement, project } = useEditorStore();
  
  // Mapping of element types to their specific property components
  const propertyComponentMap: Partial<Record<ElementType, React.ComponentType>> = {
    'text': TextProperties,
    'button': ButtonProperties,
    // Add more mappings as needed
  };
  
  // No element selected
  if (!selectedElementId) {
    return (
      <aside className="bg-card border-l border-border w-72 h-full overflow-y-auto flex flex-col">
        <div className="p-4 flex items-center justify-center flex-1">
          <div className="text-center text-muted-foreground">
            <p>No element selected</p>
            <p className="text-xs mt-1">Select an element to edit its properties</p>
          </div>
        </div>
      </aside>
    );
  }
  
  // Find the selected element
  const selectedElement = project.elements.find(el => el.id === selectedElementId);
  
  if (!selectedElement) {
    return null;
  }
  
  // Get the specific property component for this element type
  const SpecificProperties = propertyComponentMap[selectedElement.type];
  
  return (
    <aside className="bg-card border-l border-border w-72 h-full overflow-y-auto flex flex-col">
      <div className="p-3 border-b border-border flex items-center justify-between">
        <h2 className="font-medium text-sm">Properties</h2>
        <button 
          onClick={() => selectElement(null)}
          className="p-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-full transition-colors"
          title="Close panel"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-4 space-y-5 flex-1">
        {/* Common properties for all elements */}
        <CommonProperties />
        
        {/* Element-specific properties */}
        {SpecificProperties && <SpecificProperties />}
      </div>
    </aside>
  );
}; 