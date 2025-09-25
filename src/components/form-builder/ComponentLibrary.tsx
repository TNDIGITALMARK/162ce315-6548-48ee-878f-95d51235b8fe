"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Type,
  Mail,
  Phone,
  Calendar,
  ToggleLeft,
  CheckSquare,
  Circle,
  List,
  Hash,
  FileText,
  Upload,
  Star,
  Columns,
  Rows,
  AlignLeft,
  Heading1,
  Heading2,
  MoreHorizontal,
  Layers,
  Target,
  Workflow
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FieldType {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  category: 'basic' | 'advanced' | 'layout';
  description: string;
}

const fieldTypes: FieldType[] = [
  // Basic Fields
  { id: 'text', name: 'Text Input', icon: Type, category: 'basic', description: 'Single line text input' },
  { id: 'email', name: 'Email', icon: Mail, category: 'basic', description: 'Email address field' },
  { id: 'phone', name: 'Phone', icon: Phone, category: 'basic', description: 'Phone number input' },
  { id: 'textarea', name: 'Text Area', icon: FileText, category: 'basic', description: 'Multi-line text input' },
  { id: 'number', name: 'Number', icon: Hash, category: 'basic', description: 'Numeric input field' },
  { id: 'date', name: 'Date Picker', icon: Calendar, category: 'basic', description: 'Date selection field' },

  // Advanced Fields
  { id: 'select', name: 'Dropdown', icon: List, category: 'advanced', description: 'Single selection dropdown' },
  { id: 'radio', name: 'Radio Group', icon: Circle, category: 'advanced', description: 'Single choice options' },
  { id: 'checkbox', name: 'Checkbox', icon: CheckSquare, category: 'advanced', description: 'Multiple selections' },
  { id: 'toggle', name: 'Toggle Switch', icon: ToggleLeft, category: 'advanced', description: 'On/off switch' },
  { id: 'file', name: 'File Upload', icon: Upload, category: 'advanced', description: 'File upload field' },
  { id: 'rating', name: 'Rating', icon: Star, category: 'advanced', description: 'Star rating field' },

  // Layout Elements
  { id: 'heading1', name: 'Heading 1', icon: Heading1, category: 'layout', description: 'Primary heading text' },
  { id: 'heading2', name: 'Heading 2', icon: Heading2, category: 'layout', description: 'Secondary heading text' },
  { id: 'text-block', name: 'Text Block', icon: AlignLeft, category: 'layout', description: 'Paragraph text content' },
  { id: 'separator', name: 'Separator', icon: MoreHorizontal, category: 'layout', description: 'Visual divider line' },
  { id: 'columns', name: 'Columns', icon: Columns, category: 'layout', description: 'Multi-column layout' },
  { id: 'section', name: 'Section', icon: Layers, category: 'layout', description: 'Form section container' }
];

interface ComponentLibraryProps {
  onDragStart?: (fieldType: FieldType) => void;
  className?: string;
}

export function ComponentLibrary({ onDragStart, className }: ComponentLibraryProps) {
  const basicFields = fieldTypes.filter(f => f.category === 'basic');
  const advancedFields = fieldTypes.filter(f => f.category === 'advanced');
  const layoutElements = fieldTypes.filter(f => f.category === 'layout');

  const handleDragStart = (e: React.DragEvent, fieldType: FieldType) => {
    e.dataTransfer.setData('application/json', JSON.stringify(fieldType));
    onDragStart?.(fieldType);
  };

  return (
    <div className={cn("h-full bg-sidebar text-sidebar-foreground", className)}>
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          <h2 className="text-lg font-semibold">Components</h2>
        </div>
        <p className="text-sm text-sidebar-foreground/70">
          Drag components to the form canvas
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {/* Basic Fields */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-semibold text-sidebar-foreground">Basic Fields</h3>
              <Badge variant="secondary" className="text-xs">
                {basicFields.length}
              </Badge>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {basicFields.map((field) => (
                <div
                  key={field.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, field)}
                  className="group p-3 border border-sidebar-border rounded-lg cursor-grab hover:bg-sidebar-accent hover:border-sidebar-primary/50 transition-all duration-200 active:cursor-grabbing"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-sidebar-accent rounded-md flex items-center justify-center group-hover:bg-sidebar-primary group-hover:text-sidebar-primary-foreground transition-colors">
                      <field.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-sidebar-foreground">
                        {field.name}
                      </div>
                      <div className="text-xs text-sidebar-foreground/70 truncate">
                        {field.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-sidebar-border" />

          {/* Advanced Fields */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-semibold text-sidebar-foreground">Advanced Fields</h3>
              <Badge variant="secondary" className="text-xs">
                {advancedFields.length}
              </Badge>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {advancedFields.map((field) => (
                <div
                  key={field.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, field)}
                  className="group p-3 border border-sidebar-border rounded-lg cursor-grab hover:bg-sidebar-accent hover:border-sidebar-primary/50 transition-all duration-200 active:cursor-grabbing"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-sidebar-accent rounded-md flex items-center justify-center group-hover:bg-sidebar-primary group-hover:text-sidebar-primary-foreground transition-colors">
                      <field.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-sidebar-foreground">
                        {field.name}
                      </div>
                      <div className="text-xs text-sidebar-foreground/70 truncate">
                        {field.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="bg-sidebar-border" />

          {/* Layout Elements */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-sm font-semibold text-sidebar-foreground">Layout Elements</h3>
              <Badge variant="secondary" className="text-xs">
                {layoutElements.length}
              </Badge>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {layoutElements.map((field) => (
                <div
                  key={field.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, field)}
                  className="group p-3 border border-sidebar-border rounded-lg cursor-grab hover:bg-sidebar-accent hover:border-sidebar-primary/50 transition-all duration-200 active:cursor-grabbing"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-sidebar-accent rounded-md flex items-center justify-center group-hover:bg-sidebar-primary group-hover:text-sidebar-primary-foreground transition-colors">
                      <field.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-sidebar-foreground">
                        {field.name}
                      </div>
                      <div className="text-xs text-sidebar-foreground/70 truncate">
                        {field.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-6 border-t border-sidebar-border">
        <Button
          variant="outline"
          className="w-full gap-2 border-sidebar-border hover:bg-sidebar-accent"
        >
          <Workflow className="w-4 h-4" />
          Conditional Logic
        </Button>
      </div>
    </div>
  );
}

export type { FieldType };