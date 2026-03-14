"use client";

import { useState } from "react";
import { Edit2, X, Save } from "lucide-react";

interface HustlerBioProps {
  bio?: string;
  onSave?: (bio: string) => void;
}

export default function HustlerBio({
  bio = "Passionate and skilled hustler with a proven track record of delivering quality work. Committed to excellence and customer satisfaction.",
  onSave,
}: HustlerBioProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editBio, setEditBio] = useState(bio);

  const handleSave = () => {
    if (onSave) {
      onSave(editBio);
    }
    setIsEditOpen(false);
  };

  const handleClose = () => {
    setIsEditOpen(false);
    setEditBio(bio);
  };

  return (
    <>
      <div className="bg-surface rounded-2xl p-4 md:p-6 border border-rim relative">
        <h3 className="text-base md:text-lg font-bold text-black mb-2 md:mb-3">
          Profile Summary
        </h3>
        <p className="text-black leading-relaxed text-sm pr-12 pb-2">
          {editBio}
        </p>

        {/* Edit Button */}
        <button
          onClick={() => setIsEditOpen(true)}
          className="absolute bottom-3 right-3 md:bottom-4 md:right-4 w-10 h-10 rounded-full bg-surface border-brand text-brand shadow-lg hover:bg-surface-alt transition flex items-center justify-center border-2 z-10"
        >
          <Edit2 size={18} />
        </button>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl shadow-2xl max-w-md w-full border border-rim max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-rim">
              <h3 className="text-base md:text-lg font-bold text-black">
                Edit Profile Summary
              </h3>
              <button
                onClick={handleClose}
                className="text-black/50 hover:text-black transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6">
              <label className="block text-sm font-semibold text-black mb-2">
                Your Bio
              </label>
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full px-4 py-3 bg-surface-alt border-2 border-rim rounded-lg text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-brand/50 transition resize-none h-28 md:h-32"
                placeholder="Write a brief summary about yourself..."
              />
              <p className="text-xs text-black/50 mt-2">
                {editBio.length}/500 characters
              </p>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-4 md:p-6 border-t border-rim">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2.5 bg-surface-alt text-black rounded-lg hover:bg-rim transition font-semibold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2.5 bg-green-500 text-white rounded-lg hover:opacity-90 transition font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
