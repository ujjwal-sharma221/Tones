"use client";

import { useSettings } from "@/hooks/use-settings";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { Label } from "../ui/label";

const SettingModal = () => {
  const settings = useSettings();
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">Settings</h2>
        </DialogHeader>
        {/* <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label></Label>
          </div>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default SettingModal;
