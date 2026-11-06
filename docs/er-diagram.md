# Atlas initial ER diagram

```mermaid
erDiagram
  USERS ||--o{ USER_ROLES : assigned
  ROLES ||--o{ USER_ROLES : grants
  USERS ||--o{ DOCUMENTS : uploads
  COLLECTIONS o|--o{ DOCUMENTS : groups
  DOCUMENTS ||--o{ DOCUMENT_PERMISSIONS : restricts
  USERS ||--o{ DOCUMENT_PERMISSIONS : receives
  DOCUMENTS ||--o{ DOCUMENT_CHUNKS : contains
  USERS ||--o{ CONVERSATIONS : owns
  CONVERSATIONS ||--o{ MESSAGES : contains
  MESSAGES ||--o{ MESSAGE_CITATIONS : cites
  DOCUMENT_CHUNKS ||--o{ MESSAGE_CITATIONS : supports
  USERS ||--o{ FEEDBACK : submits
  MESSAGES ||--o{ FEEDBACK : receives
  DOCUMENTS ||--o{ INGESTION_JOBS : processes
```

The initial migration defines these entities and the core ownership foreign keys. Audit events, groups, and shareable collections can be added as authorization requirements are implemented.
