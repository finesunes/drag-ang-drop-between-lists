import {FC, useState} from 'react'

import {List, ListItemData} from './List'

import './App.css'

enum ListName {
  list1 = 'list1',
  list2 = 'list2',
}

const exampleData = {
  [ListName.list1]: [
    {
      id: '1',
      children: 'item1',
    },
    {
      id: '2',
      children: 'item2',
    },
    {
      id: '3',
      children: 'item3',
    },
    {
      id: '4',
      children: 'item4',
    }
  ],
  [ListName.list2]: [
    {
      id: '5',
      children: 'item5',
    },
    {
      id: '6',
      children: 'item6',
    },
    {
      id: '7',
      children: 'item7',
    },
    {
      id: '8',
      children: 'item8',
    },
  ],
}

const App: FC = () => {
  const [data, setData] = useState<{ [key: string]: ListItemData[] }>(exampleData)
  
  const relocateItem = (fromListName: string, toListName: string, itemId: string) => {
    if (fromListName === toListName) {
      return
    }
    
    const itemData = data[fromListName].find(item => item.id === itemId)
    
    const toListNewData = data[toListName].concat(itemData)
    const fromListNewData = data[fromListName].filter(item => item.id !== itemId)
    
    setData(prev => ({
      ...prev,
      [fromListName]: fromListNewData,
      [toListName]: toListNewData
    }))
  }
  
  return (
    <div className="App">
      <div className="list1">
        <List name={ListName.list1} itemsData={data[ListName.list1]} relocateItem={relocateItem} />
      </div>
      <div className="list2">
        <List name={ListName.list2} itemsData={data[ListName.list2]} relocateItem={relocateItem} />
      </div>
    </div>
  )
}

export default App
