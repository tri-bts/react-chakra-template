export const AUTH_ROLE_PERMISSIONS = {
  jadwal: ['VIEW_JADWAL', 'EDIT_JADWAL'],
  keluarga: ['VIEW_KELUARGA', 'EDIT_KELUARGA'],
  formUnik: ['VIEW_FORM_UNIK'],
  formula: ['VIEW_FORMULA', 'CREATE_FORMULA', 'CALCULATE_FORMULA'],
  formCanggih: ['VIEW_FORM_CANGGIH'],
  table: ['VIEW_TABLE', 'CREATE_CONFIG_TABLE', 'UPDATE_CONFIG_TABLE'],
  grafik: ['VIEW_GRAFIK'],
};

export const AUTH_USER = {
  dimas: {
    name: 'Dimas',
    password: 'dimas123',
    roles: ['jadwal', 'keluarga'],
  },
  randy: {
    name: 'Randy',
    password: 'randy123',
    roles: ['formUnik', 'formula'],
  },
  adlan: {
    name: 'Adlan',
    password: 'adlan123',
    roles: ['formCanggih', 'tabel'],
  },
  kikoadmn: {
    name: 'Kiko',
    password: 'kikoadmn',
    roles: [
      'jadwal',
      'keluarga',
      'formUnik',
      'formula',
      'formula',
      'formCanggih',
      'table',
      'grafik',
    ],
  },
  admin: {
    name: 'Admin',
    password: 'admin',
    roles: [
      'jadwal',
      'keluarga',
      'formUnik',
      'formula',
      'formula',
      'formCanggih',
      'table',
      'grafik',
    ],
  },
  parman: {
    name: 'Parman',
    password: 'parman',
    roles: [],
  },
};
