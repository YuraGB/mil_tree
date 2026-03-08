"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { SearchIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

/**
 * Renders a styled wrapper around the cmdk Command primitive that applies layout, sizing, and slot attributes for consistent theming.
 *
 * @returns A JSX element of the underlying Command primitive with `data-slot="command"` and a merged `className` containing default layout, background, and text styles.
 */
function Command({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * Composes a Dialog that contains a Command palette with an accessible header and configurable close behavior.
 *
 * Renders a visually hidden Dialog header with the provided title and description, places a Command inside DialogContent, and applies any additional Dialog props.
 *
 * @param title - Accessible title shown in the dialog header; defaults to "Command Palette"
 * @param description - Accessible description shown in the dialog header; defaults to "Search for a command to run..."
 * @param children - Command palette contents (inputs, lists, items, etc.)
 * @param className - Additional className applied to the DialogContent container
 * @param showCloseButton - Whether the DialogContent shows a close button; defaults to `true`
 * @returns A JSX element rendering the composed Dialog and Command palette
 */
function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn("overflow-hidden p-0", className)}
        showCloseButton={showCloseButton}
      >
        <Command className="**:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

/**
 * Renders the command palette's search input with a leading search icon.
 *
 * The component provides a styled wrapper and `data-slot` attributes for theming, merges a passed `className`
 * into the input's classes, and forwards all other props to the underlying cmdk input primitive.
 *
 * @returns The wrapped input element used as the command palette's search field
 */
function CommandInput({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div
      data-slot="command-input-wrapper"
      className="flex h-9 items-center gap-2 border-b px-3"
    >
      <SearchIcon className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(
          "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
}

/**
 * Renders the scrollable command list container used by the command palette.
 *
 * @param className - Additional CSS class names to append to the component's default sizing and scroll styles
 * @returns The CommandPrimitive.List element with a preset max height and overflow behavior
 */
function CommandList({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(
        "max-h-[300px] scroll-py-1 overflow-x-hidden overflow-y-auto",
        className
      )}
      {...props}
    />
  )
}

/**
 * Render the command palette's empty-state view with default spacing and centered small text.
 *
 * Renders a cmdk Empty element with `data-slot="command-empty"` and default `py-6 text-center text-sm` classes;
 * any additional props are forwarded to the underlying element.
 *
 * @returns A JSX element for the command palette empty state
 */
function CommandEmpty({
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    />
  )
}

/**
 * Renders a styled command group container used to group related command items.
 *
 * @param className - Additional CSS classes to merge with the component's default styling
 * @returns A React element representing a styled command group for the command palette
 */
function CommandGroup({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(
        "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a horizontal separator used between command items and groups.
 *
 * @returns The separator element rendered for dividing command items/groups.
 */
function CommandSeparator({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn("-mx-1 h-px bg-border", className)}
      {...props}
    />
  )
}

/**
 * Renders a styled command palette item to be used inside the Command components.
 *
 * The component forwards all props to the underlying `CommandPrimitive.Item`, adds a
 * `data-slot="command-item"` attribute for slot-based theming, and composes default
 * styling with any provided `className`.
 *
 * @param props - Props forwarded to the underlying `CommandPrimitive.Item`. Commonly passed props include `className` to extend or override styles.
 * @returns A JSX element representing the styled command item.
 */
function CommandItem({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * Renders a right-aligned shortcut label for a command item.
 *
 * @returns The rendered span element with data-slot `command-shortcut` and small, muted, tracking-widest styling; additional `className` and span props are applied.
 */
function CommandShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
