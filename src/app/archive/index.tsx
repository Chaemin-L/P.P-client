import { useEffect, useState } from "react";

import { MarbleCanvas } from "./marble-canvas";
import { MarbleGrid } from "./marble-grid";
import { Preview } from "./preview";

import { MarbleModal } from "@/components/app/archive/marble-modal";
import { ConfirmDialog } from "@/components/common/confirm/confirm-dialog";
import { useApiMarbleList } from "@/hooks/api/archive/useApiMarbleList";
import { TArchiveView, TMarble } from "@/types/archive";

export const Archive = () => {
  // NOTE: Server Data
  const { data } = useApiMarbleList(1, { page: 0, size: 24 });

  // NOTE: Marble List state
  const [marbleList, setMarbleList] = useState<TMarble[]>([]);
  const [isViewedIdList, setIsViewedIdList] = useState<number[]>([]);
  const [selectedMarbleId, setSelectedMarbleId] = useState<number>(-1);

  // NOTE: Canvas, Grid View value
  const [view, setView] = useState<TArchiveView>("preview");

  // NOTE: Marble detail Open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!data?.pages.length) return;

    setMarbleList(data?.pages.flatMap((page) => page.content));
  }, [data]);

  useEffect(() => {
    onChangeModalState(selectedMarbleId !== -1);
  }, [selectedMarbleId]);

  const onChangeView = (view: TArchiveView) => {
    setView(view);
  };

  const onChangeModalState = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
  };

  const onChangeSelectedMarbleId = (id: number) => {
    setSelectedMarbleId(id);
  };

  const onUpdateViewIdxList = (activeIdx: number) => {
    if (activeIdx === -1 || !marbleList.length) return;

    const activeMarbleId = marbleList[activeIdx].commentId;
    const updatedIsViewedIdxList = [
      ...new Set([...isViewedIdList, activeMarbleId]),
    ];
    setIsViewedIdList(updatedIsViewedIdxList);
  };

  if (!marbleList.length) return null;
  return (
    <ConfirmDialog>
      {isModalOpen && Boolean(selectedMarbleId !== -1) && (
        <MarbleModal
          isOpen={isModalOpen}
          selectedMarbleId={selectedMarbleId}
          marbleList={marbleList}
          onChangeOpenState={onChangeModalState}
          onUpdateViewIdxList={onUpdateViewIdxList}
        />
      )}

      {view === "preview" && <Preview onChangeView={onChangeView} />}
      {view === "canvas" && (
        <MarbleCanvas
          marbleList={marbleList}
          selectedMarbleId={selectedMarbleId}
          isViewedIdList={isViewedIdList}
          isModalOpen={isModalOpen}
          onChangeView={onChangeView}
          onChangeSelectedMarbleId={onChangeSelectedMarbleId}
        />
      )}
      {view === "grid" && (
        <MarbleGrid
          marbleList={marbleList}
          isViewedIdList={isViewedIdList}
          onChangeView={onChangeView}
          onChangeSelectedMarbleId={onChangeSelectedMarbleId}
        />
      )}
    </ConfirmDialog>
  );
};
