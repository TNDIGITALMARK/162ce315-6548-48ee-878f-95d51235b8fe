"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Plus,
  Trash2,
  Settings,
  GripVertical,
  Eye,
  EyeOff
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { type FieldType } from './ComponentLibrary';

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  value?: any;
  visible: boolean;
}

interface FormCanvasProps {
  previewMode?: 'desktop' | 'mobile';
  className?: string;
}

export function FormCanvas({ previewMode = 'desktop', className }: FormCanvasProps) {
  const [fields, setFields] = useState<FormField[]>([]);
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);

    try {
      const fieldData = JSON.parse(e.dataTransfer.getData('application/json')) as FieldType;
      const newField: FormField = {
        id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: fieldData.id,
        label: fieldData.name,
        placeholder: `Enter ${fieldData.name.toLowerCase()}`,
        required: false,
        visible: true,
        options: fieldData.id === 'select' || fieldData.id === 'radio' || fieldData.id === 'checkbox'
          ? ['Option 1', 'Option 2', 'Option 3']
          : undefined
      };

      setFields(prev => {
        const newFields = [...prev];
        newFields.splice(dropIndex, 0, newField);
        return newFields;
      });
    } catch (error) {
      console.error('Failed to parse dropped field data:', error);
    }
  };

  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();

    try {
      const fieldData = JSON.parse(e.dataTransfer.getData('application/json')) as FieldType;
      const newField: FormField = {
        id: `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: fieldData.id,
        label: fieldData.name,
        placeholder: `Enter ${fieldData.name.toLowerCase()}`,
        required: false,
        visible: true,
        options: fieldData.id === 'select' || fieldData.id === 'radio' || fieldData.id === 'checkbox'
          ? ['Option 1', 'Option 2', 'Option 3']
          : undefined
      };

      setFields(prev => [...prev, newField]);
    } catch (error) {
      console.error('Failed to parse dropped field data:', error);
    }
  };

  const removeField = (fieldId: string) => {
    setFields(prev => prev.filter(field => field.id !== fieldId));
    if (selectedField === fieldId) {
      setSelectedField(null);
    }
  };

  const toggleFieldVisibility = (fieldId: string) => {
    setFields(prev =>
      prev.map(field =>
        field.id === fieldId
          ? { ...field, visible: !field.visible }
          : field
      )
    );
  };

  const renderField = (field: FormField, index: number) => {
    const isSelected = selectedField === field.id;
    const isDropTarget = dragOverIndex === index;

    return (
      <React.Fragment key={field.id}>
        {/* Drop zone above each field */}
        <div
          className={cn(
            "h-2 transition-all duration-200",
            isDropTarget ? "bg-primary/20 border-2 border-dashed border-primary rounded" : ""
          )}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, index)}
        />

        <Card
          className={cn(
            "p-4 transition-all duration-200 cursor-pointer group hover:shadow-md",
            isSelected && "ring-2 ring-primary",
            !field.visible && "opacity-50"
          )}
          onClick={() => setSelectedField(field.id)}
        >
          <div className="flex items-start gap-3">
            {/* Drag Handle */}
            <div className="pt-2">
              <GripVertical className="w-4 h-4 text-muted-foreground group-hover:text-foreground cursor-grab" />
            </div>

            {/* Field Content */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">
                  {field.label}
                  {field.required && <span className="text-destructive ml-1">*</span>}
                </Label>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFieldVisibility(field.id);
                    }}
                  >
                    {field.visible ? (
                      <Eye className="w-3 h-3" />
                    ) : (
                      <EyeOff className="w-3 h-3" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedField(field.id);
                    }}
                  >
                    <Settings className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeField(field.id);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Field Input */}
              {renderFieldInput(field)}
            </div>
          </div>
        </Card>
      </React.Fragment>
    );
  };

  const renderFieldInput = (field: FormField) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'number':
        return (
          <Input
            placeholder={field.placeholder}
            type={field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : 'text'}
            className="pointer-events-none"
          />
        );

      case 'textarea':
        return (
          <Textarea
            placeholder={field.placeholder}
            className="pointer-events-none"
            rows={3}
          />
        );

      case 'select':
        return (
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder="Select an option..." />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, idx) => (
                <SelectItem key={idx} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'radio':
        return (
          <RadioGroup className="space-y-2" disabled>
            {field.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}_${idx}`} />
                <Label htmlFor={`${field.id}_${idx}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <Checkbox id={`${field.id}_${idx}`} disabled />
                <Label htmlFor={`${field.id}_${idx}`}>{option}</Label>
              </div>
            ))}
          </div>
        );

      case 'toggle':
        return (
          <div className="flex items-center space-x-2">
            <Switch disabled />
            <Label>Toggle option</Label>
          </div>
        );

      case 'date':
        return (
          <Input
            type="date"
            className="pointer-events-none"
          />
        );

      case 'file':
        return (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
            <Plus className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Click to upload or drag files here</p>
          </div>
        );

      case 'heading1':
        return <h1 className="text-2xl font-bold">Heading 1</h1>;

      case 'heading2':
        return <h2 className="text-xl font-semibold">Heading 2</h2>;

      case 'text-block':
        return <p className="text-muted-foreground">This is a text block. You can add descriptive text here.</p>;

      case 'separator':
        return <Separator />;

      default:
        return (
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Unknown field type: {field.type}</p>
          </div>
        );
    }
  };

  return (
    <div className={cn(
      "h-full flex flex-col bg-canvas-background",
      previewMode === 'mobile' && "max-w-sm mx-auto",
      className
    )}>
      {/* Canvas Header */}
      <div className="p-6 border-b border-canvas-border bg-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Form Canvas</h2>
            <p className="text-sm text-muted-foreground">
              {fields.length === 0
                ? "Drag components from the sidebar to build your form"
                : `${fields.length} field${fields.length === 1 ? '' : 's'} added`
              }
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {previewMode === 'mobile' ? 'Mobile Preview' : 'Desktop Preview'}
          </div>
        </div>
      </div>

      {/* Canvas Content */}
      <div
        className="flex-1 p-6 overflow-auto"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleCanvasDrop}
      >
        {fields.length === 0 ? (
          /* Empty State */
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Start Building Your Form</h3>
              <p className="text-muted-foreground mb-4">
                Drag components from the sidebar to create your form. You can rearrange, configure, and preview them in real-time.
              </p>
            </div>
          </div>
        ) : (
          /* Form Fields */
          <div className={cn(
            "space-y-4 max-w-2xl mx-auto",
            previewMode === 'mobile' && "max-w-sm"
          )}>
            {fields.map((field, index) => renderField(field, index))}

            {/* Final drop zone */}
            <div
              className={cn(
                "h-8 transition-all duration-200 border-2 border-dashed border-transparent rounded",
                dragOverIndex === fields.length && "border-primary bg-primary/10"
              )}
              onDragOver={(e) => handleDragOver(e, fields.length)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, fields.length)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export type { FormField };