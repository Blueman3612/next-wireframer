"use client";

import React from 'react';
import { useEditorStore } from '@/store/editorStore';
import { ELEMENT_TEMPLATES } from '@/constants/elementTemplates';
import { ElementType } from '@/types/wireframe';

// Import icons from heroicons
import {
  Square2StackIcon,
  DocumentTextIcon,
  CursorArrowRaysIcon,
  PencilSquareIcon,
  PhotoIcon,
  Bars3Icon,
  DocumentIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline';

// Map element types to icons
const ELEMENT_ICONS: Record<ElementType, React.ElementType> = {
  'container': Square2StackIcon,
  'text': DocumentTextIcon,
  'button': CursorArrowRaysIcon,
  'input': PencilSquareIcon,
  'image': PhotoIcon,
  'navbar': Bars3Icon,
  'card': DocumentIcon,
  'list': ListBulletIcon
};

export const ComponentPalette: React.FC = () => {
  const { addElement } = useEditorStore();
  
  const handleDragStart = (e: React.DragEvent, type: ElementType) => {
    e.dataTransfer.setData('elementType', type);
  };
  
  const handleClickComponent = (type: ElementType) => {
    // Add element at center of canvas view
    addElement(type, { x: 200, y: 200 });
  };
  
  return (
    <div className="bg-white border-r border-gray-200 w-64 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Components</h2>
      </div>
      
      <div className="p-4 grid grid-cols-2 gap-2">
        {ELEMENT_TEMPLATES.map((template) => {
          const Icon = ELEMENT_ICONS[template.type];
          
          return (
            <div
              key={template.type}
              className="flex flex-col items-center justify-center border border-gray-200 rounded p-3 cursor-grab hover:bg-gray-50 transition-colors"
              draggable
              onDragStart={(e) => handleDragStart(e, template.type)}
              onClick={() => handleClickComponent(template.type)}
            >
              <Icon className="w-6 h-6 text-gray-600 mb-2" />
              <span className="text-xs text-center">{template.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 