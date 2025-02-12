import type { EventPayload } from '../event-payload-type';

type TableFilterPayloadData = {
  field: string;
  operator: string;
  value: string;
};

export interface TableEvents {
  'table:load': EventPayload;
  'table:row:select': EventPayload<{ rowId: string; rowData: any }>;
  'table:row:deselect': EventPayload<{ rowId: string; rowData: any }>;
  'table:row:edit': EventPayload<{ rowId: string; rowData: any }>;
  'table:row:delete': EventPayload<{ rowId: string; rowData: any }>;
  'table:filter': EventPayload<{ filters: TableFilterPayloadData[] }>;
  'table:sort': EventPayload<{ column: string; direction: 'asc' | 'desc' }>;
}
