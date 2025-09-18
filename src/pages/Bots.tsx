import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Bot {
  id: string;
  uid: string;
  name: string;
  domain: string;
  status: 'active' | 'inactive';
  created: string;
}

const mockBots: Bot[] = [
  {
    id: '1',
    uid: 'bot_001',
    name: 'Customer Support Bot',
    domain: 'support.growtech.com',
    status: 'active',
    created: '2024-01-15'
  },
  {
    id: '2',
    uid: 'bot_002',
    name: 'Sales Assistant',
    domain: 'sales.growtech.com',
    status: 'active',
    created: '2024-01-20'
  },
  {
    id: '3',
    uid: 'bot_003',
    name: 'HR Chatbot',
    domain: 'hr.growtech.com',
    status: 'inactive',
    created: '2024-02-01'
  }
];

export default function Bots() {
  const [bots, setBots] = useState<Bot[]>(mockBots);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newBot, setNewBot] = useState({ name: '', domain: '' });

  const handleCreateBot = () => {
    if (newBot.name && newBot.domain) {
      const bot: Bot = {
        id: Date.now().toString(),
        uid: `bot_${Date.now()}`,
        name: newBot.name,
        domain: newBot.domain,
        status: 'active',
        created: new Date().toISOString().split('T')[0]
      };
      setBots([...bots, bot]);
      setNewBot({ name: '', domain: '' });
      setIsCreateOpen(false);
    }
  };

  const handleDeleteBot = (id: string) => {
    setBots(bots.filter(bot => bot.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary">Bot Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your AI bots and configure their settings
          </p>
        </div>
        
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Create Bot
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Bot</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bot-name">Bot Name</Label>
                <Input
                  id="bot-name"
                  value={newBot.name}
                  onChange={(e) => setNewBot({ ...newBot, name: e.target.value })}
                  placeholder="Enter bot name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bot-domain">Domain</Label>
                <Input
                  id="bot-domain"
                  value={newBot.domain}
                  onChange={(e) => setNewBot({ ...newBot, domain: e.target.value })}
                  placeholder="Enter domain (e.g., support.example.com)"
                />
              </div>
              <Button 
                onClick={handleCreateBot} 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Create Bot
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Bots</CardTitle>
          <CardDescription>
            Overview of all your deployed AI bots
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bot UID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bots.map((bot) => (
                <TableRow key={bot.id}>
                  <TableCell className="font-mono text-sm">{bot.uid}</TableCell>
                  <TableCell className="font-medium">{bot.name}</TableCell>
                  <TableCell>{bot.domain}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      bot.status === 'active' 
                        ? 'bg-accent/10 text-accent' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {bot.status}
                    </span>
                  </TableCell>
                  <TableCell>{bot.created}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteBot(bot.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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