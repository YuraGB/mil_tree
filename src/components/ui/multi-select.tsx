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
 * Renders a context-backed multi-select UI that manages open state, selected values, and item labels, and provides that state to nested MultiSelect subcomponents.
 *
 * @param children - React nodes that typically include MultiSelectTrigger, MultiSelectValue, MultiSelectContent and item/group components; these receive state via context.
 * @param values - Optional controlled list of selected value strings. When provided, selection state is controlled externally.
 * @param defaultValues - Initial selected value strings used when `values` is not provided (uncontrolled mode).
 * @param onValuesChange - Callback invoked with the updated array of selected values whenever the selection changes.
 * @param single - When `true`, restricts selection to a single value and closes the popover after a selection.
 * @returns The rendered MultiSelect element with its Popover and context provider.
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

  /**
   * Toggle selection for the provided item value in the MultiSelect state.
   *
   * Updates the selected values (adding or removing `value`), invokes the optional
   * `onValuesChange` callback with the updated array of selected values, and closes
   * the popover when single-selection mode is enabled.
   *
   * @param value - The item identifier to toggle selection for
   */
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
 * Renders the trigger button for a MultiSelect popover, reflecting the popover open state and showing a chevron indicator.
 *
 * @returns The trigger button element that opens or closes the MultiSelect popover
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
 * Render the current selection as badges, a placeholder, or a single-label and manage visual overflow and optional removal.
 *
 * @param placeholder - Text shown when no values are selected.
 * @param clickToRemove - If true, clicking a badge removes that value; if false, badges are not clickable.
 * @param overflowBehavior - Layout/overflow strategy: `"wrap"` always wraps badges, `"wrap-when-open"` wraps only when the popover is open, `"cutoff"` keeps a single line and shows a `+N` overflow badge when items are hidden.
 * @param className - Additional class names applied to the outer container.
 * @returns A React element that displays the selected value(s) as badges, a placeholder when empty, or a single-item label when in single selection mode.
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
 * Renders the popover content for the MultiSelect, providing a Command list and optional search input.
 *
 * When `search` is enabled (boolean true or an object), a CommandInput is shown with an optional placeholder;
 * when disabled, focus is still handled for accessibility. A hidden Command with the full children is rendered
 * offscreen for structural completeness.
 *
 * @param search - `true` to enable search, `false` to disable, or an object with `placeholder` and `emptyMessage` to customize text.
 * @param children - Command items (typically MultiSelectItem elements) that make up the selectable list.
 * @param props - Additional props forwarded to the rendered `Command` inside the popover.
 * @returns The Popover content element containing the configured Command list.
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
 * Renders a selectable item for the MultiSelect list and registers its label with the parent context.
 *
 * Registers the item's display label (from `badgeLabel` or `children`) with the MultiSelect context and renders
 * a CommandItem that toggles the selection for `value` when activated.
 *
 * @param value - The unique identifier for this item used in the MultiSelect value set.
 * @param badgeLabel - Optional label/content used to represent this item in the selected-values display; falls back to `children` if omitted.
 * @param onSelect - Optional callback invoked with `value` after the item is selected.
 * @returns The rendered CommandItem element representing the selectable item.
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
 * Renders a CommandGroup using the provided props.
 *
 * @param props - Props forwarded to the underlying CommandGroup component
 * @returns A CommandGroup element configured with `props`
 */
export function MultiSelectGroup(
  props: ComponentPropsWithoutRef<typeof CommandGroup>,
) {
  return <CommandGroup {...props} />
}

/**
 * Renders a separator for use inside the MultiSelect command list.
 *
 * @returns A `CommandSeparator` element with the provided props forwarded.
 */
export function MultiSelectSeparator(
  props: ComponentPropsWithoutRef<typeof CommandSeparator>,
) {
  return <CommandSeparator {...props} />
}

/**
 * Access the MultiSelect context value for components rendered inside a MultiSelect.
 *
 * @returns The context object containing shared MultiSelect state and actions (e.g., `open`, `setOpen`, `selectedValues`, `single`, `toggleValue`, `items`, `onItemAdded`).
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
 * Creates a debounced version of a function that delays invocation until `wait` milliseconds have elapsed since the last call.
 *
 * @param func - The function to debounce.
 * @param wait - The delay in milliseconds to wait after the last call before invoking `func`.
 * @returns A function that, when called, schedules `func` to run after `wait` milliseconds; subsequent calls reset the delay. The debounced function preserves the caller `this` and forwards all arguments to `func`.
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
