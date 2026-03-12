"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Edit2,
  X,
  Save,
  Upload,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface HustlerProfileProps {
  name?: string;
  location?: string;
  phone?: string;
  email?: string;
  avatar?: string;
  initials?: string;
  isActive?: boolean;
  onSave?: (data: { avatar?: string; phone: string; email: string }) => void;
}

export default function HustlerProfile({
  name = "John Doe",
  location = "Nairobi Central",
  phone = "+254 700 000 000",
  email = "john@example.com",
  avatar,
  initials = "JD",
  isActive = true,
  onSave,
}: HustlerProfileProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editPhone, setEditPhone] = useState(phone);
  const [editEmail, setEditEmail] = useState(email);
  const [editAvatar, setEditAvatar] = useState(avatar);
  const [previewAvatar, setPreviewAvatar] = useState(avatar);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneChanged, setPhoneChanged] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation functions
  const validatePhone = (phoneNum: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phoneNum.replace(/\s/g, ""));
  };

  const validateEmail = (emailAddr: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailAddr);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPhone(e.target.value);
    setPhoneChanged(true);
    setPhoneVerified(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditEmail(e.target.value);
    setEmailChanged(true);
    setEmailVerified(false);
  };

  const handlePhoneVerify = () => {
    if (validatePhone(editPhone)) {
      setPhoneVerified(true);
    }
  };

  const handleEmailVerify = () => {
    if (validateEmail(editEmail)) {
      setEmailVerified(true);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
        setEditAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Check if save is allowed
  const isSaveAllowed = () => {
    if (phoneChanged && !phoneVerified) return false;
    if (emailChanged && !emailVerified) return false;
    return true;
  };

  const handleSave = () => {
    if (!isSaveAllowed()) return;
    if (onSave) {
      onSave({
        avatar: editAvatar,
        phone: editPhone,
        email: editEmail,
      });
    }
    setIsEditOpen(false);
  };

  const handleClose = () => {
    setIsEditOpen(false);
    setEditPhone(phone);
    setEditEmail(email);
    setPreviewAvatar(avatar);
    setPhoneVerified(false);
    setEmailVerified(false);
    setPhoneChanged(false);
    setEmailChanged(false);
  };

  return (
    <>
      <div className="bg-surface rounded-2xl p-4 md:p-6 border border-rim relative">
        <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
          {/* Avatar with Active Indicator */}
          <div className="relative flex-shrink-0 mx-auto md:mx-0">
            <div className="w-20 md:w-24 h-20 md:h-24 rounded-full border-4 border-brand/20 shadow-lg bg-surface-alt flex items-center justify-center overflow-hidden">
              {previewAvatar ? (
                <Image
                  src={previewAvatar}
                  alt={name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              ) : (
                <span className="text-xl md:text-2xl font-bold text-brand">
                  {initials}
                </span>
              )}
            </div>

            {/* Active Status Indicator */}
            <div
              className={`absolute top-1 left-1 w-5 h-5 rounded-full border-2 border-surface ${
                isActive ? "bg-green-400" : "bg-gray-400"
              } shadow-md`}
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            {/* Name */}
            <h2 className="text-xl md:text-2xl font-bold text-black mb-3 md:mb-4">
              {name}
            </h2>

            {/* Contact Details */}
            <div className="space-y-2 md:space-y-2.5">
              {/* Location */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 text-black">
                <MapPin
                  size={16}
                  className="text-brand flex-shrink-0 mx-auto md:mx-0"
                />
                <span className="text-sm">{location}</span>
              </div>

              {/* Phone */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 text-black">
                <Phone
                  size={16}
                  className="text-brand flex-shrink-0 mx-auto md:mx-0"
                />
                <span className="text-sm">{editPhone}</span>
              </div>

              {/* Email */}
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 text-black">
                <Mail
                  size={16}
                  className="text-brand flex-shrink-0 mx-auto md:mx-0"
                />
                <span className="text-sm break-all">{editEmail}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Button - Bottom Right Corner */}
        <button
          onClick={() => setIsEditOpen(true)}
          className="absolute bottom-3 md:bottom-4 right-3 md:right-4 w-9 md:w-10 h-9 md:h-10 rounded-full bg-brand text-white shadow-lg hover:opacity-90 transition flex items-center justify-center border-2 border-surface"
        >
          <Edit2 size={16} />
        </button>
      </div>

      {/* Edit Modal */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl shadow-2xl max-w-md w-full border border-rim max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-rim">
              <h3 className="text-lg font-bold text-black">Edit Profile</h3>
              <button
                onClick={handleClose}
                className="text-black/50 hover:text-black transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-4 border-brand/20 bg-surface-alt flex items-center justify-center overflow-hidden mb-3">
                  {previewAvatar ? (
                    <Image
                      src={previewAvatar}
                      alt="Preview"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="text-xl font-bold text-brand">
                      {initials}
                    </span>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-lg hover:bg-brand/20 transition text-sm font-semibold"
                >
                  <Upload size={16} />
                  Upload Avatar
                </button>
              </div>

              {/* Phone Input with Verification */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={handlePhoneChange}
                    className={`flex-1 px-4 py-2.5 bg-surface-alt border-2 rounded-lg text-black placeholder-black/40 focus:outline-none transition ${
                      phoneChanged && !phoneVerified
                        ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                        : phoneVerified
                        ? "border-green-500/50 focus:ring-2 focus:ring-green-500/50"
                        : "border-rim focus:ring-2 focus:ring-brand/50"
                    }`}
                    placeholder="+254 700 000 000"
                  />
                  <button
                    onClick={handlePhoneVerify}
                    disabled={!phoneChanged}
                    className={`px-3 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center transition ${
                      phoneVerified
                        ? "bg-green-500/20 text-green-600 border border-green-500/30"
                        : phoneChanged
                        ? "bg-brand text-white hover:opacity-90"
                        : "bg-gray-300/30 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {phoneVerified ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <span className="text-xs">Verify</span>
                    )}
                  </button>
                </div>
                {phoneChanged && !phoneVerified && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-red-600">
                    <AlertCircle size={14} />
                    Phone verification required
                  </div>
                )}
              </div>

              {/* Email Input with Verification */}
              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Email Address
                </label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={editEmail}
                    onChange={handleEmailChange}
                    className={`flex-1 px-4 py-2.5 bg-surface-alt border-2 rounded-lg text-black placeholder-black/40 focus:outline-none transition ${
                      emailChanged && !emailVerified
                        ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                        : emailVerified
                        ? "border-green-500/50 focus:ring-2 focus:ring-green-500/50"
                        : "border-rim focus:ring-2 focus:ring-brand/50"
                    }`}
                    placeholder="john@example.com"
                  />
                  <button
                    onClick={handleEmailVerify}
                    disabled={!emailChanged}
                    className={`px-3 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center transition ${
                      emailVerified
                        ? "bg-green-500/20 text-green-600 border border-green-500/30"
                        : emailChanged
                        ? "bg-brand text-white hover:opacity-90"
                        : "bg-gray-300/30 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {emailVerified ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <span className="text-xs">Verify</span>
                    )}
                  </button>
                </div>
                {emailChanged && !emailVerified && (
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-red-600">
                    <AlertCircle size={14} />
                    Email verification required
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 p-6 border-t border-rim">
              <button
                onClick={handleClose}
                className="flex-1 px-4 py-2.5 bg-surface-alt text-black rounded-lg hover:bg-rim transition font-semibold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!isSaveAllowed()}
                className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition ${
                  isSaveAllowed()
                    ? "bg-green-500 text-white hover:opacity-90"
                    : "bg-gray-400/40 text-gray-500 cursor-not-allowed"
                }`}
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
