import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";
import { Copy } from "lucide-react";

const CopyToClipboardButton = ({ textToCopy }) => {
  const { toast } = useToast();

  const handleCopy = () => {
    copyToClipboard(textToCopy);
    toast({
      variant: "default",
      description: "Copied to clipboard!",
      duration: 3000
    });
  };

  return <Copy size={14} className="cursor-pointer" onClick={handleCopy} />;
};

export default CopyToClipboardButton;
