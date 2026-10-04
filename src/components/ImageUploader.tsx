'use client';

import React, { useState } from 'react';
import { Link as LinkIcon, Upload, X, Check, Loader2, Image as ImageIcon } from 'lucide-react';
import { uploadImage } from '@/lib/storage';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  folder?: string;
  placeholder?: string;
}

export function ImageUploader({
  value,
  onChange,
  label = 'Image / Photo',
  folder = 'uploads',
  placeholder = 'https://images.unsplash.com/...'
}: ImageUploaderProps) {
  const [mode, setMode] = useState<'link' | 'upload'>('link');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (PNG, JPG, WEBP, SVG, GIF)');
      return;
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image size should be under 10MB');
      return;
    }

    setUploadError('');
    setIsUploading(true);

    try {
      const url = await uploadImage(file, folder);
      onChange(url);
    } catch (err: any) {
      setUploadError(err?.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
        
        {/* Toggle Mode Buttons */}
        <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60">
          <button
            type="button"
            onClick={() => setMode('link')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              mode === 'link'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            Image URL
          </button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
              mode === 'upload'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload File
          </button>
        </div>
      </div>

      {/* Mode 1: Image URL Input */}
      {mode === 'link' && (
        <div className="relative">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* Mode 2: File Upload Input */}
      {mode === 'upload' && (
        <div>
          <label className="relative flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-xl cursor-pointer bg-slate-900/60 hover:bg-slate-900 transition-all group overflow-hidden">
            {isUploading ? (
              <div className="flex flex-col items-center gap-2 text-cyan-400">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-xs font-medium">Uploading image...</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-3 pb-3 text-center px-4">
                <Upload className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 transition-colors mb-1.5" />
                <p className="text-xs font-medium text-slate-300 group-hover:text-cyan-300">
                  Click to select or drop image file
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  PNG, JPG, WEBP, GIF or SVG (Max 10MB)
                </p>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              disabled={isUploading}
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {uploadError && (
            <p className="text-xs text-red-400 mt-1">{uploadError}</p>
          )}
        </div>
      )}

      {/* Image Preview Box */}
      {value && (
        <div className="relative flex items-center gap-3 p-2 bg-slate-900/90 border border-slate-800 rounded-xl mt-2 group">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-700/60 bg-slate-950 flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                // If image fails to load, fallback icon
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-slate-900 flex items-center justify-center -z-10">
              <ImageIcon className="w-5 h-5 text-slate-600" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-medium text-cyan-400">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              Image Selected
            </div>
            <p className="text-[11px] text-slate-400 truncate mt-0.5 font-mono">
              {value.startsWith('data:') ? 'Base64 Local Image Asset' : value}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
