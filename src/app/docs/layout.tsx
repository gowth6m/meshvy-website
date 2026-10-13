import DocsHeader from "@/components/docs/docs-header"
import DocsSidebar from "@/components/docs/docs-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DocsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // flex-1 because the root layout's body is a column: without it the
    // provider's min-h-svh fights the body's min-h-screen and the footer of a
    // short page floats.
    <SidebarProvider className="flex-1">
      <DocsSidebar />
      {/* SidebarInset is the <main>, so the skip link's target goes here
          rather than on another one nested inside it. */}
      <SidebarInset id="main-content">
        <DocsHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
