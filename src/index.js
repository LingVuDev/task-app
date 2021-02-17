import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import initialData from './initial-data';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';

class App extends React.Component {
	state = initialData;

	onDragEnd = (result) => {
		const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = this.state.columns[source.droppableId];
    const newTaskId = [...column.taskIds];
    newTaskId.splice(source.index, 1);
    newTaskId.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskId,
    }

    const newState = {
      ...column,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      }
    }

    this.setState(newState);
	};

	render() {
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				{this.state.columnOrder.map((columnId) => {
					const column = this.state.columns[columnId];
					const tasks = column.taskIds.map((taskId) => this.state.tasks[taskId]);

					return <Column key={column.id} column={column} tasks={tasks} />;
				})}
			</DragDropContext>
		);
	}
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
