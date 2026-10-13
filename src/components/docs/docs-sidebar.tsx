"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowDownIcon, ArrowUpRightIcon } from "lucide-react"

import { Wordmark } from "@/components/brand/mark"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { docsNav } from "@/lib/docs"
import { site } from "@/lib/site"
import { externalLink } from "@/lib/utils"

export default function DocsSidebar() {
  const pathname = usePathname()
  const { isMobile, setOpenMobile } = useSidebar()

  // On a phone the sidebar is a sheet over the page: following a link in it
  // has to close it, or the page you asked for is behind the thing you asked
  // from. On desktop it is the furniture, and stays.
  function close() {
    if (isMobile) setOpenMobile(false)
  }

  return (
    <Sidebar>
      <SidebarHeader className="h-16 justify-center border-b border-sidebar-border px-4">
        <Link
          href="/"
          onClick={close}
          aria-label={`${site.name} home`}
          className="inline-flex w-fit rounded-md focus-visible:ring-2 focus-visible:ring-mint focus-visible:outline-none"
        >
          <Wordmark />
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {docsNav.map((group) => (
          <SidebarGroup key={group.title}>
            {/* The same mono label the app puts over a list in its sidebar. */}
            <SidebarGroupLabel className="font-mono text-[0.6875rem] tracking-[0.16em] text-slate uppercase">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.entries.map((entry) => (
                  <SidebarMenuItem key={entry.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === entry.href}
                      className="data-[active=true]:text-mint"
                    >
                      <Link href={entry.href} onClick={close}>
                        {entry.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarSeparator className="mx-2 my-2" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                { label: "Changelog", href: site.changelog },
                { label: "Source", href: site.repo },
                { label: "Releases", href: site.releases },
              ].map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton asChild className="text-slate">
                    <a href={link.href} {...externalLink(link.label)}>
                      {link.label}
                      <ArrowUpRightIcon className="ms-auto size-3.5 opacity-60" />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <Button asChild size="sm">
          <a href={site.download}>
            Download
            <ArrowDownIcon data-icon="inline-end" />
          </a>
        </Button>
        <p className="text-center font-mono text-[0.6875rem] text-slate">
          {site.platform}
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
