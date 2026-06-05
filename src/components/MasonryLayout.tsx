'use client';

import { Children, useEffect, useLayoutEffect, useMemo, useRef, type ReactNode } from 'react';

interface MasonryLayoutProps {
  children: ReactNode;
  minColumnWidth?: number;
  gap?: number;
  className?: string;
  onContentWidthChange?: (width: number) => void;
}

export function MasonryLayout({
  children,
  minColumnWidth = 320,
  gap = 24,
  className,
  onContentWidthChange,
}: MasonryLayoutProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const contentWidthRef = useRef<number | null>(null);
  const childrenArray = useMemo(() => Children.toArray(children), [children]);

  // computeColumns removed — we compute columns explicitly below based on available width

  const layout = () => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.children) as HTMLElement[];
    if (items.length === 0) {
      root.style.height = '0px';
      return;
    }

    const parent = root.parentElement;
    // Use bounding rect for accurate visual width and account for parent padding
    const parentRect = parent ? parent.getBoundingClientRect() : root.getBoundingClientRect();
    // Use the parent's visual width (including padding) so max-width containers allow full columns
    const parentInnerWidth = Math.max(0, Math.floor(parentRect.width));

    // Determine the largest column count (up to 3) that fits within parentInnerWidth
    let columnCount = 1;
    for (let c = 3; c >= 1; c--) {
      const w = c * minColumnWidth + Math.max(0, c - 1) * gap;
      if (w <= parentInnerWidth) {
        columnCount = c;
        break;
      }
    }
    const contentWidth = columnCount * minColumnWidth + Math.max(0, columnCount - 1) * gap;
    const columnHeights = new Array(columnCount).fill(0);
    root.style.width = `${contentWidth}px`;
    root.style.maxWidth = '100%';
    // Compute base X offset so columns are centered within the parent's visual width.
    const baseX = Math.round((parentRect.width - contentWidth) / 2);
    root.style.marginLeft = '0';
    root.style.marginRight = '0';
    root.style.transform = 'none';
    if (onContentWidthChange && contentWidthRef.current !== contentWidth) {
      contentWidthRef.current = contentWidth;
      onContentWidthChange(contentWidth);
    }

    items.forEach((item) => {
      item.style.position = 'absolute';
      item.style.top = '0';
      item.style.left = '0';
      item.style.width = `${minColumnWidth}px`;
      item.style.margin = '0';
      item.style.transform = 'translate(0, 0)';
    });

    items.forEach((item) => {
      const minIndex = columnHeights.indexOf(Math.min(...columnHeights));
      const x = baseX + minIndex * (minColumnWidth + gap);
      const y = columnHeights[minIndex];
      item.style.transform = `translate(${x}px, ${y}px)`;
      columnHeights[minIndex] += item.offsetHeight + gap;
    });

    root.style.height = `${Math.max(...columnHeights) - gap}px`;
  };

  useLayoutEffect(() => {
    layout();
  }, [childrenArray, gap, minColumnWidth]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(() => {
      layout();
    });

    observer.observe(root.parentElement ?? root);

    // Fallback: also listen to window resize to ensure layout on viewport changes
    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onResize);
    };
  }, [gap, minColumnWidth]);

  return (
    <div
      ref={rootRef}
      className={className}
      style={{
        position: 'relative',
        width: 'fit-content',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      {childrenArray.map((child, index) => (
        <div key={index} className="masonry-item">
          {child}
        </div>
      ))}
    </div>
  );
}
