SELECT
    employee_id,
    department_id
FROM
    Employee
WHERE
    primary_flag = 'Y'
    OR employee_id NOT IN (
        SELECT DISTINCT employee_id
        FROM Employee
        WHERE primary_flag = 'Y'
    );
