"use client";

import { useEffect, useState } from "react";

import SettingModal from "../modals/settings-modal";
import CoverImageModal from "../modals/cover-image-modal";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <>
      <SettingModal />
      <CoverImageModal></CoverImageModal>
    </>
  );
};

export default ModalProvider;
