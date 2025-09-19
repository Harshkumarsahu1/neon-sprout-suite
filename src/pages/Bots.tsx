import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { createBot, deleteBot, listBots, updateBot, type Bot } from '@/lib/api';
import { toast } from 'sonner';

export default function Bots() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newBot, setNewBot] = useState({ name: '', domain: '', domainType: 'legal', prompt: '', botUid: '', status: 'active' as 'active' | 'inactive', phone: '' });
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editing, setEditing] = useState<Bot | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await listBots();
        setBots(data);
      } catch {}
    })();
  }, []);

  const handleCreateBot = () => {
    if (!newBot.name || !newBot.domainType) return;
    (async () => {
      try {
        setIsCreating(true);
        const created = await createBot({
          name: newBot.name,
          domain: newBot.domain || undefined,
          domainType: newBot.domainType as any,
          prompt: newBot.prompt || undefined,
          botUid: newBot.botUid || undefined,
          status: newBot.status,
          phone: newBot.phone || undefined,
        });
        setBots((prev) => [created, ...prev]);
        setNewBot({ name: '', domain: '', domainType: 'legal', prompt: '', botUid: '', status: 'active', phone: '' });
        setIsCreateOpen(false);
        toast.success('Bot created successfully' + (newBot.phone && newBot.botUid ? ' and call initiated.' : '.'));
      } catch (e: any) {
        const msg = e?.message || 'Failed to create bot';
        toast.error(msg);
      }
      finally { setIsCreating(false); }
    })();
  };

  const handleDeleteBot = (id: string) => {
    (async () => {
      try {
        await deleteBot(id);
        setBots((prev) => prev.filter((b) => b._id !== id));
      } catch {}
    })();
  };

  const openEdit = (bot: Bot) => {
    setEditing(bot);
    setIsEditOpen(true);
  };

  const handleUpdateBot = () => {
    if (!editing) return;
    (async () => {
      try {
        const updated = await updateBot(editing._id, {
          name: editing.name,
          domain: editing.domain,
          prompt: editing.prompt,
          domainType: editing.domainType,
          botUid: editing.botUid,
          status: editing.status,
        } as any);
        setBots((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
        setIsEditOpen(false);
        setEditing(null);
      } catch {}
    })();
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
                <Label htmlFor="bot-phone">Phone Number</Label>
                <Input
                  id="bot-phone"
                  value={newBot.phone}
                  onChange={(e) => setNewBot({ ...newBot, phone: e.target.value })}
                  placeholder="e.g., +15551234567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bot-uid">OpenMic Bot UID</Label>
                <Input
                  id="bot-uid"
                  value={newBot.botUid}
                  onChange={(e) => setNewBot({ ...newBot, botUid: e.target.value })}
                  placeholder="Paste your OpenMic bot UID (optional)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bot-domain">Domain (optional)</Label>
                <Input
                  id="bot-domain"
                  value={newBot.domain}
                  onChange={(e) => setNewBot({ ...newBot, domain: e.target.value })}
                  placeholder="support.example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bot-domainType">Domain Type</Label>
                <select
                  id="bot-domainType"
                  value={newBot.domainType}
                  onChange={(e) => setNewBot({ ...newBot, domainType: e.target.value })}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground w-full"
                >
                  <option value="medical">Medical</option>
                  <option value="legal">Legal</option>
                  <option value="receptionist">Receptionist</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bot-status">Status</Label>
                <select
                  id="bot-status"
                  value={newBot.status}
                  onChange={(e) => setNewBot({ ...newBot, status: e.target.value as 'active' | 'inactive' })}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground w-full"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bot-prompt">Agent Prompt (optional)</Label>
                <Textarea
                  id="bot-prompt"
                  value={newBot.prompt}
                  onChange={(e) => setNewBot({ ...newBot, prompt: e.target.value })}
                  placeholder="Define your domain-specific intake prompt..."
                  rows={5}
                />
              </div>
              <Button 
                onClick={handleCreateBot}
                disabled={isCreating}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground disabled:opacity-60"
              >
                {isCreating ? 'Creating...' : 'Create Bot'}
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
                <TableHead>Domain Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bots.map((bot) => (
                <TableRow key={bot._id}>
                  <TableCell className="font-mono text-sm">{bot.botUid || '-'}</TableCell>
                  <TableCell className="font-medium">{bot.name}</TableCell>
                  <TableCell>{bot.domain || '-'}</TableCell>
                  <TableCell className="capitalize">{bot.domainType}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      bot.status === 'active' 
                        ? 'bg-accent/10 text-accent' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {bot.status}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(bot.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(bot)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteBot(bot._id)}
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

      {/* Edit dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Bot</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input id="edit-name" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number</Label>
                <Input id="edit-phone" value={editing.phone || ''} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-uid">OpenMic Bot UID</Label>
                <Input id="edit-uid" value={editing.botUid || ''} onChange={(e) => setEditing({ ...editing, botUid: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-domain">Domain</Label>
                <Input id="edit-domain" value={editing.domain || ''} onChange={(e) => setEditing({ ...editing, domain: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-domainType">Domain Type</Label>
                <select
                  id="edit-domainType"
                  value={editing.domainType}
                  onChange={(e) => setEditing({ ...editing, domainType: e.target.value as any })}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground w-full"
                >
                  <option value="medical">Medical</option>
                  <option value="legal">Legal</option>
                  <option value="receptionist">Receptionist</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  value={editing.status}
                  onChange={(e) => setEditing({ ...editing, status: e.target.value as any })}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground w-full"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-prompt">Agent Prompt</Label>
                <Textarea id="edit-prompt" rows={5} value={editing.prompt || ''} onChange={(e) => setEditing({ ...editing, prompt: e.target.value })} />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                <Button onClick={handleUpdateBot}>Save</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}