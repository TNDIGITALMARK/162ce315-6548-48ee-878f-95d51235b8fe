"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Header } from '@/components/layout/Header';
import {
  Download,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Trash2,
  Calendar,
  Users,
  Star,
  TrendingUp,
  Mail,
  Webhook,
  Settings as SettingsIcon,
  FileText,
  Database
} from 'lucide-react';
import { ExportService } from '@/lib/export';

interface Submission {
  id: string;
  submittedAt: string;
  customerName: string;
  email: string;
  serviceRating: number;
  overallExperience: string;
  improvements?: string;
  contactMethod: string;
  status: 'new' | 'reviewed' | 'responded';
}

const mockSubmissions: Submission[] = [
  {
    id: 'sub_001',
    submittedAt: '2025-09-25 10:30:00',
    customerName: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    serviceRating: 5,
    overallExperience: 'Excellent',
    contactMethod: 'Email',
    status: 'new'
  },
  {
    id: 'sub_002',
    submittedAt: '2025-09-25 09:15:00',
    customerName: 'Bob Smith',
    email: 'bob.smith@email.com',
    serviceRating: 4,
    overallExperience: 'Good',
    contactMethod: 'Phone',
    status: 'reviewed'
  },
  {
    id: 'sub_003',
    submittedAt: '2025-09-24 16:45:00',
    customerName: 'Carol Davis',
    email: 'carol.davis@email.com',
    serviceRating: 2,
    overallExperience: 'Poor',
    improvements: 'Faster response times needed',
    contactMethod: 'Email',
    status: 'responded'
  },
  {
    id: 'sub_004',
    submittedAt: '2025-09-24 14:20:00',
    customerName: 'David Wilson',
    email: 'david.wilson@email.com',
    serviceRating: 5,
    overallExperience: 'Excellent',
    contactMethod: 'No contact',
    status: 'reviewed'
  },
  {
    id: 'sub_005',
    submittedAt: '2025-09-24 11:10:00',
    customerName: 'Eva Brown',
    email: 'eva.brown@email.com',
    serviceRating: 3,
    overallExperience: 'Average',
    improvements: 'Better product documentation',
    contactMethod: 'Email',
    status: 'new'
  }
];

export default function SettingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredSubmissions = mockSubmissions.filter(submission => {
    const matchesSearch =
      submission.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.overallExperience.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || submission.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: Submission['status']) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>;
      case 'reviewed':
        return <Badge className="bg-yellow-100 text-yellow-800">Reviewed</Badge>;
      case 'responded':
        return <Badge className="bg-green-100 text-green-800">Responded</Badge>;
    }
  };

  const getRatingDisplay = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <span className="font-medium">{rating}</span>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  const handleExport = async (format: 'csv' | 'excel' | 'json' | 'pdf') => {
    try {
      await ExportService.exportFormSubmissions(
        filteredSubmissions,
        format,
        `customer-feedback-survey-${new Date().toISOString().split('T')[0]}`
      );
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const avgRating = mockSubmissions.reduce((sum, sub) => sum + sub.serviceRating, 0) / mockSubmissions.length;
  const newSubmissions = mockSubmissions.filter(sub => sub.status === 'new').length;
  const responseRate = ((mockSubmissions.filter(sub => sub.status === 'responded').length / mockSubmissions.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="settings" formName="Customer Feedback Survey" />

      <main className="container mx-auto py-6 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Form Settings & Submissions</h1>
          <p className="text-muted-foreground">
            Manage form settings, view submissions, and export data
          </p>
        </div>

        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="submissions" className="gap-2">
              <FileText className="w-4 h-4" />
              Submissions
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2">
              <Webhook className="w-4 h-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <SettingsIcon className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockSubmissions.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +12 this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Submissions</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{newSubmissions}</div>
                  <p className="text-xs text-muted-foreground">
                    Require review
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgRating.toFixed(1)}</div>
                  <p className="text-xs text-muted-foreground">
                    Out of 5 stars
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{responseRate.toFixed(0)}%</div>
                  <p className="text-xs text-muted-foreground">
                    Responded to customers
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Search and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search submissions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-80"
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      Status: {selectedStatus === 'all' ? 'All' : selectedStatus}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setSelectedStatus('all')}>
                      All Status
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedStatus('new')}>
                      New
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedStatus('reviewed')}>
                      Reviewed
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedStatus('responded')}>
                      Responded
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Data
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Export Format</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleExport('csv')}>
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('excel')}>
                    Export as Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('pdf')}>
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport('json')}>
                    Export as JSON
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Submissions Table */}
            <Card>
              <CardHeader>
                <CardTitle>Submissions ({filteredSubmissions.length})</CardTitle>
                <CardDescription>
                  View and manage form submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Contact Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{submission.customerName}</div>
                              <div className="text-sm text-muted-foreground">{submission.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getRatingDisplay(submission.serviceRating)}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{submission.overallExperience}</div>
                              {submission.improvements && (
                                <div className="text-sm text-muted-foreground truncate max-w-48">
                                  {submission.improvements}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{submission.contactMethod}</TableCell>
                          <TableCell>
                            {getStatusBadge(submission.status)}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {new Date(submission.submittedAt).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(submission.submittedAt).toLocaleTimeString()}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Send Response
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submission Trends</CardTitle>
                  <CardDescription>
                    Form submissions over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Chart visualization would go here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rating Distribution</CardTitle>
                  <CardDescription>
                    Customer satisfaction breakdown
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[5, 4, 3, 2, 1].map(rating => {
                      const count = mockSubmissions.filter(s => s.serviceRating === rating).length;
                      const percentage = (count / mockSubmissions.length) * 100;
                      return (
                        <div key={rating} className="flex items-center gap-3">
                          <div className="flex items-center gap-1 w-12">
                            <span className="text-sm font-medium">{rating}</span>
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          </div>
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div
                              className="bg-primary rounded-full h-2 transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <div className="text-sm text-muted-foreground w-12">
                            {count} ({percentage.toFixed(0)}%)
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>
                    Get notified when new submissions arrive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notification Email</label>
                    <Input placeholder="notifications@company.com" />
                  </div>
                  <Button>Save Email Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Webhooks</CardTitle>
                  <CardDescription>
                    Send submission data to external services
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Webhook URL</label>
                    <Input placeholder="https://api.yourservice.com/webhook" />
                  </div>
                  <Button>Add Webhook</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Form Settings</CardTitle>
                <CardDescription>
                  Configure form behavior and data retention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data Retention Period</label>
                  <select className="w-full p-2 border rounded-lg">
                    <option>Keep data forever</option>
                    <option>Delete after 1 year</option>
                    <option>Delete after 2 years</option>
                    <option>Delete after 5 years</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Auto-response Email</label>
                  <textarea
                    className="w-full p-3 border rounded-lg"
                    rows={4}
                    placeholder="Thank you for your feedback! We'll review your submission and get back to you soon."
                  />
                </div>

                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}