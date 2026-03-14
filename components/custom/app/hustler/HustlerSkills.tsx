"use client";

import { useState } from "react";
import { Edit2, X, Plus, Trash2, Save } from "lucide-react";

interface HustlerSkillsProps {
  skills?: string[];
  onSave?: (skills: string[]) => void;
}

export default function HustlerSkills({
  skills = ["Web Development", "Mobile Apps", "UI/UX Design"],
  onSave,
}: HustlerSkillsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editSkills, setEditSkills] = useState(skills);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && !editSkills.includes(newSkill)) {
      setEditSkills([...editSkills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setEditSkills(editSkills.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editSkills);
    }
    setIsEditOpen(false);
  };

  const handleClose = () => {
    setIsEditOpen(false);
    setEditSkills(skills);
    setNewSkill("");
  };

  return (
    <>
      <div className="bg-surface rounded-2xl p-4 md:p-6 border border-rim relative">
        <h3 className="text-base md:text-lg font-bold text-black mb-3 md:mb-4">
          Skills
        </h3>

        {/* Skills Grid */}
        <div className="flex flex-wrap gap-2 pr-12 pb-2">
          {editSkills.length > 0 ? (
            editSkills.map((skill, index) => (
              <div
                key={index}
                className="px-3 py-1.5 bg-brand/10 text-brand rounded-full text-xs md:text-sm font-medium border border-brand/20"
              >
                {skill}
              </div>
            ))
          ) : (
            <p className="text-black/50 text-sm">No skills added yet</p>
          )}
        </div>

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
                Edit Skills
              </h3>
              <button
                onClick={handleClose}
                className="text-black/50 hover:text-black transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 space-y-4">
              {/* Add New Skill */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Add New Skill
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                    className="flex-1 px-3 md:px-4 py-2.5 bg-surface-alt border-2 border-rim rounded-lg text-black placeholder-black/40 focus:outline-none focus:ring-2 focus:ring-brand/50 transition text-sm"
                    placeholder="e.g., Web Development"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-3 md:px-4 py-2.5 bg-brand text-white rounded-lg hover:opacity-90 transition font-semibold flex items-center gap-2"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Skills List */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Your Skills
                </label>
                <div className="space-y-2 max-h-40 md:max-h-48 overflow-y-auto">
                  {editSkills.length > 0 ? (
                    editSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 md:p-3 bg-surface-alt rounded-lg border border-rim"
                      >
                        <span className="text-black font-medium text-sm">
                          {skill}
                        </span>
                        <button
                          onClick={() => handleRemoveSkill(index)}
                          className="text-red-500 hover:text-red-600 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-black/50 text-sm text-center py-4">
                      No skills added yet
                    </p>
                  )}
                </div>
              </div>
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
