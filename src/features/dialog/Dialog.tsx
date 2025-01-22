import { type ReactNode, type Ref, useImperativeHandle, useRef } from "react";
import { X } from "lucide-react";

export type DialogRef = { open: () => void; close: () => void };

export const Dialog = ({
  children,
  mode,
  ref,
}: {
  children: ReactNode;
  mode: "modal" | "dialog";
  ref: Ref<DialogRef | null>;
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        if (mode === "modal") dialogRef.current?.showModal();
        else dialogRef.current?.show();
      },
      close: () => dialogRef.current?.close(),
    };
  }, [mode]);

  return (
    <dialog ref={dialogRef} className="border bg-white">
      <div className="flex h-0 justify-end">
        <button className="z-10" onClick={() => dialogRef.current?.close()}>
          <X />
        </button>
      </div>
      {children}
    </dialog>
  );
};
