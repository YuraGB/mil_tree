"use client"

import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react"
import { Badge } from "@/components/ui/badge"

type MultiSelectContextType = {
  open: boolean
  setOpen: (open: boolean) => void
  selectedValues: Set<string>
  toggleValue: (value: string) => void
  items: Map<string, ReactNode>
  single: boolean
  onItemAdded: (value: string, label: ReactNode) => void
}
const MultiSelectContext = createContext<MultiSelectContextType | null>(null)

/**
 * Provides a contextual multi-select UI that supports controlled or uncontrolled selection and an optional single-select mode.
 *
 * @param children - Elements that compose the multi-select (trigger, value display, content, items, etc.).
 * @param values - Controlled selection values; when provided, the component reflects these values and does not manage selection state internally.
 * @param defaultValues - Initial selection values used when the component is uncontrolled.
 * @param onValuesChange - Called with the updated array of selected values whenever the selection changes.
 * @param single - If true, selecting a value replaces the previous selection and closes the popover.
 * @returns The MultiSelect element rendering a Popover whose descendants consume the multi-select context.
 */
export function MultiSelect({
  children,
  values,
  defaultValues,
  onValuesChange,
  single = false,
}: {
  children: ReactNode
  values?: string[]
  defaultValues?: string[]
  onValuesChange?: (values: string[]) => void
  single?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [internalValues, setInternalValues] = useState(
    new Set<string>(values ?? defaultValues),
  )
  const selectedValues = values ? new Set(values) : internalValues
  const [items, setItems] = useState<Map<string, ReactNode>>(new Map())

  function toggleValue(value: string) {
    const getNewSet = (prev: Set<string>) => {
      if (single) {
        return prev.has(value) ? new Set<string>() : new Set<string>([value])
      }
      const newSet = new Set(prev)
      if (newSet.has(value)) {
        newSet.delete(value)
      } else {
        newSet.add(value)
      }
      return newSet
    }
    setInternalValues(getNewSet)
    onValuesChange?.([...getNewSet(selectedValues)])
    if (single) setOpen(false)
  }

  const onItemAdded = useCallback((value: string, label: ReactNode) => {
    setItems(prev => {
      if (prev.get(value) === label) return prev
      return new Map(prev).set(value, label)
    })
  }, [])

  return (
    <MultiSelectContext
      value={{
        open,
        setOpen,
        selectedValues,
        single,
        toggleValue,
        items,
        onItemAdded,
      }}
    >
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        {children}
      </Popover>
    </MultiSelectContext>
  )
}

/**
 * Renders a PopoverTrigger button that toggles the MultiSelect popover and reflects its open state.
 *
 * @param className - Additional CSS classes to apply to the trigger button
 * @param children - Elements displayed inside the trigger (e.g., selected values or placeholder)
 * @returns The trigger element for the MultiSelect popover
 */
export function MultiSelectTrigger({
  className,
  children,
  ...props
}: {
  className?: string
  children?: ReactNode
} & ComponentPropsWithoutRef<typeof Button>) {
  const { open } = useMultiSelectContext()

  return (
    <PopoverTrigger asChild>
      <Button
        {...props}
        variant={props.variant ?? "outline"}
        role={props.role ?? "combobox"}
        aria-expanded={props["aria-expanded"] ?? open}
        className={cn(
          "flex h-auto min-h-9 w-fit items-center justify-between gap-2 overflow-hidden rounded-md border border-input bg-transparent px-3 py-1.5 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
          className,
        )}
      >
        {children}
        <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
  )
}

/**
 * Renders the selected values area for a MultiSelect, showing selected items as badges and an optional overflow indicator.
 *
 * Displays the placeholder when there are no selections; in single-select mode, shows the single selected item's label.
 *
 * @param placeholder - Text to show when there are no selected values.
 * @param clickToRemove - If true, clicking a badge removes that value from the selection.
 * @param overflowBehavior - How selected badges should wrap or be collapsed into an overflow count: `"wrap"`, `"wrap-when-open"`, or `"cutoff"`.
 * @param className - Additional CSS classes to apply to the container.
 * @returns The rendered element that displays selected items and an overflow badge when items are hidden due to space. 
 */
export function MultiSelectValue({
  placeholder,
  clickToRemove = true,
  className,
  overflowBehavior = "wrap-when-open",
  ...props
}: {
  placeholder?: string
  clickToRemove?: boolean
  overflowBehavior?: "wrap" | "wrap-when-open" | "cutoff"
} & Omit<ComponentPropsWithoutRef<"div">, "children">) {
  const { selectedValues, toggleValue, items, open, single } =
    useMultiSelectContext()
  const [overflowAmount, setOverflowAmount] = useState(0)
  const valueRef = useRef<HTMLDivElement>(null)
  const overflowRef = useRef<HTMLDivElement>(null)

  const shouldWrap =
    overflowBehavior === "wrap" ||
    (overflowBehavior === "wrap-when-open" && open)

  const checkOverflow = useCallback(() => {
    if (valueRef.current == null) return

    const containerElement = valueRef.current
    const overflowElement = overflowRef.current
    const items = containerElement.querySelectorAll<HTMLElement>(
      "[data-selected-item]",
    )

    if (overflowElement != null) overflowElement.style.display = "none"
    items.forEach(child => child.style.removeProperty("display"))
    let amount = 0
    for (let i = items.length - 1; i >= 0; i--) {
      const child = items[i]!
      if (containerElement.scrollWidth <= containerElement.clientWidth) {
        break
      }
      amount = items.length - i
      child.style.display = "none"
      overflowElement?.style.removeProperty("display")
    }
    setOverflowAmount(amount)
  }, [])

  const handleResize = useCallback(
    (node: HTMLDivElement) => {
      valueRef.current = node

      const mutationObserver = new MutationObserver(checkOverflow)
      const observer = new ResizeObserver(debounce(checkOverflow, 100))

      mutationObserver.observe(node, {
        childList: true,
        attributes: true,
        attributeFilter: ["class", "style"],
      })
      observer.observe(node)

      return () => {
        observer.disconnect()
        mutationObserver.disconnect()
        valueRef.current = null
      }
    },
    [checkOverflow],
  )

  if (selectedValues.size === 0 && placeholder) {
    return (
      <span className="min-w-0 overflow-hidden font-normal text-muted-foreground">
        {placeholder}
      </span>
    )
  }

  if (single && selectedValues.size > 0) {
    return (
      <span className="min-w-0 overflow-hidden">
        {items.get([...selectedValues][0])}
      </span>
    )
  }

  return (
    <div
      {...props}
      ref={handleResize}
      className={cn(
        "flex w-full gap-1.5 overflow-hidden",
        shouldWrap && "h-full flex-wrap",
        className,
      )}
    >
      {[...selectedValues]
        .filter(value => items.has(value))
        .map(value => (
          <Badge
            variant="outline"
            data-selected-item
            className="group flex items-center gap-1"
            key={value}
            onClick={
              clickToRemove
                ? e => {
                    e.stopPropagation()
                    toggleValue(value)
                  }
                : undefined
            }
          >
            {items.get(value)}
            {clickToRemove && (
              <XIcon className="size-2 text-muted-foreground group-hover:text-destructive" />
            )}
          </Badge>
        ))}
      <Badge
        style={{
          display: overflowAmount > 0 && !shouldWrap ? "block" : "none",
        }}
        variant="outline"
        ref={overflowRef}
      >
        +{overflowAmount}
      </Badge>
    </div>
  )
}

/**
 * Renders the popover content for the multi-select, including an optional search input and the list of items.
 *
 * If `search` is an object, its `placeholder` is used for the input and its `emptyMessage` is shown when the search yields no results.
 * The component also pre-renders a hidden Command/List layout to preserve expected structure for consumers.
 *
 * @param search - `true` to show a search input, `false` to omit it, or an object with optional `placeholder` and `emptyMessage` strings to customize the search UI.
 * @param children - The CommandList children (items, groups, separators) to render inside the content.
 * @returns A JSX element containing the popover content with the command/list UI and optional search input.
 */
export function MultiSelectContent({
  search = true,
  children,
  ...props
}: {
  search?: boolean | { placeholder?: string; emptyMessage?: string }
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<typeof Command>, "children">) {
  const canSearch = typeof search === "object" ? true : search

  return (
    <>
      <div style={{ display: "none" }}>
        <Command>
          <CommandList>{children}</CommandList>
        </Command>
      </div>
      <PopoverContent className="min-w-[var(--radix-popover-trigger-width)] p-0">
        <Command {...props}>
          {canSearch ? (
            <CommandInput
              placeholder={
                typeof search === "object" ? search.placeholder : undefined
              }
            />
          ) : (
            <button autoFocus className="sr-only" />
          )}
          <CommandList>
            {canSearch && (
              <CommandEmpty>
                {typeof search === "object" ? search.emptyMessage : undefined}
              </CommandEmpty>
            )}
            {children}
          </CommandList>
        </Command>
      </PopoverContent>
    </>
  )
}

/**
 * Renders a selectable item for the MultiSelect list.
 *
 * Registers the item's display label with the enclosing MultiSelect via context so the selected-values UI can show a badge; when activated it toggles the item's selected state and calls the optional onSelect callback.
 *
 * @param value - The unique string identifier for this item.
 * @param badgeLabel - Optional label used for the selected-item badge; if omitted, `children` is used.
 * @param onSelect - Optional callback invoked with `value` when the item is selected.
 * @returns The CommandItem element representing this selectable list item.
 */
export function MultiSelectItem({
  value,
  children,
  badgeLabel,
  onSelect,
  ...props
}: {
  badgeLabel?: ReactNode
  value: string
} & Omit<ComponentPropsWithoutRef<typeof CommandItem>, "value">) {
  const { toggleValue, selectedValues, onItemAdded } = useMultiSelectContext()
  const isSelected = selectedValues.has(value)

  useEffect(() => {
    onItemAdded(value, badgeLabel ?? children)
  }, [value, children, onItemAdded, badgeLabel])

  return (
    <CommandItem
      {...props}
      onSelect={() => {
        toggleValue(value)
        onSelect?.(value)
      }}
    >
      <CheckIcon
        className={cn("mr-2 size-4", isSelected ? "opacity-100" : "opacity-0")}
      />
      {children}
    </CommandItem>
  )
}

/**
 * Renders a grouping container for command items used inside the MultiSelect content.
 *
 * @param props - Props forwarded to the underlying `CommandGroup` component.
 * @returns A React element that renders `CommandGroup` with the given props.
 */
export function MultiSelectGroup(
  props: ComponentPropsWithoutRef<typeof CommandGroup>,
) {
  return <CommandGroup {...props} />
}

/**
 * Renders a command list separator forwarded to the underlying `CommandSeparator` component.
 *
 * @param props - Props to pass through to `CommandSeparator`
 * @returns The rendered separator element
 */
export function MultiSelectSeparator(
  props: ComponentPropsWithoutRef<typeof CommandSeparator>,
) {
  return <CommandSeparator {...props} />
}

/**
 * Retrieve the current MultiSelect context value and ensure the hook is used inside a provider.
 *
 * @returns The MultiSelect context value containing `open`, `setOpen`, `selectedValues`, `toggleValue`, `items`, `single`, and `onItemAdded`.
 * @throws Error if called outside of a `MultiSelect` provider
 */
function useMultiSelectContext() {
  const context = useContext(MultiSelectContext)
  if (context == null) {
    throw new Error(
      "useMultiSelectContext must be used within a MultiSelectContext",
    )
  }
  return context
}

/**
 * Creates a debounced wrapper that delays invoking `func` until `wait` milliseconds have elapsed since the last call.
 *
 * @param func - The function to debounce.
 * @param wait - The delay in milliseconds to wait after the last invocation before calling `func`.
 * @returns A wrapper function that schedules `func` to run after `wait` milliseconds; subsequent calls within the wait period reset the timer. The wrapper preserves the caller's `this` context and forwards all arguments to `func`.
 */
function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return function (this: unknown, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}
