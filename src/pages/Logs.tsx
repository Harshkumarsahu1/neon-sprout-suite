import { useEffect, useMemo, useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { listLogs, type CallLog } from '@/lib/api';

export default function Logs() {
  const [logs, setLogs] = useState<CallLog[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBot, setSelectedBot] = useState('all');

  useEffect(() => {
    (async () => {
      try {
        const data = await listLogs();
        setLogs(data);
      } catch (e) {
        // noop UI fail silently or add toast later
      }
    })();
  }, []);

  const getFirstUserMessage = (l: CallLog) => l.transcript.find(m => m.role === 'user')?.text || '';
  const getFirstAgentMessage = (l: CallLog) => l.transcript.find(m => m.role === 'agent')?.text || '';

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const userMsg = getFirstUserMessage(log).toLowerCase();
      const agentMsg = getFirstAgentMessage(log).toLowerCase();
      const matchesSearch = userMsg.includes(searchTerm.toLowerCase()) || agentMsg.includes(searchTerm.toLowerCase());
      const matchesBot = selectedBot === 'all' || log.botUid === selectedBot;
      return matchesSearch && matchesBot;
    });
  }, [logs, searchTerm, selectedBot]);

  // Response time not tracked yet; showing placeholder in table below

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
                <TableHead>Summary</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Session</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log._id}>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{new Date(log.createdAt).toLocaleDateString()}</div>
                      <div className="text-muted-foreground">{new Date(log.createdAt).toLocaleTimeString()}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{log.botUid || '-'}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={getFirstUserMessage(log)}>
                      {getFirstUserMessage(log) || '-'}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="truncate" title={getFirstAgentMessage(log)}>
                      {getFirstAgentMessage(log) || '-'}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="truncate" title={log.summary || ''}>
                      {log.summary || '-'}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="truncate" title={(log.questions || []).join(', ')}>
                      {(log.questions || []).length ? (log.questions || []).join(', ') : '-'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-muted text-muted-foreground">
                      -
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {log.sessionId || '-'}
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