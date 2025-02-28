"use client";

import React from 'react';
import { useEditorStore } from '@/store/editorStore';
import { ElementType } from '@/types/wireframe';
import { TrashIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';

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
      {/* Element Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Element Type</label>
        <div className="text-sm bg-gray-100 py-1 px-2 rounded capitalize">{selectedElement.type}</div>
      </div>
      
      {/* Position */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">X Position</label>
          <input
            type="number"
            value={selectedElement.position.x}
            onChange={(e) => moveElement(selectedElement.id, { 
              ...selectedElement.position, 
              x: parseInt(e.target.value) || 0 
            })}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Y Position</label>
          <input
            type="number"
            value={selectedElement.position.y}
            onChange={(e) => moveElement(selectedElement.id, { 
              ...selectedElement.position, 
              y: parseInt(e.target.value) || 0 
            })}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>
      </div>
      
      {/* Size */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
          <input
            type="number"
            value={selectedElement.size.width}
            onChange={(e) => resizeElement(selectedElement.id, { 
              ...selectedElement.size, 
              width: parseInt(e.target.value) || 20 
            })}
            min={20}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
          <input
            type="number"
            value={selectedElement.size.height}
            onChange={(e) => resizeElement(selectedElement.id, { 
              ...selectedElement.size, 
              height: parseInt(e.target.value) || 20 
            })}
            min={20}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex space-x-2 pt-2 border-t border-gray-200">
        <button
          type="button"
          onClick={handleDuplicateElement}
          className="flex items-center justify-center px-3 py-1.5 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200"
        >
          <ClipboardDocumentIcon className="w-4 h-4 mr-1" />
          Duplicate
        </button>
        <button
          type="button"
          onClick={handleRemoveElement}
          className="flex items-center justify-center px-3 py-1.5 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
        >
          <TrashIcon className="w-4 h-4 mr-1" />
          Delete
        </button>
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

export const PropertiesPanel: React.FC = () => {
  const { selectedElementId, project } = useEditorStore();
  
  const selectedElement = project.elements.find(el => el.id === selectedElementId);
  
  if (!selectedElement) {
    return (
      <div className="bg-white border-l border-gray-200 w-64 h-full overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Properties</h2>
        </div>
        <div className="p-4 text-sm text-gray-500 text-center">
          Select an element to edit its properties
        </div>
      </div>
    );
  }
  
  const ElementProperties = PROPERTY_EDITORS[selectedElement.type];
  
  return (
    <div className="bg-white border-l border-gray-200 w-64 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Properties</h2>
      </div>
      
      <div className="p-4 space-y-6">
        <CommonProperties />
        
        {/* Element-specific properties */}
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Element Properties</h3>
          {ElementProperties ? <ElementProperties /> : (
            <div className="text-sm text-gray-500">
              Basic properties available for this element type
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 