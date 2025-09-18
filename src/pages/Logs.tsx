import { useState } from 'react';
import { Calendar, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LogEntry {
  id: string;
  timestamp: string;
  date: string;
  time: string;
  botId: string;
  userMessage: string;
  agentResponse: string;
  metadata: {
    sessionId: string;
    userAgent: string;
    responseTime: number;
  };
}

const mockLogs: LogEntry[] = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:00Z',
    date: '2024-01-15',
    time: '10:30 AM',
    botId: 'bot_001',
    userMessage: 'How can I reset my password?',
    agentResponse: 'I can help you reset your password. Please click on the "Forgot Password" link on the login page...',
    metadata: {
      sessionId: 'sess_12345',
      userAgent: 'Chrome/119.0',
      responseTime: 250
    }
  },
  {
    id: '2',
    timestamp: '2024-01-15T11:45:00Z',
    date: '2024-01-15',
    time: '11:45 AM',
    botId: 'bot_002',
    userMessage: 'What are your pricing plans?',
    agentResponse: 'We offer three main pricing tiers: Basic ($29/month), Professional ($99/month), and Enterprise (custom pricing)...',
    metadata: {
      sessionId: 'sess_12346',
      userAgent: 'Safari/17.0',
      responseTime: 180
    }
  },
  {
    id: '3',
    timestamp: '2024-01-15T14:20:00Z',
    date: '2024-01-15',
    time: '2:20 PM',
    botId: 'bot_001',
    userMessage: 'Is there a mobile app available?',
    agentResponse: 'Yes! We have mobile apps available for both iOS and Android. You can download them from the App Store or Google Play...',
    metadata: {
      sessionId: 'sess_12347',
      userAgent: 'Firefox/120.0',
      responseTime: 320
    }
  }
];

export default function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>(mockLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBot, setSelectedBot] = useState('all');

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.userMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.agentResponse.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBot = selectedBot === 'all' || log.botId === selectedBot;
    return matchesSearch && matchesBot;
  });

  const getResponseTimeColor = (time: number) => {
    if (time < 200) return 'bg-accent/10 text-accent';
    if (time < 500) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Conversation Logs</h1>
        <p className="text-muted-foreground mt-1">
          Monitor and analyze bot interactions and responses
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={selectedBot}
              onChange={(e) => setSelectedBot(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">All Bots</option>
              <option value="bot_001">Customer Support Bot</option>
              <option value="bot_002">Sales Assistant</option>
              <option value="bot_003">HR Chatbot</option>
            </select>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} conversation{filteredLogs.length !== 1 ? 's' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Bot ID</TableHead>
                <TableHead>User Message</TableHead>
                <TableHead>Agent Response</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Session</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{log.date}</div>
                      <div className="text-muted-foreground">{log.time}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{log.botId}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={log.userMessage}>
                      {log.userMessage}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="truncate" title={log.agentResponse}>
                      {log.agentResponse}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getResponseTimeColor(log.metadata.responseTime)}>
                      {log.metadata.responseTime}ms
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {log.metadata.sessionId}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}