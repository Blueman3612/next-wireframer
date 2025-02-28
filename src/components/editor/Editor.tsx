"use client";

import React from 'react';
import { ComponentPalette } from './ComponentPalette';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { useEditorStore } from '@/store/editorStore';
import { 
  PlusIcon, 
  ArrowDownTrayIcon, 
  TrashIcon,
  Cog6ToothIcon, 
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon
} from '@heroicons/react/24/outline';

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
    <div className="flex flex-col h-screen bg-secondary/30">
      {/* Header/Toolbar */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-semibold">
            <span className="text-primary">Next</span> Wireframer
          </h1>
          <div className="h-4 w-px bg-border mx-1"></div>
          <span className="text-sm text-muted-foreground font-medium">{project.name}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center mr-2">
            <button
              type="button"
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
              aria-label="Undo"
              title="Undo (Coming soon)"
              disabled
            >
              <ArrowUturnLeftIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
              aria-label="Redo"
              title="Redo (Coming soon)"
              disabled
            >
              <ArrowUturnRightIcon className="w-5 h-5" />
            </button>
          </div>
          
          <button
            type="button"
            onClick={handleCreateNew}
            className="inline-flex items-center px-3 py-1.5 rounded text-sm font-medium border border-border bg-card hover:bg-secondary transition-colors"
          >
            <PlusIcon className="w-4 h-4 mr-1.5" />
            New
          </button>
          
          <button
            type="button"
            onClick={handleClearCanvas}
            className="inline-flex items-center px-3 py-1.5 rounded text-sm font-medium border border-border bg-card hover:bg-secondary transition-colors"
            title="Clear canvas"
          >
            <TrashIcon className="w-4 h-4 mr-1.5" />
            Clear
          </button>
          
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center px-3 py-1.5 rounded text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ArrowDownTrayIcon className="w-4 h-4 mr-1.5" />
            Export
          </button>
          
          <button
            type="button"
            title="Settings (Coming soon)"
            className="p-1.5 ml-1 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
          >
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
        </div>
      </header>
      
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