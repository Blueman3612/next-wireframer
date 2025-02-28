"use client";

import React, { useRef } from 'react';
import { useEditorStore } from '@/store/editorStore';
import { DraggableElement } from './WireframeElement';
import { ElementType } from '@/types/wireframe';

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
    <div className="flex-1 bg-gray-100 overflow-auto flex items-center justify-center p-8">
      {/* Canvas container */}
      <div
        ref={canvasRef}
        className="bg-white shadow-lg"
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
        {/* Grid Background (optional) */}
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'radial-gradient(#ddd 1px, transparent 0)', 
            backgroundSize: '20px 20px',
            backgroundPosition: '-10px -10px',
            pointerEvents: 'none'
          }} 
        />
        
        {/* Render all elements */}
        {project.elements.map((element) => (
          <DraggableElement key={element.id} element={element} />
        ))}
      </div>
    </div>
  );
}; 