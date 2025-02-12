import type { EventPayload, PData, PMetadata, PSubject } from '../event-payload'

type TableFilter = {
  field: string
  operator: string
  value: string
}

export interface TableEvents {
  'table:load': EventPayload
  'table:row:select': EventPayload<PData<{ rowId: string; rowData: any }> & PMetadata & PSubject>
  'table:row:deselect': EventPayload<PData<{ rowId: string; rowData: any }> & PMetadata & PSubject>
  'table:row:edit': EventPayload<PData<{ rowId: string; rowData: any }> & PMetadata & PSubject>
  'table:row:delete': EventPayload<PData<{ rowId: string; rowData: any }> & PMetadata & PSubject>
  'table:filter': EventPayload<PData<{ filters: TableFilter[] }> & PMetadata & PSubject>
  'table:sort': EventPayload<
    PData<{ column: string; direction: 'asc' | 'desc' }> & PMetadata & PSubject
  >
}
