"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Settings,
  Palette,
  Layout,
  Zap,
  Eye,
  Smartphone,
  Monitor,
  Plus,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsPanelProps {
  className?: string;
}

export function SettingsPanel({ className }: SettingsPanelProps) {
  return (
    <div className={cn("h-full bg-card text-card-foreground", className)}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-primary-foreground" />
          </div>
          <h2 className="text-lg font-semibold">Customization Options</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Configure your form settings and appearance
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-6">
          <Tabs defaultValue="general" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general" className="gap-2">
                <Settings className="w-4 h-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="design" className="gap-2">
                <Palette className="w-4 h-4" />
                Design
              </TabsTrigger>
              <TabsTrigger value="logic" className="gap-2">
                <Zap className="w-4 h-4" />
                Logic
              </TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Form Information</CardTitle>
                  <CardDescription>
                    Basic form settings and metadata
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="form-title">Form Title</Label>
                    <Input
                      id="form-title"
                      placeholder="Customer Feedback Survey"
                      defaultValue="Customer Feedback Survey"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="form-description">Description</Label>
                    <Textarea
                      id="form-description"
                      placeholder="Brief description of your form..."
                      defaultValue="Help us improve our services by sharing your feedback"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="form-category">Category</Label>
                    <Select defaultValue="feedback">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feedback">Customer Feedback</SelectItem>
                        <SelectItem value="survey">Survey</SelectItem>
                        <SelectItem value="registration">Registration</SelectItem>
                        <SelectItem value="contact">Contact Form</SelectItem>
                        <SelectItem value="application">Application</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Form Behavior</CardTitle>
                  <CardDescription>
                    Control how your form behaves
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Multiple Submissions</Label>
                      <p className="text-sm text-muted-foreground">
                        Users can submit the form multiple times
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Require Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Users must sign in to submit
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Save Progress</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow users to save and continue later
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Design Settings */}
            <TabsContent value="design" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Theme</CardTitle>
                  <CardDescription>
                    Customize the visual appearance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme Style</Label>
                    <Select defaultValue="modern">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="playful">Playful</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label>Primary Color</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary rounded border-2 border-border"></div>
                      <Input value="#2563eb" className="flex-1" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Accent Color</Label>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-accent rounded border-2 border-border"></div>
                      <Input value="#059669" className="flex-1" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Background</Label>
                    <Select defaultValue="light">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="gradient">Gradient</SelectItem>
                        <SelectItem value="image">Custom Image</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Typography</CardTitle>
                  <CardDescription>
                    Font and text styling options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Font Family</Label>
                    <Select defaultValue="inter">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="poppins">Poppins</SelectItem>
                        <SelectItem value="open-sans">Open Sans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Font Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Layout</CardTitle>
                  <CardDescription>
                    Form layout and spacing options
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Form Width</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="narrow">Narrow (480px)</SelectItem>
                        <SelectItem value="medium">Medium (640px)</SelectItem>
                        <SelectItem value="wide">Wide (800px)</SelectItem>
                        <SelectItem value="full">Full Width</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Field Spacing</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tight">Tight</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="spacious">Spacious</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Logic Settings */}
            <TabsContent value="logic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Conditional Logic Rules</CardTitle>
                  <CardDescription>
                    Show or hide fields based on user responses
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Rule 1: Service Rating</h4>
                        <p className="text-xs text-muted-foreground">
                          Show improvement suggestions if rating ≤ 3
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <strong>If:</strong> Service Rating is less than or equal to 3<br />
                      <strong>Then:</strong> Show "What could we improve?" field
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Rule 2: Contact Preference</h4>
                        <p className="text-xs text-muted-foreground">
                          Show email field if contact preference is email
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <strong>If:</strong> Preferred Contact Method is "Email"<br />
                      <strong>Then:</strong> Show "Email Address" field
                    </div>
                  </div>

                  <Button variant="outline" className="w-full gap-2">
                    <Plus className="w-4 h-4" />
                    Add New Rule
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Form Validation</CardTitle>
                  <CardDescription>
                    Set up validation rules for form fields
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Validation</Label>
                      <p className="text-sm text-muted-foreground">
                        Validate email format automatically
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Phone Validation</Label>
                      <p className="text-sm text-muted-foreground">
                        Validate phone number format
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Required Field Indicators</Label>
                      <p className="text-sm text-muted-foreground">
                        Show asterisks for required fields
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}