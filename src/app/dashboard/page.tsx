"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Header } from '@/components/layout/Header';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  FileText,
  Users,
  TrendingUp,
  Calendar,
  Star,
  Copy,
  Edit,
  Trash2
} from 'lucide-react';

interface FormData {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'active' | 'draft' | 'archived';
  submissions: number;
  lastUpdated: string;
  createdAt: string;
  responseRate?: number;
}

const mockForms: FormData[] = [
  {
    id: 'form_001',
    name: 'Customer Feedback Survey',
    description: 'Collect customer satisfaction and improvement suggestions',
    category: 'Customer Feedback',
    status: 'active',
    submissions: 1247,
    lastUpdated: '2025-09-20',
    createdAt: '2025-08-15',
    responseRate: 87
  },
  {
    id: 'form_002',
    name: 'Product Registration',
    description: 'New customer product registration form',
    category: 'Registration',
    status: 'active',
    submissions: 892,
    lastUpdated: '2025-09-19',
    createdAt: '2025-07-22',
    responseRate: 94
  },
  {
    id: 'form_003',
    name: 'Event Registration 2025',
    description: 'Annual company event registration',
    category: 'Registration',
    status: 'draft',
    submissions: 0,
    lastUpdated: '2025-09-18',
    createdAt: '2025-09-10'
  },
  {
    id: 'form_004',
    name: 'Employee Satisfaction',
    description: 'Internal employee satisfaction survey',
    category: 'Survey',
    status: 'archived',
    submissions: 156,
    lastUpdated: '2025-08-30',
    createdAt: '2025-06-01',
    responseRate: 76
  },
  {
    id: 'form_005',
    name: 'Contact Us',
    description: 'General inquiries and support requests',
    category: 'Contact Form',
    status: 'active',
    submissions: 2103,
    lastUpdated: '2025-09-21',
    createdAt: '2025-05-10',
    responseRate: 91
  }
];

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredForms = mockForms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         form.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || form.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalSubmissions = mockForms.reduce((sum, form) => sum + form.submissions, 0);
  const activeForms = mockForms.filter(form => form.status === 'active').length;
  const avgResponseRate = mockForms
    .filter(form => form.responseRate)
    .reduce((sum, form) => sum + (form.responseRate || 0), 0) /
    mockForms.filter(form => form.responseRate).length;

  const getStatusBadge = (status: FormData['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      case 'archived':
        return <Badge variant="outline">Archived</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage="dashboard" />

      <main className="container mx-auto py-6 px-4">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage your forms and track submissions
            </p>
          </div>
          <Link href="/builder">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create New Form
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockForms.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeForms} active forms
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSubmissions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Response Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgResponseRate.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">847</div>
              <p className="text-xs text-muted-foreground">
                New submissions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search forms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Category: {selectedCategory === 'all' ? 'All' : selectedCategory}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedCategory('all')}>
                All Categories
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCategory('Customer Feedback')}>
                Customer Feedback
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCategory('Registration')}>
                Registration
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCategory('Survey')}>
                Survey
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedCategory('Contact Form')}>
                Contact Form
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredForms.map((form) => (
            <Card key={form.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{form.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {form.description}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href="/builder" className="flex items-center gap-2">
                          <Edit className="h-4 w-4" />
                          Edit Form
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          View Submissions
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {getStatusBadge(form.status)}
                    <Badge variant="outline" className="text-xs">
                      {form.category}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Submissions</span>
                      <div className="font-semibold">{form.submissions.toLocaleString()}</div>
                    </div>
                    {form.responseRate && (
                      <div>
                        <span className="text-muted-foreground">Response Rate</span>
                        <div className="font-semibold flex items-center gap-1">
                          {form.responseRate}%
                          {form.responseRate >= 80 && <Star className="h-3 w-3 text-yellow-500" />}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Updated {form.lastUpdated} • Created {form.createdAt}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredForms.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No forms found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? 'Try adjusting your search or filters' : 'Create your first form to get started'}
            </p>
            <Link href="/builder">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create New Form
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}