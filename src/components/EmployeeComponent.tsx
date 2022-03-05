import { observer } from 'mobx-react';
import React, { Component } from 'react'
import { employee } from '../mst';

type Props = {
    employee: employee
}

type State = {}

@observer

class EmployeeComponent extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }
    render() {
        const { hours_worked, name } = this.props.employee
        return (
            <div>
                <p>{`Name: ${name}`}</p>
                <p>{`Hours Worked: ${hours_worked}`}</p>
            </div>
        )
    }
}

export { EmployeeComponent };