import { Dialog, type DialogRef } from "./Dialog.tsx";
import { useRef } from "react";

export const DemoDialogFeature = () => {
  const dialog = useRef<DialogRef | null>(null);
  const modal = useRef<DialogRef | null>(null);
  return (
    <div className="flex flex-col justify-center gap-8">
      <h1 className="text-xl">Demo dialog/modal feature</h1>
      <div className="flex justify-center gap-8">
        <Dialog mode="dialog" ref={dialog}>
          <div className="flex min-w-60 flex-col gap-4 p-2">
            <h1 className="text-xl">Dialog</h1>
            <p>This is a dialog.</p>
          </div>
        </Dialog>
        <button
          className="w-20 rounded-md bg-green-400 p-2 capitalize text-white"
          onClick={() => dialog.current?.open()}
        >
          open dialog
        </button>
        <Dialog mode="modal" ref={modal}>
          <div className="flex min-w-80 flex-col gap-4 p-2">
            <h1 className="text-xl">Modal</h1>
            <p>This is a modal.</p>
          </div>
        </Dialog>
        <button
          className="w-20 rounded-md bg-green-400 p-2 capitalize text-white"
          onClick={() => modal.current?.open()}
        >
          open modal
        </button>
      </div>
    </div>
  );
};
