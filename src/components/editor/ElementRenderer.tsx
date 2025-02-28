"use client";

import React from 'react';
import { WireframeElement, ElementType } from '@/types/wireframe';
import Image from 'next/image';

// Define CSS property types
type TextAlignType = 'left' | 'center' | 'right' | 'justify';
type ObjectFitType = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
type BorderStyleType = 'solid' | 'dashed' | 'dotted' | 'double' | 'none';
type FontWeightType = 'normal' | 'bold' | 'lighter' | 'bolder' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

// Container Element
const ContainerElement: React.FC<{ element: WireframeElement }> = ({ element }) => {
  const { 
    backgroundColor = '#ffffff', 
    borderWidth = 0, 
    borderColor = '#000000', 
    borderStyle = 'solid' 
  } = element.properties;
  
  return (
    <div 
      className="w-full h-full"
      style={{ 
        backgroundColor: backgroundColor as string, 
        borderWidth: `${Number(borderWidth)}px`, 
        borderColor: borderColor as string, 
        borderStyle: borderStyle as BorderStyleType 
      }}
    />
  );
};

// Text Element
const TextElement: React.FC<{ element: WireframeElement }> = ({ element }) => {
  const { 
    content = 'Text content', 
    fontSize = 16, 
    fontWeight = 'normal', 
    color = '#000000',
    textAlign = 'left'
  } = element.properties;
  
  return (
    <div 
      className="w-full h-full flex items-center overflow-hidden p-2"
      style={{ 
        fontSize: `${Number(fontSize)}px`, 
        fontWeight: fontWeight as FontWeightType, 
        color: color as string,
        textAlign: textAlign as TextAlignType
      }}
    >
      {content?.toString() || 'Text content'}
    </div>
  );
};

// Button Element
const ButtonElement: React.FC<{ element: WireframeElement }> = ({ element }) => {
  const { 
    label = 'Button', 
    variant = 'primary', 
    size = 'md', 
    borderRadius = 4 
  } = element.properties;
  
  const variantClasses: Record<string, string> = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-200 text-gray-800',
    success: 'bg-green-500 text-white',
    danger: 'bg-red-500 text-white',
    outline: 'bg-transparent border border-gray-300 text-gray-800',
  };
  
  const sizeClasses: Record<string, string> = {
    sm: 'text-sm py-1 px-2',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };
  
  const variantClass = variantClasses[variant as string] || 'bg-blue-500 text-white';
  const sizeClass = sizeClasses[size as string] || 'text-base py-2 px-4';
  
  return (
    <button 
      className={`w-full h-full ${variantClass} ${sizeClass} font-medium flex items-center justify-center`}
      style={{ borderRadius: `${borderRadius}px` }}
    >
      {label}
    </button>
  );
};

// Input Element
const InputElement: React.FC<{ element: WireframeElement }> = ({ element }) => {
  const { 
    placeholder = 'Enter text...', 
    label = 'Label', 
    type = 'text',
    required = false
  } = element.properties;
  
  return (
    <div className="w-full h-full flex flex-col justify-center p-2">
      <label className="text-sm text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input 
        type={type as string}
        placeholder={placeholder as string}
        className="border border-gray-300 rounded px-2 py-1 w-full"
        readOnly
      />
    </div>
  );
};

// Image Element
const ImageElement: React.FC<{ element: WireframeElement }> = ({ element }) => {
  const { 
    src = '', 
    alt = 'Image', 
    objectFit = 'cover'
  } = element.properties;
  
  // For the Image component display, we'll use a placeholder div instead when no valid src
  const hasValidSrc = typeof src === 'string' && src.length > 0;
  
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      {hasValidSrc ? (
        <Image
          src={src as string}
          alt={typeof alt === 'string' ? alt : 'Image'}
          fill
          className="w-full h-full"
          style={{ objectFit: objectFit as ObjectFitType }}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8.5" cy="8.5" r="1.5" strokeWidth="0" fill="currentColor"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15l-5-5L5 21"/>
          </svg>
          <span className="text-xs">Image Placeholder</span>
        </div>
      )}
    </div>
  );
};

// Navbar Element
const NavbarElement: React.FC<{ element: WireframeElement }> = ({ element }) => {
  const { 
    title = 'Brand', 
    links = ['Home', 'About', 'Contact'],
    variant = 'dark'
  } = element.properties;
  
  const variantClasses: Record<string, string> = {
    dark: 'bg-gray-800 text-white',
    light: 'bg-white text-gray-800 border-b border-gray-200',
    primary: 'bg-blue-600 text-white',
  };
  
  const variantClass = variantClasses[variant as string] || 'bg-gray-800 text-white';
  
  return (
    <div className={`w-full h-full flex items-center justify-between px-4 ${variantClass}`}>
      <div className="text-lg font-bold">{title}</div>
      <div className="flex space-x-4">
        {Array.isArray(links) && links.map((link: string, index: number) => (
          <div key={index} className="cursor-pointer">{link}</div>
        ))}
      </div>
    </div>
  );
};

// Card Element
const CardElement: React.FC<{ element: WireframeElement }> = ({ element }) => {
  const { 
    title = 'Card Title', 
    content = 'Card content goes here', 
    hasImage = true,
    hasShadow = true
  } = element.properties;
  
  return (
    <div className={`w-full h-full border border-gray-200 rounded overflow-hidden ${hasShadow ? 'shadow-sm' : ''} bg-white`}>
      {hasImage && (
        <div className="h-1/3 bg-gray-300 flex items-center justify-center text-gray-500 text-xs">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Image
        </div>
      )}
      <div className="p-3">
        <div className="font-medium text-base mb-1">{title}</div>
        <div className="text-sm text-gray-600">{content}</div>
      </div>
    </div>
  );
};

// List Element
const ListElement: React.FC<{ element: WireframeElement }> = ({ element }) => {
  const { 
    items = ['Item 1', 'Item 2', 'Item 3'], 
    style = 'bulleted'
  } = element.properties;
  
  const listStyleClass = style === 'bulleted' ? 'list-disc' : style === 'numbered' ? 'list-decimal' : '';
  
  return (
    <div className="w-full h-full p-2 overflow-auto">
      {style === 'none' ? (
        <div className="space-y-1">
          {Array.isArray(items) && items.map((item: string, index: number) => (
            <div key={index} className="text-sm text-gray-800">{item}</div>
          ))}
        </div>
      ) : (
        <ul className={`${listStyleClass} pl-5 space-y-1`}>
          {Array.isArray(items) && items.map((item: string, index: number) => (
            <li key={index} className="text-sm text-gray-800">{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Map element types to their renderer components
const ELEMENT_RENDERERS: Record<ElementType, React.FC<{ element: WireframeElement }>> = {
  container: ContainerElement,
  text: TextElement,
  button: ButtonElement,
  input: InputElement,
  image: ImageElement,
  navbar: NavbarElement,
  card: CardElement,
  list: ListElement,
};

// Main renderer function that selects the appropriate component based on element type
export const renderElementContent = (element: WireframeElement) => {
  const Renderer = ELEMENT_RENDERERS[element.type];
  
  if (Renderer) {
    return <Renderer element={element} />;
  }
  
  // Fallback for unknown element types
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 text-gray-500 text-sm">
      {element.type}
    </div>
  );
}; 