'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const MainImageDashboard = ({
  handleSave,
}: {
  handleSave: (file: File) => void;
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // локальне прев’ю
    }
  };

  const onSaveClick = () => {
    if (file) handleSave(file); // передаємо файл наверх
  };

  return (
    <article className="flex flex-col items-start gap-4">
      <Image
        src={preview || '/main_image_placeholder.png'}
        alt="Main character image"
        width={600}
        height={400}
        className="rounded border object-cover"
      />

      <div className="flex gap-2">
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          className="hidden"
          onChange={handleFileChange}
        />
        <label htmlFor="upload-image">
          <Button variant="secondary" asChild>
            <span>Upload Image</span>
          </Button>
        </label>

        <Button onClick={onSaveClick} disabled={false}>
          Apply Image
        </Button>
      </div>
    </article>
  );
};

export default React.memo(MainImageDashboard);
