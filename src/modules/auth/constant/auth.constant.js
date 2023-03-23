import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBarChart,
} from 'react-icons/fi';

export const AUTH_ROLE_PERMISSIONS = {
  event: ['VIEW_EVENT', 'EDIT_EVENT'],
  tree: ['VIEW_TREE', 'EDIT_TREE'],
  formUnique: ['VIEW_FORM_UNIQUE'],
  formula: ['VIEW_FORMULA', 'CREATE_FORMULA', 'CALCULATE_FORMULA'],
  formAdvance: ['VIEW_FORM_ADVANCE'],
  table: ['VIEW_TABLE', 'CREATE_CONFIG_TABLE', 'UPDATE_CONFIG_TABLE'],
  graphic: ['VIEW_GRAPHIC'],
};

export const AUTH_USERS = [
  {
    fullName: 'Dimas',
    username: 'dimas',
    password: 'dimas123',
    roles: ['event', 'tree'],
  },
  {
    fullName: 'Randy',
    username: 'randy',
    password: 'randy123',
    roles: ['formUnique', 'formula'],
  },
  {
    fullName: 'Adlan',
    username: 'adlan',
    password: 'adlan123',
    roles: ['formAdvance', 'table'],
  },
  {
    fullName: 'Kiko',
    username: 'kikoadmn',
    password: 'kikoadmn',
    roles: ['event', 'tree', 'formUnique', 'formula', 'formAdvance', 'table', 'graphic'],
  },
  {
    fullName: 'Admin',
    username: 'admin',
    password: 'admin',
    roles: ['event', 'tree', 'formUnique', 'formula', 'formAdvance', 'table', 'graphic'],
  },
  {
    fullName: 'Parman',
    username: 'parman',
    password: 'parman',
    roles: [],
  },
];

export const MENUS = [
  {
    name: 'Jadwal',
    icon: FiHome,
    path: '/event',
    access: 'event',
  },
  {
    name: 'Silsilah Keluarga',
    icon: FiTrendingUp,
    path: '/family-tree',
    access: 'tree',
  },
  {
    name: 'Form Unik',
    icon: FiCompass,
    path: '/form-unique',
    access: 'formUnique',
  },
  {
    name: 'Formula',
    icon: FiStar,
    path: '/formula',
    access: 'formula',
  },
  {
    name: 'Form Canggih',
    icon: FiSettings,
    path: '/form-advance',
    access: 'formAdvance',
  },
  {
    name: 'Tabel 4.0',
    icon: FiMenu,
    path: '/table',
    access: 'table',
  },
  {
    name: 'Informasi',
    icon: FiBarChart,
    path: '/information',
    access: 'graphic',
  },
];
