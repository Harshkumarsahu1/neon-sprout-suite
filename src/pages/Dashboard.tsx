import { Outlet, Link } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';

export default function Dashboard() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <header className="h-16 flex items-center border-b border-slate-200 bg-white px-6">
            <SidebarTrigger />
            <Link to="/" className="ml-4 flex items-center gap-2">
              <img src="/logo.svg" alt="Attack Capital" className="h-7 w-7" />
              <span className="text-xl font-semibold text-slate-900">Attack Capital</span>
            </Link>
          </header>
          <div className="flex-1 p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}