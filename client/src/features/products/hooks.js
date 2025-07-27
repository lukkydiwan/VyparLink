// src/features/products/hooks.js

import { api } from '../../lib/api';
import { useQuery } from '@tanstack/react-query';
// src/features/products/hooks.js
export const useProducts = ({
  search = "",
  category = "",
  pincode = "",
  page = 1,
} = {}) =>
  useQuery({
    queryKey: ["products", search, category, pincode, page],
    queryFn: () =>
      api
        .get("/products", {
          params: { q: search, category, pincode, page },
        })
        .then((r) => r.data),
  });

