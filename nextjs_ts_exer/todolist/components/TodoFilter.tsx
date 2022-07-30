import React from 'react';
import Link from 'next/link';
import { TodoStatus } from '../generated/graphql-frontend';

interface Props {
    status?: TodoStatus
}

const TodoFilter: React.FC<Props> = ({ status }) => {
    return (
    <ul className="todo-filter">
        <li>
            <Link href="/" scroll={false}>
                <a className={!status ? 'todo-filter-active' : ''}>
                    All
                </a>
            </Link>
        </li>
        <li>
            <Link href={`/${TodoStatus.Active}`} scroll={false} shallow={true}>
                <a className={status === TodoStatus.Active ? 'todo-filter-active' : ''}>
                    Active
                </a>
            </Link>
        </li>
        <li>
            <Link href={`/${TodoStatus.Completed}`} scroll={false} shallow={true}>
                <a className={status === TodoStatus.Completed ? 'todo-filter-active' : ''}>
                    Completed
                </a>
            </Link>
        </li>
        <li>
            <Link href={`/${TodoStatus.Scheduled}`} scroll={false} shallow={true}>
                <a className={status === TodoStatus.Scheduled ? 'todo-filter-active' : ''}>
                    Scheduled
                </a>
            </Link>
        </li>
    </ul>
    )
}

export default TodoFilter;