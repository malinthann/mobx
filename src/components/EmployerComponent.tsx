import { inject, observer } from "mobx-react";
import React from "react";
import { Root } from "../mst";
import EmployeeComponent from "./EmployeeComponent";

interface Props {
    rootTree?: Root;
}
interface State {
    employeeName: string;
    hours_worked: string;
}

@inject("rootTree")
@observer
export default class EmployerComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            employeeName: "",
            hours_worked: "",
        };
    }
    changeEmployeeName = (e: any) => {
        const employeeName = e.target.value;
        this.setState({ employeeName });
    };
    changeHoursWorked = (e: any) => {
        const hours_worked = e.target.value;
        this.setState({ hours_worked });
    };
    onSubmit = (e: any) => {
        e.preventDefault();

        const { employeeName, hours_worked } = this.state;
        const { rootTree } = this.props;
        if (!rootTree) return null;
        rootTree.employer.newEmployee(employeeName, parseInt(hours_worked));
    };

    render() {
        const { rootTree } = this.props;
        const { employeeName, hours_worked } = this.state;
        if (!rootTree) return null;
        return (
            <div>
                <h1>{rootTree.employer.name}</h1>
                <h2>{rootTree.employer.location}</h2>
                <hr />
                <p>New Employees</p>
                <form onSubmit={this.onSubmit}>
                    <p>Name: </p>
                    <input
                        value={employeeName}
                        onChange={this.changeEmployeeName}
                    />
                    <p>Hours Worked: </p>
                    <input
                        value={hours_worked}
                        onChange={this.changeHoursWorked}
                    />
                    <br />
                    <button>Submit</button>
                </form>
                <hr />
                {rootTree.employer.employees.map(employee => (
                    <EmployeeComponent employee={employee} key={employee.id} />
                ))}
            </div>
        );
    }
}
