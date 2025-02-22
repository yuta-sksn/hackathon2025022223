'use client';

import { Suspense } from 'react';
import Spots from './Spots';

export default function SearchSpotsContainer() {
  return (
    <Suspense>
      <Spots></Spots>
    </Suspense>
  );
}
