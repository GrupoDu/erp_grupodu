export interface IEmployee {
  name: string;
  employee_type: string;
}

export interface IEmployeeResponse extends IEmployee {
  employee_id: string;
}
