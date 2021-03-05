import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

interface Props {
    colors: string[]
}

export const ColorPalettesContent: React.FC<Props> = ({ colors }) => {
    const getBoxStyles = (color: string) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'solid 1px black',
        backgroundColor: color,
    })

    return (
        <Droppable droppableId='droppableContent'>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                    {colors.map((color, index) => (
                        <Draggable key={color} draggableId={color} index={index}>
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <div style={{ ...getBoxStyles(color), height: '100px' }}>{color}</div>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}
