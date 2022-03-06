import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { employee } from "../mst";

type Props = {
  employee: employee;
};

type State = {
  employeeName: string;
  hours_worked: string;
  edit: boolean;
};
@inject("rootTree")
@observer
class EmployeeComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      employeeName: this.props.employee.name,
      hours_worked: `${this.props.employee.hours_worked}`,
      edit: false,
    };
    this.changeEmployeeName = this.changeEmployeeName.bind(this);
    this.changeHoursWorked = this.changeHoursWorked.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changeEmployeeName(e: any) {
    const employeeName = e.target.value;
    this.setState({ employeeName });
  }
  changeHoursWorked(e: any) {
    const hours_worked = e.target.value;
    this.setState({ hours_worked });
  }
  toggleEdit() {
    this.setState((prev) => ({ edit: !prev.edit }));
  }
  onSubmit(e: any) {
    e.preventDefault();
    const { employeeName, hours_worked } = this.state;
    this.props.employee.editEmployee(employeeName, parseInt(hours_worked));
  }

  render() {
    const { hours_worked, name } = this.props.employee;
    const { edit } = this.state;
    return (
      <div>
        {edit ? (
          <form onSubmit={this.onSubmit}>
            <input
              value={this.state.employeeName}
              onChange={this.changeEmployeeName}
            />
            <input
              value={this.state.hours_worked}
              onChange={this.changeHoursWorked}
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={this.toggleEdit}>
              Cancel
            </button>
          </form>
        ) : (
          <>
            <p>{`Name: ${name}`}</p>
            <p>{`Hours Worked: ${hours_worked}`}</p>
            <button onClick={this.toggleEdit}>Edit</button>
          </>
        )}
      </div>
    );
  }
}

export { EmployeeComponent };
