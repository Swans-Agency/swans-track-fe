import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

export default function List({ title, cards, listId }) {
    return (
        <Droppable droppableId={listId}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {cards.map((card, index) => (
                        <Card key={card.id} card={card} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
}


