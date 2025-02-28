"use client";

import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useEditorStore } from '@/store/editorStore';
import { WireframeElement } from '@/types/wireframe';

// Fix the import
// Import renderElementContent directly from the file
// @ts-ignore
import { renderElementContent } from './ElementRenderer';

interface WireframeElementProps {
  element: WireframeElement;
}

export const DraggableElement: React.FC<WireframeElementProps> = ({ element }) => {
  const { 
    selectedElementId, 
    selectElement, 
    moveElement, 
    resizeElement,
    setIsDragging 
  } = useEditorStore();
  
  const isSelected = selectedElementId === element.id;
  const nodeRef = useRef<HTMLDivElement>(null);
  const [resizing, setResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState(element.size);

  const handleDragStart = () => {
    setIsDragging(true);
    selectElement(element.id);
  };

  const handleDragStop = (_e: any, data: { x: number; y: number }) => {
    setIsDragging(false);
    moveElement(element.id, { x: data.x, y: data.y });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectElement(element.id);
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setResizing(true);
    setResizeStart({ x: e.clientX, y: e.clientY });
    setInitialSize(element.size);
  };

  const handleResizeMove = (e: MouseEvent) => {
    if (!resizing) return;
    
    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;
    
    const newWidth = Math.max(initialSize.width + deltaX, 20);
    const newHeight = Math.max(initialSize.height + deltaY, 20);
    
    resizeElement(element.id, { width: newWidth, height: newHeight });
  };

  const handleResizeEnd = () => {
    setResizing(false);
  };

  useEffect(() => {
    if (resizing) {
      window.addEventListener('mousemove', handleResizeMove);
      window.addEventListener('mouseup', handleResizeEnd);
      return () => {
        window.removeEventListener('mousemove', handleResizeMove);
        window.removeEventListener('mouseup', handleResizeEnd);
      };
    }
  }, [resizing, resizeStart, initialSize, element.id, resizeElement]);

  // The nodeRef is properly typed as RefObject<HTMLDivElement>
  // but Draggable expects a RefObject<HTMLElement>
  // We use type assertion to satisfy TypeScript
  const nodeRefAsHTML = nodeRef as React.RefObject<HTMLElement>;

  return (
    <Draggable
      nodeRef={nodeRefAsHTML}
      defaultPosition={element.position}
      onStart={handleDragStart}
      onStop={handleDragStop}
      grid={[1, 1]} // Fine grid for more precise positioning
      bounds="parent"
    >
      <div
        ref={nodeRef}
        className={`absolute transition-shadow duration-150 ${isSelected ? 'shadow-md' : ''}`}
        style={{
          width: `${element.size.width}px`,
          height: `${element.size.height}px`,
          zIndex: isSelected ? 10 : 1,
          cursor: 'move',
        }}
        onClick={handleClick}
      >
        {renderElementContent(element)}
        
        {isSelected && (
          <>
            {/* Selection border */}
            <div 
              className="absolute inset-0 border-2 border-primary pointer-events-none rounded-sm" 
              style={{ 
                boxShadow: '0 0 0 1px rgba(255,255,255,0.4)'
              }}
            />
            
            {/* Resize handle */}
            <div
              className="absolute bottom-0 right-0 w-5 h-5 flex items-center justify-center bg-primary text-white cursor-se-resize rounded-tl-sm transition-colors"
              onMouseDown={handleResizeStart}
            >
              <svg 
                width="8" 
                height="8" 
                viewBox="0 0 8 8" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none"
              >
                <path d="M7 1L1 7M7 4L4 7M7 7L7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            
            {/* Element type indicator */}
            <div className="absolute -top-6 left-0 px-1.5 py-0.5 bg-primary/90 text-primary-foreground text-xs rounded font-medium shadow-sm">
              {element.type}
            </div>
          </>
        )}
      </div>
    </Draggable>
  );
}; 