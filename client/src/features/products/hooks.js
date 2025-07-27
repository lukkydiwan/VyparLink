// src/features/products/hooks.js

import { api } from '../../lib/api';
import { useQuery } from '@tanstack/react-query';
export const useProducts = (q = '', page = 1) =>
  useQuery({
    queryKey: ['products', q, page],
    queryFn: () => api.get('/products', { params: { q, page } }).then(r => r.data),
  });
