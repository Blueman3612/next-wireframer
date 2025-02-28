"use client";

import React, { useState } from 'react';
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
  ListBulletIcon,
  ChevronRightIcon
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

// Group components by category
const COMPONENT_CATEGORIES = [
  {
    name: 'Layout',
    types: ['container'] as ElementType[]
  },
  {
    name: 'Basic Elements',
    types: ['text', 'button', 'input', 'image'] as ElementType[]
  },
  {
    name: 'Components',
    types: ['navbar', 'card', 'list'] as ElementType[]
  }
];

export const ComponentPalette: React.FC = () => {
  const { addElement } = useEditorStore();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Layout': true,
    'Basic Elements': true,
    'Components': true
  });
  
  const handleDragStart = (e: React.DragEvent, type: ElementType) => {
    e.dataTransfer.setData('elementType', type);
  };
  
  const handleClickComponent = (type: ElementType) => {
    // Add element at center of canvas view
    addElement(type, { x: 200, y: 200 });
  };
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  return (
    <aside className="bg-card border-r border-border w-64 h-full overflow-y-auto flex flex-col">
      <div className="p-3 border-b border-border">
        <h2 className="font-medium text-sm">Components</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Drag and drop or click to add</p>
      </div>
      
      <div className="flex-1 py-2">
        {COMPONENT_CATEGORIES.map((category) => (
          <div key={category.name} className="mb-1">
            <button
              className="w-full flex items-center justify-between px-3 py-1.5 text-sm font-medium hover:bg-secondary/50 transition-colors"
              onClick={() => toggleCategory(category.name)}
            >
              <span>{category.name}</span>
              <ChevronRightIcon 
                className={`w-4 h-4 text-muted-foreground transition-transform ${
                  expandedCategories[category.name] ? 'rotate-90' : ''
                }`} 
              />
            </button>
            
            {expandedCategories[category.name] && (
              <div className="grid grid-cols-2 gap-1.5 px-2 py-1">
                {category.types.map((type) => {
                  const template = ELEMENT_TEMPLATES.find(t => t.type === type);
                  if (!template) return null;
                  
                  const Icon = ELEMENT_ICONS[type];
                  
                  return (
                    <div
                      key={type}
                      className="flex flex-col items-center justify-center border border-border rounded p-2 cursor-grab bg-card hover:bg-secondary/50 hover:border-primary/40 transition-all"
                      draggable
                      onDragStart={(e) => handleDragStart(e, type)}
                      onClick={() => handleClickComponent(type)}
                    >
                      <Icon className="w-5 h-5 text-primary/70 mb-1" />
                      <span className="text-xs">{template.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-auto p-3 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Tip: Hold Shift while dragging to maintain aspect ratio
        </div>
      </div>
    </aside>
  );
}; 