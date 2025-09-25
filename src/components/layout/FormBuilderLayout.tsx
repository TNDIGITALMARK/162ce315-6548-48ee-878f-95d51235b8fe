"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface FormBuilderLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  rightPanel?: React.ReactNode;
  className?: string;
}

export function FormBuilderLayout({
  children,
  sidebar,
  rightPanel,
  className
}: FormBuilderLayoutProps) {
  return (
    <div className={cn(
      "flex h-screen bg-background",
      className
    )}>
      {/* Left Sidebar - Component Library */}
      <div className="w-80 flex-shrink-0 bg-sidebar border-r border-sidebar-border">
        {sidebar}
      </div>

      {/* Main Content Area - Form Canvas */}
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>

      {/* Right Panel - Settings */}
      {rightPanel && (
        <div className="w-80 flex-shrink-0 bg-card border-l border-border">
          {rightPanel}
        </div>
      )}
    </div>
  );
}