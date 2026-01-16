'use client';

import { Search as SearchIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Kbd } from '@/components/ui/kbd';

import { Modal } from './components';
import type { Props } from './types';

function Button({ fetchPopularCompanyProfilesResponse }: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    function handleWindowKeyDown(event: KeyboardEvent) {
      if (event.key === '/') {
        event.preventDefault();
        setModalIsOpen((m) => !m);
      }
    }

    window.addEventListener('keydown', handleWindowKeyDown);

    return () => {
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, []);

  return (
    <>
      <button
        className="grid cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-x-1 rounded-md bg-input/60 px-2.5 py-1.5 text-left text-muted-foreground hover:bg-input/80"
        type="button"
        onClick={() => {
          setModalIsOpen(true);
        }}
      >
        <SearchIcon size={16} />
        <span className="text-xs">Search</span>
        <Kbd className="bg-input">/</Kbd>
      </button>
      <Modal
        open={modalIsOpen}
        fetchPopularCompanyProfilesResponse={
          fetchPopularCompanyProfilesResponse
        }
        onClose={() => {
          setModalIsOpen(false);
        }}
      />
    </>
  );
}

export default Button;
