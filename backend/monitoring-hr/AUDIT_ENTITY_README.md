# Audit Change Log Entity

## Database Table: `audit_change_log`

This entity represents the audit trail for monitoring changes in the HR system.

### Table Structure

| Column Name | Data Type | Identity | Not Null | Default | Comment |
|-------------|-----------|----------|----------|---------|---------|
| employee_id | int4 | [NULL] | true | [NULL] | Employee ID reference |
| changes | json | [NULL] | false | [NULL] | JSON object containing change details |
| createdat | timestamp | [NULL] | true | CURRENT_TIMESTAMP | Record creation timestamp |
| updatedat | timestamp | [NULL] | true | CURRENT_TIMESTAMP | Record update timestamp |

### Entity Implementation

```typescript
@Entity('audit_change_log')
export class AuditChangeLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int4', nullable: false })
  employee_id: number;

  @Column({ type: 'json', nullable: true })
  changes: Record<string, any> | null;

  @CreateDateColumn({ 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP',
    name: 'createdat'
  })
  createdat: Date;

  @UpdateDateColumn({ 
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updatedat'
  })
  updatedat: Date;
}
```

## Features

### 1. **AuditService**
- `logChange(auditData)`: Log a new change
- `getAuditLogsByEmployee(employeeId, limit)`: Get audit logs for specific employee
- `getAuditLogsByDateRange(startDate, endDate, limit)`: Get logs within date range
- `getRecentChanges(limit)`: Get most recent changes

### 2. **AuditController**
- `GET /audit/employee/:employeeId`: Get audit logs for employee
- `GET /audit/recent`: Get recent changes
- `GET /audit/date-range`: Get logs by date range

### 3. **Integration with Monitoring Service**
The audit service is automatically integrated with the monitoring service to log all monitoring changes.

## Usage Examples

### Logging a Change
```typescript
const auditData: AuditChangeData = {
  employee_id: 123,
  changes: {
    type: 'attendance',
    status: 'present',
    timestamp: new Date(),
    previous_status: 'absent'
  },
  change_type: 'attendance',
  change_reason: 'Employee marked present'
};

await auditService.logChange(auditData);
```

### Querying Audit Logs
```typescript
// Get logs for specific employee
const employeeLogs = await auditService.getAuditLogsByEmployee(123, 50);

// Get recent changes
const recentChanges = await auditService.getRecentChanges(20);

// Get logs by date range
const dateRangeLogs = await auditService.getAuditLogsByDateRange(
  new Date('2024-01-01'),
  new Date('2024-01-31'),
  100
);
```

## API Endpoints

### Get Employee Audit Logs
```
GET /audit/employee/123?limit=50
```

### Get Recent Changes
```
GET /audit/recent?limit=20
```

### Get Logs by Date Range
```
GET /audit/date-range?startDate=2024-01-01&endDate=2024-01-31&limit=100
```

## Database Migration

To create this table in your database, run:

```sql
CREATE TABLE audit_change_log (
    id SERIAL PRIMARY KEY,
    employee_id INTEGER NOT NULL,
    changes JSON,
    createdat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedat TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better query performance
CREATE INDEX idx_audit_change_log_employee_id ON audit_change_log(employee_id);
CREATE INDEX idx_audit_change_log_createdat ON audit_change_log(createdat);
```

## TypeScript Interfaces

```typescript
export interface AuditChangeData {
  employee_id: number;
  changes: Record<string, any>;
  change_type?: string;
  change_reason?: string;
}
```

## Error Handling

The audit service includes comprehensive error handling:
- Logs all errors with context
- Graceful degradation (audit failures don't break main flow)
- Detailed error messages for debugging

## Performance Considerations

- Indexes on `employee_id` and `createdat` for fast queries
- Configurable limits to prevent large result sets
- JSON column for flexible change data storage
