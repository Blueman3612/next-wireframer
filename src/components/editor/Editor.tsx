"use client";

import React from 'react';
import { ComponentPalette } from './ComponentPalette';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { useEditorStore } from '@/store/editorStore';
import { PlusIcon, ArrowDownTrayIcon, TrashIcon } from '@heroicons/react/24/outline';

export const Editor: React.FC = () => {
  const { project, createNewProject, clearCanvas } = useEditorStore();
  
  const handleCreateNew = () => {
    if (confirm('Create a new wireframe? Any unsaved changes will be lost.')) {
      createNewProject('Untitled Wireframe');
    }
  };
  
  const handleClearCanvas = () => {
    if (confirm('Clear the canvas? This will remove all elements.')) {
      clearCanvas();
    }
  };
  
  const handleExport = () => {
    alert('Export functionality will be implemented in a future update.');
    // Future implementation: Exporting wireframe as Next.js components
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header/Toolbar */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold text-gray-800">Next Wireframer</h1>
          <span className="text-sm text-gray-500">|</span>
          <span className="text-sm text-gray-600">{project.name}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleCreateNew}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <PlusIcon className="w-4 h-4 mr-1" />
            New
          </button>
          
          <button
            type="button"
            onClick={handleClearCanvas}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <TrashIcon className="w-4 h-4 mr-1" />
            Clear
          </button>
          
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
            Export
          </button>
        </div>
      </div>
      
      {/* Main Editor Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Component Palette */}
        <ComponentPalette />
        
        {/* Canvas */}
        <Canvas />
        
        {/* Properties Panel */}
        <PropertiesPanel />
      </div>
    </div>
  );
}; 