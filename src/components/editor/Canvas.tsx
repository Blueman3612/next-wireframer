"use client";

import React, { useRef } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { DraggableElement } from './WireframeElement';
import { ElementType } from '@/types/wireframe';
import { MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/outline';

export const Canvas: React.FC = () => {
  const { project, addElement, selectElement } = useEditorStore();
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const handleCanvasClick = (e: React.MouseEvent) => {
    // Deselect when clicking empty canvas
    if (e.currentTarget === e.target) {
      selectElement(null);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    // Get element type from drag data
    const elementType = e.dataTransfer.getData('elementType') as ElementType;
    if (!elementType || !canvasRef.current) return;
    
    // Calculate position relative to canvas
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
    
    // Add new element at drop position
    addElement(elementType, { x, y });
  };
  
  const { width, height } = project.canvasSize;
  
  return (
    <div className="flex-1 bg-secondary/30 overflow-auto flex flex-col">
      {/* Canvas toolbar */}
      <div className="bg-card border-b border-border p-2 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          {width}px × {height}px
        </div>
        
        <div className="flex items-center space-x-1">
          <button className="p-1.5 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Zoom out (Coming soon)">
            <MagnifyingGlassMinusIcon className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium px-1.5">100%</span>
          <button className="p-1.5 rounded hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" title="Zoom in (Coming soon)">
            <MagnifyingGlassPlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Canvas container */}
      <div className="flex-1 overflow-auto p-8 flex items-center justify-center">
        <div
          ref={canvasRef}
          className="bg-white border border-border rounded-lg shadow-md relative"
          style={{ 
            width: `${width}px`, 
            height: `${height}px`,
            position: 'relative',
            overflow: 'hidden'
          }}
          onClick={handleCanvasClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* Grid Background */}
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', 
              backgroundSize: '20px 20px',
              backgroundPosition: '-10px -10px',
              pointerEvents: 'none',
              opacity: 0.5
            }} 
          />
          
          {/* Render all elements */}
          {project.elements.map((element) => (
            <DraggableElement key={element.id} element={element} />
          ))}
        </div>
      </div>
    </div>
  );
}; 