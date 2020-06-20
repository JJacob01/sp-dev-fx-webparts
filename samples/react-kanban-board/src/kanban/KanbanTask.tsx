import * as React from 'react';
import styles from './KanbanTask.module.scss';
import * as strings from 'KanbanBoardStrings';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { IKanbanTask } from './IKanbanTask';
import { IKanbanBoardTaskSettings } from './IKanbanBoardTaskSettings';
import { IKanbanBoardTaskActions } from './IKanbanBoardTaskActions';
import classNames from 'classnames';
import { IconNames, Persona, PersonaSize } from 'office-ui-fabric-react';

export interface IKanbanTaskProps extends IKanbanTask, IKanbanBoardTaskSettings {

    toggleCompleted?: (taskId: string) => void;
    openDetails: (taskId: string) => void;
    onDragStart: (event) => void;
    onDragEnd: (event) => void;
    isMoving: boolean;
}

export interface IKanbanTaskState { }

export default class KanbanTask extends React.Component<IKanbanTaskProps, IKanbanTaskState> {
    constructor(props: IKanbanTaskProps) {
        super(props);
        this.state = {};
    }
    public render(): React.ReactElement<IKanbanTaskProps> {

        const { title, showPriority, showAssignedTo, isCompleted, isMoving, showTaskDetailsButton } = this.props;
        const showCompleted = !!this.props.toggleCompleted;
        const iconCompleted = { iconName: isCompleted ? 'RadioBtnOn' : 'RadioBtnOff' };
        return (
            <div className={classNames({ [styles.taskcard]: true, [styles.moving]: isMoving })}
                onDragStart={this.props.onDragStart}
                onDragEnd={this.props.onDragEnd}
                draggable
            >
                <div className={styles.titlerow}>
                    {showCompleted && (
                        <IconButton
                            iconProps={iconCompleted}
                            title={isCompleted ? strings.IsCompleted : strings.IsNotCompleted}
                            ariaLabel={isCompleted ? strings.IsCompleted : strings.IsNotCompleted}
                            onClick={this._toggleCompleted.bind(this)}
                        />)
                    }
                    <div className={styles.title}>{title}</div>
                    {showTaskDetailsButton && (
                        <IconButton
                            iconProps={{ iconName: 'More' }}
                            title={strings.OpenDetails}
                            ariaLabel={strings.OpenDetails}
                            onClick={this._openDetails.bind(this)}
                        />)
                    }

                </div>
                <div className={styles.membersAndLabels}>
                    {showPriority && this.props.priority && (<div className={styles.priority}>{this.props.priority}</div>)}

                    {showAssignedTo && this.props.assignedTo && (<div className={styles.assignedto}>
                        {
                            this.props.assignedTo.map((p, i) => (
                                <div key={'personawrapper' + i}>
                                    <Persona
                                        key={'persona' + i}
                                        {...p}
                                        size={PersonaSize.size32}
                                        hidePersonaDetails={false}
                                    />
                                </div>))
                        }
                    </div>)}


                </div>
            </div>
        );
    }

    private _toggleCompleted(): void {
        if (this.props.toggleCompleted) {
            this.props.toggleCompleted(this.props.taskId);
        }
    }

    private _openDetails(): void {
        if (this.props.openDetails) {
            this.props.openDetails(this.props.taskId);
        }

    }


}
