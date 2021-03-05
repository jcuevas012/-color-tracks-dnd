import * as React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { reorderColors } from './reorder'
import { ColorMap } from './types'
import { ColorPalettesContent } from './ColorPalettesContent'
import { ColorTracksList } from './ColorTracksList'

const App = () => {
    const [colorMap, setColors] = React.useState<ColorMap>({
        paletteA: ['blue', 'red', 'yellow'],
        paletteB: ['pink'],
        paletteC: ['green', 'tan'],
    })
    const [newColorPalettes, setNewColorPalettes] = React.useState(['orange', 'brown', 'purple'])

    console.log(colorMap)

    return (
        <DragDropContext
            onDragEnd={({ destination, source }) => {
                const newColorToPaletteMove = newColorPalettes[source.index]
                setColors({ ...colorMap, ...{ [newColorToPaletteMove]: [] } })

                const newPalettes = newColorPalettes.filter((palette) => palette !== newColorToPaletteMove)

                setNewColorPalettes([...newPalettes])

                console.log(colorMap)
            }}
        >
            <div style={{ display: 'flex', width: '100wh', height: '800px', backgroundColor: 'gray' }}>
                <Droppable droppableId='droppableTracks'>
                    {(provided, snapshot) => (
                        <div style={{ display: 'flex', flex: '1' }}>
                            <div
                                ref={provided.innerRef}
                                style={{ flex: '1', display: 'flex', flexDirection: 'column', height: '100%' }}
                            >
                                <DragDropContext
                                    onDragEnd={({ destination, source }) => {
                                        // dropped outside the list
                                        if (!destination) {
                                            return
                                        }
                                        setColors(reorderColors(colorMap, source, destination))
                                    }}
                                >
                                    {Object.entries(colorMap).map(([k, v]) => (
                                        <ColorTracksList internalScroll key={k} listId={k} listType='CARD' colors={v} />
                                    ))}
                                </DragDropContext>
                            </div>
                        </div>
                    )}
                </Droppable>
                <ColorPalettesContent colors={newColorPalettes} />
            </div>
        </DragDropContext>
    )
}

export default App
