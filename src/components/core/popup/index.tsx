import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode } from "react";

interface PopupProps {
  trigger: ReactNode;
  title?: string;
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function Popup({ trigger, title, header, footer, children, open, onOpenChange }: PopupProps) {
  return (
    
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>

        <DialogContent>
          {header ? (
            <DialogHeader>{header}</DialogHeader>
          ) : title ? (
            <DialogHeader>
              <DialogTitle className="text-base">{title}</DialogTitle>
            </DialogHeader>
          ) : null}

          <div className="p-2">{children}</div>

          {footer && <DialogFooter>{footer}</DialogFooter>}
        </DialogContent>
      </Dialog>
  );
}
