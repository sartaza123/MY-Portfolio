import Button from '../ui/Button';
import { SkeletonRow } from '../ui/Loader';
import EmptyState from '../ui/EmptyState';

const DataTable = ({ columns, data, loading = false, onEdit, onDelete, renderCell, emptyIcon = 'List', emptyTitle = 'No data found' }) => (
  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden' }} className="data-table-shell">
    <div style={{ overflowX: 'auto' }} className="data-table-scroll">
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }} className="data-table">
        <thead>
          <tr style={{ background: 'rgba(0,0,0,0.3)' }}>
            {columns.map((col) => <th key={col.accessor} style={{ padding: '0.875rem 1.25rem', textAlign: 'left', fontSize: '0.72rem', fontWeight: 700, color: '#52525b', letterSpacing: '0.07em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{col.header}</th>)}
            {(onEdit || onDelete) && <th style={{ padding: '0.875rem 1.25rem', fontSize: '0.72rem', fontWeight: 700, color: '#52525b', letterSpacing: '0.07em', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? Array.from({ length: 4 }).map((_, index) => <SkeletonRow key={index} cols={columns.length + (onEdit || onDelete ? 1 : 0)} />) : data.length === 0 ? (
            <tr><td colSpan={columns.length + 1}><EmptyState icon={emptyIcon} title={emptyTitle} /></td></tr>
          ) : data.map((row, index) => (
            <tr key={row.id || index} style={{ borderTop: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }} onMouseEnter={(event) => { event.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }} onMouseLeave={(event) => { event.currentTarget.style.background = 'transparent'; }}>
              {columns.map((col) => <td key={col.accessor} style={{ padding: '1rem 1.25rem', fontSize: '0.875rem', color: '#d4d4d8', verticalAlign: 'middle' }}>{renderCell ? renderCell(col, row) : (row[col.accessor] ?? '—')}</td>)}
              {(onEdit || onDelete) && <td style={{ padding: '1rem 1.25rem', textAlign: 'right', verticalAlign: 'middle' }}><div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }} className="data-table-actions">{onEdit && <Button variant="secondary" size="sm" onClick={() => onEdit(row)}>Edit</Button>}{onDelete && <Button variant="danger" size="sm" onClick={() => onDelete(row)}>Delete</Button>}</div></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {!loading && data.length > 0 && <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.04)', fontSize: '0.75rem', color: '#52525b' }}>{data.length} {data.length === 1 ? 'record' : 'records'}</div>}
  </div>
);

export default DataTable;
