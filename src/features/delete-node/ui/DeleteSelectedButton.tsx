import { useTranslation } from "react-i18next";
import { useDeleteSelection } from "@/features/delete-node/model/useDeleteSelection";
import { Button } from "@/shared/ui/Button";

export function DeleteSelectedButton() {
  const { t } = useTranslation();
  const deleteSelection = useDeleteSelection();

  return (
    <Button variant="danger" className="text-xs" onClick={deleteSelection}>
      {t("deleteSelected")}
    </Button>
  );
}
