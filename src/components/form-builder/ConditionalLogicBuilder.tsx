"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Plus,
  Trash2,
  Edit,
  ArrowRight,
  Workflow,
  Eye,
  EyeOff,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConditionalRule {
  id: string;
  name: string;
  enabled: boolean;
  trigger: {
    fieldId: string;
    fieldName: string;
    operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains';
    value: string | number;
  };
  action: {
    type: 'show' | 'hide' | 'require' | 'skip';
    targetFieldIds: string[];
    targetFieldNames: string[];
  };
}

interface ConditionalLogicBuilderProps {
  rules: ConditionalRule[];
  onRulesChange: (rules: ConditionalRule[]) => void;
  availableFields: { id: string; name: string; type: string }[];
  className?: string;
}

export function ConditionalLogicBuilder({
  rules,
  onRulesChange,
  availableFields,
  className
}: ConditionalLogicBuilderProps) {
  const [editingRule, setEditingRule] = useState<ConditionalRule | null>(null);
  const [showRuleDialog, setShowRuleDialog] = useState(false);

  const createNewRule = (): ConditionalRule => ({
    id: `rule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: 'New Rule',
    enabled: true,
    trigger: {
      fieldId: '',
      fieldName: '',
      operator: 'equals',
      value: ''
    },
    action: {
      type: 'show',
      targetFieldIds: [],
      targetFieldNames: []
    }
  });

  const handleAddRule = () => {
    const newRule = createNewRule();
    setEditingRule(newRule);
    setShowRuleDialog(true);
  };

  const handleEditRule = (rule: ConditionalRule) => {
    setEditingRule({ ...rule });
    setShowRuleDialog(true);
  };

  const handleSaveRule = () => {
    if (!editingRule) return;

    const existingIndex = rules.findIndex(r => r.id === editingRule.id);
    if (existingIndex >= 0) {
      const updatedRules = [...rules];
      updatedRules[existingIndex] = editingRule;
      onRulesChange(updatedRules);
    } else {
      onRulesChange([...rules, editingRule]);
    }

    setEditingRule(null);
    setShowRuleDialog(false);
  };

  const handleDeleteRule = (ruleId: string) => {
    onRulesChange(rules.filter(r => r.id !== ruleId));
  };

  const handleToggleRule = (ruleId: string) => {
    onRulesChange(
      rules.map(r =>
        r.id === ruleId ? { ...r, enabled: !r.enabled } : r
      )
    );
  };

  const getOperatorLabel = (operator: ConditionalRule['trigger']['operator']) => {
    switch (operator) {
      case 'equals': return 'equals';
      case 'not_equals': return 'does not equal';
      case 'greater_than': return 'is greater than';
      case 'less_than': return 'is less than';
      case 'contains': return 'contains';
      default: return operator;
    }
  };

  const getActionLabel = (action: ConditionalRule['action']) => {
    const typeLabel = action.type === 'show' ? 'Show' :
                     action.type === 'hide' ? 'Hide' :
                     action.type === 'require' ? 'Make required' : 'Skip';
    return `${typeLabel} ${action.targetFieldNames.join(', ')}`;
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Conditional Logic Rules</h3>
          <p className="text-sm text-muted-foreground">
            Create rules to show or hide fields based on user responses
          </p>
        </div>
        <Button onClick={handleAddRule} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Rule
        </Button>
      </div>

      {rules.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Workflow className="w-12 h-12 text-muted-foreground mb-4" />
            <h4 className="text-lg font-semibold mb-2">No rules defined</h4>
            <p className="text-muted-foreground text-center mb-4">
              Create conditional logic rules to make your form more interactive and relevant to users.
            </p>
            <Button onClick={handleAddRule} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Your First Rule
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {rules.map((rule, index) => (
            <Card key={rule.id} className={cn(
              "transition-all duration-200",
              !rule.enabled && "opacity-60"
            )}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-base">{rule.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {rule.trigger.fieldName && rule.action.targetFieldNames.length > 0 ? (
                          <span>
                            When <strong>{rule.trigger.fieldName}</strong> {getOperatorLabel(rule.trigger.operator)} <strong>{rule.trigger.value}</strong>
                          </span>
                        ) : (
                          'Rule configuration incomplete'
                        )}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={() => handleToggleRule(rule.id)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditRule(rule)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRule(rule.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {rule.trigger.fieldName && rule.action.targetFieldNames.length > 0 && (
                <CardContent>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">IF</Badge>
                      <span>
                        {rule.trigger.fieldName} {getOperatorLabel(rule.trigger.operator)} {rule.trigger.value}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">THEN</Badge>
                      <span>{getActionLabel(rule.action)}</span>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Rule Editor Dialog */}
      <Dialog open={showRuleDialog} onOpenChange={setShowRuleDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>
              {editingRule?.id.startsWith('rule_') && rules.find(r => r.id === editingRule.id) ? 'Edit Rule' : 'Create New Rule'}
            </DialogTitle>
            <DialogDescription>
              Define the conditions and actions for this rule
            </DialogDescription>
          </DialogHeader>

          {editingRule && (
            <ScrollArea className="max-h-[60vh] pr-4">
              <div className="space-y-6">
                {/* Rule Name */}
                <div className="space-y-2">
                  <Label htmlFor="rule-name">Rule Name</Label>
                  <Input
                    id="rule-name"
                    value={editingRule.name}
                    onChange={(e) => setEditingRule({
                      ...editingRule,
                      name: e.target.value
                    })}
                    placeholder="e.g., Show improvement field for low ratings"
                  />
                </div>

                {/* Trigger Condition */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">When (Trigger Condition)</CardTitle>
                    <CardDescription>
                      Specify when this rule should be triggered
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Field</Label>
                        <Select
                          value={editingRule.trigger.fieldId}
                          onValueChange={(value) => {
                            const field = availableFields.find(f => f.id === value);
                            setEditingRule({
                              ...editingRule,
                              trigger: {
                                ...editingRule.trigger,
                                fieldId: value,
                                fieldName: field?.name || ''
                              }
                            });
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select field" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableFields.map(field => (
                              <SelectItem key={field.id} value={field.id}>
                                {field.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Operator</Label>
                        <Select
                          value={editingRule.trigger.operator}
                          onValueChange={(value: any) => setEditingRule({
                            ...editingRule,
                            trigger: {
                              ...editingRule.trigger,
                              operator: value
                            }
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equals">equals</SelectItem>
                            <SelectItem value="not_equals">does not equal</SelectItem>
                            <SelectItem value="greater_than">is greater than</SelectItem>
                            <SelectItem value="less_than">is less than</SelectItem>
                            <SelectItem value="contains">contains</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Value</Label>
                        <Input
                          value={editingRule.trigger.value}
                          onChange={(e) => setEditingRule({
                            ...editingRule,
                            trigger: {
                              ...editingRule.trigger,
                              value: e.target.value
                            }
                          })}
                          placeholder="Enter value"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Then (Action)</CardTitle>
                    <CardDescription>
                      Specify what should happen when the condition is met
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Action Type</Label>
                        <Select
                          value={editingRule.action.type}
                          onValueChange={(value: any) => setEditingRule({
                            ...editingRule,
                            action: {
                              ...editingRule.action,
                              type: value
                            }
                          })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="show">Show field(s)</SelectItem>
                            <SelectItem value="hide">Hide field(s)</SelectItem>
                            <SelectItem value="require">Make field(s) required</SelectItem>
                            <SelectItem value="skip">Skip field(s)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Target Fields</Label>
                        <Select
                          onValueChange={(value) => {
                            const field = availableFields.find(f => f.id === value);
                            if (field && !editingRule.action.targetFieldIds.includes(value)) {
                              setEditingRule({
                                ...editingRule,
                                action: {
                                  ...editingRule.action,
                                  targetFieldIds: [...editingRule.action.targetFieldIds, value],
                                  targetFieldNames: [...editingRule.action.targetFieldNames, field.name]
                                }
                              });
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select fields to affect" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableFields
                              .filter(field => !editingRule.action.targetFieldIds.includes(field.id))
                              .map(field => (
                                <SelectItem key={field.id} value={field.id}>
                                  {field.name}
                                </SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {editingRule.action.targetFieldNames.length > 0 && (
                      <div className="space-y-2">
                        <Label>Selected Fields</Label>
                        <div className="flex flex-wrap gap-2">
                          {editingRule.action.targetFieldNames.map((name, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="gap-2 pr-1"
                            >
                              {name}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0"
                                onClick={() => {
                                  setEditingRule({
                                    ...editingRule,
                                    action: {
                                      ...editingRule.action,
                                      targetFieldIds: editingRule.action.targetFieldIds.filter((_, i) => i !== index),
                                      targetFieldNames: editingRule.action.targetFieldNames.filter((_, i) => i !== index)
                                    }
                                  });
                                }}
                              >
                                ×
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Save Actions */}
                <div className="flex items-center justify-end gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingRule(null);
                      setShowRuleDialog(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveRule}
                    disabled={!editingRule.trigger.fieldId || !editingRule.trigger.value || editingRule.action.targetFieldIds.length === 0}
                  >
                    Save Rule
                  </Button>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export type { ConditionalRule };