import {DragEvent, FC, ReactNode, useState} from 'react'

import {DropZone} from './DropZone'
import {DraggableItem} from './DraggableItem'

import './List.css'

export type ListItemData = {
  id: string
  children: ReactNode
}

type Props = {
  name: string
  itemsData: ListItemData[]
  relocateItem(fromListName: string, toListName: string, itemId: string): unknown
}

export const List: FC<Props> = ({ itemsData, name, relocateItem }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  
  const onChangeDraggingState = (v: boolean) => setIsDragging(v)
  const onDrop = (e: DragEvent<HTMLDivElement>): void => {
    const itemId = e.dataTransfer.getData('itemId')
    const fromListName = e.dataTransfer.getData('listName')
    const toListName = name
  
    relocateItem(fromListName, toListName, itemId)
  }
  
  return <DropZone
    onChangeDraggingState={onChangeDraggingState}
    onDrop={onDrop}
    className={`list ${isDragging ? 'dragging' : ''}`}
  >
    {
      itemsData.map(itemData =>
        <DraggableItem
          key={itemData.id}
          draggableData={{
            itemId: itemData.id,
            listName: name
          }}
        >
          { itemData.children }
        </DraggableItem>
      )
    }
  </DropZone>
}
