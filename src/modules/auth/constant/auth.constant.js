export const AUTH_ROLE_PERMISSIONS = {
  event: ['VIEW_EVENT', 'EDIT_EVENT'],
  tree: ['VIEW_TREE', 'EDIT_TREE'],
  formUnique: ['VIEW_FORM_UNIQUE'],
  formula: ['VIEW_FORMULA', 'CREATE_FORMULA', 'CALCULATE_FORMULA'],
  formAdvance: ['VIEW_FORM_CANGGIH'],
  table: ['VIEW_TABLE', 'CREATE_CONFIG_TABLE', 'UPDATE_CONFIG_TABLE'],
  graphic: ['VIEW_GRAPHIC'],
};

export const AUTH_USER = {
  dimas: {
    name: 'Dimas',
    password: 'dimas123',
    roles: ['event', 'tree'],
  },
  randy: {
    name: 'Randy',
    password: 'randy123',
    roles: ['formUnique', 'formula'],
  },
  adlan: {
    name: 'Adlan',
    password: 'adlan123',
    roles: ['formAdvance', 'tabel'],
  },
  kikoadmn: {
    name: 'Kiko',
    password: 'kikoadmn',
    roles: [
      'event',
      'tree',
      'formUnique',
      'formula',
      'formAdvance',
      'table',
      'graphic',
    ],
  },
  admin: {
    name: 'Admin',
    password: 'admin',
    roles: [
      'event',
      'tree',
      'formUnique',
      'formula',
      'formAdvance',
      'table',
      'graphic',
    ],
  },
  parman: {
    name: 'Parman',
    password: 'parman',
    roles: [],
  },
};
