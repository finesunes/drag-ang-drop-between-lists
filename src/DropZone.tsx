import {ReactNode, DragEvent, DetailedHTMLProps, HTMLAttributes, FC, useEffect, useState} from 'react'

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode
  onDrop(v: any): unknown
  onChangeDraggingState(isDragging: boolean): unknown
}

export const DropZone: FC<Props> = ({
   children,
   onDrop,
   onChangeDraggingState,
   dataTransfer,
   ...props
}) => {
  const [isDragging, setIsDragging] = useState<number>(0)
  
  const _isDragging = !!isDragging
  
  useEffect(() => {
    onChangeDraggingState(_isDragging)
  }, [_isDragging, onChangeDraggingState])
  
  const overrideEventDefaults = (e: Event | DragEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()
  }
  
  const onDragEnter = (e: DragEvent<HTMLDivElement>): void => {
    overrideEventDefaults(e)
    setIsDragging(prev => prev + 1)
  }
  
  const onDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    overrideEventDefaults(e)
    setIsDragging(prev => prev - 1)
  }
  
  const _onDrop = (e: DragEvent<HTMLDivElement>): void => {
    onDragLeave(e)
    
    onDrop(e)
  }
  
  return <div
    { ...props }
    onDragEnter={onDragEnter}
    onDragLeave={onDragLeave}
    onDragEnd={overrideEventDefaults}
    onDragOver={overrideEventDefaults}
    onDrop={_onDrop}
  >
    {children}
  </div>
}
