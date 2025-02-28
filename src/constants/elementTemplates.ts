import { ElementTemplate } from '../types/wireframe';

export const ELEMENT_TEMPLATES: ElementTemplate[] = [
  {
    type: 'container',
    name: 'Container',
    icon: 'square',
    defaultSize: { width: 300, height: 200 },
    defaultProperties: { 
      backgroundColor: '#f0f0f0', 
      borderWidth: 1, 
      borderColor: '#ddd', 
      borderStyle: 'solid' 
    }
  },
  {
    type: 'text',
    name: 'Text',
    icon: 'text',
    defaultSize: { width: 200, height: 24 },
    defaultProperties: { 
      content: 'Text element', 
      fontSize: 16, 
      fontWeight: 'normal', 
      color: '#000000' 
    }
  },
  {
    type: 'button',
    name: 'Button',
    icon: 'cursor-click',
    defaultSize: { width: 120, height: 40 },
    defaultProperties: { 
      label: 'Button', 
      variant: 'primary', 
      size: 'md', 
      borderRadius: 4 
    }
  },
  {
    type: 'input',
    name: 'Input Field',
    icon: 'pencil-square',
    defaultSize: { width: 200, height: 40 },
    defaultProperties: { 
      placeholder: 'Input field', 
      label: 'Label', 
      type: 'text' 
    }
  },
  {
    type: 'image',
    name: 'Image',
    icon: 'photo',
    defaultSize: { width: 150, height: 150 },
    defaultProperties: { 
      src: 'https://via.placeholder.com/150', 
      alt: 'Image placeholder' 
    }
  },
  {
    type: 'navbar',
    name: 'Navigation Bar',
    icon: 'menu',
    defaultSize: { width: 1024, height: 60 },
    defaultProperties: { 
      title: 'Website Title', 
      links: ['Home', 'About', 'Contact'] 
    }
  },
  {
    type: 'card',
    name: 'Card',
    icon: 'document',
    defaultSize: { width: 300, height: 200 },
    defaultProperties: { 
      title: 'Card Title', 
      content: 'Card content goes here', 
      hasImage: true 
    }
  },
  {
    type: 'list',
    name: 'List',
    icon: 'list-bullet',
    defaultSize: { width: 200, height: 120 },
    defaultProperties: { 
      items: ['Item 1', 'Item 2', 'Item 3'], 
      style: 'bulleted' 
    }
  }
]; 