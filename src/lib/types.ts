export type TrackSize = number | string

export type FluxGridAutoFlow = 'row' | 'column' | 'dense' | 'row dense' | 'column dense'

export type FluxGridAxis = 'columns' | 'rows'

export interface FluxGridAutoTracks {
  type?: 'auto-fit' | 'auto-fill'
  min?: TrackSize
  max?: TrackSize
}

export type FluxGridTracks = TrackSize | TrackSize[] | FluxGridAutoTracks | string

export interface FluxGridProps {
  columns?: FluxGridTracks
  rows?: FluxGridTracks
  gap?: TrackSize
  rowHeight?: TrackSize
  columnMin?: TrackSize
  columnMax?: TrackSize
  rowMin?: TrackSize
  rowMax?: TrackSize
  locked?: boolean
  tag?: string
  autoFlow?: FluxGridAutoFlow
}

export interface FluxGridItemProps {
  col?: number
  row?: number
  colSpan?: number
  rowSpan?: number
  zIndex?: number
  tag?: string
  aspectRatio?: string | number
}
