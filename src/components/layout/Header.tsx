"use client";

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  FileText,
  Settings,
  User,
  Monitor,
  Smartphone,
  Save,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  currentPage: 'dashboard' | 'builder' | 'settings';
  formName?: string;
  previewMode?: 'desktop' | 'mobile';
  onPreviewToggle?: (mode: 'desktop' | 'mobile') => void;
  onSave?: () => void;
  onPreview?: () => void;
  className?: string;
}

export function Header({
  currentPage,
  formName,
  previewMode = 'desktop',
  onPreviewToggle,
  onSave,
  onPreview,
  className
}: HeaderProps) {
  return (
    <header className={cn(
      "h-16 bg-card border-b border-border px-6 flex items-center justify-between",
      className
    )}>
      {/* Left: Logo and Navigation */}
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">JustFormYou</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link href="/dashboard">
            <Button
              variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              className="gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Button>
          </Link>
          {formName && (
            <>
              <Link href="/builder">
                <Button
                  variant={currentPage === 'builder' ? 'default' : 'ghost'}
                  size="sm"
                  className="gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Builder
                </Button>
              </Link>
              <Link href="/settings">
                <Button
                  variant={currentPage === 'settings' ? 'default' : 'ghost'}
                  size="sm"
                  className="gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
              </Link>
            </>
          )}
        </nav>

        {formName && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Editing:</span>
            <Badge variant="secondary">{formName}</Badge>
          </div>
        )}
      </div>

      {/* Right: Actions and User */}
      <div className="flex items-center gap-4">
        {/* Preview Toggle (only on builder page) */}
        {currentPage === 'builder' && onPreviewToggle && (
          <div className="flex items-center gap-2">
            <Button
              variant={previewMode === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPreviewToggle('desktop')}
              className="gap-2"
            >
              <Monitor className="w-4 h-4" />
              Desktop
            </Button>
            <Button
              variant={previewMode === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPreviewToggle('mobile')}
              className="gap-2"
            >
              <Smartphone className="w-4 h-4" />
              Mobile
            </Button>
          </div>
        )}

        {/* Builder Actions */}
        {currentPage === 'builder' && (
          <div className="flex items-center gap-2">
            {onSave && (
              <Button onClick={onSave} variant="outline" size="sm" className="gap-2">
                <Save className="w-4 h-4" />
                Save
              </Button>
            )}
            {onPreview && (
              <Button onClick={onPreview} size="sm" className="gap-2">
                <Play className="w-4 h-4" />
                Preview
              </Button>
            )}
          </div>
        )}

        {/* User Profile */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <User className="w-4 h-4" />
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">Sarah Chen</div>
            <div className="text-xs text-muted-foreground">TechStart Solutions</div>
          </div>
        </div>
      </div>
    </header>
  );
}