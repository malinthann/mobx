import { inject, observer } from "mobx-react";
import React from "react";
import { Root } from "../mst";
import { EmployeeComponent } from "./EmployeeComponent";

interface Props {
    rootTree?: Root;
}
interface State {
    employeeName: string;
    hours_worked: string;
    searchString: string;
}

@inject("rootTree")
@observer
class EmployerComponent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            employeeName: "",
            hours_worked: "",
            searchString: "",
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
    searchStringChange = (e: any) => {
        const searchString = e.target.value;
        this.setState({ searchString });
    };
    onSubmit = (e: any) => {
        e.preventDefault();

        const { employeeName, hours_worked } = this.state;
        const { rootTree } = this.props;
        if (!rootTree) return null;
        rootTree.employer.newEmployee(employeeName, parseInt(hours_worked));
        this.setState({ employeeName: "", hours_worked: "", })
    };

    render() {
        const { rootTree } = this.props;
        const { employeeName, hours_worked, searchString } = this.state;
        if (!rootTree) return null;
        const num_employees = rootTree.employer.num_employees;
        const filteredEmployees =
            rootTree.employer.filtered_employees(searchString);
        return (
            <div>
                <h1>{rootTree.employer.name}</h1>
                <h2>{rootTree.employer.location}</h2>
                <p>{`Total of Number Employees ${num_employees}`}</p>
                <hr />
                <p>New Employees</p>
                <form onSubmit={this.onSubmit}>
                    <p>Name: </p>
                    <input value={employeeName} onChange={this.changeEmployeeName} />
                    <p>Hours Worked: </p>
                    <input value={hours_worked} onChange={this.changeHoursWorked} />
                    <br />
                    <button>Submit</button>
                </form>
                <hr />
                <input
                    placeholder="Search Employees Name"
                    value={searchString}
                    onChange={this.searchStringChange}
                />
                {filteredEmployees.map((employee) => (
                    <EmployeeComponent employee={employee} key={employee.id} />
                ))}
            </div>
        );
    }
}

export { EmployerComponent };
