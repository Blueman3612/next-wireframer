"use client";

import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useEditorStore } from '@/store/editorStore';
import { WireframeElement } from '@/types/wireframe';
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
      grid={[5, 5]} // Snap to grid
      bounds="parent"
    >
      <div
        ref={nodeRef}
        className={`absolute cursor-move ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
        style={{
          width: `${element.size.width}px`,
          height: `${element.size.height}px`,
          zIndex: isSelected ? 10 : 1,
        }}
        onClick={handleClick}
      >
        {renderElementContent(element)}
        
        {isSelected && (
          <>
            <div className="absolute inset-0 border border-blue-500 pointer-events-none" />
            <div
              className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-se-resize"
              onMouseDown={handleResizeStart}
            />
          </>
        )}
      </div>
    </Draggable>
  );
}; 