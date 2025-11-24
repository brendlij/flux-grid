export type TrackSize = number | string;

export type FluxGridAutoFlow =
  | "row"
  | "column"
  | "dense"
  | "row dense"
  | "column dense";

export type FluxGridAxis = "columns" | "rows";

export interface FluxGridAutoTracks {
  type?: "auto-fit" | "auto-fill";
  min?: TrackSize;
  max?: TrackSize;
}

export type FluxGridTracks =
  | TrackSize
  | TrackSize[]
  | FluxGridAutoTracks
  | string;

export interface FluxGridLayoutProps {
  columns?: FluxGridTracks;
  rows?: FluxGridTracks;
  gap?: TrackSize;
  rowHeight?: TrackSize;
  columnMin?: TrackSize;
  columnMax?: TrackSize;
  rowMin?: TrackSize;
  rowMax?: TrackSize;
  locked?: boolean;
  autoFlow?: FluxGridAutoFlow;
}

export interface FluxGridBreakpoint extends FluxGridLayoutProps {
  name?: string;
  minWidth?: number | string;
  maxWidth?: number | string;
}

export interface FluxGridProps extends FluxGridLayoutProps {
  tag?: string;
  breakpoints?: FluxGridBreakpoint[];
}

export interface FluxGridItemProps {
  col?: number;
  row?: number;
  colSpan?: number;
  rowSpan?: number;
  zIndex?: number;
  tag?: string;
  aspectRatio?: string | number;
}
