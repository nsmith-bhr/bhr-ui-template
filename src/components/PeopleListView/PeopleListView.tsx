import { useState, useMemo } from 'react';
import { Dropdown, Icon, Pagination } from '../../components';
import { EmployeeTableRow } from '../EmployeeTableRow';
import type { Employee } from '../../data/employees';

interface PeopleListViewProps {
  employees: Employee[];
}

export function PeopleListView({ employees }: PeopleListViewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');
  const itemsPerPage = 50;

  // Filter employees by status
  const filteredEmployees = useMemo(() => {
    if (filterStatus === 'all') {
      return employees;
    }
    return employees.filter((emp) => emp.employmentStatus === filterStatus);
  }, [employees, filterStatus]);

  // Pagination
  const totalItems = filteredEmployees.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const statusOptions = [
    { value: 'all', label: 'All Employees' },
    { value: 'Full-Time', label: 'Full-Time' },
    { value: 'Part-Time', label: 'Part-Time' },
    { value: 'Contractor', label: 'Contractor' },
  ];

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex items-center justify-between mb-6">
        {/* Left Group: Filter + Dropdown + Icon + Count */}
        <div className="flex items-center gap-2">
          {/* Filter Button */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
            style={{ boxShadow: 'var(--shadow-100)' }}
            aria-label="Filter"
          >
            <Icon name="sliders" size={16} className="text-[var(--icon-neutral-x-strong)]" />
          </button>

          {/* All Employees Dropdown */}
          <Dropdown
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            className="w-[248px]"
          />

          {/* User Group Icon + Count */}
          <div className="flex items-center gap-2" style={{ marginLeft: '16px' }}>
            <Icon
              name="user-group"
              size={16}
              className="text-[var(--icon-neutral-strong)]"
            />
            <span
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '20px',
                color: 'var(--text-neutral-weak)',
              }}
            >
              {totalItems}
            </span>
          </div>
        </div>

        {/* Right Group: Showing + Active + Ellipsis */}
        <div className="flex items-center gap-3">
          {/* Showing Label */}
          <span
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '20px',
              color: 'var(--text-neutral-x-strong)',
            }}
          >
            Showing
          </span>

          {/* Active Dropdown */}
          <Dropdown
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
            value="active"
            onChange={() => {}}
            className="w-[166px]"
          />

          {/* Ellipsis Menu */}
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] hover:bg-[var(--surface-neutral-xx-weak)] transition-colors"
            style={{ boxShadow: 'var(--shadow-100)' }}
            aria-label="More options"
          >
            <Icon name="ellipsis" size={16} className="text-[var(--icon-neutral-x-strong)]" />
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e0e0e0',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
        }}
      >
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: 'var(--surface-neutral-xx-weak)' }}>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-neutral-x-strong)',
                  borderTopLeftRadius: '8px',
                }}
              >
                Employee Photo
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-neutral-x-strong)',
                }}
              >
                Employee #
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-neutral-x-strong)',
                }}
              >
                Last Name, First Name
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-neutral-x-strong)',
                }}
              >
                Job Title
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-neutral-x-strong)',
                }}
              >
                Location
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-neutral-x-strong)',
                }}
              >
                Employment Status
              </th>
              <th
                className="px-6 py-4 text-left"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '15px',
                  fontWeight: 600,
                  color: 'var(--text-neutral-x-strong)',
                  borderTopRightRadius: '8px',
                }}
              >
                Hire Date
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <EmployeeTableRow key={employee.id} employee={employee} />
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-4 py-4 border-t border-[var(--border-neutral-x-weak)]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default PeopleListView;
