"use client";

import React, { useState } from 'react';
import { FormBuilderLayout } from '@/components/layout/FormBuilderLayout';
import { Header } from '@/components/layout/Header';
import { ComponentLibrary } from '@/components/form-builder/ComponentLibrary';
import { FormCanvas } from '@/components/form-builder/FormCanvas';
import { SettingsPanel } from '@/components/form-builder/SettingsPanel';

export default function FormBuilderPage() {
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showSettingsPanel, setShowSettingsPanel] = useState(true);

  const handleSave = () => {
    console.log('Saving form...');
  };

  const handlePreview = () => {
    console.log('Opening preview...');
  };

  return (
    <div className="h-screen flex flex-col">
      <Header
        currentPage="builder"
        formName="Customer Feedback Survey"
        previewMode={previewMode}
        onPreviewToggle={setPreviewMode}
        onSave={handleSave}
        onPreview={handlePreview}
      />

      <FormBuilderLayout
        sidebar={<ComponentLibrary />}
        rightPanel={showSettingsPanel ? <SettingsPanel /> : undefined}
        className="flex-1"
      >
        <FormCanvas previewMode={previewMode} />
      </FormBuilderLayout>
    </div>
  );
}